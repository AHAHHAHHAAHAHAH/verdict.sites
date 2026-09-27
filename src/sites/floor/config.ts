import type { SiteConfig } from '../../lib/pack';

export const site: SiteConfig = {
  key: 'floor',
  name: 'FloorVerdict',
  domain: 'floorverdict.com',
  url: 'https://floorverdict.com',
  // Italy first (the default for search engines).
  markets: ['it', 'fr', 'es', 'pl', 'se'],
  english: true,
  englishIndexed: false,
  clickCount: true,
  amazonAssociate: false,
  amazonTags: {},
  themeColor: '#0b1014',
};
