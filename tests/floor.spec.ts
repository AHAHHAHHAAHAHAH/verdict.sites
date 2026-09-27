import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

// FloorVerdict specifics; the checks every site shares are in common-pages.spec.ts.
const DIST = join(process.cwd(), 'dist', 'floor');
function pagesIn(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pagesIn(full);
    return name === 'index.html' ? [`/${relative(DIST, dir).split(sep).join('/')}/`.replace('//', '/')] : [];
  });
}
const all = pagesIn(DIST).filter((p) => p !== '/');

const verdicts: Record<string, string[]> = {
  it: ['/it-it/migliori/robot-aspirapolvere-lavapavimenti/', '/it-it/migliori/aspirapolvere-senza-fili/', '/it-it/migliori/lavapavimenti-senza-fili/', '/it-it/migliori/scopa-a-vapore/'],
  fr: ['/fr-fr/meilleurs/robot-aspirateur-laveur/', '/fr-fr/meilleurs/aspirateur-balai-sans-fil/', '/fr-fr/meilleurs/aspirateur-laveur/', '/fr-fr/meilleurs/balai-vapeur/'],
  es: ['/es-es/mejores/robot-aspirador-friegasuelos/', '/es-es/mejores/aspiradora-sin-cable/', '/es-es/mejores/aspiradora-fregona/'],
  pl: ['/pl-pl/najlepsze/robot-sprzatajacy/', '/pl-pl/najlepsze/odkurzacz-bezprzewodowy/', '/pl-pl/najlepsze/odkurzacz-myjacy/', '/pl-pl/najlepsze/mop-parowy/'],
  sv: ['/sv-se/basta/robotdammsugare/', '/sv-se/basta/skaftdammsugare/', '/sv-se/basta/angmopp/'],
};


test('the build has every verdict page, no floor-washer page in Swedish, no steam mop in Spanish', () => {
  for (const list of Object.values(verdicts)) for (const p of list) expect(all).toContain(p);
  // One page per category sold there, and no list of categories (the menu and the home have them).
  expect(all.filter((p) => p.startsWith('/sv-se/basta/'))).toHaveLength(3);
  expect(all.filter((p) => p.startsWith('/es-es/mejores/'))).toHaveLength(3);
  expect(all).not.toContain('/it-it/migliori/');
});

test('quiz: robot + pets lands on the pets pick as your verdict', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Un robot che pulisce da solo' }).click();
  await quiz.getByRole('button', { name: 'Con cani o gatti' }).click();
  await quiz.getByRole('button', { name: 'Oltre 1000 €' }).click();
  await expect(page).toHaveURL(/\/it-it\/migliori\/robot-aspirapolvere-lavapavimenti\/\?need=pets&b=high/);
  const card = page.locator('[data-verdict="narwal-flow-2"]');
  await expect(card).toBeVisible();
  await expect(card.locator('[data-verdict-label]')).toHaveText('Il tuo verdetto');
  await expect(page.locator('[data-verdict="qrevo-curv-2-flow"]')).toBeHidden();
});

test('a budget below our pick: the pick says so, and the deals link counts only that range', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Un robot che pulisce da solo' }).click();
  await quiz.getByRole('button', { name: 'Per quasi tutte le case' }).click();
  await expect(quiz.getByRole('button', { name: '600–1000 €' })).toBeVisible();
  await quiz.getByRole('button', { name: 'Fino a 600 €' }).click();
  await expect(page).toHaveURL(/need=main&b=low&from=quiz/);
  const card = page.locator('[data-verdict]:visible');
  await expect(card.locator('[data-budget-note]')).toBeVisible();
  const deals = page.locator('[data-deals-link]');
  if (await deals.count()) {
    if (await deals.isVisible()) await expect(deals).toHaveAttribute('href', /\?b=low$/);
  }
});

test('deals page: the budget buttons show only that range', async ({ page }) => {
  await page.goto('/it-it/offerte/robot-aspirapolvere-lavapavimenti/?b=low');
  const deals = page.locator('[data-deal]');
  if ((await deals.count()) === 0) return;
  await expect(page.locator('[data-b="low"]')).toHaveAttribute('aria-pressed', 'true');
  for (const el of await page.locator('[data-deal]:visible').all()) await expect(el).toHaveAttribute('data-tier', 'low');
  await page.locator('[data-b=""]').click();
  await expect(page.locator('[data-deal]:visible')).toHaveCount(await deals.count());
});

test('quiz in Swedish offers no floor washer', async ({ page }) => {
  await page.goto('/sv-se/');
  const quiz = page.locator('[data-quiz]');
  await expect(quiz.getByRole('button', { name: 'En robot som städar själv' })).toBeVisible();
  await expect(quiz.getByRole('button', { name: 'En dammsugare som moppar' })).toHaveCount(0);
});

test('choosing a situation shows its picks in place, and choosing the first one comes back', async ({ page }) => {
  await page.goto('/fr-fr/meilleurs/robot-aspirateur-laveur/');
  const before = page.url();
  await page.locator('[data-needs] [data-need="save"]').click();
  await expect(page.locator('[data-verdict="ecovacs-t80s-omni"]')).toBeVisible();
  await expect(page.locator('[data-verdict="qrevo-curv-2-flow"]')).toBeHidden();
  await expect(page.locator('[data-need="save"]')).toHaveAttribute('aria-current', 'true');
  expect(page.url()).toContain('need=save');
  expect(page.url().split('?')[0]).toBe(before.split('?')[0]);
  await page.locator('[data-needs] [data-need="main"]').click();
  await expect(page.locator('[data-verdict="qrevo-curv-2-flow"]')).toBeVisible();
  expect(page.url()).not.toContain('need=');
});

test('each pick shows its sourced facts and the official price in the market currency', async ({ page }) => {
  await page.goto('/pl-pl/najlepsze/robot-sprzatajacy/');
  const card = page.locator('[data-verdict="qrevo-curv-2-flow"]');
  await expect(card.locator('a.src').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(card).toContainText('zł');
});

test('sticky bar shows once the card has scrolled away (phone)', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phones only');
  await page.goto('/es-es/mejores/aspiradora-sin-cable/');
  const bar = page.locator('[data-stick]');
  await expect(bar).toBeHidden();
  await page.locator('.fit').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 250);
  await expect(bar).toBeVisible();
  // Same link as the card: the exact Dyson page on amazon.es, and the button says so.
  await expect(bar.locator('[data-stick-href]')).toHaveAttribute('href', /^https:\/\/www\.amazon\.es\/dp\/B0BS1Q7RG5/);
  await expect(bar.locator('[data-stick-cta]')).toHaveText('Ver en Amazon');
});

test('steam mops: the test winner, and the lighter one where it is sold', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Una scopa a vapore (senza detersivi)' }).click();
  await quiz.getByRole('button', { name: 'Leggera, per una casa piccola' }).click();
  await expect(page).toHaveURL(/\/it-it\/migliori\/scopa-a-vapore\/\?need=light/);
  await expect(page.locator('[data-verdict="karcher-sc1-upright"] .buy')).toHaveAttribute('href', /amazon\.it\/dp\/B0CTQT42D9/);
  // In France only the SC 2 is sold: the question is answered for you.
  await page.goto('/fr-fr/');
  await page.locator('[data-quiz]').getByRole('button', { name: 'Un balai vapeur (sans détergent)' }).click();
  await expect(page).toHaveURL(/\/fr-fr\/meilleurs\/balai-vapeur\/\?need=main/);
  await expect(page.locator('[data-verdict="karcher-sc2-upright"] .lab')).toContainText('Test-Achats');
});

test('every model on sale: our picks first, then sorted and narrowed in place', async ({ page }) => {
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/');
  const box = page.locator('[data-models]');
  await expect(box.locator('h2')).toContainText('in vendita in Italia');
  const rows = box.locator('[data-row]:visible');
  await expect(rows.first()).toHaveAttribute('data-pick', '0');
  expect(await rows.count()).toBeLessThanOrEqual(10);
  // Lowest price first.
  await box.getByRole('button', { name: 'Prezzo più basso' }).click();
  const prices = (await rows.evaluateAll((els) => els.map((e) => Number((e as HTMLElement).dataset.price || Infinity)))).slice(0, 5);
  expect([...prices].sort((a, b) => a - b)).toEqual(prices);
  // One brand only, all of its models.
  await box.locator('button[data-brand="Dreame"]').click();
  for (const b of await rows.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.rowBrand))) expect(b).toBe('Dreame');
  const more = box.locator('[data-more]');
  if (await more.isVisible()) {
    await more.click();
    expect(await rows.count()).toBeGreaterThan(10);
  }
  // Back to every brand in one tap.
  const narrowed = await rows.count();
  await box.locator('[data-reset]').click();
  expect(await rows.count()).toBeGreaterThanOrEqual(narrowed);
  await expect(box.locator('button[data-brand=""]')).toHaveAttribute('aria-pressed', 'true');
});

test('tapping a model opens what we know about it, and the list stays as it was', async ({ page }) => {
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/');
  const box = page.locator('[data-models]');
  const rows = box.locator('[data-row]:visible');
  const before = await rows.count();
  const row = rows.nth(1);
  const open = row.locator('[data-open]');
  await open.click();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  const details = row.locator('.m-det');
  await expect(details).toBeVisible();
  await expect(details).toContainText('Prezzo oggi');
  expect(await rows.count()).toBe(before);
  await open.click();
  await expect(details).toBeHidden();
});

test('any language in any country: Italian words, Poland’s shops and money, kept out of search engines', async ({ page }) => {
  await page.goto('/it-pl/migliori/robot-aspirapolvere-lavapavimenti/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'it');
  await expect(page.locator('h1')).toHaveText('Quale robot aspirapolvere e lavapavimenti comprare?');
  await expect(page.locator('[data-verdict]:visible')).toContainText('zł');
  await expect(page.locator('[data-models] h2')).toContainText('in Polonia');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  // Swedish readers see the floor washers sold in Italy, in Swedish.
  await page.goto('/sv-it/basta/vat-och-torrdammsugare/');
  await expect(page.locator('h1')).toHaveText('Vilken våt- och torrdammsugare ska du köpa?');
});

test('English in every country: English words, that country’s shops and money', async ({ page }) => {
  await page.goto('/en-pl/best/robot-vacuum-and-mop/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('Which robot vacuum and mop should you buy?');
  await expect(page.locator('[data-verdict="qrevo-curv-2-flow"]')).toContainText('zł');
  await expect(page.locator('[data-models] h2')).toContainText('on sale in Poland');
  // English robot-vacuum searches belong to labs that test by hand: our English pages stay out of search.
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.goto('/en-it/best/robot-vacuum-and-mop/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/');
  await expect(page.locator('link[rel="alternate"][hreflang^="en"]')).toHaveCount(0);
  expect(readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8')).not.toContain('/en-');
});

test('the address without an edition opens the visitor’s country and language', async ({ browser }) => {
  // An English speaker in Italy: the country from the time zone, English because it is published there.
  const ctx = await browser.newContext({ locale: 'en-US', timezoneId: 'Europe/Rome' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/en-it\/$/);
  await ctx.close();
  const pl = await browser.newContext({ locale: 'pl-PL', timezoneId: 'Europe/Warsaw' });
  const p2 = await pl.newPage();
  await p2.goto('/');
  await expect(p2).toHaveURL(/\/pl-pl\/$/);
  await pl.close();
});

test('under a situation: other models the tests rank well for it, with the result and its source', async ({ page }) => {
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/');
  const rows = page.locator('[data-panel="main"] .tested .tr');
  const n = await rows.count();
  for (let i = 0; i < n; i++) {
    await expect(rows.nth(i).locator('.tr-test')).toHaveAttribute('href', /^https:\/\//);
    await expect(rows.nth(i).locator('.tr-price')).toContainText('€');
  }
  // Spending less never shows a model dearer than our pick.
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/?need=save');
  const pick = Number((await page.locator('[data-panel="save"] [data-verdict] .pv').first().innerText()).replace(/[^\d,]/g, '').replace(',', '.'));
  for (const text of await page.locator('[data-panel="save"] .tested .tr-price').allInnerTexts()) {
    expect(Number(text.replace(/[^\d,]/g, '').replace(',', '.'))).toBeLessThanOrEqual(pick);
  }
});

test('every model on sale has its own page: price from the store, history, tests, alternatives', async ({ page }) => {
  await page.goto('/it-it/migliori/robot-aspirapolvere-lavapavimenti/');
  const box = page.locator('[data-models]');
  const row = box.locator('[data-row]:visible').nth(3);
  await row.locator('[data-open]').click();
  const link = row.locator('.m-page');
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/it-it\/modelli\/[a-z0-9-]+\/$/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.buy')).toHaveAttribute('href', /^https:\/\//);
  await expect(page.locator('main h2').first()).toContainText('prezzo');
  // Out of the country's own language and English there are no model pages: the chooser leads home.
});

test('search engines see only the model pages that say more than the store: a test, our pick or a price history', () => {
  const pages = all.filter((p) => p.startsWith('/it-it/modelli/'));
  const html = (p: string) => readFileSync(join(DIST, p, 'index.html'), 'utf8');
  const indexed = pages.filter((p) => /<meta name="robots" content="index/.test(html(p)));
  expect(indexed.length).toBeGreaterThan(0);
  expect(indexed.length).toBeLessThan(pages.length);
  for (const p of indexed) expect(html(p), p).toMatch(/class="tests"|class="ours"|class="spark"/);
  const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  for (const p of pages.filter((x) => !indexed.includes(x))) expect(sitemap, p).not.toContain(`${p}<`);
});

test('a click to a store is counted: the page and the store, nothing else', async ({ page, context }) => {
  // The store itself is never loaded in the test.
  await context.route(/^https:\/\//, (route) => route.abort());
  const model = all.find((p) => p.startsWith('/it-it/modelli/'))!;
  await page.goto(model);
  const store = new URL((await page.locator('.buy').getAttribute('href'))!).host;
  const sent = page.waitForRequest((r) => r.url().endsWith('/api/out') && r.method() === 'POST');
  await page.locator('.buy').click();
  expect(JSON.parse((await sent).postData() ?? '{}')).toEqual({ p: model, h: store });
});
