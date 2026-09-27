// Where a visitor shops, apart from the language they read: the country decides which products
// are sold, at what price, in which money and in which shops; the language only decides the words.
// Pure data (no site imports), so configs and scripts can use it too.
import type { Locale } from './all-locales';

export const allMarkets = ['us', 'gb', 'it', 'de', 'fr', 'es', 'pl', 'se'] as const;
export type Market = (typeof allMarkets)[number];
export type Currency = 'USD' | 'GBP' | 'EUR' | 'PLN' | 'SEK';
export type PerMarket<V> = Partial<Record<Market, V>>;

export const marketMeta: Record<Market, { region: string; lang: Locale; currency: Currency; amazon: string; timeZones: string[] }> = {
  us: { region: 'US', lang: 'en', currency: 'USD', amazon: 'www.amazon.com', timeZones: [] },
  gb: { region: 'GB', lang: 'en', currency: 'GBP', amazon: 'www.amazon.co.uk', timeZones: ['Europe/London'] },
  it: { region: 'IT', lang: 'it', currency: 'EUR', amazon: 'www.amazon.it', timeZones: ['Europe/Rome'] },
  de: { region: 'DE', lang: 'de', currency: 'EUR', amazon: 'www.amazon.de', timeZones: ['Europe/Berlin'] },
  fr: { region: 'FR', lang: 'fr', currency: 'EUR', amazon: 'www.amazon.fr', timeZones: ['Europe/Paris'] },
  es: { region: 'ES', lang: 'es', currency: 'EUR', amazon: 'www.amazon.es', timeZones: ['Europe/Madrid', 'Atlantic/Canary'] },
  pl: { region: 'PL', lang: 'pl', currency: 'PLN', amazon: 'www.amazon.pl', timeZones: ['Europe/Warsaw'] },
  se: { region: 'SE', lang: 'sv', currency: 'SEK', amazon: 'www.amazon.se', timeZones: ['Europe/Stockholm'] },
};

const marketSet = new Set<string>(allMarkets);
export const isMarket = (value: string): value is Market => marketSet.has(value);

/** The country's name in a language ("Svezia", "Sweden"), from the ICU data built into Node. */
export function countryName(market: Market, lang: Locale): string {
  return new Intl.DisplayNames([lang], { type: 'region' }).of(marketMeta[market].region) ?? marketMeta[market].region;
}

// Polish puts a country after "w" in the locative case, which ICU does not give.
const polishIn: Record<Market, string> = {
  us: 'w Stanach Zjednoczonych',
  gb: 'w Wielkiej Brytanii',
  it: 'we Włoszech',
  de: 'w Niemczech',
  fr: 'we Francji',
  es: 'w Hiszpanii',
  pl: 'w Polsce',
  se: 'w Szwecji',
};

/** "in Italy", "in the United States", "w Polsce", "en France": where something is sold. */
export function countryIn(market: Market, lang: Locale): string {
  const name = countryName(market, lang);
  switch (lang) {
    case 'en':
      return `in ${market === 'us' || market === 'gb' ? 'the ' : ''}${name}`;
    case 'pl':
      return polishIn[market];
    case 'fr':
      return market === 'us' ? 'aux États-Unis' : market === 'gb' ? 'au Royaume-Uni' : `en ${name}`;
    case 'es':
      return `en ${name}`;
    case 'sv':
      return `i ${name}`;
    case 'it':
      return market === 'us' ? 'negli Stati Uniti' : market === 'gb' ? 'nel Regno Unito' : `in ${name}`;
    case 'de':
      return market === 'us' ? 'in den USA' : market === 'gb' ? 'im Vereinigten Königreich' : `in ${name}`;
    default:
      return `in ${name}`;
  }
}
