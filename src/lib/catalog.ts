// The site's catalogue, quiz and copy, checked once per build for missing translations and for
// shop data that names a country the site does not cover.
import { catalog as siteCatalog } from '@site/catalog';
import { quiz } from '@site/quiz';
import { strings } from '@site/strings';
import { langsFor, languages, markets, type Edition } from '../i18n/editions';
import { isMarket, marketMeta } from '../i18n/markets';
import { assertComplete, tx, type Catalog, type Category, type Market, type Need, type Product, type QuizDef, type T, type Tier } from './pack';

// Typed as the contract, so optional parts (glossary...) are readable whether a pack has them or not.
const catalog: Catalog = siteCatalog;

const marketsOf = (c: Category): readonly Market[] => c.markets ?? markets;
const pickMarkets = (c: Category, pick: Need['picks'][number]) => marketsOf(c).filter((m) => !pick.markets || pick.markets.includes(m));

function assertMarkets(list: readonly string[] | undefined, path: string, within: readonly Market[] = markets) {
  for (const m of list ?? []) {
    if (!isMarket(m) || !within.includes(m)) throw new Error(`${path}: "${m}" is not one of this site's countries (${within.join(', ')})`);
  }
}

// Each category is checked in the languages of the countries it is published in; a situation, a
// pick's tag and a product only in the languages of the countries where they are offered. Prices
// and shop links are per country by design, and must name one of the site's countries.
for (const id of catalog.categoryIds) {
  const c = catalog.categories[id];
  assertMarkets(c.markets, `catalog.${id}.markets`);
  const { needs, ...rest } = c;
  assertComplete(rest, langsFor(marketsOf(c)), `catalog.${id}`);
  for (const n of needs) {
    for (const pick of n.picks) assertMarkets(pick.markets, `catalog.${id}.needs.${n.id}.${pick.id}.markets`, marketsOf(c));
    const shown = marketsOf(c).filter((m) => n.picks.some((pick) => pickMarkets(c, pick).includes(m)));
    assertComplete(n.label, langsFor(shown), `catalog.${id}.needs.${n.id}.label`);
    for (const pick of n.picks) if (pick.tag) assertComplete(pick.tag, langsFor(pickMarkets(c, pick)), `catalog.${id}.needs.${n.id}.${pick.id}.tag`);
  }
}
for (const p of catalog.products) {
  const c = catalog.categories[p.category];
  const offered = marketsOf(c).filter((m) => c.needs.some((n) => n.picks.some((pick) => pick.id === p.id && pickMarkets(c, pick).includes(m))));
  if (!offered.length) throw new Error(`product.${p.id}: not offered in any situation of "${p.category}" (remove it or add it to a need)`);
  for (const field of ['price', 'asin', 'store', 'nameIn'] as const) assertMarkets(Object.keys(p[field] ?? {}), `product.${p.id}.${field}`);
  const { price: _price, asin: _asin, store: _store, nameIn: _nameIn, ...rest } = p;
  assertComplete(rest, langsFor(offered), `product.${p.id}`);
}
assertComplete(catalog.factLabels, languages, 'catalog.factLabels');
if (catalog.factHelp) assertComplete(catalog.factHelp, languages, 'catalog.factHelp');
// Each quiz answer is checked in the languages of the countries that show it.
for (const step of quiz.steps) {
  assertComplete(step.title, languages, `quiz.${step.id}.title`);
  for (const o of step.options as QuizDef['steps'][number]['options']) {
    assertMarkets(o.markets, `quiz.${step.id}.${o.value}.markets`);
    if (!o.budget) assertComplete(o.label ?? {}, langsFor(o.markets ?? markets), `quiz.${step.id}.${o.value}`);
  }
}
assertComplete(strings, languages, 'strings');

export const CHECKED = catalog.checked;
export const categoryIds: readonly string[] = catalog.categoryIds;
export const categories: Record<string, Category> = catalog.categories;
export const products: Product[] = catalog.products;
export const factLabels = catalog.factLabels;
export const factHelp: Record<string, T> = catalog.factHelp ?? {};
export const quizDef: QuizDef = quiz;

export function productsOf(category: string): Product[] {
  const order: Record<Tier, number> = { low: 0, mid: 1, high: 2 };
  return products.filter((p) => p.category === category).sort((a, b) => order[a.tier] - order[b.tier]);
}

/** Categories sold and published in a country. */
export function categoryIdsIn(market: Market): string[] {
  return categoryIds.filter((id) => marketsOf(categories[id]).includes(market));
}

export function publishedIn(category: string, market: Market): boolean {
  return marketsOf(categories[category]).includes(market);
}

/** A need as offered in one country: only the picks sold there, first choice first. */
export interface NeedIn {
  id: string;
  label: Need['label'];
  icon: string;
  picks: { product: Product; tag?: Need['picks'][number]['tag'] }[];
}

/** The needs a category offers in one country (a need with nothing sold there is left out). */
export function needsIn(category: string, market: Market): NeedIn[] {
  return categories[category].needs
    .map((n) => ({
      id: n.id,
      label: n.label,
      icon: n.icon,
      picks: n.picks
        .filter((p) => !p.markets || p.markets.includes(market))
        .map((p) => {
          const product = productById(p.id);
          if (!product) throw new Error(`Category "${category}", need "${n.id}" points to unknown product "${p.id}"`);
          return { product, tag: p.tag };
        }),
    }))
    .filter((n) => n.picks.length > 0);
}

/** Every product a category shows in one country, each once, in need order. */
export function lineup(category: string, market: Market): Product[] {
  const seen = new Map<string, Product>();
  for (const n of needsIn(category, market)) for (const p of n.picks) seen.set(p.product.id, p.product);
  return [...seen.values()];
}

/** A product's name as sold in the edition's country, in its language. */
export function productName(p: Product, ed: Edition): string {
  return p.nameIn?.[ed.market] ?? tx(p.name, ed.lang);
}

/** What to search for it on that country's Amazon. */
export function productSearch(p: Product, ed: Edition): string {
  return p.nameIn?.[ed.market] ?? tx(p.search, ed.lang);
}

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// Independent testers whose results the catalogues quote, by the host of the quoted page.
const testers: Record<string, { name: string; url: string }> = {
  'www.test.de': { name: 'Stiftung Warentest', url: 'https://www.test.de/' },
  'www.t-online.de': { name: 'Stiftung Warentest', url: 'https://www.test.de/' },
  'vacuumwars.com': { name: 'Vacuum Wars', url: 'https://vacuumwars.com/' },
  'www.thesmarthomehookup.com': { name: 'The Smart Home Hookup', url: 'https://www.thesmarthomehookup.com/' },
  'www.ocu.org': { name: 'OCU', url: 'https://www.ocu.org/' },
  // Newspapers and test aggregators that publish Stiftung Warentest grades in the open.
  'www.testbericht.de': { name: 'Stiftung Warentest', url: 'https://www.test.de/' },
  'www.heidelberg24.de': { name: 'Stiftung Warentest', url: 'https://www.test.de/' },
};

/** The independent tester behind a quoted result. */
export function testerOf(source: string): { name: string; url: string } {
  const tester = testers[new URL(source).host];
  if (!tester) throw new Error(`No tester name for ${source} (add it in src/lib/catalog.ts)`);
  return tester;
}

/** The independent testers quoted on the pages of one country, each once. */
export function testersCited(market: Market): { name: string; url: string }[] {
  const found = new Map<string, { name: string; url: string }>();
  for (const id of categoryIdsIn(market)) {
    for (const p of lineup(id, market)) {
      if (!p.lab) continue;
      const tester = testerOf(p.lab.source);
      found.set(tester.name, tester);
    }
  }
  return [...found.values()];
}

/**
 * The price lines of a category's budget question in one country: its own, or those of a quiz that
 * asks the budget before the type (CupVerdict), or nothing.
 */
export function budgetLines(category: string, market: Market): [number, number] | undefined {
  const currency = marketMeta[market].currency;
  return categories[category].budget?.[currency] ?? quizDef.budget?.[currency];
}

/** Which budget range a price falls in. */
export function tierOfPrice(category: string, market: Market, price: number): Tier | undefined {
  const b = budgetLines(category, market);
  if (!b) return undefined;
  return price <= b[0] ? 'low' : price <= b[1] ? 'mid' : 'high';
}

/**
 * A product's price range in one country: from its brand store price where the category has a
 * budget question (so "up to 600 €" never shows a 900 € robot), otherwise the range set by hand.
 */
export function tierIn(product: Product, market: Market): Tier {
  const price = product.price?.[market];
  return (price && tierOfPrice(product.category, market, price.value)) || product.tier;
}
