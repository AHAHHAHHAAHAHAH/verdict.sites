// A model's prices in its brand's own store since we started reading it (src/sites/<site>/prices.json,
// one entry per change, written by scripts/price-history.mjs after every daily reading).
import data from '@site/prices.json';

type Point = [day: string, price: number, was?: number];
const file = data as unknown as { since: string; models: Record<string, Point[]> };

export interface History {
  /** The first day we read this model. */
  since: string;
  /** Every change, oldest first. */
  points: { day: string; price: number; was?: number }[];
  low: { price: number; day: string };
  high: { price: number; day: string };
  /** Days between the first and the last reading. */
  days: number;
}

export function historyOf(key: string | undefined): History | undefined {
  const raw = key ? file.models[key] : undefined;
  if (!raw?.length) return undefined;
  const points = raw.map(([day, price, was]) => ({ day, price, was }));
  const low = points.reduce((a, b) => (b.price < a.price ? b : a));
  const high = points.reduce((a, b) => (b.price > a.price ? b : a));
  const days = Math.round((Date.now() - Date.parse(points[0].day)) / 86_400_000);
  return { since: points[0].day, points, low: { price: low.price, day: low.day }, high: { price: high.price, day: high.day }, days };
}
