// URL slugs shared by every site, in every language. Pure data: astro.config imports it too.
export const engineSlugs = {
  home: { en: '', it: '', de: '', fr: '', es: '', pl: '', sv: '' },
  verdicts: { en: 'best', it: 'migliori', de: 'beste', fr: 'meilleurs', es: 'mejores', pl: 'najlepsze', sv: 'basta' },
  tools: { en: 'tools', it: 'strumenti', de: 'rechner', fr: 'outils', es: 'herramientas', pl: 'narzedzia', sv: 'verktyg' },
  offers: { en: 'deals', it: 'offerte', de: 'angebote', fr: 'promos', es: 'ofertas', pl: 'promocje', sv: 'erbjudanden' },
  models: { en: 'models', it: 'modelli', de: 'modelle', fr: 'modeles', es: 'modelos', pl: 'modele', sv: 'modeller' },
  brands: { en: 'brands', it: 'marche', de: 'marken', fr: 'marques', es: 'marcas', pl: 'marki', sv: 'varumarken' },
  guides: { en: 'guides', it: 'guide', de: 'ratgeber', fr: 'guides', es: 'guias', pl: 'poradniki', sv: 'guider' },
  about: { en: 'about', it: 'chi-siamo', de: 'ueber-uns', fr: 'a-propos', es: 'sobre-nosotros', pl: 'o-nas', sv: 'om-oss' },
  privacy: { en: 'privacy', it: 'privacy', de: 'datenschutz', fr: 'confidentialite', es: 'privacidad', pl: 'prywatnosc', sv: 'integritet' },
  legal: { en: 'legal-notice', it: 'note-legali', de: 'impressum', fr: 'mentions-legales', es: 'aviso-legal', pl: 'nota-prawna', sv: 'juridisk-information' },
} as const;

export type EngineKey = keyof typeof engineSlugs;
