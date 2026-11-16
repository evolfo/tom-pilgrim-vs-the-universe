CREATE TABLE IF NOT EXISTS players (
  username_key TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  high_score INTEGER NOT NULL DEFAULT 0 CHECK (high_score >= 0),
  victory INTEGER NOT NULL DEFAULT 0 CHECK (victory IN (0, 1)),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS players_leaderboard
  ON players (high_score DESC, username_key ASC);
