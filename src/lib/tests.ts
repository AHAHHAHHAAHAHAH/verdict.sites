// Independent test results (src/sites/<site>/tests.ts), found by name in the stores' lists: the
// same model in any colour or bundle, or the same product code in any colour.
import { tests } from '@site/tests';
import { fill, t } from '../i18n/ui';
import type { Locale } from '../i18n/locales';
import type { Market } from '../i18n/markets';
import type { Product, StoreModel, TestResult } from './pack';
import { lineup } from './catalog';
import { modelsFor, ourPick } from './models';
import { tx } from './pack';

const COLOURS = /(?<!\p{L})(nero|bianco|grigio|argento|noir|blanc|gris|argent|negro|blanco|plata|schwarz|weiß|weiss|grau|silber|czarny|biały|szary|srebrny|svart|vit|grå|silver|black|white|grey|gray)(?!\p{L})/giu;
const BUNDLE = /(?<!\p{L})(set|bundle|kit|care kit|combo|pack|complete|edition|early perks|promo)(?!\p{L})/giu;
const SKU = /^\p{Lu}{1,5}\d[\p{Lu}\d.]*$/u;
// De'Longhi's colour letters written straight after the code, with no dot (EN510BCA, KF1500BK).
const GLUED = /(\d{3})(?:B|W|BK|BCA|WCA|BL|R|M|PK|WI|MB|BG|GY|S|SB|T|TB)$/u;

/** The same key the store reader joins colours and bundles by (scripts/store-names.mjs). */
export function modelKey(name: string): string {
  const sku = name.split(' ').find((w) => SKU.test(w) && (w.includes('.') || /\d{3}/.test(w)));
  if (sku) return sku.replace(/\.\p{Lu}{1,4}$/u, '').replace(/(EUT?|UKT?)\p{Lu}{1,3}$/u, '$1').replace(GLUED, '$1').toLowerCase();
  return name.replace(BUNDLE, '').replace(COLOURS, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
}

/** Every result for a model of this type, the most recent first. */
export function testsFor(category: string, name: string): TestResult[] {
  const key = modelKey(name);
  return tests.filter((x) => x.cat === category && modelKey(x.name) === key).sort((a, b) => b.date.localeCompare(a.date));
}

// Where each tester is from: a name like "Which?" or "Saldo" means nothing to a reader who has never
// heard of it, the country says what kind of source it is.
const testerRegion: Record<string, string> = {
  'Which?': 'GB',
  Saldo: 'CH',
  'Stiftung Warentest': 'DE',
  'Test-Achats': 'BE',
  'The Hook Up': 'US',
  'Vacuum Wars': 'US',
};

/** "Vacuum Wars (Stati Uniti): 2° su 20", "Which? (Regno Unito): consigliato", "Saldo (Svizzera): «buono»". */
export function testBadge(x: TestResult, lang: Locale): string {
  const s = t(lang).tests;
  const region = testerRegion[x.tester];
  const tester = region ? `${x.tester} (${new Intl.DisplayNames([lang], { type: 'region' }).of(region)})` : x.tester;
  const parts = [
    x.rank ? fill(s.rank, { t: tester, r: String(x.rank[0]), n: String(x.rank[1]) }) : tester,
    ...(x.grade ? [tx(x.grade, lang)] : []),
    ...(x.award ? [s[x.award]] : []),
  ];
  return x.rank ? parts.join(', ') : `${parts[0]}: ${parts.slice(1).join(', ')}`;
}

/**
 * Our own pick behind a store's model: the same page, the maker's code of the pick in its name, or
 * the same model in another colour or product-code variant (the code closing the brand's address,
 * …/EXAM440.55.BG.html).
 */
export function pickOf(category: string, market: Market, model: StoreModel): Product | undefined {
  const direct = ourPick(model);
  if (direct) return direct.category === category ? direct : undefined;
  const key = modelKey(model.name);
  // The maker's code at the start of one of the name's words: "EN510" in "EN510.W" or "EN510BCA".
  const words = model.name.toUpperCase().split(/\s+/);
  const hasCode = (code: string) => words.some((w) => w.startsWith(code.toUpperCase()) && !/\d/.test(w.charAt(code.length)));
  return lineup(category, market).find((p) =>
    (p.codes ?? []).some(hasCode) ||
    [
      ...[...Object.values(p.name), ...Object.values(p.nameIn ?? {})].map((n) => modelKey(n ?? '')),
      ...[...Object.values(p.price ?? {}).map((x) => x?.source), ...Object.values(p.store ?? {})]
        .filter((u): u is string => Boolean(u))
        .map((u) => modelKey(decodeURIComponent(new URL(u).pathname.split('/').pop() ?? '').replace(/\.html?$/, '').replace(/\+EX:\d$/i, '').toUpperCase())),
    ].includes(key),
  );
}

/**
 * The store models of a situation's tested alternatives in one country: those whose tester's
 * award or high place answers it, never one of our own picks, best place first; for a situation
 * about spending less, never dearer than its pick.
 */
export function testedFor(category: string, market: Market, need: string, maxPrice?: number): { model: StoreModel; test: TestResult }[] {
  const out = new Map<string, { model: StoreModel; test: TestResult }>();
  for (const model of modelsFor(category, market)) {
    if (pickOf(category, market, model) || (maxPrice !== undefined && model.price > maxPrice)) continue;
    const found = testsFor(category, model.name).find((x) => x.need === need);
    if (found && !out.has(modelKey(model.name))) out.set(modelKey(model.name), { model, test: found });
  }
  return [...out.values()].sort((a, b) => (a.test.rank?.[0] ?? 99) - (b.test.rank?.[0] ?? 99) || a.model.price - b.model.price);
}
