/** @typedef {'en_us' | 'zh_cn' | 'pt_br'} WikiLocale */

export const TFG_LOCALE_KEY = 'tfg-locale';

/** @type {readonly WikiLocale[]} */
export const WIKI_LOCALES = ['en_us', 'zh_cn', 'pt_br'];

export const WIKI_NAMESPACE = 'modern';

/** @type {WikiLocale} */
export const DEFAULT_WIKI_LOCALE = 'en_us';

const LOCALE_PATH_RE = /^\/modern\/(en_us|zh_cn|pt_br)(?:\/|$)/;

/**
 * @param {string | null | undefined} value
 * @returns {WikiLocale | null}
 */
export function normalizeWikiLocale(value) {
  return WIKI_LOCALES.includes(/** @type {WikiLocale} */ (value)) ? /** @type {WikiLocale} */ (value) : null;
}

/**
 * @param {string} pathname
 * @returns {WikiLocale | null}
 */
export function parseLocaleFromPath(pathname) {
  const match = pathname.match(LOCALE_PATH_RE);
  return match ? normalizeWikiLocale(match[1]) : null;
}

/**
 * @param {WikiLocale} locale
 * @returns {string}
 */
export function localeBasePath(locale) {
  return `/${WIKI_NAMESPACE}/${locale}/`;
}

/**
 * @param {Navigator} [navigator]
 * @returns {WikiLocale}
 */
export function detectBrowserLocale(navigator = globalThis.navigator) {
  const langs = navigator?.languages?.length ? navigator.languages : [navigator?.language || 'en'];
  for (const raw of langs) {
    const lang = raw.toLowerCase();
    if (lang.startsWith('zh')) {
      return 'zh_cn';
    }
    if (lang.startsWith('pt')) {
      return 'pt_br';
    }
    if (lang.startsWith('en')) {
      return 'en_us';
    }
  }
  return DEFAULT_WIKI_LOCALE;
}

/**
 * @param {Pick<Storage, 'getItem'>} storage
 * @returns {WikiLocale | null}
 */
export function readSavedWikiLocale(storage) {
  return normalizeWikiLocale(storage.getItem(TFG_LOCALE_KEY));
}

/**
 * @param {Pick<Storage, 'setItem'>} storage
 * @param {WikiLocale} locale
 */
export function writeSavedWikiLocale(storage, locale) {
  const normalized = normalizeWikiLocale(locale);
  if (normalized) {
    storage.setItem(TFG_LOCALE_KEY, normalized);
  }
}

/**
 * @param {Pick<Storage, 'getItem'>} storage
 * @param {Navigator} [navigator]
 * @returns {WikiLocale}
 */
export function resolveWikiLocalePreference(storage, navigator = globalThis.navigator) {
  return readSavedWikiLocale(storage) ?? detectBrowserLocale(navigator);
}

/**
 * Inline script for the wiki root page to redirect before paint.
 */
export function buildLocaleRedirectScript() {
  return `(()=>{const p=location.pathname;if(p!=='/'&&p!=='')return;const K='${TFG_LOCALE_KEY}';const L=${JSON.stringify(WIKI_LOCALES)};function n(v){return L.includes(v)?v:null}function d(){const ls=navigator.languages?.length?navigator.languages:[navigator.language||'en'];for(const raw of ls){const l=raw.toLowerCase();if(l.startsWith('zh'))return'zh_cn';if(l.startsWith('pt'))return'pt_br';if(l.startsWith('en'))return'en_us'}return'${DEFAULT_WIKI_LOCALE}'}const loc=n(localStorage.getItem(K))??d();location.replace('/${WIKI_NAMESPACE}/'+loc+'/')})();`;
}
