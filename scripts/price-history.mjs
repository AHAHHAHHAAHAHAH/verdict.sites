// Every price a model has had in its brand's own store, since we started reading it:
// src/sites/<site>/prices.json. One entry per change (date, price, crossed-out price), so the file
// stays small; a model that leaves the store keeps its history. Written by fetch-stores.mjs after
// each reading, read by src/lib/history.ts for "lowest price since…".
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { keyOf } from './store-names.mjs';

/** The key a model's history is kept under: its country, its store and its model (colours joined). */
export const historyKey = (m) => `${m.market}|${m.store}|${keyOf(m.name)}`;

/** Adds today's prices to a site's history file; returns how many models changed price. */
export function recordPrices(site, models, isoNow) {
  const file = `src/sites/${site}/prices.json`;
  const day = isoNow.slice(0, 10);
  const history = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { since: day, models: {} };
  let changed = 0;
  for (const m of models) {
    // A price kept from an earlier reading (the store could not be read today) is not a new point.
    if (m.seen !== isoNow) continue;
    const k = historyKey(m);
    const points = (history.models[k] ??= []);
    const last = points[points.length - 1];
    const was = m.was ?? null;
    if (last && last[1] === m.price && (last[2] ?? null) === was) continue;
    if (last && last[0] === day) points.pop();
    points.push(was === null ? [day, m.price] : [day, m.price, was]);
    changed++;
  }
  writeFileSync(file, `${JSON.stringify(history)}\n`);
  return changed;
}
