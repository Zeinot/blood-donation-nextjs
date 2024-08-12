export const locales = ['en', 'fr', "ar"] as const;
import {LocalePrefix} from 'next-intl/routing';
 
export const localePrefix = 'always' satisfies LocalePrefix;
 
// ...