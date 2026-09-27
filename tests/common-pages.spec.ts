// Checks shared by every site, driven by the build itself: a new page is tested without editing
// this file. CupVerdict lists its EN/IT/DE pages in cup.spec.ts, so the sweep skips those here.
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE = process.env.SITE ?? 'cup';
const DIST = join(process.cwd(), 'dist', SITE);
// Each country's Amazon; an address starts with its edition, language then country ("en-it").
const amazon: Record<string, string> = {
  us: 'amazon.com',
  gb: 'amazon.co.uk',
  it: 'amazon.it',
  de: 'amazon.de',
  fr: 'amazon.fr',
  es: 'amazon.es',
  pl: 'amazon.pl',
  se: 'amazon.se',
};

function pagesIn(dir: string): { path: string; html: string }[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pagesIn(full);
    if (name !== 'index.html') return [];
    const path = `/${relative(DIST, dir).split(sep).join('/')}/`.replace('//', '/');
    return [{ path, html: readFileSync(full, 'utf8') }];
  });
}
// A language read in a country other than its own (not English) is the same page with other
// products and prices: each such language is swept in the one country where it has the most pages.
const own: Record<string, string> = { us: 'en', gb: 'en', it: 'it', de: 'de', fr: 'fr', es: 'es', pl: 'pl', se: 'sv' };
const editionOf = (path: string) => path.split('/')[1] ?? '';
const isSecondary = (ed: string) => {
  const [lang, market] = ed.split('-');
  return lang !== 'en' && own[market] !== lang;
};
const built = pagesIn(DIST).filter((p) => p.path !== '/');
const perEdition = new Map<string, number>();
for (const p of built) perEdition.set(editionOf(p.path), (perEdition.get(editionOf(p.path)) ?? 0) + 1);
const sampled = new Set<string>();
for (const lang of new Set([...perEdition.keys()].filter(isSecondary).map((e) => e.split('-')[0]))) {
  const best = [...perEdition].filter(([e]) => isSecondary(e) && e.startsWith(`${lang}-`)).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
  sampled.add(best[0]);
}
// Model pages share one template: a few per edition are enough to sweep it.
const MODEL_WORDS = new Set(['models', 'modelli', 'modelle', 'modeles', 'modelos', 'modele', 'modeller']);
const modelsSeen = new Map<string, number>();
const sampleModels = (path: string) => {
  if (!MODEL_WORDS.has(path.split('/')[2] ?? '')) return true;
  const n = (modelsSeen.get(editionOf(path)) ?? 0) + 1;
  modelsSeen.set(editionOf(path), n);
  return n <= 4;
};
const pages = built.filter((p) => (!isSecondary(editionOf(p.path)) || sampled.has(editionOf(p.path))) && sampleModels(p.path));
// Verdict pages built with 1-tap shortcuts follow the 3-second rules (REGOLE_UX_3_SECONDI.md).
const verdicts = pages.filter((p) => /<nav[^>]*data-needs/.test(p.html)).map((p) => p.path);

function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

const listedElsewhere = (path: string) => SITE === 'cup' && /^\/(en-us|it-it|de-de)\//.test(path);

test.describe('every page', () => {
  for (const { path } of pages.filter((p) => !listedElsewhere(p.path))) {
    test(`${path} renders without errors and passes axe`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
      expect(violations, violations.join('\n')).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

// On a 390×844 phone, without scrolling: the question, the situations to choose from, our pick and its button.
test.describe('above the fold on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  for (const path of verdicts) {
    test(path, async ({ page }) => {
      const market = path.split('/')[1].split('-')[1];
      await page.goto(path);
      const bottom = async (sel: string) => {
        const box = (await page.locator(sel).first().boundingBox())!;
        return box.y + box.height;
      };
      await expect(page.locator('h1')).toBeVisible();
      const card = page.locator('[data-verdict]:visible');
      await expect(card).toHaveCount(1);
      expect(await bottom('[data-verdict]:visible .buy')).toBeLessThanOrEqual(844);
      expect(await bottom('[data-needs] .need')).toBeLessThanOrEqual(844);
      // The button opens the exact product (on Amazon or the brand's own site); a search only when
      // neither is known, and then it says so.
      const buy = card.locator('.buy');
      const kind = await buy.getAttribute('data-offer');
      const host = `^https://www\\.${amazon[market].replaceAll('.', '\\.')}/`;
      if (kind === 'amazon') await expect(buy).toHaveAttribute('href', new RegExp(`${host}dp/[A-Z0-9]{10}`));
      else if (kind === 'amazon-search') await expect(buy).toHaveAttribute('href', new RegExp(`${host}s\\?k=`));
      else {
        expect(kind).toBe('official');
        await expect(buy).toHaveAttribute('href', /^https:\/\/(?!www\.amazon\.)/);
      }
      if (kind !== 'official') await expect(buy).toHaveAttribute('rel', /sponsored/);
    });
  }
});

test('home on a phone: the promise and the first quiz answer without scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const home = pages.find((p) => /^\/[a-z]{2}-[a-z]{2}\/$/.test(p.path))!.path;
  await page.goto(home);
  await expect(page.locator('h1')).toBeVisible();
  const box = (await page.locator('[data-quiz] .screen:not([hidden]) button').first().boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(844);
});
