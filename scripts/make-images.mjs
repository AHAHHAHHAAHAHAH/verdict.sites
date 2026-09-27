// Draws each site's images from scripts/art/objects.mjs: node scripts/make-images.mjs [site...]
//
//   src/sites/<site>/public/img/<category>.svg   the illustration at the top of a category page
//   src/sites/<site>/public/og/<category>.png    1200×630, the picture Google and social networks show
//   src/sites/<site>/public/img/home.svg         the site's products side by side, on the home page
//   src/sites/<site>/public/og/home.png          the same for the home page
//   src/sites/<site>/public/img/p/<product>.svg  each product we recommend, drawn in its own colours
//   src/sites/<site>/public/img/m/<kind>.svg     every other model on sale: its kind, in each colour
//   src/sites/<site>/drawings.json               which of these exist, for the pages
//
// Colours come from the site's theme.css, so a change of palette is one command away. The PNGs are
// rendered by the Playwright browser the tests already use, with the site's own display font.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import './ts-resolve.mjs';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';
import { objects, floor } from './art/objects.mjs';
import { cup } from './art/products-cup.mjs';
import { floor as floorProducts } from './art/products-floor.mjs';
import { clima } from './art/products-clima.mjs';
import { COLOURS, families } from './art/families.mjs';

const PRODUCTS = { cup, floor: floorProducts, clima };
// The kinds of model on each site's lists (src/lib/pictures.ts tells which one a model is).
const FAMILIES = {
  cup: ['capsule', 'superautomatic', 'manual-espresso', 'moka', 'drip', 'grinder'],
  floor: ['robot', 'stick', 'wet', 'steam'],
  clima: ['dehum', 'heat', 'purifier', 'ac'],
};
const drawing = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">${body}</svg>\n`;

const require = createRequire(import.meta.url);
const SITES = {
  clima: { ids: ['heat', 'dehum', 'purifier', 'ac'], home: ['heat', 'dehum', 'purifier', 'ac'], name: ['Clima', 'Verdict'], font: '@fontsource-variable/epilogue/files/epilogue-latin-wght-normal.woff2' },
  floor: { ids: ['robot', 'stick', 'wet', 'steam'], home: ['robot', 'stick', 'wet', 'steam'], name: ['Floor', 'Verdict'], font: '@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2', stretch: '112%' },
  cup: {
    ids: ['capsule', 'superautomatic', 'manual-espresso', 'moka', 'drip', 'manual-filter', 'grinder'],
    home: ['capsule', 'manual-espresso', 'moka', 'grinder'],
    name: ['Cup', 'Verdict'],
    font: '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
  },
};

function palette(site) {
  const css = readFileSync(`src/sites/${site}/theme.css`, 'utf8');
  const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))[1];
  const mix = (a, b, t) => {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [p(a), p(b)];
    return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
  };
  const P = { ink: token('ink'), card: token('card'), paper: token('paper'), wash: token('accent-wash'), accent: token('accent'), accentInk: token('accent-ink') };
  P.shade = mix(P.card, P.ink, 0.1);
  P.ground = mix(P.wash, P.ink, 0.12);
  P.tile = mix(P.wash, '#ffffff', 0.35);
  return P;
}

// The logo mark of each site (from its Logo.astro), with the theme colours filled in.
function mark(site, P) {
  const svg = readFileSync(`src/sites/${site}/Logo.astro`, 'utf8').match(/<svg[\s\S]*?<\/svg>/)[0];
  return svg
    .replace(/\{size\}/g, '64')
    .replace(/var\(--accent\)/g, P.accent)
    .replace(/var\(--ink\)/g, P.ink)
    .replace(/currentColor/g, P.ink)
    .replace(/ class="[^"]*"/g, '');
}

const object = (id, P) => `<ellipse cx="200" cy="${floor[id] ?? 344}" rx="128" ry="11" fill="${P.ground}"/>${objects[id](P)}`;
const row = (ids, P) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ids.length * 400} 400" width="${ids.length * 400}" height="400"><rect width="${ids.length * 400}" height="400" rx="64" fill="${P.tile}"/>${ids.map((id, i) => `<g transform="translate(${i * 400} 0)">${object(id, P)}</g>`).join('')}</svg>
`;
const tile = (id, P) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" rx="64" fill="${P.tile}"/>${object(id, P)}</svg>\n`;

function card(site, P, ids) {
  const s = SITES[site];
  const font = readFileSync(require.resolve(s.font)).toString('base64');
  const size = ids.length === 1 ? 560 : 300;
  const art = ids.map((id) => `<svg viewBox="0 0 400 400" width="${size}" height="${size}">${object(id, P)}</svg>`).join('');
  return `<!doctype html><html><head><style>
    @font-face { font-family: brand; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; font-stretch: 75% 125%; }
    html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
    body { background: ${P.tile}; display: grid; place-items: center; position: relative; }
    .art { display: flex; align-items: flex-end; justify-content: center; gap: 0; margin-top: ${ids.length === 1 ? 10 : -40}px; }
    .brand { position: absolute; left: 56px; bottom: 44px; display: flex; align-items: center; gap: 18px; color: ${P.ink};
      font: 500 46px/1 brand; font-stretch: ${s.stretch ?? '100%'}; letter-spacing: -0.02em; }
    .brand b { font-weight: 800; }
  </style></head><body><div class="art">${art}</div><div class="brand">${mark(site, P)}<span><b>${s.name[0]}</b>${s.name[1]}</span></div></body></html>`;
}

// A type's share picture: the machines we pick, in their own colours, on the site's tile.
function productCard(site, P, bodies) {
  const s = SITES[site];
  const font = readFileSync(require.resolve(s.font)).toString('base64');
  const size = bodies.length === 1 ? 520 : bodies.length === 2 ? 440 : 360;
  const art = bodies.map((b) => `<svg viewBox="0 0 400 400" width="${size}" height="${size}">${b}</svg>`).join('');
  return `<!doctype html><html><head><style>
    @font-face { font-family: brand; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; font-stretch: 75% 125%; }
    html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
    body { background: ${P.tile}; display: grid; place-items: center; position: relative; }
    .art { display: flex; align-items: flex-end; justify-content: center; margin-top: -40px; }
    .art svg + svg { margin-left: -28px; }
    .brand { position: absolute; left: 56px; bottom: 44px; display: flex; align-items: center; gap: 18px; color: ${P.ink};
      font: 500 46px/1 brand; font-stretch: ${s.stretch ?? '100%'}; letter-spacing: -0.02em; }
    .brand b { font-weight: 800; }
  </style></head><body><div class="art">${art}</div><div class="brand">${mark(site, P)}<span><b>${s.name[0]}</b>${s.name[1]}</span></div></body></html>`;
}

const sites = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SITES);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const site of sites) {
  const P = palette(site);
  const { ids, home } = SITES[site];
  mkdirSync(`src/sites/${site}/public/img`, { recursive: true });
  mkdirSync(`src/sites/${site}/public/og`, { recursive: true });
  for (const id of ids) {
    writeFileSync(`src/sites/${site}/public/img/${id}.svg`, tile(id, P));
    await page.setContent(card(site, P, [id]));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `src/sites/${site}/public/og/${id}.png` });
  }
  // The products, and every other model's kind in every colour.
  rmSync(`src/sites/${site}/public/img/p`, { recursive: true, force: true });
  rmSync(`src/sites/${site}/public/img/m`, { recursive: true, force: true });
  mkdirSync(`src/sites/${site}/public/img/p`, { recursive: true });
  mkdirSync(`src/sites/${site}/public/img/m`, { recursive: true });
  const { catalog } = await import(pathToFileURL(`src/sites/${site}/catalog.ts`).href);
  const drawnProducts = catalog.products.map((p) => p.id).filter((id) => PRODUCTS[site][id]);
  const missing = catalog.products.map((p) => p.id).filter((id) => !PRODUCTS[site][id]);
  if (missing.length) throw new Error(`${site}: no drawing for ${missing.join(', ')} (scripts/art/products-${site}.mjs)`);
  for (const id of drawnProducts) writeFileSync(`src/sites/${site}/public/img/p/${id}.svg`, drawing(PRODUCTS[site][id]()));
  const forms = {};
  for (const family of FAMILIES[site]) {
    forms[family] = Object.keys(families[family]);
    for (const form of forms[family]) {
      for (const [colour, [body, shade]] of Object.entries(COLOURS)) {
        writeFileSync(`src/sites/${site}/public/img/m/${family}-${form}-${colour}.svg`, drawing(families[family][form](body, shade)));
      }
    }
  }
  writeFileSync(`src/sites/${site}/drawings.json`, `${JSON.stringify({ products: drawnProducts, forms, colours: Object.keys(COLOURS) }, null, 1)}\n`);
  // Each type's share picture in each country: the machines we pick there, side by side.
  const { site: config } = await import(pathToFileURL(`src/sites/${site}/config.ts`).href);
  let shared = 0;
  for (const market of config.markets) {
    mkdirSync(`src/sites/${site}/public/og/${market}`, { recursive: true });
    for (const id of ids) {
      const c = catalog.categories[id];
      if (c.markets && !c.markets.includes(market)) continue;
      const picks = [...new Set(c.needs.flatMap((n) => n.picks.filter((pk) => !pk.markets || pk.markets.includes(market)).map((pk) => pk.id)))].slice(0, 3);
      if (!picks.length) continue;
      await page.setContent(productCard(site, P, picks.map((pid) => PRODUCTS[site][pid]())));
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `src/sites/${site}/public/og/${market}/${id}.png` });
      shared++;
    }
  }
  writeFileSync(`src/sites/${site}/public/img/home.svg`, row(home, P));
  await page.setContent(card(site, P, home));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `src/sites/${site}/public/og/home.png` });
  console.log(`${site}: ${ids.length} illustrations, ${ids.length + 1 + shared} share images, ${drawnProducts.length} product drawings`);
}
await browser.close();
