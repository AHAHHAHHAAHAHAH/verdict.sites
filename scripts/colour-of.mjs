// The colour a store sells a model in, for its drawing on our lists (scripts/art/families.mjs):
// first from what the store writes (the colour option chosen, the name, De'Longhi's colour letters
// after the product code), then from the store's own product picture. A colour we cannot tell is
// left out, and the drawing then claims none.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const WORDS = [
  ['black', 'black|nero|nera|noir|noire|negro|negra|schwarz|schwarze|schwarzer|czarny|czarna|czarne|svart|onyx|midnight'],
  ['white', 'white|bianco|bianca|blanc|blanche|blanco|blanca|weiß|weiss|weiße|weisse|biały|biała|białe|vit|vitt|snow'],
  ['grey', 'grey|gray|grigio|grigia|gris|grise|grau|szary|szara|szare|grå|stone|storm'],
  ['silver', 'silver|argento|argent|argentée|plata|plateado|silber|srebrny|srebrna|inox|stainless|acciaio|edelstahl|steel|metal|metallic|chrome'],
  ['titanium', 'titanium|titanio|titane|titan|anthracite|antracite|antracita|anthrazit|graphite|grafite|gunmetal'],
  ['beige', 'beige|sand|taupe|greige'],
  ['cream', 'cream|crema|crème|creme|ivory|avorio|almond|mandorla'],
  ['red', 'red|rosso|rossa|rouge|rojo|roja|rot|czerwony|czerwona|röd|empire red|candy apple'],
  ['blue', 'blue|blu|bleu|azul|blau|niebieski|niebieska|blå|azure|navy'],
  ['green', 'green|verde|vert|grün|zielony|zielona|grön|pistachio|pistacchio|mint'],
  ['pink', 'pink|rosa|rose|różowy|różowa'],
  ['yellow', 'yellow|giallo|jaune|amarillo|gelb|żółty|gul'],
  ['gold', 'gold|oro|dorado|złoty|guld|champagne'],
  ['copper', 'copper|rame|cuivre|cobre|kupfer|miedź|koppar|bronze'],
].map(([colour, words]) => [colour, new RegExp(`(?<!\\p{L})(${words})(?!\\p{L})`, 'iu')]);

/** A colour named in words ("Nero", "Weiß", "Titanium"), or undefined. */
export function colourInWords(text) {
  if (!text) return undefined;
  for (const [colour, re] of WORDS) if (re.test(text)) return colour;
  return undefined;
}

// De'Longhi (and Braun, Kenwood) close the product code with the colour: ECAM220.60.B, EN510.W, EC890PK.
const LETTERS = [
  ['black', /^(B|BK|BAE|BMAE|BXL)$/],
  ['white', /^(W|WI|WAE|IW|WB)$/],
  ['grey', /^(GY|G|GR|GB)$/],
  ['silver', /^(S|SB|SBX|SXB|M|MB|SM|TSM)$/],
  ['titanium', /^(T|TB|TXB|A|AB)$/],
  ['beige', /^(BG|BGY)$/],
  ['red', /^(R|WR)$/],
  ['yellow', /^YE$/],
  ['blue', /^(BL|AZ|LB)$/],
  ['pink', /^PK$/],
];

/** The colour letters after a De'Longhi-style product code, or undefined. */
export function colourInCode(name) {
  for (const w of name.split(' ')) {
    const letters = w.match(/^\p{Lu}{1,5}\d[\p{Lu}\d.]*\.(\p{Lu}{1,4})$/u)?.[1] ?? w.match(/^(?:EC|EM|ECOV|CAM|KG|EDG|EN)\d{2,5}(BK|M|PK|WI|MB|W|R|BL)$/)?.[1];
    if (!letters) continue;
    for (const [colour, re] of LETTERS) if (re.test(letters)) return colour;
  }
  return undefined;
}

/**
 * Black or white, when the store's picture (on a plain background) leaves no doubt: the pixels
 * that are not background, by how light they are. Undefined otherwise (a room, several products,
 * too little product, any other colour).
 */
export async function colourInPicture(url) {
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    return undefined;
  }
  let buf;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) return undefined;
    buf = Buffer.from(await res.arrayBuffer());
  } catch {
    return undefined;
  }
  let data;
  try {
    ({ data } = await sharp(buf).resize(72, 72, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true }));
  } catch {
    return undefined;
  }
  const px = [];
  for (let i = 0; i < data.length; i += 4) px.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
  // The background: transparent, or the colour of the border (checked to be one plain colour).
  const edge = px.filter((_, i) => {
    const w = Math.round(Math.sqrt(px.length));
    const x = i % w;
    const y = Math.floor(i / w);
    return x === 0 || y === 0 || x === w - 1 || y === Math.floor(px.length / w) - 1;
  });
  const opaqueEdge = edge.filter((p) => p[3] > 200);
  const bg = opaqueEdge.length ? [0, 1, 2].map((c) => opaqueEdge.reduce((s, p) => s + p[c], 0) / opaqueEdge.length) : undefined;
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
  if (bg && opaqueEdge.filter((p) => dist(p, bg) > 24).length > opaqueEdge.length * 0.2) return undefined;
  const product = px.filter((p) => p[3] > 200 && (!bg || dist(p, bg) > 24));
  if (product.length < px.length * 0.06) {
    // A white product on a white background differs from it only in its shadows: then the object is
    // the lightest thing there, and white.
    return bg && Math.min(...bg) > 235 && product.length > px.length * 0.01 ? 'white' : undefined;
  }
  const hsl = product.map(([r, g, b]) => {
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    let h = 0;
    if (max !== min) {
      const d = max - min;
      const [R, G, B] = [r / 255, g / 255, b / 255];
      h = max === R ? ((G - B) / d + (G < B ? 6 : 0)) * 60 : max === G ? ((B - R) / d + 2) * 60 : ((R - G) / d + 4) * 60;
    }
    return { h, s, l };
  });
  const share = (f) => hsl.filter(f).length / hsl.length;
  // Only what a picture shows beyond doubt: a black machine or a white one. Greys, metals and
  // colours are told apart badly by a picture that also shows accessories, a phone or a floor, so
  // they are only taken from the store's words.
  if (share((p) => p.l < 0.22) > 0.62) return 'black';
  if (share((p) => p.l > 0.82 && p.s < 0.25) > 0.7) return 'white';
  return undefined;
}
