import {
  localeBasePath,
  parseLocaleFromPath,
  resolveWikiLocalePreference,
  writeSavedWikiLocale,
} from '../../ci/lib/tfg-locale-core.mjs'

export { resolveWikiLocalePreference, localeBasePath } from '../../ci/lib/tfg-locale-core.mjs'

export type WikiLocale = import('../../ci/lib/tfg-locale-core.mjs').WikiLocale

export function persistLocaleFromPath(pathname: string): WikiLocale | null {
  const locale = parseLocaleFromPath(pathname)
  if (locale && typeof localStorage !== 'undefined') {
    writeSavedWikiLocale(localStorage, locale)
  }
  return locale
}
