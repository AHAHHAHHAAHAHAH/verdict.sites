import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { allLocales } from './i18n/all-locales';

// Each site keeps its own copy under src/sites/<site>/content.
const SITE = process.env.SITE ?? 'cup';
const lang = z.enum(allLocales);

// Copy for fixed pages (tools, about, privacy, legal), one file per key per language.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `./src/sites/${SITE}/content/pages` }),
  schema: z.object({
    key: z.string(),
    lang,
    title: z.string(),
    description: z.string(),
    noindex: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: `./src/sites/${SITE}/content/articles` }),
  schema: z.object({
    lang,
    slug: z.string(),
    translationKey: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['guide', 'comparison', 'seasonal', 'study', 'problem']),
    updated: z.coerce.date(),
    tools: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, articles };
