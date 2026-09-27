// Every model on sale in the brands' own stores we read, per country: src/sites/<site>/models.json,
// written every morning by scripts/fetch-stores.mjs. A price older than a week is not shown: the
// list then says the stores could not be read, instead of showing prices that may have changed.
import data from '@site/models.json';
import { stores } from '@site/stores';
import type { Market } from '../i18n/markets';
import type { ModelsFile, Product, StoreModel } from './pack';
import { products, publishedIn } from './catalog';

const file = data as ModelsFile;
const WEEK = 7 * 24 * 3600 * 1000;
const now = Date.now();
export const freshWithin = (iso: string | undefined, ms: number) => Boolean(iso) && now - Date.parse(iso!) < ms;

/** When the stores were last read, if recently enough to show their prices. */
export const modelsCheckedAt: string | undefined = freshWithin(file.checkedAt, WEEK) ? file.checkedAt : undefined;

/**
 * Whether a brand store we read covers this type in this country: only then does the type get a
 * deals page and a list of models from the stores there.
 */
export function hasStoreSource(category: string, market: Market): boolean {
  return publishedIn(category, market) && stores.some((s) => s.markets[market] && s.rules.some((r) => r.cat === category));
}

/** The brands whose own store we read for this type in this country. */
export function storesFor(category: string, market: Market): string[] {
  return stores.filter((s) => s.markets[market] && s.rules.some((r) => r.cat === category)).map((s) => s.store);
}

/** One type's models in one country, as the stores showed them at their last reading. */
export function modelsFor(category: string, market: Market): StoreModel[] {
  if (!modelsCheckedAt) return [];
  return file.models.filter((m) => m.cat === category && m.market === market && freshWithin(m.seen, WEEK));
}

const clean = (url: string) => url.replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();
// Stores rename their addresses but keep the product code at the end (…/IP3251EUT.html).
const codeOf = (url: string) => {
  const last = clean(url).split('/').pop()?.replace(/\.html?$/, '') ?? '';
  return /\d/.test(last) && /^[a-z0-9.%+-]{5,}$/.test(last) && !last.includes('-') ? last : undefined;
};
/** Our own pick, when a store's model is one of them (the same page, or the same product code, on the same store). */
export function ourPick(m: Pick<StoreModel, 'market' | 'url'>): Product | undefined {
  const code = codeOf(m.url);
  const host = new URL(m.url).host;
  return products.find((p) => {
    const urls = [p.price?.[m.market]?.source, p.store?.[m.market]].filter((u): u is string => Boolean(u));
    return urls.some((u) => clean(u) === clean(m.url) || (code !== undefined && new URL(u).host === host && codeOf(u) === code));
  });
}
