import { defineConfig, devices } from '@playwright/test';

// Tests run against one built site: SITE=floor npx playwright test (default: cup).
const SITE = process.env.SITE ?? 'cup';
// First edition of each site: the server is ready when its home answers.
const firstEdition: Record<string, string> = { cup: 'en-us', floor: 'it-it', clima: 'it-it' };

export default defineConfig({
  testDir: './tests',
  testMatch: ['common*.spec.ts', `${SITE}.spec.ts`],
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    // Own port: never reuse a dev server someone has open on 4321.
    baseURL: 'http://localhost:4323',
    channel: 'chrome',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome' } },
  ],
  webServer: {
    command: `node scripts/serve.mjs ${SITE} --port 4323`,
    url: `http://localhost:4323/${firstEdition[SITE] ?? 'en-us'}/`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
