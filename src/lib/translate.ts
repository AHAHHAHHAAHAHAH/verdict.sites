// Adds languages to a pack: every per-language value (T, PerLang lists, criteria, FAQ) gets the new
// languages from a dictionary keyed by the text of a source language (English unless told). Values that
// are the same in every existing language (brand and model names) are copied as they are.
// A text missing from the dictionary is left missing, so the build's completeness check fails
// on it instead of shipping English on a Polish page.
import { allLocales, type Locale } from '../i18n/all-locales';

const localeSet = new Set<string>(allLocales);
// Shop data is per market, never derived from another language: an Amazon ID confirmed in one
// country says nothing about another.
const perMarket = new Set(['asin', 'store', 'price', 'nameIn']);
type Dict = Partial<Record<Locale, Record<string, string>>>;

function convert(value: unknown, dict: Record<string, string>): unknown {
  if (typeof value === 'string') return dict[value];
  if (Array.isArray(value)) {
    const out = value.map((v) => convert(v, dict));
    return out.some((v) => v === undefined) ? undefined : out;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const c = convert(v, dict);
      if (c === undefined) return undefined;
      out[k] = c;
    }
    return out;
  }
  return value;
}

export function addLanguages<V>(value: V, dict: Dict, langs: readonly Locale[] = [], from: Locale = 'en'): V {
  const targets = (langs.length ? langs : (Object.keys(dict) as Locale[])).filter((l) => dict[l]);
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk);
    if (!v || typeof v !== 'object') return v;
    const keys = Object.keys(v);
    const record = v as Record<string, unknown>;
    if (keys.length && keys.every((k) => localeSet.has(k)) && from in record) {
      const values = Object.values(record).map((x) => JSON.stringify(x));
      const same = values.every((x) => x === values[0]);
      const out: Record<string, unknown> = { ...record };
      for (const l of targets) {
        if (l in out) continue;
        const c = same ? record[from] : convert(record[from], dict[l]!);
        if (c !== undefined) out[l] = c;
      }
      return out;
    }
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(record)) out[k] = perMarket.has(k) ? x : walk(x);
    return out;
  };
  return walk(value) as V;
}
