// ClimaVerdict specifics; the checks every site shares are in common-pages.spec.ts.
import { test, expect } from '@playwright/test';
import { catalog } from '../src/sites/clima/catalog';

test('quiz: damp cellar leads to the big dehumidifier as your verdict', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Togliere umidità e muffa' }).click();
  await quiz.getByRole('button', { name: 'Cantina o casa molto umida' }).click();
  await quiz.getByRole('button', { name: '250–350 €' }).click();
  await expect(page).toHaveURL(/\/it-it\/migliori\/deumidificatore\/\?need=damp&b=mid/);
  const card = page.locator('[data-verdict="duux-bora-smart"]');
  await expect(card).toBeVisible();
  await expect(card.locator('[data-verdict-label]')).toHaveText('Il tuo verdetto');
});

test('Polish: heater or air conditioner; a heater question with one answer is answered for you', async ({ page }) => {
  await page.goto('/pl-pl/');
  const quiz = page.locator('[data-quiz]');
  await expect(quiz.locator('[data-q="type"]')).toBeVisible();
  await quiz.getByRole('button', { name: 'Ogrzać zimny pokój' }).click();
  // Only the oil radiator is sold here, so "what matters most" is skipped: the budget comes next, in złoty.
  await quiz.getByRole('button', { name: /^Do 450/ }).click();
  await expect(page).toHaveURL(/\/pl-pl\/najlepsze\/grzejnik-elektryczny\/\?need=main&b=low/);
  await page.goto('/pl-pl/');
  await quiz.getByRole('button', { name: 'Schłodzić pokój latem' }).click();
  await quiz.getByRole('button', { name: 'Do prawie każdego domu' }).click();
  await expect(page).toHaveURL(/\/pl-pl\/najlepsze\/klimatyzator-przenosny\/\?need=main/);
});

test('heaters: the bathroom answer leads to the bathroom-safe fan heater', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Scaldare una stanza fredda' }).click();
  await quiz.getByRole('button', { name: 'Bagno, o caldo subito' }).click();
  await quiz.getByRole('button', { name: 'Fino a 100 €' }).click();
  await expect(page).toHaveURL(/\/it-it\/migliori\/stufa-elettrica\/\?need=bath&b=low/);
  const card = page.locator('[data-verdict="rowenta-intense-aqua"]');
  await expect(card).toBeVisible();
  await expect(card.locator('.price')).toBeVisible();
});

test('the brand store price and link follow its stock (read weekly)', async ({ page }) => {
  // Sold out on the brand's own store: no price, no link to a page where it cannot be bought.
  const dragon = catalog.products.find((p) => p.id === 'delonghi-dragon-4')!;
  await page.goto('/it-it/migliori/stufa-elettrica/');
  const card = page.locator('[data-verdict="delonghi-dragon-4"]');
  await expect(card.locator('.buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.it\/dp\/B00FU3ISRO/);
  const soldOut = Boolean(dragon.price?.it?.soldOut);
  await expect(card.locator('.price')).toHaveCount(soldOut ? 0 : 1);
  await expect(page.locator('#where-main a[href*="delonghi.com"]')).toHaveCount(soldOut ? 0 : 1);
  await page.goto('/fr-fr/meilleurs/chauffage-d-appoint/');
  const buy = page.locator('[data-verdict="delonghi-dragon-4"] .buy');
  if (dragon.price?.fr?.soldOut) await expect(buy).toHaveAttribute('href', /^https:\/\/www\.amazon\.fr\/s\?k=/);
  else await expect(buy).toHaveAttribute('href', /delonghi\.com\/fr-fr\//);
});

test('air purifiers: the test winner first, a cheaper one a tap away, filter costs compared', async ({ page }) => {
  await page.goto('/de-de/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Sauberere Luft (Allergien, Haustiere)' }).click();
  await quiz.getByRole('button', { name: 'Weniger ausgeben' }).click();
  await expect(page).toHaveURL(/\/de-de\/beste\/luftreiniger\/\?need=save/);
  await expect(page.locator('[data-verdict="xiaomi-4-lite"] .buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.de\/dp\/B09QJTCYHJ/);
  await page.goto('/pl-pl/najlepsze/oczyszczacz-powietrza/');
  const card = page.locator('[data-verdict="bosch-air-4000"]');
  await expect(card.locator('.lab')).toContainText('Stiftung Warentest');
  await expect(card.locator('.buy')).toHaveAttribute('href', /^https:\/\/www\.amazon\.pl\/dp\/B0B5D7H7VP/);
});

test('after the quiz the page shows only the answer: no other models, one link to see them', async ({ page }) => {
  await page.goto('/it-it/');
  const quiz = page.locator('[data-quiz]');
  await quiz.getByRole('button', { name: 'Togliere umidità e muffa' }).click();
  await quiz.getByRole('button', { name: 'Spendere meno' }).click();
  await quiz.getByRole('button', { name: 'Fino a 250 €' }).click();
  await expect(page).toHaveURL(/need=save&b=low&from=quiz/);
  await expect(page.locator('[data-verdict="pro-breeze-omnidry-20"]')).toBeVisible();
  await expect(page.locator('[data-needs]')).toBeHidden();
  await expect(page.locator('[data-verdict="delonghi-ariadry-multi-16"]')).toBeHidden();
  const all = page.locator('[data-seeall] a');
  await expect(all).toBeVisible();
  await all.click();
  await expect(page.locator('[data-needs]')).toBeVisible();
});
