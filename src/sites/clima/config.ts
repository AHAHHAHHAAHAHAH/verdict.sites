import type { SiteConfig } from '../../lib/pack';

export const site: SiteConfig = {
  key: 'clima',
  name: 'ClimaVerdict',
  domain: 'climaverdict.com',
  url: 'https://climaverdict.com',
  // Sweden is left out: dehumidifiers and portable air conditioners get almost no purchase
  // searches there (Keyword Planner, 25/09/2026). Italy first (the default for search engines).
  markets: ['it', 'fr', 'es', 'de', 'pl'],
  english: true,
  // English dehumidifier and heater searches in these countries are few; the English pages stay for visitors.
  englishIndexed: false,
  clickCount: true,
  amazonAssociate: false,
  amazonTags: {},
  themeColor: '#0c1719',
};
