// Runs an Astro command for one site: node scripts/run.mjs <cup|floor|clima> <dev|build|preview|check> [args]
// A build is followed by the SEO gate (scripts/check-seo.mjs): a page that is not green fails it.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const [site, ...args] = process.argv.slice(2);
if (!site || !existsSync(new URL(`../src/sites/${site}/`, import.meta.url))) {
  console.error(`Usage: node scripts/run.mjs <site> <astro command>. Unknown site: "${site ?? ''}"`);
  process.exit(1);
}
const child = spawn('npx', ['astro', ...args], { stdio: 'inherit', shell: true, env: { ...process.env, SITE: site } });
child.on('exit', (code) => {
  if (code !== 0 || args[0] !== 'build') process.exit(code ?? 1);
  // A build is only done when every indexable page passes the SEO checks.
  const seo = spawn(process.execPath, ['scripts/check-seo.mjs', site], { stdio: 'inherit' });
  seo.on('exit', (c) => process.exit(c ?? 1));
});
