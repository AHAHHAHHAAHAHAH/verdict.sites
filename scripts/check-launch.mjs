// Blocks a production build while legally required data is missing
// or while the public contact address cannot receive mail.
import { readFileSync } from 'node:fs';
import { resolveMx } from 'node:dns/promises';

// Operator and contact are shared by every site (src/lib/webora.ts).
const config = readFileSync(new URL('../src/lib/webora.ts', import.meta.url), 'utf8');
const name = config.match(/operator:\s*\{\s*name:\s*'([^']*)'/)?.[1] ?? '';
const contact = config.match(/contactEmail\s*[:=]\s*'([^']*)'/)?.[1] ?? '';

if (!name.trim()) {
  console.error('Launch check failed: site.operator.name is empty (legal notice / GDPR controller).');
  process.exit(1);
}

// The footer and the about page publish contactEmail: its domain must accept mail
// (Cloudflare Email Routing adds route*.mx.cloudflare.net). A DNS outage only warns,
// so the build never depends on the network being up.
const domain = contact.split('@')[1];
if (domain) {
  try {
    const mx = await resolveMx(domain);
    if (mx.length === 0) throw Object.assign(new Error('no MX'), { code: 'ENODATA' });
  } catch (error) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      console.error(`Launch check failed: ${domain} has no MX record, so ${contact} cannot receive mail. Turn on Email Routing for ${domain}.`);
      process.exit(1);
    }
    console.warn(`Launch check warning: could not look up MX for ${domain} (${error.code ?? error.message}).`);
  }
}
console.log('Launch check passed.');
