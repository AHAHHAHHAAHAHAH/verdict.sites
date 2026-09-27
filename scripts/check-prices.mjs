// Re-reads every official price in a site's catalogue from the brand store it came from.
//   node scripts/check-prices.mjs floor           report only
//   node scripts/check-prices.mjs floor --write   also update catalog.ts and its check date
// Shopify stores answer at <product url>.js (price in cents); other brand stores (De'Longhi,
// Dyson) publish schema.org Product data in the page.
// A product the store shows as sold out gets soldOut: true (the site then hides its price and store
// link) and loses it when it is back. A price that cannot be read is reported, never guessed; with
// --write it is left as it was,
// and the run exits with code 2 so the weekly job flags it for a person to look at.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import './ts-resolve.mjs';

const site = process.argv[2];
const write = process.argv.includes('--write');
if (!site) {
  console.error('Usage: node scripts/check-prices.mjs <site> [--write]');
  process.exit(1);
}
const file = `src/sites/${site}/catalog.ts`;
const { catalog } = await import(pathToFileURL(file).href);
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Verdict price check' };

async function readPrice(url) {
  if (!new URL(url).pathname.includes('/products/')) {
    const html = await (await fetch(url, { headers: UA })).text();
    for (const block of html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const data = JSON.parse(block[1]);
        for (const item of Array.isArray(data) ? data : [data]) {
          if (item['@type'] !== 'Product') continue;
          const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
          if (offer?.price) return { value: Math.round(Number(offer.price) * 100) / 100, available: !/OutOfStock|SoldOut/.test(offer.availability ?? '') };
        }
      } catch {
        // not JSON we can read: try the next block
      }
    }
    throw new Error('no schema.org price');
  }
  const res = await fetch(`${url.replace(/\/$/, '')}.js`, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // The full price, not a temporary discount: a sale shown here could be over before the next check.
  const cents = Math.max(data.price, data.compare_at_price ?? 0);
  return { value: cents / 100, available: data.available !== false };
}

let source = readFileSync(file, 'utf8');
let changed = 0;
let unreadable = 0;
for (const p of catalog.products) {
  for (const [market, price] of Object.entries(p.price ?? {})) {
    let now;
    try {
      now = await readPrice(price.source);
    } catch (e) {
      unreadable++;
      console.log(`?  ${p.id} ${market}: could not read ${price.source} (${e.message})`);
      continue;
    }
    const soldOut = !now.available;
    const flag = soldOut ? '  (sold out)' : '';
    if (now.value === price.value && soldOut === Boolean(price.soldOut)) {
      console.log(`=  ${p.id} ${market}: ${price.value}${flag}`);
      continue;
    }
    console.log(`≠  ${p.id} ${market}: ${price.value}${price.soldOut ? ' (sold out)' : ''} → ${now.value}${flag}`);
    changed++;
    if (!write) continue;
    // Only inside this product's own price block (not an alternative pointing at it), only this
    // country's entry. A sold-out product keeps its price in the file, but the site shows neither
    // the price nor the store link until the store has it again.
    const start = source.indexOf(`id: '${p.id}',\n    category:`);
    const block = source.indexOf('price: {', start);
    const end = source.indexOf('\n    },', block);
    const entry = new RegExp(`(\\b${market}: \\{ value: )${String(price.value).replace('.', '\\.')}(, source: [^,}]+?)(, soldOut: true)?( \\})`);
    const part = source.slice(block, end);
    if (start < 0 || !entry.test(part)) {
      console.log(`!  ${p.id} ${market}: entry not found in ${file}, left unchanged`);
      continue;
    }
    source = source.slice(0, block) + part.replace(entry, `$1${now.value}$2${soldOut ? ', soldOut: true' : ''}$4`) + source.slice(end);
  }
}
if (write) {
  const today = new Date().toISOString().slice(0, 10);
  source = source.replace(/const CHECKED = '\d{4}-\d{2}-\d{2}';/, `const CHECKED = '${today}';`);
  writeFileSync(file, source);
}
console.log(`\n${changed} changed, ${unreadable} unreadable${write ? ', catalogue updated' : ''}.`);
if (unreadable) process.exit(2);
