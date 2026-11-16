# Shared scores API (Cloudflare Workers + D1)

The game can run without this API. When `front-end/api-config.js` contains the deployed Worker URL, scores are also submitted to a shared D1 leaderboard. If the API is unavailable, the game keeps the run in the player's browser and remains playable.

The new D1 database starts empty. Scores already in a player's browser remain visible on that browser, but old records from the former Heroku database are not copied automatically; they can only be restored from a database backup or an export.

## Free-tier cost guard

This deployment is intended for the Cloudflare **Workers Free** plan only. Do not subscribe to Workers Paid or enable paid add-ons for this project. On Workers Free, Cloudflare enforces its daily request and D1 row limits; requests and writes fail at the limit instead of becoming overage charges. The Worker also has a 10 ms CPU cap, uses one D1 database, stores no logs, and uses no paid add-on bindings.

The Worker configuration cannot force an account plan or set a guaranteed account-wide $0 bill. Cloudflare's Workers spending limit is not a hard maximum and excludes the Workers Paid subscription fee and charges from other products. Check the account's plan before deploying and keep it on Workers Free. This project never upgrades the plan or creates a paid resource.

Cloudflare's Free plan currently includes 100,000 Worker requests per day and D1 limits of 5 million rows read per day, 100,000 rows written per day, 5 GB total account storage, and 500 MB per database. Free-tier requests stop working at the enforced limit; the game falls back to browser storage.

## Deploy

1. From this directory, create the database with `npx wrangler d1 create tom-pilgrim-scores`.
2. Copy the returned database ID into `wrangler.jsonc`, replacing `REPLACE_AFTER_CREATE`.
3. Apply the schema with `npx wrangler d1 migrations apply tom-pilgrim-scores --remote`.
4. Deploy with `npx wrangler deploy`.
5. Copy the printed `workers.dev` URL into `front-end/api-config.js`, then publish the updated `front-end` site.

Do not run the create/deploy commands while the account is on a paid plan if a $0 bill is required. A D1 Free database is capped at 500 MB and the account at 10 D1 databases; do not create a second database for this project.
