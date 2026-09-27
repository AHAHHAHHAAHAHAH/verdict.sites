// A page per brand whose own store we read, in each country's indexed languages: every model of
// the brand on sale there, by type, with today's prices, the discounts, the tested ones and our
// picks. It answers "roborock prezzi", "dreame robot" and leads to each model's own page.
import type { Edition } from '../i18n/editions';
import { routes } from '../i18n/routes';
import type { Market } from '../i18n/markets';
import { categoryIdsIn } from './catalog';
import { modelPagesIn, type ModelPage } from './modelpages';

export interface BrandPage {
  brand: string;
  slug: string;
  /** The brand's model pages here, by type (the order of the site's types). */
  byCategory: { category: string; pages: ModelPage[] }[];
  count: number;
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const cache = new Map<Market, BrandPage[]>();

/** The brands with at least three models on sale in a country. */
export function brandPagesIn(market: Market): BrandPage[] {
  const hit = cache.get(market);
  if (hit) return hit;
  const pages = modelPagesIn(market);
  const brands = [...new Set(pages.map((p) => p.model.store))];
  const out = brands
    .map((brand) => {
      const own = pages.filter((p) => p.model.store === brand);
      const byCategory = categoryIdsIn(market)
        .map((category) => ({ category, pages: own.filter((p) => p.category === category).sort((a, b) => a.model.price - b.model.price) }))
        .filter((g) => g.pages.length);
      return { brand, slug: slugify(brand), byCategory, count: own.length };
    })
    .filter((b) => b.count >= 3)
    .sort((a, b) => b.count - a.count);
  cache.set(market, out);
  return out;
}

export function brandPath(ed: Edition, slug: string): string {
  return `/${ed.key}/${routes.brands[ed.lang]}/${slug}/`;
}

/** The brand's page in this edition, when it has one. */
export function brandPageOf(ed: Edition, brand: string): string | undefined {
  if (!ed.indexed) return undefined;
  const page = brandPagesIn(ed.market).find((b) => b.brand === brand);
  return page ? brandPath(ed, page.slug) : undefined;
}
