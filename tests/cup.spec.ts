import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const verdictSlugs = {
  en: ['capsule-coffee-machine', 'bean-to-cup-coffee-machine', 'espresso-machine', 'moka-pot', 'drip-coffee-maker', 'pour-over-and-french-press', 'coffee-grinder'],
  it: ['macchina-caffe-capsule', 'macchina-caffe-automatica-chicchi', 'macchina-espresso-manuale', 'moka', 'macchina-caffe-filtro', 'caffe-filtro-manuale', 'macinacaffe'],
  de: ['kapselmaschine', 'kaffeevollautomat', 'siebtraegermaschine', 'espressokocher', 'filterkaffeemaschine', 'handfilter-french-press', 'kaffeemuehle'],
};
const verdictBase = { en: '/en-us/best/', it: '/it-it/migliori/', de: '/de-de/beste/' };

const pages = {
  en: ['/en-us/', '/en-us/tools/', '/en-us/tools/coffee-to-water-ratio-calculator/', '/en-us/tools/home-coffee-machine-savings-calculator/', '/en-us/tools/cafe-cost-per-cup-calculator/', '/en-us/tools/office-coffee-cost-calculator/', '/en-us/about/', '/en-us/privacy/', '/en-us/legal-notice/'],
  it: ['/it-it/', '/it-it/strumenti/', '/it-it/strumenti/calcolatore-dosi-caffe-acqua/', '/it-it/strumenti/calcolatore-risparmio-macchina-caffe/', '/it-it/strumenti/calcolatore-costo-tazzina-bar/', '/it-it/strumenti/calcolatore-costo-caffe-ufficio/', '/it-it/chi-siamo/', '/it-it/privacy/', '/it-it/note-legali/'],
  de: ['/de-de/', '/de-de/rechner/', '/de-de/rechner/kaffee-wasser-verhaeltnis/', '/de-de/rechner/kaffeemaschine-amortisation/', '/de-de/rechner/kosten-pro-tasse-cafe/', '/de-de/rechner/kaffeekosten-buero/', '/de-de/ueber-uns/', '/de-de/datenschutz/', '/de-de/impressum/'],
};
const all = [
  ...Object.values(pages).flat(),
  ...(Object.keys(verdictSlugs) as (keyof typeof verdictSlugs)[]).flatMap((l) => verdictSlugs[l].map((s) => `${verdictBase[l]}${s}/`)),
];

function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

test.describe('every page', () => {
  for (const path of all) {
    test(`${path} renders without errors and passes axe`, async ({ page }) => {
      const errors = trackErrors(page);
      // Contrast is measured on settled content, not mid fade-in.
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

test.describe('quiz', () => {
  test('espresso + button + mid budget → bean-to-cup, Magnifica Start as your verdict', async ({ page }) => {
    await page.goto('/it-it/');
    const quiz = page.locator('[data-quiz]');
    await quiz.getByRole('button', { name: 'Espresso' }).click();
    await quiz.getByRole('button', { name: 'Premo un pulsante' }).click();
    await quiz.getByRole('button', { name: '200–500 €' }).click();
    await expect(page).toHaveURL(/\/it-it\/migliori\/macchina-caffe-automatica-chicchi\/\?need=main&b=mid/);
    const card = page.locator('[data-verdict="magnifica-start"]');
    await expect(card).toBeVisible();
    await expect(card.locator('[data-verdict-label]')).toHaveText('Il tuo verdetto');
    await expect(card.locator('[data-budget-note]')).toBeHidden();
    await expect(page.locator('[data-verdict="eletta-explore"]')).toBeHidden();
    // Above the budget: the Rivelia stays out of sight after the quiz.
    await expect(page.locator('[data-pick-row]').filter({ hasText: 'Rivelia' })).toBeHidden();
  });

  test('moka is a one-tap verdict', async ({ page }) => {
    await page.goto('/en-us/');
    await page.locator('[data-quiz]').getByRole('button', { name: 'Moka' }).click();
    await expect(page).toHaveURL(/\/en-us\/best\/moka-pot\/\?need=main/);
    await expect(page.locator('[data-verdict="moka-express"]')).toBeVisible();
  });

  test('filter + ritual → pour-over page with the V60', async ({ page }) => {
    await page.goto('/de-de/');
    const quiz = page.locator('[data-quiz]');
    await quiz.getByRole('button', { name: 'Filterkaffee' }).click();
    await quiz.getByRole('button', { name: 'Ich mag das Ritual' }).click();
    await expect(page).toHaveURL(/\/de-de\/beste\/handfilter-french-press\/\?need=main/);
    await expect(page.locator('[data-verdict="v60"]')).toBeVisible();
  });

  test('milk + button + low budget flags the budget mismatch honestly', async ({ page }) => {
    await page.goto('/it-it/');
    const quiz = page.locator('[data-quiz]');
    await quiz.getByRole('button', { name: 'Cappuccino e latte' }).click();
    await quiz.getByRole('button', { name: 'Premo un pulsante' }).click();
    await quiz.getByRole('button', { name: 'Fino a 200 €' }).click();
    const card = page.locator('[data-verdict="lattissima-one"]');
    await expect(card).toBeVisible();
    await expect(card.locator('[data-budget-note]')).toBeVisible();
  });

  test('back button returns to the previous question', async ({ page }) => {
    await page.goto('/it-it/');
    const quiz = page.locator('[data-quiz]');
    await quiz.getByRole('button', { name: 'Espresso' }).click();
    await expect(quiz.locator('[data-q="effort"]')).toBeVisible();
    await quiz.locator('[data-back]').click();
    await expect(quiz.locator('[data-q="drink"]')).toBeVisible();
    await expect(quiz.locator('[data-step-label]')).toHaveText('Domanda 1 di 3');
  });
});

test('verdict page: sourced facts and Amazon links for the local store', async ({ page }) => {
  await page.goto('/it-it/migliori/macchina-espresso-manuale/');
  const card = page.locator('[data-verdict="bambino-plus"]');
  await expect(card).toBeVisible();
  // The exact product page on amazon.it, and the button says it opens the product.
  await expect(card.locator('.buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.it\/dp\/B07G1CW1LG/);
  await expect(card.locator('.buy')).toHaveText(/Vedi su Amazon/);
  await expect(card.locator('.buy')).toHaveAttribute('rel', /sponsored/);
  // The pick's sourced facts sit in its card, each linked to the maker's page.
  await expect(card.locator('a.src[href*="sageappliances.com"]')).toHaveCount(3);
});

test('savings tool reads prefilled values from the URL', async ({ page }) => {
  await page.goto('/it-it/strumenti/calcolatore-risparmio-macchina-caffe/?cups=3&cafe=2&currency=USD');
  const form = page.locator('form[data-calc="home-payback"]');
  await expect(form.locator('input[name="cafe"]')).toHaveValue('2');
  await expect(form.locator('input[name="currency"][value="USD"]')).toBeChecked();
  await expect(form.locator('[data-out="payback"]')).toHaveText('73');
  await expect(form.locator('[data-unit-for="payback"]')).toHaveText('giorni');
});

test('brew ratio: presets, espresso label and reverse calculation', async ({ page }) => {
  await page.goto('/it-it/strumenti/calcolatore-dosi-caffe-acqua/');
  const form = page.locator('form[data-calc="brew-ratio"]');
  await expect(form.locator('[data-out="water"]')).toHaveText('360');
  await form.locator('label:has(input[value="espresso"])').click();
  await expect(form.locator('input[name="ratio"]')).toHaveValue('2');
  await expect(form.locator('[data-out="water"]')).toHaveText('40');
  await expect(form.locator('label[for="br-water"]')).toHaveText('Espresso in tazza');
  await form.locator('label:has(input[value="filter"])').click();
  await form.locator('input[name="water"]').fill('500');
  await expect(form.locator('input[name="coffee"]')).toHaveValue('27.8');
  await form.locator('input[name="ratio"]').fill('16');
  await expect(form.locator('input[value="custom"]')).toBeChecked();
});

test('stepper buttons change the value', async ({ page }) => {
  await page.goto('/en-us/tools/coffee-to-water-ratio-calculator/');
  const form = page.locator('form[data-calc="brew-ratio"]');
  await form.locator('button[data-dir="1"]').nth(1).click();
  await expect(form.locator('input[name="coffee"]')).toHaveValue('20.5');
  await expect(form.locator('[data-out="water"]')).toHaveText('369');
});

test('café cost: margin, percentage and monthly contribution', async ({ page }) => {
  await page.goto('/it-it/strumenti/calcolatore-costo-tazzina-bar/');
  const form = page.locator('form[data-calc="cafe-cost"]');
  await expect(form.locator('[data-out="margin"]')).toHaveText(/^0,99\s€$/);
  await expect(form.locator('[data-out="marginPct"]')).toHaveText('83,9');
  // Italian groups thousands only from five digits: 5157, not 5.157.
  await expect(form.locator('[data-out="monthly"]')).toHaveText(/^5157\s€$/);
  await form.locator('input[name="price"]').fill('0.2');
  await expect(form.locator('[data-out="verdict"]')).toBeVisible();
});

test('office cost: yearly saving and break-even', async ({ page }) => {
  await page.goto('/it-it/strumenti/calcolatore-costo-caffe-ufficio/');
  const form = page.locator('form[data-calc="office-cost"]');
  await expect(form.locator('[data-out="saving"]')).toHaveText(/^1800\s€$/);
  await expect(form.locator('[data-out="breakeven"]')).toContainText('240');
  await expect(form.locator('[data-out="sentence"]')).toContainText('Macchina a grani');
});

test('client-side navigation re-initialises calculators and the quiz', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/en-us/tools/');
  await page.locator('a.tile').first().click();
  await expect(page).toHaveURL(/coffee-to-water-ratio-calculator/);
  await expect(page.locator('form[data-calc="brew-ratio"] [data-out="water"]')).toHaveText('360');
  await page.locator('[data-more-tools] a').first().click();
  await expect(page.locator('form[data-calc="home-payback"] [data-out="payback"]')).not.toHaveText('—');
  await page.locator('.next').click();
  await expect(page).toHaveURL(/\/en-us\/$/);
  await page.locator('[data-quiz]').getByRole('button', { name: 'Moka' }).click();
  await expect(page).toHaveURL(/moka-pot/);
  expect(errors).toEqual([]);
});

test('country and language: the country button opens only its chooser, any language goes with any country', async ({ page }) => {
  await page.goto('/it-it/migliori/moka/');
  await page.locator('button.where').click();
  const chooser = page.locator('dialog[data-region]');
  await expect(chooser).toBeVisible();
  await expect(page.locator('dialog[data-menu]')).toBeHidden();
  const go = chooser.locator('[data-region-go]');
  const country = (m: string) => chooser.locator(`label:has(input[name="r-market"][value="${m}"])`);
  const language = (l: string) => chooser.locator(`label:has(input[name="r-lang"][value="${l}"])`);
  await expect(go).toHaveAttribute('href', '/it-it/migliori/moka/');
  // Poland's shops, read in Italian: the same page there.
  await country('pl').click();
  await expect(go).toHaveAttribute('href', '/it-pl/migliori/moka/');
  await expect(go).toContainText('Polonia · Italiano');
  await language('de').click();
  await expect(go).toHaveAttribute('href', '/de-pl/beste/espressokocher/');
  await go.click();
  await expect(page).toHaveURL(/\/de-pl\/beste\/espressokocher\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  // Chosen, not searched for: out of search engines, and no other page points to it.
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('edition'))).toBe('de-pl');
  // A type not sold in a country opens that edition's home, and the chooser says so first.
  await page.goto('/it-it/migliori/macchina-espresso-manuale/');
  await page.locator('button.where').click();
  await expect(chooser.locator('[data-region-home]')).toBeHidden();
  await country('es').click();
  await expect(go).toHaveAttribute('href', '/it-es/');
  await expect(chooser.locator('[data-region-home]')).toBeVisible();
});

test('the menu shows the country and language in use, and its button opens the chooser', async ({ page }) => {
  await page.goto('/en-us/');
  await page.locator('button.menu-btn').click();
  const menu = page.locator('dialog[data-menu]');
  await expect(menu.locator('.region-row')).toContainText('United States · English');
  await menu.locator('.rr-btn').click();
  await expect(menu).toBeHidden();
  await expect(page.locator('dialog[data-region]')).toBeVisible();
});

test('the same machine carries the name it is sold under in each country', async ({ page }) => {
  await page.goto('/it-us/migliori/macchina-espresso-manuale/');
  await expect(page.locator('[data-verdict] .name')).toHaveText('Breville Bambino Plus');
  await page.goto('/en-gb/best/espresso-machine/');
  await expect(page.locator('[data-verdict] .name')).toHaveText('Sage Bambino Plus');
});

test('the menu opens from the right with every page, and closes', async ({ page }) => {
  await page.goto('/en-us/');
  await page.locator('button.menu-btn').click();
  const menu = page.locator('dialog[data-menu]');
  await expect(menu).toBeVisible();
  await expect(menu.locator('a[href="/en-us/best/moka-pot/"]')).toBeVisible();
  await menu.getByRole('button', { name: 'Calculators' }).click();
  await expect(menu.locator('a[href="/en-us/tools/"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});

test('mobile result bar appears while editing inputs', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/en-us/tools/cafe-cost-per-cup-calculator/');
  await page.locator('input[name="price"]').scrollIntoViewIfNeeded();
  await page.locator('input[name="price"]').fill('5');
  await expect(page.locator('[data-result-bar]')).toHaveClass(/is-shown/);
  await expect(page.locator('[data-mirror]')).not.toHaveText('');
});

test('the UK edition links amazon.co.uk, with its own product IDs', async ({ page }) => {
  await page.goto('/en-gb/best/moka-pot/');
  await expect(page.locator('[data-verdict]:visible .buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.co\.uk\/dp\/B00004RFRU/);
  // The Rivelia has its own UK listing (EXAM440.55.B).
  await page.goto('/en-gb/best/bean-to-cup-coffee-machine/');
  const buy = page.locator('[data-verdict]:visible .buy');
  await expect(buy).toHaveAttribute('href', /^https:\/\/www\.amazon\.co\.uk\/dp\/B0CH3R3GRV/);
  await expect(buy).toHaveText(/See it on Amazon/);
});

test('the US edition keeps amazon.com, on the US product page', async ({ page }) => {
  await page.goto('/en-us/best/bean-to-cup-coffee-machine/');
  const buy = page.locator('[data-verdict]:visible .buy');
  await expect(buy).toHaveAttribute('href', /^https:\/\/www\.amazon\.com\/dp\/B0F1GMCQPB/);
  await expect(buy).toHaveText(/See it on Amazon/);
  await page.goto('/en-us/best/moka-pot/');
  await expect(page.locator('[data-verdict]:visible .buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.com\/dp\/B0000AN3QI/);
});

test('English in Italy: English words, the Italian shops and money', async ({ page }) => {
  await page.goto('/en-it/best/bean-to-cup-coffee-machine/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const card = page.locator('[data-verdict="magnifica-start"]');
  await expect(card).toBeVisible();
  await expect(card.locator('.why')).toContainText('Cappuccino at a touch');
  await expect(page.locator('#where-main a[href*="amazon"]').first()).toHaveAttribute('href', /amazon\.it/);
});

test('Spanish quiz: no manual espresso here, so "effort" is answered for you', async ({ page }) => {
  await page.goto('/es-es/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Espresso' }).click();
  await expect(quiz.locator('[data-q="budget"]')).toBeVisible();
  await expect(quiz.locator('[data-step-label]')).toHaveText('Pregunta 2 de 2');
  await quiz.getByRole('button', { name: '200–500 €' }).click();
  await expect(page).toHaveURL(/\/es-es\/mejores\/cafetera-superautomatica\/\?need=main/);
});

test('Polish calculator: money fields scale to złoty', async ({ page }) => {
  await page.goto('/pl-pl/narzedzia/kalkulator-oszczednosci-ekspres/');
  await expect(page.locator('input[name="machine"]')).toHaveValue('1800');
  await expect(page.locator('input[name="machine"]')).toHaveAttribute('max', '80000');
});

test('grinders: the exact grinder page, and the filter-only alternative only where it is sold', async ({ page }) => {
  await page.goto('/en-us/best/coffee-grinder/');
  await expect(page.locator('[data-verdict]:visible .buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.com\/dp\/B08JH6K5PY/);
  await expect(page.locator('[data-need="filter"]')).toHaveCount(0);
  await page.goto('/sv-se/basta/kaffekvarn/');
  await page.locator('[data-needs] [data-need="filter"]').click();
  await expect(page.locator('[data-verdict="wilfa-svart-aroma"] .buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.se\/dp\/B071Z6G317/);
  // The espresso page sends people who need a grinder to it.
  await page.goto('/it-it/migliori/macchina-espresso-manuale/');
  await expect(page.locator('main a[href="/it-it/migliori/macinacaffe/"]').first()).toBeVisible();
});

test('a store that lists one of our picks by its code: the page carries our name and says it is our pick', async ({ page }) => {
  await page.goto('/it-it/modelli/nespresso-lattissima-one/');
  await expect(page.locator('h1')).toHaveText('Nespresso Lattissima One');
  await expect(page.locator('.ours')).toBeVisible();
  await expect(page.locator('.badges')).toContainText('Stiftung Warentest (Germania)');
});

