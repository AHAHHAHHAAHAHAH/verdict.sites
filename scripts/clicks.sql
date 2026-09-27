-- The clicks from our pages to the stores (functions/api/out.js), one row per day, page and store.
-- Created once: npx wrangler d1 execute verdict-clicks --remote --file scripts/clicks.sql
CREATE TABLE IF NOT EXISTS clicks (
  day TEXT NOT NULL,
  page TEXT NOT NULL,
  store TEXT NOT NULL,
  n INTEGER NOT NULL,
  PRIMARY KEY (day, page, store)
);
