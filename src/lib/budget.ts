// "How much do you want to spend?" in each country's money: the same three ranges for the quiz,
// the deals page and a pick's range (lines set per category in its catalogue).
import { currencyOf, numberLocale, type Edition } from '../i18n/editions';
import { fill, t } from '../i18n/ui';
import type { Tier } from './pack';

const num = (v: number, ed: Edition) => new Intl.NumberFormat(numberLocale(ed), { maximumFractionDigits: 0 }).format(v);
const money = (v: number, ed: Edition) => new Intl.NumberFormat(numberLocale(ed), { style: 'currency', currency: currencyOf(ed), currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(v);

export const tiers: Tier[] = ['low', 'mid', 'high'];

/** "Fino a 600 €", "600–1.000 €", "Oltre 1.000 €". */
export function budgetLabel(lines: [number, number], tier: Tier, ed: Edition): string {
  const b = t(ed.lang).budget;
  if (tier === 'low') return fill(b.upTo, { a: money(lines[0], ed) });
  if (tier === 'mid') return fill(b.between, { a: num(lines[0], ed), b: money(lines[1], ed) });
  return fill(b.over, { a: money(lines[1], ed) });
}
