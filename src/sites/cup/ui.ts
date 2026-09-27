// Engine text plus CupVerdict's own calculator copy, typed for the cup components.
import { t as engineT } from '../../i18n/ui';
import type { Locale } from '../../i18n/all-locales';
import type { CupStrings } from './strings';

export const t = (lang: Locale) => engineT(lang) as ReturnType<typeof engineT> & CupStrings;
