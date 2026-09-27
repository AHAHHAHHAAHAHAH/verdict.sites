// What every product drawing shares: the real colours of materials (not the site's palette, so a
// black machine is black on every site), one outline, a soft shadow on the floor and a highlight.

export const C = {
  ink: '#1f2328',
  black: '#2c3035',
  blackShade: '#212428',
  white: '#f5f6f5',
  whiteShade: '#dde1e2',
  grey: '#9aa1a8',
  greyShade: '#7d848b',
  steel: '#c6ccd2',
  steelShade: '#9fa7ae',
  chrome: '#dde2e6',
  alu: '#c3c8cd',
  aluLight: '#e3e6e9',
  aluShade: '#a3a9af',
  beige: '#bcae9d',
  beigeShade: '#a39584',
  glass: 'rgba(206, 226, 234, 0.55)',
  smoke: 'rgba(96, 102, 110, 0.75)',
  screen: '#15181b',
  coffee: '#5b341c',
  crema: '#c68a4e',
  latte: '#c9a27a',
  milk: '#f6efe2',
  iced: '#8a5a38',
  bean: '#7a4a2a',
  beanDark: '#4a2a16',
  wood: '#c08a55',
  woodShade: '#9c6a3c',
  yellow: '#f5c400',
  water: '#bfe0f0',
};

/** One outline for everything (thinner for small parts). */
export const o = (w = 4.5) => `stroke="${C.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const O = o();

/** The soft shadow the object stands on. */
export const ground = (rx = 110, y = 352) => `<ellipse cx="200" cy="${y}" rx="${rx}" ry="10" fill="#000" opacity="0.12"/>`;

/** A thin vertical highlight on a surface. */
export const shine = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="#ffffff" opacity="0.22"/>`;

/** A pane of glass over what is behind it. */
export const glass = (d) => `<path d="${d}" fill="${C.glass}" ${O}/>`;

/** A full drawing, ready to save as a file. */
export const svg = (body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="${label.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">${body}</svg>`;
