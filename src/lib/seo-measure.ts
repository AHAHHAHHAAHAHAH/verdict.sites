// How the SEO gate (scripts/check-seo.mjs) measures a page, shared with the pages that build their
// titles and keyphrases from data (the model pages), so what they choose passes the gate.

// Arial advance widths (1/1000 em), for the title width Google shows.
const ARIAL: Record<string, number> = {
  ' ': 278, a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833,
  n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833, N: 722,
  O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  0: 556, 1: 556, 2: 556, 3: 556, 4: 556, 5: 556, 6: 556, 7: 556, 8: 556, 9: 556,
  ':': 278, ';': 278, ',': 278, '.': 278, '(': 333, ')': 333, '-': 333, '–': 556, '—': 1000, '|': 260, '?': 556,
  '!': 278, "'": 191, '’': 222, '"': 355, '/': 278, '&': 667, '%': 889, '€': 556, '·': 278, '+': 584,
};

/** The width of a title in Google's results, in pixels (20px Arial). */
export function titleWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    const base = ch.normalize('NFD')[0];
    w += ARIAL[ch] ?? ARIAL[base] ?? (base === base.toUpperCase() ? 667 : 556);
  }
  return Math.round((w / 1000) * 20);
}

export const TITLE_PX: [number, number] = [400, 580];
export const DESC_CHARS: [number, number] = [120, 156];

// Words that do not count as part of a keyphrase ("purificatore d’aria" → purificatore, aria).
export const STOP = new Set(
  (
    'a al alla alle allo ai agli con d da dal dalla dei del della delle di e ed gli i il in l la le lo nei nel nella per su sul tra un una uno ' +
    'au aux ce de des du en et la le les pour sur un une avec sans ' +
    'con de del el en la las los para por un una unos y ' +
    'an auf das dem den der des die ein eine einen für im in mit und von zu zum zur ' +
    'do i na o od w we z ze ' +
    'and for of on the to with ' +
    'av en ett för med och på till'
  ).split(' '),
);

export const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ł/g, 'l')
    .replace(/[’'‘`´\-_/]/g, ' ')
    .replace(/[^\p{L}\p{N} ]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
export const words = (s: string) => (norm(s) ? norm(s).split(' ') : []);
export const content = (s: string) => words(s).filter((w) => !STOP.has(w));
