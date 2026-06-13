import {
  localeBasePath,
  parseLocaleFromPath,
  resolveWikiLocalePreference,
  rewritePathToContentLocale as rewritePathToContentLocaleCore,
  WIKI_UI_LOCALES,
  writeSavedWikiLocale,
} from '../../ci/lib/tfg-locale-core.mjs'

declare const __WIKI_CONTENT_LOCALES__: readonly string[]

export { resolveWikiLocalePreference, localeBasePath } from '../../ci/lib/tfg-locale-core.mjs'

export type WikiLocale = (typeof WIKI_UI_LOCALES)[number]

export function rewritePathToContentLocale(pathname: string): string {
  return rewritePathToContentLocaleCore(pathname, __WIKI_CONTENT_LOCALES__)
}

export function persistLocaleFromPath(pathname: string): WikiLocale | null {
  const locale = parseLocaleFromPath(pathname)
  if (locale && typeof localStorage !== 'undefined') {
    writeSavedWikiLocale(localStorage, locale)
  }
  return locale
}
