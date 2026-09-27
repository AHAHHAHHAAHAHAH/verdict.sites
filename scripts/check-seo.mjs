// "SEO green" gate, run after every build: node scripts/check-seo.mjs <site> [--verbose]
//
// Every indexable page must pass the checks an SEO plugin such as Yoast shows in green, plus the
// technical ones Google needs for a good result (title, description and image in the snippet).
// Each page declares its focus keyphrase in a short HTML comment written by Base.astro, so the
// check always tests what the page itself says it is about. Any failure stops the build.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { DESC_CHARS, TITLE_PX, content, norm, titleWidth, words } from '../src/lib/seo-measure.ts';
import { engineSlugs } from '../src/i18n/slugs.ts';

const MODEL_KEYPHRASE_WORDS = 6;

const [site, ...flags] = process.argv.slice(2);
const verbose = flags.includes('--verbose');
const DIST = join(process.cwd(), 'dist', site ?? '');
if (!site || !existsSync(DIST)) {
  console.error(`Usage: node scripts/check-seo.mjs <site>. No build found in dist/${site ?? ''}`);
  process.exit(1);
}

// --- Limits (Yoast's green ranges, Google's snippet sizes) ---
const MIN_WORDS = 300;
const DENSITY = [0.5, 3.5]; // percent (Yoast's range when word forms count, as they do here)
const SUBHEADS = [30, 75]; // percent of H2/H3 with the keyphrase
const OG_SIZE = [1200, 630];

// Title width and keyphrase words are measured as the pages that build titles from data measure them.


// Word forms: "deumidificatori" matches "deumidificatore", "stufe" "stufa", "mopy" "mop",
// "ångmopparna" "ångmopp".
function sameWord(a, b) {
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (short.length < 3 || long.length - short.length > 4) return false;
  if (short.length === 3) return long.startsWith(short) && long.length - short.length <= 2;
  const stem = Math.max(4, short.length - 2);
  return a.slice(0, stem) === b.slice(0, stem);
}
/** Every content word of the keyphrase appears in the text (any order, any form). */
const hasAll = (text, kp) => {
  const w = words(text);
  return content(kp).every((k) => w.some((x) => sameWord(x, k)));
};
/** The text starts with the keyphrase (its content words first, in order). */
const startsWith = (text, kp) => {
  const w = content(text);
  const k = content(kp);
  return k.every((x, i) => w[i] && sameWord(w[i], x));
};
const sentences = (text) => text.split(/(?<=[.!?:;])\s+|\n+/).filter((s) => s.trim());
const countIn = (text, kp) => sentences(text).filter((s) => hasAll(s, kp)).length;

// --- HTML helpers (the pages are our own, well-formed output) ---
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const text = (html) =>
  decode(
    html
      .replace(/<(script|style|svg|template)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<\/(p|li|h[1-6]|div|section|summary|td|th|dt|dd|figcaption)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*/g, '\n')
    .trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'));
  return m ? decode(m[1]) : undefined;
};
const meta = (html, key, val) => {
  const tag = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => m[0]).find((t) => attr(t, key) === val);
  return tag ? attr(tag, 'content') : undefined;
};
const links = (html, rel) => [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, 'rel') === rel);

function pngSize(file) {
  const b = readFileSync(file);
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  // JPEG: walk the markers to the frame header.
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return [0, 0];
}

// --- Pages ---
function pagesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pagesIn(full);
    return name === 'index.html' ? [full] : [];
  });
}
const sitemapXml = readdirSync(DIST)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .map((f) => readFileSync(join(DIST, f), 'utf8'))
  .join('');
const inSitemap = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

// Removes each list marked data-seo-skip with everything inside it, lists nested in it included
// (a model's details hold lists of their own).
function withoutSkipped(html) {
  let out = html;
  for (;;) {
    const open = /<(ul|ol)\b[^>]*\bdata-seo-skip\b[^>]*>/i.exec(out);
    if (!open) return out;
    const tag = open[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = open.index + open[0].length;
    let depth = 1;
    let end = out.length;
    for (let m; (m = re.exec(out)); ) {
      depth += m[1] ? -1 : 1;
      if (depth === 0) {
        end = m.index + m[0].length;
        break;
      }
    }
    out = `${out.slice(0, open.index)} ${out.slice(end)}`;
  }
}

const MARK = /<!--seo-keyphrase ([^>]*?)-->/;
const results = [];
const seen = { title: new Map(), desc: new Map(), kp: new Map() };

for (const file of pagesIn(DIST)) {
  const path = `/${relative(DIST, file).split(sep).join('/')}`.replace(/index\.html$/, '');
  if (path === '/') continue; // the country and language chooser at the root
  const html = readFileSync(file, 'utf8');
  const robots = meta(html, 'name', 'robots') ?? '';
  const mark = html.match(MARK);
  if (/noindex/.test(robots)) {
    if ([...inSitemap].some((u) => new URL(u).pathname === path)) results.push({ path, fails: ['noindex page is in the sitemap'], notes: [] });
    continue;
  }

  const fails = [];
  const notes = [];
  const check = (ok, msg, note) => {
    if (!ok) fails.push(msg);
    else if (note) notes.push(note);
  };
  const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1] ?? '';
  const kp = mark ? decodeURIComponent(mark[1]) : '';
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim();
  const desc = meta(html, 'name', 'description') ?? '';
  const canonical = attr(links(html, 'canonical')[0] ?? '', 'href') ?? '';
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  // Lists of data (every model on sale, with its price) are not prose: they do not count towards
  // the words and the keyphrase density, which measure what we wrote.
  const body = text(withoutSkipped(main));
  const bodyWords = words(body).length;
  const isHome = /^\/[a-z]{2}-[a-z]{2}\/$/.test(path);
  // Titles, descriptions and keyphrases are unique within an edition; the same page read in the
  // same language in another country is its regional twin (linked by hreflang), not a duplicate.
  const edition = path.split('/')[1];

  // Focus keyphrase
  check(Boolean(kp), 'no focus keyphrase declared');
  if (kp) {
    const n = content(kp).length;
    // A model's page is found by the model's full name, which can be longer.
    const most = engineSlugs.models[lang.slice(0, 2)] === path.split('/')[2] ? MODEL_KEYPHRASE_WORDS : 4;
    check(n >= 1 && n <= most, `keyphrase "${kp}" has ${n} content words (1-${most})`);
    const key = `${edition}|${norm(kp)}`;
    check(!seen.kp.has(key), `keyphrase "${kp}" already used by ${seen.kp.get(key)}`);
    seen.kp.set(key, path);
  }

  // Title
  const tw = titleWidth(title);
  check(tw >= TITLE_PX[0] && tw <= TITLE_PX[1], `title is ${tw}px wide (${TITLE_PX.join('-')}): "${title}"`, `title ${tw}px`);
  if (kp) check(startsWith(title, kp), `title does not start with the keyphrase "${kp}": "${title}"`);
  check(!seen.title.has(`${edition}|${title}`), `title also used by ${seen.title.get(`${edition}|${title}`)}`);
  seen.title.set(`${edition}|${title}`, path);

  // Description
  const dl = [...desc].length;
  check(dl >= DESC_CHARS[0] && dl <= DESC_CHARS[1], `description is ${dl} characters (${DESC_CHARS.join('-')}): "${desc}"`, `description ${dl} chars`);
  if (kp) {
    const times = countIn(desc, kp);
    check(times >= 1 && times <= 2, `description has the keyphrase ${times} times (1-2)`);
  }
  check(!seen.desc.has(`${edition}|${desc}`), `description also used by ${seen.desc.get(`${edition}|${desc}`)}`);
  seen.desc.set(`${edition}|${desc}`, path);

  // Slug
  // German addresses spell ü as ue (über → ueber), Swedish ones drop the dots (bästa → basta).
  const umlauts = (x) => x.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue');
  const slug = path.replace(/[/-]/g, ' ');
  if (kp && !isHome) check(hasAll(slug, kp) || hasAll(slug, umlauts(kp)), `the address ${path} does not contain "${kp}"`);

  // Headings
  const heads = [...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: text(m[2]) }));
  const h1 = heads.filter((h) => h.level === 1);
  check(h1.length === 1, `${h1.length} H1 headings (exactly 1)`);
  check(heads[0]?.level === 1, 'the first heading is not the H1');
  const subs = heads.filter((h) => h.level === 2 || h.level === 3);
  if (kp && subs.length > 1) {
    const pct = Math.round((subs.filter((h) => hasAll(h.text, kp)).length / subs.length) * 100);
    check(pct >= SUBHEADS[0] && pct <= SUBHEADS[1], `${pct}% of H2/H3 subheadings have the keyphrase (${SUBHEADS.join('-')}%): ${subs.map((h) => h.text).join(' | ')}`, `subheadings ${pct}%`);
  }

  // Introduction: the first paragraph of the content.
  const firstP = main.match(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/i);
  if (kp) check(firstP && countIn(text(firstP[1]), kp) > 0, `the first paragraph does not contain "${kp}": "${firstP ? text(firstP[1]) : ''}"`);

  // Length and keyphrase density
  check(bodyWords >= MIN_WORDS, `${bodyWords} words of content (at least ${MIN_WORDS})`, `${bodyWords} words`);
  if (kp) {
    const times = countIn(body, kp);
    const density = (times / Math.max(bodyWords, 1)) * 100;
    check(density >= DENSITY[0] && density <= DENSITY[1], `keyphrase found ${times} times in ${bodyWords} words = ${density.toFixed(2)}% (${DENSITY.join('-')}%)`, `density ${density.toFixed(2)}% (${times}×)`);
  }

  // Images in the content, with alt text. A product's picture (data-pic) is described by what it
  // shows, the model, never stuffed with the keyphrase; next to its written name it may be
  // decorative (alt=""). The keyphrase is counted on the page's other pictures.
  const imgs = [...main.matchAll(/<img\s[^>]*>/gi)].map((m) => m[0]);
  const isPic = (t) => /\sdata-pic[\s>=]/.test(t);
  const pictures = imgs.filter((t) => !isPic(t));
  check(pictures.length > 0, 'no image in the content');
  const noAlt = imgs.filter((t) => attr(t, 'alt') === undefined || (!isPic(t) && !attr(t, 'alt').trim()));
  check(noAlt.length === 0, `${noAlt.length} images without alt text`);
  if (kp && pictures.length) {
    const withKp = pictures.filter((t) => hasAll(attr(t, 'alt') ?? '', kp)).length;
    const ok = pictures.length < 5 ? withKp >= 1 : withKp / pictures.length >= 0.3 && withKp / pictures.length <= 0.7;
    check(ok, `${withKp} of ${pictures.length} image alt texts have the keyphrase`);
  }

  // Links: at least one to another page of ours and one to another site.
  const anchors = [...main.matchAll(/<a\s[^>]*>/gi)].map((m) => m[0]);
  const hrefs = anchors.map((t) => attr(t, 'href') ?? '');
  check(hrefs.some((h) => h.startsWith('/') && h !== path), 'no internal link in the content');
  check(anchors.some((t) => /^https?:\/\//.test(attr(t, 'href') ?? '') && !/nofollow/.test(attr(t, 'rel') ?? '')), 'no followed link to a source outside the site');

  // Technical head
  check(Boolean(lang), 'no lang attribute on <html>');
  check(canonical && new URL(canonical).pathname === path && canonical.startsWith('https://'), `canonical is "${canonical}"`);
  const alts = links(html, 'alternate').filter((t) => attr(t, 'hreflang'));
  check(alts.some((t) => attr(t, 'href') === canonical), 'hreflang list does not include the page itself');
  check(alts.some((t) => attr(t, 'hreflang') === 'x-default'), 'no x-default hreflang');
  check(inSitemap.has(canonical), 'not in the sitemap');
  check(/max-image-preview:large/.test(robots), 'robots meta does not allow large image previews');
  check(meta(html, 'property', 'og:title') === title, 'og:title differs from the title');
  check(meta(html, 'property', 'og:description') === desc, 'og:description differs from the description');
  check(meta(html, 'property', 'og:url') === canonical, 'og:url differs from the canonical');
  const og = meta(html, 'property', 'og:image') ?? '';
  check(og.startsWith('https://'), 'no absolute og:image');
  if (og.startsWith('https://')) {
    const local = join(DIST, decodeURIComponent(new URL(og).pathname));
    if (!existsSync(local)) fails.push(`og:image file missing: ${new URL(og).pathname}`);
    else {
      const [w, h] = pngSize(local);
      check(w === OG_SIZE[0] && h === OG_SIZE[1], `og:image is ${w}×${h} (${OG_SIZE.join('×')})`);
    }
  }
  check(Boolean(meta(html, 'property', 'og:image:alt')), 'no og:image:alt');
  check(meta(html, 'name', 'twitter:card') === 'summary_large_image', 'twitter:card is not summary_large_image');

  // Structured data
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const data = [];
  for (const b of blocks) {
    try {
      data.push(JSON.parse(b));
    } catch {
      fails.push('structured data that is not valid JSON');
    }
  }
  const types = data.map((d) => d['@type']);
  check(data.every((d) => d['@context'] === 'https://schema.org'), 'structured data without the schema.org context');
  check(types.includes('WebPage') || types.includes('CollectionPage') || types.includes('AboutPage') || types.includes('Article'), `no page entity in the structured data (${types.join(', ')})`);
  const page = data.find((d) => ['WebPage', 'CollectionPage', 'AboutPage', 'Article'].includes(d['@type']));
  if (page) {
    check(Boolean(page.primaryImageOfPage || page.image), 'the page entity has no image');
    check(Boolean(page.dateModified), 'the page entity has no dateModified');
  }
  if (!isHome) check(types.includes('BreadcrumbList'), 'no BreadcrumbList');

  results.push({ path, fails, notes, kp });
}

const bad = results.filter((r) => r.fails.length);
for (const r of results) {
  if (!r.fails.length && !verbose) continue;
  console.log(`${r.fails.length ? '✗' : '✓'} ${r.path}${r.kp ? `  [${r.kp}]` : ''}`);
  for (const f of r.fails) console.log(`    - ${f}`);
  if (verbose && r.notes.length) console.log(`    ${r.notes.join(' · ')}`);
}
console.log(`\nSEO ${site}: ${results.length - bad.length}/${results.length} pages green.`);
if (bad.length) process.exit(1);
