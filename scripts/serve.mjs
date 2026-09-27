// Serves one built site from dist/<site>, the way Cloudflare Pages will: folders answer with their
// index.html, a folder asked without its slash is redirected, anything else gets 404.html.
// Unlike `astro preview` it has no one-server-per-project lock, so the three sites and the tests
// can run side by side: node scripts/serve.mjs <cup|floor|clima> [--port N]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { createGzip } from 'node:zlib';

const [site, ...rest] = process.argv.slice(2);
const root = join(process.cwd(), 'dist', site ?? '');
if (!site || !existsSync(root)) {
  console.error(`Usage: node scripts/serve.mjs <site> [--port N]. No build found at ${root}`);
  process.exit(1);
}
const portAt = rest.indexOf('--port');
const port = portAt >= 0 ? Number(rest[portAt + 1]) : 4321;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

// Text is sent compressed, as Cloudflare does, so speed measured here is the speed visitors get.
const compressible = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest']);
function send(req, res, file, status = 200) {
  const headers = { 'content-type': types[extname(file)] ?? 'application/octet-stream' };
  if (compressible.has(extname(file)) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
    res.writeHead(status, { ...headers, 'content-encoding': 'gzip', vary: 'accept-encoding' });
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }
  res.writeHead(status, headers);
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  const file = join(root, path);
  if (!file.startsWith(root)) {
    res.writeHead(400).end();
    return;
  }
  if (existsSync(file) && statSync(file).isFile()) return send(req, res, file);
  if (existsSync(join(file, 'index.html'))) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    return send(req, res, join(file, 'index.html'));
  }
  const notFound = join(root, '404.html');
  if (existsSync(notFound)) return send(req, res, notFound, 404);
  res.writeHead(404).end('Not found');
}).listen(port, () => console.log(`${site}: http://localhost:${port}/`));
