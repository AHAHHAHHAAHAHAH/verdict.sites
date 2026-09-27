import { tools } from '@site/tools';
import type { Edition } from './editions';
import { engineSlugs, type EngineKey } from './slugs';

// Tool pages exist only on sites that have calculators.
export const toolKeys: readonly string[] = tools?.keys ?? [];
export type ToolKey = string;
export type StaticKey = EngineKey | ToolKey;

// Localized slugs: every language gets addresses in its own words.
export const routes: Record<string, Partial<Record<string, string>>> = {
  ...engineSlugs,
  ...(tools?.routes ?? {}),
};

/**
 * Pages of their own in every edition. The categories, the deals and the guides get theirs from
 * the catalogue and the articles; "verdicts" and "offers" are only the words in those addresses.
 */
export const pageKeys: string[] = ['home', 'about', 'privacy', 'legal', ...(toolKeys.length ? ['tools', ...toolKeys] : [])];

function slug(key: StaticKey, ed: Edition): string {
  const s = routes[key]?.[ed.lang];
  if (s === undefined) throw new Error(`No "${ed.lang}" slug for page "${key}"`);
  return s;
}

export function pathFor(key: StaticKey, ed: Edition): string {
  const s = slug(key, ed);
  return s ? `/${ed.key}/${s}/` : `/${ed.key}/`;
}

export function articlePath(ed: Edition, articleSlug: string): string {
  return `/${ed.key}/${slug('guides', ed)}/${articleSlug}/`;
}

export function verdictPath(ed: Edition, categorySlug: string): string {
  return `/${ed.key}/${slug('verdicts', ed)}/${categorySlug}/`;
}

export function offersPath(ed: Edition, categorySlug: string): string {
  return `/${ed.key}/${slug('offers', ed)}/${categorySlug}/`;
}
