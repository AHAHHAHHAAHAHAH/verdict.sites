// Every fact, price and test result links a source: this checks each one still answers.
//   node scripts/check-sources.mjs cup floor clima
// A dead source means a fact nobody can verify any more: the weekly job flags it for a person.
import { pathToFileURL } from 'node:url';
import './ts-resolve.mjs';

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Verdict source check' };
let dead = 0;
for (const site of process.argv.slice(2)) {
  const { catalog } = await import(pathToFileURL(`src/sites/${site}/catalog.ts`).href);
  const urls = new Map();
  for (const p of catalog.products) {
    for (const f of p.facts) urls.set(f.source, p.id);
    for (const pr of Object.values(p.price ?? {})) urls.set(pr.source, p.id);
    if (p.lab) urls.set(p.lab.source, p.id);
  }
  for (const [url, id] of urls) {
    let status;
    try {
      status = (await fetch(url, { headers: UA, redirect: 'follow' })).status;
    } catch (e) {
      status = e.message;
    }
    // 403 from sites that refuse automated reads is not a dead page; it is reported apart.
    const flag = status === 200 ? 'ok ' : status === 403 ? '403' : 'DEAD';
    if (flag === 'DEAD') dead++;
    if (flag !== 'ok ') console.log(`${flag} ${site} ${id}: ${url} (${status})`);
  }
  console.log(`${site}: ${urls.size} sources checked`);
}
console.log(`${dead} dead`);
if (dead) process.exit(2);
