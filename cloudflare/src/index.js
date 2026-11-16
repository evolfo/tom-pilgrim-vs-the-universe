const ALLOWED_ORIGINS = new Set([
  "https://evolfo.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);

const MAX_USERNAME_LENGTH = 24;
const MAX_SCORE = 1000000;
const MAX_REQUEST_BYTES = 1024;
const LEADERBOARD_SIZE = 8;

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = { "Vary": "Origin" };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }

  return headers;
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

async function readJson(request) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return { error: "Request body is too large." };
  }

  const text = await request.text();
  if (text.length > MAX_REQUEST_BYTES) {
    return { error: "Request body is too large." };
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    return { error: "Request body must be valid JSON." };
  }
}

function errorResponse(request, message, status) {
  return json(request, { error: message }, status);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return errorResponse(request, "This site is not allowed to use the score API.", 403);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request)
      });
    }

    if (url.pathname === "/api/v1/health" && request.method === "GET") {
      return json(request, { ok: true });
    }

    if (url.pathname === "/api/v1/leaderboard" && request.method === "GET") {
      try {
        const { results } = await env.DB.prepare(
          `SELECT username_key, username, high_score AS score, victory, attempts
           FROM players
           WHERE high_score > 0
           ORDER BY high_score DESC, username_key ASC
           LIMIT ?`
        ).bind(LEADERBOARD_SIZE).all();

        return json(request, { players: results });
      } catch (_error) {
        return errorResponse(request, "The shared leaderboard is temporarily unavailable.", 503);
      }
    }

    if (url.pathname === "/api/v1/scores" && request.method === "POST") {
      const body = await readJson(request);
      if (body.error) {
        return errorResponse(request, body.error, 400);
      }

      const username = typeof body.username === "string" ? body.username.trim() : "";
      const score = body.score;
      const victory = body.victory === true;

      if (!username || username.length > MAX_USERNAME_LENGTH || /[\u0000-\u001f\u007f]/.test(username)) {
        return errorResponse(request, `Name must be 1–${MAX_USERNAME_LENGTH} characters.`, 400);
      }
      if (!Number.isSafeInteger(score) || score < 0 || score > MAX_SCORE) {
        return errorResponse(request, "Score is outside the accepted range.", 400);
      }

      const usernameKey = username.normalize("NFKC").toLocaleLowerCase("en-US");

      try {
        await env.DB.prepare(
          `INSERT INTO players (username_key, username, high_score, victory, attempts, updated_at)
           VALUES (?, ?, ?, ?, 1, unixepoch())
           ON CONFLICT(username_key) DO UPDATE SET
             username = excluded.username,
             victory = CASE
               WHEN excluded.high_score > players.high_score THEN excluded.victory
               WHEN excluded.high_score = players.high_score THEN MAX(players.victory, excluded.victory)
               ELSE players.victory
             END,
             high_score = MAX(players.high_score, excluded.high_score),
             attempts = players.attempts + 1,
             updated_at = unixepoch()`
        ).bind(usernameKey, username, score, victory ? 1 : 0).run();

        return json(request, { ok: true }, 201);
      } catch (_error) {
        return errorResponse(request, "The score could not be saved right now.", 503);
      }
    }

    return errorResponse(request, "Not found.", 404);
  }
};
