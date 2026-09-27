// The contract every site pack (src/sites/<site>/) fulfils. The engine only talks to these shapes.
import type { Locale, T } from '../i18n/all-locales';
import { allLocales } from '../i18n/all-locales';
import type { Currency, Market, PerMarket } from '../i18n/markets';

export type { Locale, T, Currency, Market, PerMarket };
export type PerLang<V> = Partial<Record<Locale, V>>;

export interface SiteConfig {
  key: 'cup' | 'floor' | 'clima';
  name: string;
  domain: string;
  url: string;
  /**
   * The countries the site covers, the first one first everywhere (and the default for search
   * engines). Each is published in its own language and, with `english`, in English too.
   */
  markets: readonly [Market, ...Market[]];
  /** Also publish every country in English, for visitors who do not read its language. */
  english: boolean;
  /**
   * Whether the English pages are shown to search engines too. Off where English searches belong
   * to laboratories that test every model by hand (robot vacuums: RTINGS, Vacuum Wars, Consumer
   * Reports): there the English pages stay for visitors who choose them.
   */
  englishIndexed: boolean;
  /** Flip to true only once an Amazon Associates account is approved: the disclosure is a factual claim. */
  amazonAssociate: boolean;
  /** Associate tracking IDs per Amazon store, added once each program approves the account. */
  amazonTags: PerMarket<string>;
  themeColor: string;
  /** Calculator linked from the bottom of every verdict page, if the site has one. */
  verdictTool?: string;
  /**
   * Revenue and measurement switches, all off until the accounts exist (see LANCIO.md).
   * awin: brand store links go through Awin where the brand runs a program in that market.
   * adsense: at most two hand-placed slots, never above the verdict or inside the quiz.
   * analytics: Cloudflare Web Analytics, cookieless.
   */
  awin?: { publisherId: string; merchants: Record<string, PerMarket<number>> };
  /**
   * Any other network's deep link per brand and country (Impact, a brand's own program): the
   * address with {url} where the product page goes, e.g. "https://roborock.pxf.io/c/1/2/3?u={url}".
   */
  deepLinks?: Record<string, PerMarket<string>>;
  adsense?: { client: string; slots: { afterFaq?: string; guide?: string } };
  analytics?: { cloudflareToken: string };
  /**
   * Count the clicks from each page to each store (src/scripts/clicks.ts → functions/api/out.js):
   * the number only, nothing about who clicks. The privacy page must say so before it is turned on.
   */
  clickCount?: boolean;
}

export type Tier = 'low' | 'mid' | 'high';

/**
 * What Google shows for a page, and the words people find it by (checked after every build by
 * scripts/check-seo.mjs). The keyphrase comes from the Keyword Planner data: it is in the address,
 * at the start of the title, in the description and in the first paragraph.
 */
export interface Seo {
  keyphrase: string;
  /** At most about 580px of 20px Arial (≈55-60 characters). {month} and {year} are filled in. */
  title: string;
  /** 120-156 characters. */
  description: string;
}

export interface Category {
  id: string;
  icon: string;
  slug: T;
  name: T;
  /** The page heading (H1), with the keyphrase. */
  title: T;
  /** The first sentence under the heading, with the keyphrase. */
  line: T;
  seo: PerLang<Seo>;
  /**
   * Section headings that name the product in natural words, so a reader (and Google) always knows
   * what each part is about: over the situations, over the other good picks of a situation, over
   * "right for you if" and "skip it if", over how to choose, over the questions.
   */
  heads: { choose: T; others: T; good: T; skip: T; how: T; faq: T };
  goodIf: PerLang<string[]>;
  skipIf: PerLang<string[]>;
  criteria: PerLang<{ t: string; d: string }[]>;
  /** The situations a visitor can pick from, the most common first (shown when nothing is chosen). */
  needs: Need[];
  /** Countries where this type is sold and published (default: all the site's countries). */
  markets?: Market[];
  /** Fact keys shown side by side in the comparison table. */
  compare?: string[];
  /**
   * Where "how much do you want to spend?" draws its lines, per currency: [top of the lowest
   * range, top of the middle one]. With it, the quiz asks the budget for this category, the deals
   * page filters by it, and a pick's range follows its real price in each market.
   */
  budget?: Partial<Record<Currency, [number, number]>>;
  faq?: PerLang<{ q: string; a: string }[]>;
  related?: string[];
}

/**
 * A situation a visitor recognises at a glance ("For the bathroom", "Spend less"), with the
 * products we pick for it: our first choice first, then the others with a few words on why each
 * is there ("Costs less"). A pick is only offered in the markets where it is sold.
 */
export interface Need {
  id: string;
  /** A short plain statement, never a question. */
  label: T;
  icon: string;
  picks: { id: string; tag?: T; markets?: Market[] }[];
}

// Rule: every fact carries the URL it was read from. No fact without a source.
export interface Fact {
  key: string;
  value: string | T;
  source: string;
}

/** A price read on the brand's own store (full price, not a promotion), with the page it came from. */
export interface Price {
  value: number;
  source: string;
  /** The brand store shows it as sold out: no price and no link to the store until the weekly check finds it again. */
  soldOut?: boolean;
}

export interface Product {
  id: string;
  category: string;
  tier: Tier;
  name: T;
  why: T;
  facts: Fact[];
  search: T;
  /**
   * The name in the countries where the brand sells it under another one (Breville in the US, Sage
   * in Europe): there it replaces `name` and `search` in every language.
   */
  nameIn?: PerMarket<string>;
  /**
   * The maker's product codes without the colour (EN510 for the Lattissima One): how the brand
   * stores that sell it under a code are matched to it.
   */
  codes?: string[];
  brand?: string;
  /** Official price per country; missing where the brand has no store of its own. */
  price?: PerMarket<Price>;
  /** Result of an independent test that buys its products, quoted with its source. */
  lab?: { text: T; source: string };
  /** Amazon product ID per country's Amazon, only where a public listing confirms it (IDs differ between stores). */
  asin?: PerMarket<string>;
  /** The brand's own product page per country, when there is no store price to take it from. */
  store?: PerMarket<string>;
  /**
   * Product photo, only from a source that allows its use (brand press kit with editorial use,
   * Amazon's or an affiliate network's licensed images). `source` is where the permission is stated.
   */
  image?: { src: string; alt: T; credit: string; source: string };
}

export interface Catalog {
  checked: string;
  categoryIds: readonly string[];
  categories: Record<string, Category>;
  products: Product[];
  factLabels: Record<string, T>;
  /** Plain-words explanation of each fact, for visitors who are not experts. */
  factHelp?: Record<string, T>;
}

export interface QuizOption {
  value: string;
  /** Missing only on a budget answer, whose words come from the country's money. */
  label?: T;
  /**
   * A budget answer: its range is written in each country's currency ("Up to 600 €"), from the
   * category's lines, or from the quiz's own lines when the type is not chosen yet.
   */
  budget?: { tier: Tier; category?: string };
  icon?: string;
  /** Dots shown on "stack" options (e.g. budget level 1-3). */
  level?: number;
  /** Countries that show this option (default: all). */
  markets?: Market[];
  /** Overrides the step's next step; null ends the quiz. */
  next?: string | null;
}

export interface QuizStep {
  id: string;
  title: T;
  layout: 'grid' | 'stack';
  /** Step shown after this one; null or missing ends the quiz. */
  next?: string | null;
  options: QuizOption[];
}

export interface QuizDef {
  steps: QuizStep[];
  /** Answers joined with "|" in the order given → [category id, need id]. */
  results: Record<string, [string, string]>;
  /** Lines of a budget question asked before the type is known, per currency. */
  budget?: Partial<Record<Currency, [number, number]>>;
  /** Passes one answer on to the verdict page as a URL parameter (e.g. the budget), from the first of these steps answered. */
  carry?: { step: string | string[]; param: string };
}

export interface ToolStrings {
  indexTitle: string;
  indexDescription: string;
  groupHome: string;
  groupBusiness: string;
  tagHome: string;
  tagBusiness: string;
  open: string;
  example: string;
  currency: string;
  result: string;
  names: Record<string, string>;
  short: Record<string, string>;
  blurbs: Record<string, string>;
  outputs: Record<string, string>;
  next: Record<string, string>;
}

/** Copy that differs per site; everything generic lives in the engine (src/i18n/ui.ts). */
export interface SiteStrings {
  tagline: string;
  nav: { find: string };
  quiz: { title: string; sub: string };
  home: {
    metaDescription: string;
    pickDirect: string;
    toolsStrip?: string;
    allTools?: string;
    sectionTools?: string;
    /** The site name is the home page's keyphrase: it is what people type to find it again. */
    seo: Seo;
    /** How the site chooses, in three short points under the quiz, with the testers it quotes. */
    how: { title: string; image: string; points: { t: string; d: string }[]; tests: string; more: string };
    /** Questions people ask before they know which appliance they need, each ending on its category. */
    faq?: { q: string; a: string; cat: string }[];
  };
  verdict: { indexDescription: string; findMachine: string; calc?: string; forMost?: string };
  footer: { line: string };
  /** The About page: what the site helps choose ("stufe elettriche, deumidificatori…") and its description (120-156 characters, with the page's keyphrase). */
  about: { what: string; description: string };
  guides: { indexDescription: string };
  tools?: ToolStrings;
}

export interface ToolMeta {
  audience: 'home' | 'business';
  icon: string;
}

export interface ToolsPack {
  keys: readonly string[];
  routes: Record<string, T>;
  meta: Record<string, ToolMeta>;
}

/** Throws at build time when a text is missing in a published language. */
export function tx(value: T | undefined, lang: Locale): string {
  const s = value?.[lang];
  if (s === undefined) throw new Error(`Missing "${lang}" text: ${JSON.stringify(value)}`);
  return s;
}

const localeSet = new Set<string>(allLocales);

/**
 * Walks a pack value and checks that every per-language object (T, PerLang) has all published
 * languages. Called once per build, so a missing translation fails the build instead of shipping.
 */
export function assertComplete(value: unknown, langs: readonly Locale[], path: string): void {
  if (Array.isArray(value)) {
    value.forEach((v, i) => assertComplete(v, langs, `${path}[${i}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;
  const keys = Object.keys(value);
  const isPerLang = keys.length > 0 && keys.every((k) => localeSet.has(k));
  if (isPerLang) {
    const missing = langs.filter((l) => !(l in (value as object)));
    if (missing.length) throw new Error(`${path}: missing ${missing.join(', ')}`);
    return;
  }
  for (const k of keys) assertComplete((value as Record<string, unknown>)[k], langs, `${path}.${k}`);
}

/**
 * A brand store that publishes its catalogue with prices (a Shopify products.json), read every
 * morning by scripts/fetch-stores.mjs for the "all models" lists and the deals pages. Only the
 * brand's own store: the price and the crossed-out price are the ones the store itself shows.
 */
export interface StoreSource {
  store: string;
  /**
   * How the store publishes its catalogue: Shopify's products.json (default, the store's address
   * per country), or a sitemap of product pages carrying schema.org prices (its first file per country).
   */
  kind?: 'shopify' | 'sitemap';
  /**
   * How the store names products: a model name after the brand (default), a description
   * ("title"), or a description ending with the model ("tail": "... Rivelia EXAM440.55.BG").
   */
  name?: 'model' | 'title' | 'tail';
  /** The store's address (or sitemap) in each country, without the trailing slash. */
  markets: PerMarket<string>;
  /** Which products go in which category: by the store's product type, its tags, or words in the name and address. */
  rules: { cat: string; types?: string[]; tags?: string[]; words?: RegExp }[];
  /** Products of this store never listed (accessories, heated cushions...), on top of the common exclusions. */
  exclude?: RegExp;
  /** Sitemap stores: only product addresses matching this (machines, not their spare parts). */
  only?: RegExp;
}

/**
 * One model on sale in one country, as its brand store shows it today: the lowest price among its
 * colours and bundles, and the crossed-out price when the store shows one (at least 5% higher).
 */
export interface StoreModel {
  cat: string;
  market: Market;
  store: string;
  /** The model's name as the brand writes it, without colour or bundle words. */
  name: string;
  /** The product page of the offer with that price. */
  url: string;
  price: number;
  was?: number;
  /** Figures the brand states in its own description, only when they can be read without doubt. */
  specs?: { pa?: number; aw?: number };
  /**
   * The colour of the linked offer, as the store names it (or black or white beyond doubt in its
   * picture): for the drawing next to it (src/lib/pictures.ts).
   */
  color?: string;
  /** The store's picture of the offer: only to read its colour once, never shown. */
  img?: string;
  /** Country, store and model, colours joined: its price history (prices.json) and its page. */
  key?: string;
  /** When the price was read (ISO time). */
  seen: string;
}

export interface ModelsFile {
  checkedAt: string;
  models: StoreModel[];
}

/**
 * A model's result in an independent test that buys its products (each with the page it comes from), shown
 * next to it wherever the stores list it: in "every model on sale" and, when the tester's award
 * answers one of our situations, with that situation's picks.
 */
export interface TestResult {
  cat: string;
  /** The model as the brand stores name it; colours and bundles of it match too. */
  name: string;
  tester: string;
  /** The page the result is read from. */
  source: string;
  /** When the tester published it (YYYY-MM). */
  date: string;
  /** Its place in the tester's ranking: [place, out of]. */
  rank?: [number, number];
  /** The tester's award, in its own words' meaning. */
  award?: 'overall' | 'value' | 'budget' | 'pets' | 'flagship' | 'recommended';
  /** The tester's grade, per language ("buono (2,3)"). */
  grade?: T;
  /** Our situation the award answers ("save" for a budget award); the top places answer "main". */
  need?: string;
}
