import { parseLocaleFromPath, writeSavedWikiLocale } from '../../ci/lib/tfg-locale.mjs'

export { resolveWikiLocalePreference, localeBasePath } from '../../ci/lib/tfg-locale.mjs'

export type WikiLocale = 'en_us' | 'zh_cn' | 'pt_br'

export function persistLocaleFromPath(pathname: string): WikiLocale | null {
  const locale = parseLocaleFromPath(pathname)
  if (locale && typeof localStorage !== 'undefined') {
    writeSavedWikiLocale(localStorage, locale)
  }
  return locale
}
