import { sortLangCodes } from '@terrafirmagreg-team/translate/lib/code';
import { locales } from '@terrafirmagreg-team/translate/locales';

export const localeCatalogs: Record<string, unknown>[] = Object.values(locales);

export const knownLanguages = sortLangCodes([
  ...new Set(localeCatalogs.flatMap((catalog) => Object.keys(catalog))),
]);
