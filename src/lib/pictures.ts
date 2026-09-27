// The picture next to every product. Each product we recommend has its own drawing, in the colours
// it is sold in (scripts/art/products-<site>.mjs); every other model on sale is drawn as its kind
// (a robot with its washing station, a capsule machine for Vertuo pods...) in the colour the store
// names, or in plain grey when the store names none (scripts/art/families.mjs). Photos replace a
// drawing only where their use is allowed (Product.image). `node scripts/make-images.mjs` draws them.
import drawn from '@site/drawings.json';
import type { Edition } from '../i18n/editions';
import { t } from '../i18n/ui';
import { productName } from './catalog';
import { tx, type Product, type StoreModel } from './pack';
import { pickOf } from './tests';

export interface Picture {
  src: string;
  /** Empty when the picture only repeats the name written next to it. */
  alt: string;
  /** A drawing of this exact product, as opposed to a drawing of its kind. */
  exact: boolean;
}

const has = new Set<string>(drawn.products);

/** A product we recommend: its photo where allowed, else our drawing of it. */
export function productPicture(p: Product, ed: Edition): Picture | undefined {
  if (p.image) return { src: p.image.src, alt: tx(p.image.alt, ed.lang), exact: true };
  if (!has.has(p.id)) return undefined;
  const name = productName(p, ed);
  return { src: `/img/p/${p.id}.svg`, alt: `${name} (${t(ed.lang).verdict.drawing})`, exact: true };
}

// Which kind of machine a model is, from the words of its name: only what the name says; a model
// whose name says nothing more is drawn as the plainest form of its type.
type Rule = [form: string, words: RegExp];
const KINDS: Record<string, { family: string; rules: Rule[]; plain: string }> = {
  robot: {
    family: 'robot',
    rules: [
      ['wash', /ultra|omni|station|qrevo|saros|freo|\bflow\b|master|complete|mobius|matrix|aqua10/i],
      ['empty', /\+|\bplus\b|auto.?empty|clean ?base/i],
    ],
    plain: 'none',
  },
  stick: { family: 'stick', rules: [['dock', /station|clean ?& ?empty|auto.?empty|\bhub\b|\bdock\b/i]], plain: 'plain' },
  wet: { family: 'wet', rules: [], plain: 'plain' },
  steam: { family: 'steam', rules: [], plain: 'plain' },
  dehum: {
    family: 'dehum',
    rules: [
      ['desiccant', /desiccant|essiccante|adsorb|zeolit|déshydratant|desecante|trockenmittel|\bdd\d/i],
      ['mini', /\b\d{3,4}\s?ml\b|\bmini\b/i],
    ],
    plain: 'box',
  },
  heat: {
    family: 'heat',
    rules: [
      ['oil', /olio|\boil\b|huile|aceite|\böl|olej|oljefylld|dragon|radiatore|radiator|radiador|radiateur/i],
      ['convector', /convett|convect|konvekt|pannello|panel/i],
    ],
    plain: 'fan',
  },
  purifier: { family: 'purifier', rules: [], plain: 'tower' },
  ac: { family: 'ac', rules: [], plain: 'portable' },
  capsule: {
    family: 'capsule',
    rules: [
      ['vertuo', /vertuo/i],
      ['pod', /dolce gusto|genio|piccolo|infinissima|mini ?me|\bedg\d/i],
    ],
    plain: 'original',
  },
  superautomatic: { family: 'superautomatic', rules: [['milk', /latte|milk|cappuccino|lattissima|carafe|kanne|mleko|mjölk/i]], plain: 'plain' },
  'manual-espresso': { family: 'manual-espresso', rules: [['grinder', /specialista|all-in-one|barista|grinder|mühle|macinacaff|młynk/i]], plain: 'plain' },
  moka: { family: 'moka', rules: [], plain: 'plain' },
  drip: { family: 'drip', rules: [['thermo', /therm|isot/i]], plain: 'glass' },
  grinder: { family: 'grinder', rules: [], plain: 'plain' },
};

const forms = drawn.forms as Record<string, string[]>;
const colours = new Set<string>(drawn.colours);

/**
 * A model from a store's list: our drawing when it is one of our picks, else its kind in its
 * colour. Decorative (empty alt): its name is written right next to it.
 */
export function modelPicture(category: string, m: StoreModel, ed: Edition): Picture | undefined {
  const pick = pickOf(category, ed.market, m);
  const own = pick && productPicture(pick, ed);
  if (own) return { ...own, alt: '' };
  const kind = KINDS[category];
  if (!kind || !forms[kind.family]) return undefined;
  const form = kind.rules.find(([, re]) => re.test(m.name))?.[0] ?? kind.plain;
  const colour = m.color && colours.has(m.color) ? m.color : 'plain';
  return { src: `/img/m/${kind.family}-${form}-${colour}.svg`, alt: '', exact: false };
}
