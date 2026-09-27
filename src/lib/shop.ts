import { currencyOf, numberLocale, type Edition } from '../i18n/editions';
import type { Locale } from '../i18n/locales';
import { marketMeta, type Market } from '../i18n/markets';
import type { Product } from './pack';
import { site } from '@site/config';
import { fill, t } from '../i18n/ui';

// Search links: no static prices on our side (Amazon's rule), and the tag is appended only once approved.
export function amazonSearchUrl(market: Market, query: string): string {
  const url = new URL(`https://${marketMeta[market].amazon}/s`);
  url.searchParams.set('k', query);
  const tag = site.amazonTags[market];
  if (tag) url.searchParams.set('tag', tag);
  return url.href;
}

export function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}

// Facts are stored with a dot decimal; every language but English reads a comma.
export function localDecimal(value: string, lang: Locale): string {
  return lang === 'en' ? value : value.replace(/(\d)\.(\d)/g, '$1,$2');
}

/** Price in the country's money, written the way the reader's language writes numbers, without zero cents. */
export function formatPrice(value: number, ed: Edition): string {
  const whole = Number.isInteger(value);
  return new Intl.NumberFormat(numberLocale(ed), {
    style: 'currency',
    currency: currencyOf(ed),
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(value);
}

/** Brand store link, through the brand's affiliate program when it approved us in this country. */
export function storeUrl(product: Product, market: Market, url: string): { href: string; sponsored: boolean } {
  return brandUrl(product.brand, market, url);
}

export function brandUrl(brand: string | undefined, market: Market, url: string): { href: string; sponsored: boolean } {
  // A brand's own program or another network (Impact...), where it approved us.
  const deep = brand ? site.deepLinks?.[brand]?.[market] : undefined;
  if (deep?.includes('{url}') && deep.startsWith('https://')) return { href: deep.replace('{url}', encodeURIComponent(url)), sponsored: true };
  const mid = brand ? site.awin?.merchants[brand]?.[market] : undefined;
  if (!mid || !site.awin) return { href: url, sponsored: false };
  const out = new URL('https://www.awin1.com/cread.php');
  out.searchParams.set('awinmid', String(mid));
  out.searchParams.set('awinaffid', site.awin.publisherId);
  out.searchParams.set('ued', url);
  return { href: out.href, sponsored: true };
}

/** The brand store's own price in this country, when the brand sells there directly. */
export function officialPrice(product: Product, ed: Edition) {
  const p = product.price?.[ed.market];
  return p && !p.soldOut ? { text: formatPrice(p.value, ed), source: p.source } : undefined;
}

export interface Offer {
  kind: 'amazon' | 'official' | 'amazon-search';
  shop: string;
  href: string;
  /** Opens this exact product (a search result page does not). */
  exact: boolean;
  sponsored: boolean;
}

/** Amazon product page, with the associate tag once the account is approved. */
export function amazonProductUrl(market: Market, asin: string): string {
  const url = new URL(`https://${marketMeta[market].amazon}/dp/${asin}`);
  const tag = site.amazonTags[market];
  if (tag) url.searchParams.set('tag', tag);
  return url.href;
}

/**
 * Where this product can be bought in one country, best first: its exact Amazon page, the brand's
 * own page, and only if neither exists an Amazon search (labelled as a search, never as the product).
 */
export function offersFor(product: Product, ed: Edition, searchText: string): Offer[] {
  const { market } = ed;
  const out: Offer[] = [];
  const asin = product.asin?.[market];
  if (asin) out.push({ kind: 'amazon', shop: 'Amazon', href: amazonProductUrl(market, asin), exact: true, sponsored: true });
  const price = product.price?.[market];
  const store = product.store?.[market] ?? (price && !price.soldOut ? price.source : undefined);
  if (store && product.brand) {
    const s = storeUrl(product, market, store);
    out.push({ kind: 'official', shop: product.brand, href: s.href, exact: true, sponsored: s.sponsored });
  }
  if (!asin) out.push({ kind: 'amazon-search', shop: 'Amazon', href: amazonSearchUrl(market, searchText), exact: false, sponsored: true });
  return out;
}

/** What the button says: the exact product on Amazon or on the brand's site, or a search. */
export function offerCta(kind: Offer['kind'], lang: Locale, shop: string): string {
  const v = t(lang).verdict;
  return kind === 'amazon' ? v.ctaAmazon : kind === 'official' ? fill(v.ctaStore, { brand: shop }) : v.ctaSearch;
}

/** Shorter label for the list of shops, where the product name is already written above. */
export function offerShopLabel(kind: Offer['kind'], lang: Locale, shop: string): string {
  const v = t(lang).verdict;
  return kind === 'official' ? fill(v.officialStore, { brand: shop }) : kind === 'amazon' ? 'Amazon' : v.ctaSearch;
}

/** Attributes for a link to an offer. */
export function offerAttrs(o: Offer) {
  return {
    href: o.href,
    rel: o.sponsored ? 'sponsored nofollow noopener' : 'nofollow noopener',
    'data-offer': o.kind,
  };
}
