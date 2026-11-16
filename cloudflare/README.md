# Shared scores API (Cloudflare Workers + D1)

The game can run without this API. When `front-end/api-config.js` contains the deployed Worker URL, scores are also submitted to a shared D1 leaderboard. If the API is unavailable, the game keeps the run in the player's browser and remains playable.

The new D1 database starts empty. Scores already in a player's browser remain visible on that browser, but old records from the former Heroku database are not copied automatically; they can only be restored from a database backup or an export.

## Free-tier cost guard

This deployment is intended for the Cloudflare **Workers Free** plan only. Do not subscribe to Workers Paid or enable paid add-ons for this project. On Workers Free, Cloudflare enforces its daily request and D1 row limits; requests and writes fail at the limit instead of becoming overage charges. Workers Free has a 10 ms CPU limit, uses one D1 database, stores no logs, and uses no paid add-on bindings. The per-Worker CPU override supported by paid plans is intentionally omitted because Cloudflare does not accept that setting on Free.

The Worker configuration cannot force an account plan or set a guaranteed account-wide $0 bill. Cloudflare's Workers spending limit is not a hard maximum and excludes the Workers Paid subscription fee and charges from other products. Check the account's plan before deploying and keep it on Workers Free. This project never upgrades the plan or creates a paid resource.

Cloudflare's Free plan currently includes 100,000 Worker requests per day and D1 limits of 5 million rows read per day, 100,000 rows written per day, 5 GB total account storage, and 500 MB per database. Free-tier requests stop working at the enforced limit; the game falls back to browser storage.

## Deploy

The production Worker is deployed at `https://tom-pilgrim-scores-api.2hwjtg646v.workers.dev`, and its D1 database and schema are already provisioned. To deploy Worker changes, run `npx wrangler deploy` from this directory. Do not create another database for this project.

The site is configured to use the deployed Worker through `front-end/api-config.js`. Publish the updated `front-end` files to the GitHub Pages branch after changing the frontend.

The game uses the account's active Workers Free tier. Keep that plan active and do not enable paid add-ons for this project. A D1 Free database is capped at 500 MB and the account at 10 D1 databases; do not create a second database for this project.
