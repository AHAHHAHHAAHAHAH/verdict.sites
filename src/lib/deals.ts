// Today's discounts: the models the brand stores show below their own crossed-out price, read
// every morning (src/lib/models.ts). A discount read more than two days ago is never shown: a deal
// that may be over is worse than no deal.
import type { Market } from '../i18n/markets';
import type { StoreModel } from './pack';
import { tierOfPrice } from './catalog';
import { freshWithin, modelsFor } from './models';

export { hasStoreSource as hasDealSource, ourPick } from './models';

/** A model on sale: it has a crossed-out price. */
export type Deal = StoreModel & { was: number };

const TWO_DAYS = 48 * 3600 * 1000;

/** Percentage off, rounded down so we never overstate it. */
export const percentOff = (d: Deal) => Math.floor((1 - d.price / d.was) * 100);

/** One category's deals in one country, the biggest discount first. */
export function dealsFor(category: string, market: Market): Deal[] {
  return modelsFor(category, market)
    .filter((m): m is Deal => Boolean(m.was) && freshWithin(m.seen, TWO_DAYS))
    .sort((a, b) => percentOff(b) - percentOff(a) || a.price - b.price);
}

/** When the discounts shown were read (the newest reading among them). */
export function dealsSeen(category: string, market: Market): string | undefined {
  return dealsFor(category, market)
    .map((d) => d.seen)
    .sort()
    .at(-1);
}

export function dealSummary(category: string, market: Market): { n: number; best: number } {
  const list = dealsFor(category, market);
  return { n: list.length, best: list.length ? percentOff(list[0]) : 0 };
}

/** The deal's price range in this category's budget question, when it has one. */
export const dealTier = (d: Deal) => tierOfPrice(d.cat, d.market, d.price);
