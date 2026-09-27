// A page for every model on sale in the brands' own stores we read, in each country's indexed
// languages: today's price, its history since we started reading it, the independent tests, where it
// stands among the others, our pick for comparison and alternatives. People search a model by its
// name far more than a type ("delonghi magnifica s", "nespresso vertuo", "pinguino de longhi").
// Search engines are shown only the pages that say something the brand's own page does not
// (`evidence`): a page per model that only repeats the store's price is what Google calls scaled
// content, and would weigh on the whole site. The others stay for visitors, out of search.
import { editions, type Edition } from '../i18n/editions';
import { routes } from '../i18n/routes';
import { marketMeta, type Market } from '../i18n/markets';
import { categoryIdsIn } from './catalog';
import { modelsFor } from './models';
import { tx, type StoreModel } from './pack';
import { historyOf } from './history';
import { pickOf, testsFor } from './tests';
import { content } from './seo-measure';

export interface ModelPage {
  category: string;
  model: StoreModel;
  /** The name shown: ours for one of our picks (a store may list it by its code), else the store's. */
  name: string;
  /** The address's last part, the same in every language of a country. */
  slug: string;
  /** The words the page is found by: the name's first four words that count. */
  keyphrase: string;
  /** Another page of the country already has this keyphrase: this one stays out of search engines. */
  duplicate: boolean;
  /**
   * Something the brand's own page does not show: an independent test, our pick, or a price that
   * has moved since we started reading it. Once true it stays true (tests, picks and history only grow).
   */
  evidence: boolean;
}

/** Whether search engines are shown the page (its title and description must also fit). */
export const indexable = (p: ModelPage) => p.evidence && !p.duplicate;

const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    // Split where the words are read apart: De'Longhi → de-longhi, ECAM22.110.B → ecam22-110-b.
    .replace(/['’]/g, ' ')
    .replace(/\+/g, ' plus ')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** A model is searched by its full name: the keyphrase is the name, up to six words that count. */
export const MODEL_KEYPHRASE_WORDS = 6;
function keyphraseOf(name: string): string {
  const parts = name.split(' ');
  let out = parts[0];
  for (const w of parts.slice(1)) {
    const next = `${out} ${w}`;
    if (content(next).length > MODEL_KEYPHRASE_WORDS) break;
    out = next;
  }
  return out;
}

const cache = new Map<Market, ModelPage[]>();

/** Every model page of a country, one per model (colours joined), the cheapest offer of each. */
export function modelPagesIn(market: Market): ModelPage[] {
  const hit = cache.get(market);
  if (hit) return hit;
  const pages: ModelPage[] = [];
  const slugs = new Set<string>();
  for (const category of categoryIdsIn(market)) {
    const best = new Map<string, StoreModel>();
    for (const m of modelsFor(category, market)) {
      const k = m.key ?? `${m.market}|${m.store}|${m.name}`;
      const had = best.get(k);
      if (!had || m.price < had.price) best.set(k, m);
    }
    for (const model of best.values()) {
      const pick = pickOf(category, market, model);
      const name = pick ? (pick.nameIn?.[market] ?? tx(pick.name, marketMeta[market].lang)) : model.name;
      let slug = slugify(name);
      for (let i = 2; slugs.has(slug); i++) slug = `${slugify(name)}-${i}`;
      slugs.add(slug);
      const keyphrase = keyphraseOf(name);
      const tested = testsFor(category, model.name).length > 0 || (pick ? testsFor(category, name).length > 0 : false);
      const evidence = Boolean(pick) || tested || (historyOf(model.key)?.points.length ?? 0) >= 2;
      pages.push({ category, model, name, slug, keyphrase, duplicate: false, evidence });
    }
  }
  // Pages sharing their words: the first with evidence keeps them, else the first one.
  const owner = new Map<string, ModelPage>();
  for (const p of [...pages.filter((x) => x.evidence), ...pages.filter((x) => !x.evidence)]) {
    const phrase = content(p.keyphrase).join(' ');
    if (owner.has(phrase)) p.duplicate = true;
    else owner.set(phrase, p);
  }
  cache.set(market, pages);
  return pages;
}

/** The editions that get model pages: each country's indexed languages. */
export const modelEditions = (): Edition[] => editions.filter((e) => e.indexed);

export function modelPath(ed: Edition, slug: string): string {
  return `/${ed.key}/${routes.models[ed.lang]}/${slug}/`;
}

/** The page of a store's model in this edition, when it has one. */
export function modelPageOf(ed: Edition, m: StoreModel): string | undefined {
  if (!ed.indexed) return undefined;
  const page = modelPagesIn(ed.market).find((p) => p.model.key === m.key && p.category === m.cat);
  return page ? modelPath(ed, page.slug) : undefined;
}

/** The same model in the other indexed editions (the same store and model, any country), where search engines are shown it. */
export function modelTwins(page: ModelPage): { ed: Edition; href: string }[] {
  const id = (m: StoreModel) => (m.key ?? '').split('|').slice(1).join('|');
  const out: { ed: Edition; href: string }[] = [];
  for (const ed of modelEditions()) {
    const twin = modelPagesIn(ed.market).find((p) => id(p.model) === id(page.model) && p.category === page.category);
    if (twin && (twin === page || indexable(twin))) out.push({ ed, href: modelPath(ed, twin.slug) });
  }
  return out;
}
