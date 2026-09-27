// Reads every model on sale in the brands' own stores into src/sites/<site>/models.json.
//   node scripts/fetch-stores.mjs [site...]      (default: every site)
//   node scripts/fetch-stores.mjs floor --list   (also prints what was found, for a check by eye)
// Two kinds of store (rules in src/sites/<site>/stores.ts):
// - Shopify stores publish their catalogue (/products.json): today's price and the crossed-out
//   price each store displays itself;
// - other brand sites list their products in a sitemap; each product page states its price in
//   schema.org data (the same data search engines read).
// A product is listed when it belongs to one of our categories, is in stock, is new (never
// refurbished, trade-in, accessories or warranty plans), is priced in the country's money and costs
// what a machine costs (not a spare part). Colours and bundles of the same model become one model
// at its lowest price. A store that cannot be read keeps what it had at the last check; the site
// hides prices older than it trusts.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import './ts-resolve.mjs';
import { CODE, bestName, clean, keyOf, namers, specsOf } from './store-names.mjs';
import { colourInCode, colourInPicture, colourInWords } from './colour-of.mjs';
import { historyKey, recordPrices } from './price-history.mjs';

const args = process.argv.slice(2);
const list = args.includes('--list');
const chosen = args.filter((a) => !a.startsWith('--'));
const sites = chosen.length ? chosen : ['cup', 'floor', 'clima'];
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Verdict catalogue check' };
const currencyOf = { us: 'USD', gb: 'GBP', it: 'EUR', de: 'EUR', fr: 'EUR', es: 'EUR', pl: 'PLN', se: 'SEK' };
// Below these, a "product" is a spare part or a freebie.
const MIN = { EUR: 40, USD: 40, GBP: 35, PLN: 170, SEK: 450 };
const SKIP_TYPES = /accessor|accesori|zubeh|akcesori|tillbeh|warranty|garanti|refurb|trade-in|point|parts|protection|shipping|beauty|mower|pool|landing|subscription|bundle-gift/i;
// Refurbished and trade-in offers, protection plans and spare parts, in every language we read.
const SKIP_WORDS = new RegExp(
  [
    'ricondizionat', 'reconditionn', 'reacondicionad', 'odnowion', 'renoverad', 'refurbish', 'generalüberholt', 'generaluberholt',
    'come nuovo', 'comme neuf', 'como nuevo', 'jak nowe', 'som ny', 'wie neu', 'as new', 'like new', 'renewed', 'second-',
    'permuta', 'trade-in', 'reprise', 'piano di protezione', 'protezione di \\d', 'protection plan', 'plan de protecci',
    'extension de garantie', 'extensión de garantía', 'garantieverlängerung', 'rozszerzona gwarancja', 'förlängd garanti',
    'spazzol', 'brosse', 'cepillo', 'szczotk', 'borste', 'ricambi', 'recharge', 'batteria aggiuntiva',
    'sacchett', 'dust bags?', 'soluzione detergente', 'cleaning solution', 'detergente',
    'tagliaerba', 'robot tondeuse', 'cortac[eé]sped', 'kosiark', 'gräsklippare', 'mähroboter', 'lawn mower',
  ].join('|'),
  'i',
);
// "Omni E25 + camera", "E28+Cleaning solution", "C28 Robot+ eufy kit": another product sold with the
// machine. A plus that ends a model's name ("Q10 S5+ robot aspirapolvere") has no space before it
// and is not followed by a capitalised word or the brand.
const withOther = (title, store) => /\s\+/.test(title) || /\+\p{Lu}/u.test(title) || new RegExp(`\\+\\s*${store}`, 'i').test(title);
const SKIP_TAGS = /^warranty$|refurb|moisture absorber|-parts$/i;

// The money the store charges in: a store that sells a country in another currency (eufy's Swedish
// store charges euros) is not read for that country, and a store whose money cannot be told is
// not read at all. Never a guess, never a conversion.
async function moneyOf(base) {
  try {
    const cart = await (await fetch(`${base}/cart.js`, { headers: UA, signal: AbortSignal.timeout(20_000) })).json();
    if (cart.currency) return cart.currency;
  } catch {
    /* not JSON: read the storefront instead */
  }
  try {
    const html = await (await fetch(`${base}/`, { headers: UA, signal: AbortSignal.timeout(20_000) })).text();
    return html.match(/Shopify\.currency\s*=\s*\{"active":"([A-Z]{3})"/)?.[1];
  } catch {
    return undefined;
  }
}

/** A Shopify store's products as items: title, words to classify by, and the offers in stock. */
async function shopifyItems(base, market) {
  const money = await moneyOf(base);
  if (!money) throw new Error('its currency could not be read');
  if (money !== currencyOf[market]) return { skip: `prices in ${money}, not ${currencyOf[market]}` };
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`${base}/products.json?limit=250&page=${page}`, { headers: UA, signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // A store that moved sends us elsewhere: that is not this country's catalogue.
    if (!res.url.startsWith(base)) throw new Error(`redirected to ${res.url}`);
    const data = await res.json();
    all.push(...data.products);
    if (data.products.length < 250) break;
  }
  // Which of a product's options is its colour ("Colore", "Couleur", "Farbe"...).
  const colourOption = (p) => (p.options ?? []).findIndex((o) => /colou?r|colore|couleur|farbe|kolor|färg|farve/i.test(o.name ?? ''));
  const picture = (src) => (src ? `${src}${src.includes('?') ? '&' : '?'}width=240` : undefined);
  const items = all.map((p) => ({
    title: p.title,
    text: `${p.title} ${p.handle}`,
    type: p.product_type ?? '',
    tags: p.tags ?? [],
    details: `${p.title} ${p.body_html ?? ''}`,
    offers: p.variants
      .filter((v) => v.available)
      .map((v) => {
        const price = Number(v.price);
        const cmp = Number(v.compare_at_price ?? 0);
        // A crossed-out price only when it is a real discount, not a typo four times the price.
        const was = cmp >= price * 1.05 && cmp <= price * 4 ? cmp : undefined;
        const at = colourOption(p);
        const colour = (at >= 0 ? colourInWords(v[`option${at + 1}`]) : undefined) ?? colourInWords(p.title);
        return {
          price,
          was,
          url: `${base}/products/${encodeURIComponent(p.handle)}${p.variants.length > 1 ? `?variant=${v.id}` : ''}`,
          colour,
          img: picture(v.featured_image?.src ?? p.images?.[0]?.src),
        };
      }),
  }));
  return { items, read: all.length };
}

/** A product page's schema.org Product: name, price, currency, stock. */
async function productOf(url) {
  const html = await (await fetch(url, { headers: UA, signal: AbortSignal.timeout(30_000) })).text();
  for (const block of html.matchAll(/<script[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch {
      continue;
    }
    for (const item of [data].flat().flatMap((d) => d?.['@graph'] ?? [d])) {
      if (item?.['@type'] !== 'Product') continue;
      const offer = [item.offers].flat()[0];
      if (!offer?.price || typeof item.name !== 'string') continue;
      const image = [item.image].flat()[0];
      return {
        name: item.name,
        price: Number(offer.price),
        currency: offer.priceCurrency,
        inStock: !/OutOfStock|SoldOut|Discontinued/i.test(offer.availability ?? ''),
        img: typeof image === 'string' ? image : (image?.contentUrl ?? image?.url),
      };
    }
  }
  return undefined;
}

/**
 * A brand site's products from its sitemap: only the addresses our rules place in a category are
 * opened (a few at a time), and each page's own schema.org data gives the name and the price.
 */
async function sitemapItems(first, market, source, wanted) {
  const urls = [];
  for (let i = 0; i < 10; i++) {
    const at = i === 0 ? first : first.replace(/-(\d+)\.xml$/, `-${i}.xml`);
    if (i > 0 && at === first) break;
    const res = await fetch(at, { headers: UA, signal: AbortSignal.timeout(30_000) });
    if (!res.ok) {
      if (i === 0) throw new Error(`HTTP ${res.status}`);
      break;
    }
    urls.push(...[...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&')));
  }
  const candidates = urls.filter((u) => {
    const text = decodeURIComponent(new URL(u).pathname);
    return !SKIP_WORDS.test(text) && !source.exclude?.test(text) && (!source.only || source.only.test(u)) && wanted(text);
  });
  const items = [];
  let skipped = 0;
  for (let i = 0; i < candidates.length; i += 4) {
    const batch = await Promise.all(
      candidates.slice(i, i + 4).map(async (url) => {
        try {
          return { url, p: await productOf(url) };
        } catch {
          return { url, p: undefined };
        }
      }),
    );
    for (const { url, p } of batch) {
      if (!p || p.currency !== currencyOf[market]) {
        skipped++;
        continue;
      }
      const path = decodeURIComponent(new URL(url).pathname);
      // The product code closing the address (…/IP3251EUT.html), when the name does not carry it.
      const code = path.split('/').pop()?.replace(/\.html?$/, '');
      const productCode = code && /\d/.test(code) && /^[A-Z0-9.+%-]+$/i.test(code) ? decodeURIComponent(code) : undefined;
      const colour = colourInCode(`${p.name} ${productCode ?? ''}`) ?? colourInWords(p.name);
      items.push({ title: p.name, code: productCode, text: `${p.name} ${path}`, path, type: '', tags: [], details: p.name, offers: p.inStock ? [{ price: p.price, url, colour, img: p.img }] : [] });
    }
  }
  return { items, read: urls.length, skipped };
}

/** An address on the store's own site, over https. */
function safe(url, base) {
  try {
    const u = new URL(url);
    const b = new URL(base);
    const root = (h) => h.split('.').slice(-2).join('.');
    return u.protocol === 'https:' && root(u.hostname) === root(b.hostname);
  } catch {
    return false;
  }
}

/** A name as text only: no markup, no control characters, not longer than a name. */
const plainText = (s) => s.replace(/[<>\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 120);

/** Which of our categories an item is in: by the store's type, its tags, or words in its name and address. */
function categoryOf(source, item) {
  for (const r of source.rules) {
    if (r.types?.includes(item.type)) return r.cat;
    if (r.tags?.some((t) => item.tags.includes(t))) return r.cat;
    if (r.words?.test(item.path ?? item.text)) return r.cat;
  }
  return undefined;
}

for (const site of sites) {
  const file = `src/sites/${site}/models.json`;
  const { stores } = await import(pathToFileURL(`src/sites/${site}/stores.ts`).href);
  const { catalog } = await import(pathToFileURL(`src/sites/${site}/catalog.ts`).href);
  const { site: config } = await import(pathToFileURL(`src/sites/${site}/config.ts`).href);
  const previous = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { models: [] };
  // Colours already read from a picture, so each picture is opened once.
  const known = new Map(previous.models.filter((m) => m.img).map((m) => [m.img, m.color ?? '']));
  const colourCode = (name) => colourInCode(name);
  const pictureColour = async (img) => {
    if (known.has(img)) return known.get(img) || undefined;
    const c = /no[-_]?image|placeholder/i.test(img) ? undefined : await colourInPicture(img);
    known.set(img, c ?? '');
    return c;
  };
  const published = (cat, market) => (catalog.categories[cat].markets ?? config.markets).includes(market);
  const now = new Date().toISOString();
  const models = [];
  let failed = 0;

  for (const source of stores) {
    const nameOf = namers[source.name ?? 'model'];
    for (const [market, base] of Object.entries(source.markets)) {
      let got;
      try {
        got =
          source.kind === 'sitemap'
            ? await sitemapItems(base, market, source, (path) => source.rules.some((r) => published(r.cat, market) && r.words?.test(path)))
            : await shopifyItems(base, market);
      } catch (e) {
        failed++;
        const kept = previous.models.filter((m) => m.store === source.store && m.market === market);
        models.push(...kept);
        console.log(`?  ${site} ${source.store} ${market}: ${e.message} (kept ${kept.length} from the last check)`);
        continue;
      }
      if (got.skip) {
        console.log(`-  ${site} ${source.store} ${market}: ${got.skip}: not read`);
        continue;
      }
      const groups = new Map();
      for (const item of got.items) {
        if (SKIP_TYPES.test(item.type) || SKIP_WORDS.test(item.text) || withOther(clean(item.title), source.store) || item.tags.some((t) => SKIP_TAGS.test(t))) continue;
        if (source.exclude?.test(item.text)) continue;
        const cat = categoryOf(source, item);
        if (!cat || !published(cat, market)) continue;
        const named = nameOf(item.title, source.store);
        const code = item.code?.replace(/\+EX:\d$/i, '');
        const name = named && code && !named.toUpperCase().includes(code.toUpperCase()) && !named.split(' ').some((w) => CODE.test(w) && /\d{3}/.test(w)) ? `${named} ${code}` : named;
        if (!name) continue;
        const offers = item.offers.filter((o) => o.price >= MIN[currencyOf[market]]);
        if (!offers.length) continue;
        const key = `${cat}|${keyOf(name)}`;
        const g = groups.get(key) ?? { cat, names: [], offers: [], specs: undefined };
        g.names.push(name);
        g.offers.push(...offers);
        g.specs ??= specsOf(clean(item.details));
        groups.set(key, g);
      }
      for (const g of groups.values()) {
        const best = g.offers.sort((a, b) => a.price - b.price)[0];
        const name = bestName(g.names);
        // The colour of the offer we link: in the store's words, else from its picture (read once per picture).
        const color = best.colour ?? colourCode(name) ?? (best.img ? await pictureColour(best.img) : undefined);
        // What reaches the pages is checked here once more: a secure address on the store's own
        // site, a plain name, a real price.
        if (!safe(best.url, base) || !Number.isFinite(best.price) || best.price <= 0) continue;
        models.push({
          cat: g.cat,
          market,
          store: source.store,
          name: plainText(name),
          url: best.url,
          price: best.price,
          ...(best.was ? { was: best.was } : {}),
          ...(g.specs ? { specs: g.specs } : {}),
          ...(color ? { color } : {}),
          ...(best.img ? { img: best.img } : {}),
          key: historyKey({ market, store: source.store, name: plainText(name) }),
          seen: now,
        });
      }
      console.log(`✓  ${site} ${source.store} ${market}: ${groups.size} models from ${got.read} products${got.skipped ? ` (${got.skipped} pages without a price in ${currencyOf[market]})` : ''}`);
    }
  }

  models.sort((a, b) => a.cat.localeCompare(b.cat) || a.market.localeCompare(b.market) || a.price - b.price);
  writeFileSync(file, `${JSON.stringify({ checkedAt: now, models }, null, 1)}\n`);
  const changed = recordPrices(site, models, now);
  const byCat = {};
  for (const m of models) byCat[`${m.cat}/${m.market}`] = (byCat[`${m.cat}/${m.market}`] ?? 0) + 1;
  console.log(`${site}: ${models.length} models ${JSON.stringify(byCat)}${failed ? `, ${failed} stores unreadable` : ''}, ${changed} new prices in the history\n`);
  if (list) for (const m of models) console.log(`   ${m.cat}/${m.market}  ${m.name}  ${m.price}${m.was ? ` (was ${m.was})` : ''}${m.specs ? ` ${JSON.stringify(m.specs)}` : ''}`);
}
