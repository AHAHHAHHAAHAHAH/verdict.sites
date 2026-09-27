// An edition is one language read in one country: "it-it" (Italian, Italy), "pl-it" (Polish,
// Italy). The country decides what is sold, at what price and where; the language only decides the
// words. Every language of a site can be read in every one of its countries, so anyone can look at
// what is sold in any country in the language they read best. Search engines are shown the
// country's own language and, where the site indexes it, English (`indexed`): the other pairs are
// for visitors who choose them, not pages to be found by.
import { site } from '@site/config';
import type { Locale } from './all-locales';
import { marketMeta, type Currency, type Market } from './markets';

export interface Edition {
  /** Address prefix and id: language, then country ("it-it", "en-se"). */
  key: string;
  lang: Locale;
  market: Market;
  /** The country's own language or English: listed for search engines (hreflang, sitemap). */
  indexed: boolean;
}

export const markets: readonly Market[] = site.markets;

/** The languages the site is written in: each country's own, in the order of the countries, then English. */
export const languages: readonly Locale[] = [...new Set<Locale>([...markets.map((m) => marketMeta[m].lang), ...(site.english ? (['en'] as Locale[]) : [])])];

/** Whether a language is one of a country's indexed ones: its own, or English where the site indexes it. */
export const isIndexed = (lang: Locale, market: Market) => lang === marketMeta[market].lang || (lang === 'en' && site.englishIndexed);

// Each country's own language first, then English, then the others.
const order = (lang: Locale, market: Market) => (lang === marketMeta[market].lang ? 0 : lang === 'en' ? 1 : 2);
export const editions: readonly Edition[] = markets.flatMap((market) =>
  [...languages]
    .sort((a, b) => order(a, market) - order(b, market))
    .map((lang) => ({ key: `${lang}-${market}`, lang, market, indexed: isIndexed(lang, market) })),
);

/** The first country in its own language: where search engines send visitors of no known language. */
export const defaultEdition: Edition = editions[0];

export function editionOf(key: string): Edition | undefined {
  return editions.find((e) => e.key === key);
}

export function edition(lang: Locale, market: Market): Edition | undefined {
  return editions.find((e) => e.lang === lang && e.market === market);
}

/** The languages a country's pages are written in. */
export function langsIn(market: Market): Locale[] {
  return editions.filter((e) => e.market === market).map((e) => e.lang);
}

/** The languages a text needs when it is shown in these countries. */
export function langsFor(ms: readonly Market[]): Locale[] {
  return languages.filter((l) => editions.some((e) => e.lang === l && ms.includes(e.market)));
}

const region = (ed: Edition) => marketMeta[ed.market].region;
/** "it-IT", "en-SE": for hreflang and number formatting. */
export const tag = (ed: Edition) => `${ed.lang}-${region(ed)}`;
export const ogLocale = (ed: Edition) => `${ed.lang}_${region(ed)}`;
/**
 * How numbers, money and dates are written: the reader's language with the country's conventions
 * ("3799 zł" in Polish), and English as written in Europe outside the US and the UK ("3,799 zł").
 */
export const numberLocale = (ed: Edition) => (ed.lang !== 'en' ? tag(ed) : ed.market === 'us' ? 'en-US' : ed.market === 'gb' ? 'en-GB' : 'en-150');
export const currencyOf = (ed: Edition): Currency => marketMeta[ed.market].currency;
