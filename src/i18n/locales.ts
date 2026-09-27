import { allLocales, type Locale } from './all-locales';

export { allLocales, type Locale };

/** Each language, named in itself (the language menu lists them this way). */
export const languageName: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  pl: 'Polski',
  sv: 'Svenska',
};
