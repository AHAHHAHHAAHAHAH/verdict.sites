// How a store's product becomes a model on our lists: its name without descriptions, colours or
// bundle words, the key that joins colours and bundles of one model, and the figures the brand
// states in its own words. Used by scripts/fetch-stores.mjs; kept apart so it can be tested alone.

// Words that name the kind of product, not the model: skipped before the model's name, and the end
// of it when they come after.
export const GENERIC = new RegExp(
  '^(' +
    [
      'robot', 'robotic', 'aspirapolvere', 'lavapavimenti', 'aspirateur', 'aspirateurs', 'laveur', 'aspirador', 'aspiradora', 'friegasuelos',
      'fregona', 'odkurzacz', 'myjący', 'myjacy', 'sprzątający', 'robotdammsugare', 'dammsugare', 'skaftdammsugare', 'våt', 'nettoyeur',
      'vacuum', 'cleaner', 'mop', 'mopp', 'mopa', 'scopa', 'balai', 'escoba', 'stick', 'cordless', 'wireless', 'senza', 'sans', 'sin',
      'bezprzewodowy', 'sladdlös', 'sladdlösa', 'smart', 'intelligente?', 'deumidificatore', 'dehumidifier', 'luftentfeuchter', 'déshumidificateur',
      'deshumidificador', 'osuszacz', 'avfuktare', 'stufa', 'heater', 'radiatore', 'termoventilatore', 'chauffage', 'radiateur', 'calefactor',
      'grzejnik', 'värmare', 'purificatore', 'purifier', 'purificateur', 'purificador', 'oczyszczacz', 'luftrenare', 'condizionatore',
      'climatiseur', 'climatizzatore', 'aire', 'klimatyzator', 'portatile', 'portable', 'mobile', 'ventilatore', 'fan', 'lavapavimento',
      'aspiradora-fregona', 'robot-aspirateur',
      // Coffee makers, in every language we read.
      'coffee', 'espresso', 'machine', 'machines', 'maker', 'makers', 'automatic', 'fully', 'manual', 'drip', 'burr', 'grinder',
      'combination', 'bean-to-cup', 'macchina', 'caffè', 'caffe', 'automatica', 'manuale', 'macinacaffè', 'macinacaffe',
      'kaffeevollautomat', 'siebträgermaschine', 'siebträger', 'kaffeemaschine', 'kapselmaschine', 'kaffeemühle', 'cafetera',
      'superautomática', 'superautomatica', 'expreso', 'molinillo', 'ekspres', 'automatyczny', 'kolbowy', 'młynek',
      'kaffemaskin', 'helautomatisk', 'espressomaskin', 'kaffekvarn', 'machine-à-café', 'expresso', 'broyeur', 'cafetière',
      'macchine', 'bean', 'beans', 'odkurzacze', 'myjące', 'myjace', 'wet&dry', 'nass', 'nass-', 'trockensauger', 'und',
      // Climate appliances.
      'radiatore', 'elettrico', 'olio', 'ölradiator', 'heizlüfter', 'termoventilador', 'radiador', 'aceite', 'bain', 'huile',
      'deumidificatore', 'climatiseur', 'klimagerät', 'acondicionado', 'luftreiniger', 'entfeuchter',
      // Plural and adjective forms the stores put before the model's name ("Cafeteras Nescafé Dolce
      // Gusto", "Elektrische KG200", "Ekspresy EN167.W").
      'cafeteras', 'kaffeemaschinen', 'espressomaschine', 'espressomaschinen', 'ekspresy', 'elektrische', 'elektrischer', 'elektrisch',
      'mahlwerk', 'macinino', 'serieskvarn', 'kvarn', 'manuelle', 'manuel', 'kapselmaschinen', 'kaffeevollautomaten', 'series', 'serie', 'filter',
    ].join('|') +
    ')$',
  'i',
);
export const COLOURS = /(?<!\p{L})(nero|bianco|grigio|argento|noir|blanc|gris|argent|negro|blanco|plata|schwarz|weiß|weiss|grau|silber|czarny|biały|szary|srebrny|svart|vit|grå|silver|black|white|grey|gray)(?!\p{L})/giu;
export const BUNDLE = /(?<!\p{L})(set|bundle|kit|care kit|combo|pack|complete|edition|early perks|promo)(?!\p{L})/giu;
export const STOP = /^(con|avec|with|mit|z|med|y|e|et|och|und|for|per|pour|para|do|är|est|es|è|jest|ist|is|da|de|di|du|del|della|el|la|le|les|il|en|in|och)$/i;

export const clean = (s) => s.replace(/<[^>]+>/g, ' ').replace(/[“”„"]/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

// A product code, as opposed to a model's short name (X60, S9, Q10): a dot or three digits in a row
// (EXAM440.55.BG, EC890.M, TRD40820, EM400M). De'Longhi's "EX:1" stock suffix is not part of it.
export const CODE = /^\p{Lu}{1,5}\d[\p{Lu}\d.]*$/u;
const isSku = (w) => CODE.test(w) && (w.includes('.') || /\d{3}/.test(w));

/**
 * The model's name: "Robot aspirapolvere Roborock Qrevo 2 Pro con rimozione…" → "Roborock Qrevo 2
 * Pro", "Macchina automatica per caffè in chicchi Rivelia EXAM440.55.BG" → "De'Longhi Rivelia
 * EXAM440.55.BG". Description words before the name are skipped, and the first one after it ends it;
 * a product code met later is kept, at the end.
 */
export function modelName(title, store) {
  const t = clean(title).replace(new RegExp(`\\s(by|par|di|de|von|från|od)\\s+${store.replace(/[^\p{L}]/gu, '.?')}\\b`, 'iu'), ' ').replace(/\s+/g, ' ');
  const at = t.toLowerCase().indexOf(store.toLowerCase());
  const raws = (at >= 0 ? t.slice(at + store.length) : t).trim().split(' ').filter((r) => !/^EX:\d$/i.test(r));
  const out = [];
  let code;
  let ended = false;
  raws.forEach((raw, i) => {
    // "Flow-robotdammsugare": the part before a joined generic word; "All-In-One" stays whole.
    const parts = raw.split(/[-/](?=\p{L})/u);
    const cut = parts.findIndex((x, j) => j > 0 && GENERIC.test(x));
    const head = cut > 0 ? parts.slice(0, cut).join('-') : raw;
    const joined = cut > 0 ? parts.slice(cut) : [];
    // "M5(Q7 TF)": what follows a bracket is a second name for the same model.
    const tok = head.split(/[(（[]/)[0].replace(/[,;:|]+$/, '');
    if (ended) {
      if (!code && isSku(tok) && !out.includes(tok)) code = tok;
      return;
    }
    // "La Specialista": a capitalised article followed by a capitalised word starts a name.
    const named = /^\p{Lu}/u.test(tok) && STOP.test(tok) && !out.length && /^\p{Lu}/u.test(raws[i + 1] ?? '') && !GENERIC.test(raws[i + 1] ?? '');
    const plain = !named && (!tok || /^[-–—|/:&+]$/.test(raw) || GENERIC.test(tok) || STOP.test(tok) || (!/\d/.test(tok) && !/^\p{Lu}/u.test(tok)));
    if (plain) {
      if (out.length) ended = true;
      return;
    }
    out.push(tok);
    if (joined.some((j) => GENERIC.test(j)) || /[,;:|(（[]/.test(raw.slice(tok.length))) ended = true;
  });
  // Codes go last: "EN80.BAE Inissia Nespresso" reads "Inissia Nespresso EN80.BAE".
  const words = [...out.filter((w) => !isSku(w)), ...out.filter(isSku), ...(code ? [code] : [])];
  const model = words.join(' ').replace(COLOURS, '').replace(/\s+/g, ' ').trim();
  return model ? `${store} ${model}` : '';
}

/**
 * For stores that name products by what they are: the title up to its first joining word or
 * dash, without colour ("Deumidificatore da 12 litri con umidostato…" → "Pro Breeze Deumidificatore
 * da 12 litri"), at most eight words.
 */
export function titleName(title, store) {
  const words = [];
  for (const w of clean(title).replace(COLOURS, '').split(' ')) {
    if (!w || /^[-–—|/:]$/.test(w)) break;
    if (words.length >= 2 && /^(con|avec|with|mit|för|med|z|per|pour|para|for)$/i.test(w)) break;
    words.push(w.replace(/[,;:]+$/, ''));
    if (/[,;:]$/.test(w) || words.length === 8) break;
  }
  const text = words.join(' ');
  return text ? `${store} ${text}` : '';
}

/**
 * For names that describe first and name last ("Macchina automatica per caffè in chicchi Rivelia
 * EXAM440.55.BG" → "De'Longhi Rivelia EXAM440.55.BG"): the capitalised words and codes at the end.
 */
export function tailName(title, store) {
  const words = clean(title).replace(COLOURS, '').replace(/[,;–—-]+\s*$/, '').split(' ');
  const out = [];
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i].replace(/[,;:]+$/, '');
    if (!w || !(/\d/.test(w) || /^\p{Lu}/u.test(w)) || GENERIC.test(w)) break;
    out.unshift(w);
  }
  const brand = new RegExp(`^(${store.replace(/[^\p{L}]/gu, '.?')}|delonghi)\\s*`, 'iu');
  const model = out.join(' ').replace(brand, '').trim();
  return model ? `${store} ${model}` : '';
}

export const namers = { model: modelName, title: titleName, tail: tailName };

// Colours and bundles of one model become one: a product code without its colour suffix
// (EXAM440.55.BG and EXAM440.55.W are one Rivelia), else the name without colour and bundle words.
export const keyOf = (name) => {
  const sku = name.split(' ').find(isSku);
  // Colours after the dot (EXAM440.55.BG) or after the region letters (IA3246EUTBL): one model.
  if (sku) return sku.replace(/\.\p{Lu}{1,4}$/u, '').replace(/(EUT?|UKT?)\p{Lu}{1,3}$/u, '$1').replace(/(\d{3})(?:B|W|BK|BCA|WCA|BL|R|M|PK|WI|MB|BG|GY|S|SB|T|TB)$/u, '$1').toLowerCase();
  return name.replace(BUNDLE, '').replace(COLOURS, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
};

/** The name a group of offers is shown under: the fullest one that is not a bundle. */
export function bestName(names) {
  const plain = names.filter((n) => !new RegExp(BUNDLE.source, 'iu').test(n));
  const pool = plain.length ? plain : names;
  return [...pool].sort((a, b) => (plain.length ? b.length - a.length : a.length - b.length))[0];
}

// Figures the brand states in its own words: kept only when one value is stated (a description
// that also cites an older model's figure is ambiguous, so nothing is taken from it).
export function specsOf(text) {
  const one = (re) => {
    const vals = [...new Set([...text.matchAll(re)].map((m) => Number(m[1].replace(/[.,\s  ]/g, ''))))].filter((v) => v > 0);
    return vals.length === 1 ? vals[0] : undefined;
  };
  const specs = {};
  const pa = one(/(\d{1,3}(?:[.,\s  ]\d{3})+|\d{4,6})\s?Pa\b/g);
  if (pa && pa >= 1000 && pa <= 100000) specs.pa = pa;
  const aw = one(/(\d{2,3})\s?AW\b/g);
  if (aw) specs.aw = aw;
  return Object.keys(specs).length ? specs : undefined;
}
