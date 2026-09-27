# Verdict sites

One Astro engine behind three buying guides: FloorVerdict (floor cleaning), ClimaVerdict (home
climate) and CupVerdict (coffee). Each site lives in `src/sites/<site>/`: its catalogue, its words in
every language, the independent test results it quotes and the models on sale in the brands' own
stores, read every morning.

```sh
npm ci
node scripts/run.mjs floor build      # build one site; the SEO check runs after it
node scripts/serve.mjs floor          # serve the build locally
SITE=floor npx playwright test        # the site's tests
```

Store links are affiliate links where a brand runs a program; the pages say so. Nothing on the sites
is "tested by us": test results come from the independent testers named next to them, with their
sources.
