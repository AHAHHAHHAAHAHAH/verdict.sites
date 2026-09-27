import type { Edition } from '../i18n/editions';

/** The same page in another edition (language and country). */
export interface Alternate {
  ed: Edition;
  href: string;
}
