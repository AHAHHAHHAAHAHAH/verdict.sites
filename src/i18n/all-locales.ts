// Every language the engine can speak. Kept free of imports so site configs can use it.
export const allLocales = ['en', 'it', 'de', 'fr', 'es', 'pl', 'sv'] as const;
export type Locale = (typeof allLocales)[number];

// A text in several languages; each site must fill every language it publishes
// (checked at build time by assertComplete in lib/pack.ts).
export type T = Partial<Record<Locale, string>>;
