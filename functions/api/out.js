// Cloudflare Pages Function: counts one click from one of our pages to a store (src/scripts/clicks.ts).
// One row per day, page and store in the D1 database bound as CLICKS (scripts/clicks.sql); nothing
// about the visitor is read or kept. Only our own pages may send it, and only a page address and a
// host name are accepted, so nobody can store anything else through it.

const PAGE = /^\/[a-z]{2}-[a-z]{2}\/[a-z0-9\-/%._]{0,200}$/;
const HOST = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;
const done = (status) => new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  const from = request.headers.get('Sec-Fetch-Site');
  const origin = request.headers.get('Origin');
  if ((from && from !== 'same-origin') || (origin && origin !== new URL(request.url).origin)) return done(403);
  const text = await request.text();
  if (text.length > 400) return done(413);
  let click;
  try {
    click = JSON.parse(text);
  } catch {
    return done(400);
  }
  const { p, h } = click ?? {};
  if (typeof p !== 'string' || typeof h !== 'string' || !PAGE.test(p) || h.length > 100 || !HOST.test(h)) return done(400);
  if (env.CLICKS) {
    const day = new Date().toISOString().slice(0, 10);
    await env.CLICKS.prepare('INSERT INTO clicks (day, page, store, n) VALUES (?1, ?2, ?3, 1) ON CONFLICT (day, page, store) DO UPDATE SET n = n + 1')
      .bind(day, p, h)
      .run();
  }
  return done(204);
}
