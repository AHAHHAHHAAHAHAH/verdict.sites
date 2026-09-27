import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { engineSlugs } from './src/i18n/slugs';
import { marketMeta, type Market } from './src/i18n/markets';

// One engine, three sites: SITE picks the pack in src/sites/<site>/ (scripts/run.mjs sets it).
const SITE = process.env.SITE ?? 'cup';
const packDir = fileURLToPath(new URL(`./src/sites/${SITE}/`, import.meta.url));
if (!existsSync(packDir)) throw new Error(`Unknown site "${SITE}": no folder src/sites/${SITE}/`);
const { site } = await import(`./src/sites/${SITE}/config.ts`);
// Every page is rebuilt from the catalogue, so its check date is the pages' last change.
const { catalog } = await import(`./src/sites/${SITE}/catalog.ts`);
const lastmod = new Date(catalog.checked).toISOString();

// Pages that show the operator's identity stay out of search engines (see ProsePage), and so do
// the calculators (nobody searches for them, the keyword research found: they are tools used
// from the pages that are). Deals pages are searched for ("offerte macchina caffè") and decide by
// themselves (noindex with fewer than three discounts). Every address starts with its edition
// ("/it-it/"), so the page is told by the word that follows.
const hidden = new Set<string>([
  ...Object.values(engineSlugs.legal),
  ...Object.values(engineSlugs.privacy),
  ...Object.values(engineSlugs.tools),
]);
// A language read in a country other than its own (and not English) is for visitors who choose it
// (src/i18n/editions.ts): only each country's own language and, where the site indexes it, English are listed.
const indexedEditions = new Set<string>(
  (site.markets as Market[]).flatMap((m) => [`${marketMeta[m].lang}-${m}`, ...(site.english && site.englishIndexed ? [`en-${m}`] : [])]),
);
const isNoindex = (path: string) => !indexedEditions.has(path.split('/')[1] ?? '') || hidden.has(path.split('/')[2] ?? '');

// Security headers for every page (Cloudflare reads _headers from the site's root): no framing, no
// MIME sniffing, no powerful browser features, https only, and a policy that lets scripts and
// styles come only from the site itself (Astro adds the hashes of its own inline ones to each page).
const thirdParty = {
  script: [...(site.analytics ? ['https://static.cloudflareinsights.com'] : []), ...(site.adsense ? ['https://pagead2.googlesyndication.com', 'https://*.googlesyndication.com', 'https://*.google.com', 'https://*.doubleclick.net', 'https://*.gstatic.com', 'https://*.adtrafficquality.google'] : [])],
  connect: [...(site.analytics ? ['https://cloudflareinsights.com'] : []), ...(site.adsense ? ['https://*.google.com', 'https://*.googlesyndication.com', 'https://*.doubleclick.net', 'https://*.adtrafficquality.google'] : [])],
  frame: site.adsense ? ['https://*.googlesyndication.com', 'https://*.doubleclick.net', 'https://*.google.com'] : [],
  img: site.adsense ? ['https://*.googlesyndication.com', 'https://*.doubleclick.net', 'https://*.google.com', 'https://*.gstatic.com'] : [],
};
const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), hid=(), browsing-topics=()
  Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/img/*
  Cache-Control: public, max-age=604800
`;

export default defineConfig({
  site: site.url,
  outDir: `./dist/${SITE}`,
  publicDir: `./src/sites/${SITE}/public`,
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        `img-src 'self' data: ${thirdParty.img.join(' ')}`.trim() as `img-src${string}`,
        "font-src 'self'",
        `connect-src 'self' ${thirdParty.connect.join(' ')}`.trim() as `connect-src${string}`,
        `frame-src ${thirdParty.frame.length ? thirdParty.frame.join(' ') : "'none'"}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", ...thirdParty.script] },
      // Styles carry no script: the site's own sheets, the page transition's small <style> blocks
      // (they differ from page to page, so they cannot be hashed ahead) and style attributes.
      styleDirective: {
        resources: ["'self'", { resource: "'self'", kind: 'element' }, { resource: "'unsafe-inline'", kind: 'element' }, { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  integrations: [
    {
      name: 'security-headers-and-routes',
      hooks: {
        'astro:build:done': ({ dir }) => {
          writeFileSync(new URL('_headers', dir), headers);
          // Only /api/* runs a Pages Function (functions/api/out.js); every page stays a plain file,
          // served without counting against the Functions quota.
          writeFileSync(new URL('_routes.json', dir), `${JSON.stringify({ version: 1, include: ['/api/*'], exclude: [] })}\n`);
        },
      },
    },
    sitemap({
      serialize: (item) => ({ ...item, lastmod }),
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/' && !isNoindex(path);
      },
    }),
    // A page can decide by itself to stay out of search engines (a model page whose words another
    // page already uses): it leaves the sitemap too. Runs after the sitemap is written.
    {
      name: 'sitemap-without-noindex',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const root = fileURLToPath(dir);
          for (const f of readdirSync(root).filter((x) => /^sitemap-\d+\.xml$/.test(x))) {
            const xml = readFileSync(join(root, f), 'utf8');
            const kept = xml.replace(/<url>[\s\S]*?<\/url>/g, (u) => {
              const loc = u.match(/<loc>([^<]+)<\/loc>/)?.[1];
              const page = loc ? join(root, decodeURIComponent(new URL(loc).pathname), 'index.html') : '';
              return page && existsSync(page) && /<meta name="robots" content="noindex/.test(readFileSync(page, 'utf8')) ? '' : u;
            });
            writeFileSync(join(root, f), kept);
          }
        },
      },
    },
  ],
  vite: {
    resolve: { alias: [{ find: /^@site\//, replacement: packDir }] },
    // Every script in its own file: a page reached through the client router keeps the first page's
    // policy, which could not know another page's inline script.
    build: { assetsInlineLimit: 0 },
  },
});
