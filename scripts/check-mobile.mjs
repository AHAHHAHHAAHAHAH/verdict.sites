// Phone check of a built site: every indexable page (and one of each other kind) at 360 and 390
// pixels wide. Fails on anything wider than the screen, tap targets smaller than 40×40 (unless
// they sit inside running text) and text under 12 pixels.
//   node scripts/check-mobile.mjs <site> [--port N]   (serves dist/<site> itself)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const site = process.argv[2];
if (!site) throw new Error('Usage: node scripts/check-mobile.mjs <site>');
const port = Number(process.argv[process.argv.indexOf('--port') + 1]) || 4390;
const DIST = join(process.cwd(), 'dist', site);

function pagesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pagesIn(full);
    return name === 'index.html' ? [full] : [];
  });
}
// Indexable pages, plus the first page of each other kind (deals, calculators, legal, other languages).
const kinds = new Set();
const MODEL_WORDS = new Set(['models', 'modelli', 'modelle', 'modeles', 'modelos', 'modele', 'modeller']);
const models = new Map();
const pages = pagesIn(DIST)
  .map((f) => ({ path: `/${relative(DIST, f).split(sep).join('/')}`.replace(/index\.html$/, ''), html: readFileSync(f, 'utf8') }))
  .filter((p) => p.path !== '/')
  .filter((p) => {
    // Model pages share one template: six per edition cover it.
    if (MODEL_WORDS.has(p.path.split('/')[2] ?? '')) {
      const ed = p.path.split('/')[1];
      models.set(ed, (models.get(ed) ?? 0) + 1);
      return models.get(ed) <= 6;
    }
    if (!/noindex/.test(p.html.match(/<meta name="robots"[^>]*>/)?.[0] ?? '')) return true;
    const kind = p.path.split('/').slice(2, 3).join('/') || 'home';
    const lang = p.path.split('/')[1].split('-')[0];
    const key = `${kind}|${lang}`;
    if (kinds.has(key)) return false;
    kinds.add(key);
    return true;
  })
  .map((p) => p.path);

const server = spawn(process.execPath, ['scripts/serve.mjs', site, '--port', String(port)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1500));
const browser = await chromium.launch({ channel: 'chrome' });
const problems = [];
try {
  for (const width of [360, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of pages) {
      await page.goto(`http://localhost:${port}${path}`, { waitUntil: 'load' });
      const found = await page.evaluate(() => {
        const out = [];
        const vw = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth > vw + 1) out.push(`page is ${document.documentElement.scrollWidth}px wide`);
        const visible = (el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !el.closest('[hidden], dialog:not([open]), details:not([open]) > :not(summary)');
        };
        const label = (el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 30)}"`;
        for (const el of document.querySelectorAll('main *, header *, footer *')) {
          if (!visible(el)) continue;
          const r = el.getBoundingClientRect();
          if ((r.right <= vw + 1 && r.left >= -1) || getComputedStyle(el).position === 'fixed') continue;
          // Scrollers (a swipeable row) may hold wider content, and a box that clips its overflow hides it.
          let clipped = false;
          for (let a = el.parentElement; a && !clipped; a = a.parentElement) {
            const o = getComputedStyle(a);
            const ar = a.getBoundingClientRect();
            if (/hidden|clip|auto|scroll/.test(`${o.overflowX} ${o.overflow}`) && ar.right <= vw + 1 && ar.left >= -1) clipped = true;
          }
          if (!clipped) out.push(`${label(el)} sticks out (${Math.round(r.left)}–${Math.round(r.right)})`);
        }
        for (const el of document.querySelectorAll('a[href], button, summary, input, select, [role="button"], label:has(input)')) {
          if (!visible(el)) continue;
          const r = el.getBoundingClientRect();
          // Links inside a sentence are exempt (WCAG 2.5.8 inline exception).
          const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && /\S/.test((el.parentElement.textContent || '').replace(el.textContent || '', ''));
          // A small control whose tap area is widened by an ::after layer.
          const after = getComputedStyle(el, '::after');
          const widened = after.content !== 'none' && after.position === 'absolute';
          if (!inline && !widened && (r.width < 40 || r.height < 40) && !el.querySelector('input[type="radio"]')) out.push(`${label(el)} is ${Math.round(r.width)}×${Math.round(r.height)}`);
        }
        for (const el of document.querySelectorAll('main p, main li, main span, main a, main dd, main dt, main td, main th, main button, main label')) {
          if (!visible(el) || !el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
          const size = parseFloat(getComputedStyle(el).fontSize);
          if (size < 12) out.push(`${label(el)} has ${size}px text`);
        }
        return [...new Set(out)].slice(0, 12);
      });
      if (found.length) problems.push({ path: `${path} @${width}`, found });
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
for (const p of problems) console.log(`✗ ${p.path}\n    - ${p.found.join('\n    - ')}`);
console.log(`\nMobile ${site}: ${pages.length * 2 - problems.length}/${pages.length * 2} page views clean.`);
if (problems.length) process.exitCode = 1;
