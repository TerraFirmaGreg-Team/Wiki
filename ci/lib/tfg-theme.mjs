/** @typedef {'light' | 'dark' | 'auto'} TfgThemePreference */

export const TFG_THEME_KEY = 'tfg-theme';

/**
 * @param {string | null | undefined} value
 * @returns {TfgThemePreference | null}
 */
export function normalizeTfgThemePreference(value) {
  return value === 'light' || value === 'dark' || value === 'auto' ? value : null;
}

/**
 * @param {Pick<Storage, 'getItem'>} storage
 * @returns {TfgThemePreference}
 */
export function readTfgThemePreference(storage) {
  return normalizeTfgThemePreference(storage.getItem(TFG_THEME_KEY)) ?? 'auto';
}

/**
 * @param {TfgThemePreference} preference
 * @param {(query: string) => { matches: boolean }} [matchMedia]
 * @returns {'light' | 'dark'}
 */
export function resolveTfgTheme(preference, matchMedia = globalThis.matchMedia?.bind(globalThis)) {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }

  const media = matchMedia?.('(prefers-color-scheme: dark)');
  if (media && typeof media.matches === 'boolean') {
    return media.matches ? 'dark' : 'light';
  }

  return 'dark';
}

/**
 * @param {Pick<Storage, 'setItem'>} storage
 * @param {TfgThemePreference} preference
 */
export function writeTfgThemePreference(storage, preference) {
  const normalized = normalizeTfgThemePreference(preference);
  if (!normalized) {
    return;
  }
  storage.setItem(TFG_THEME_KEY, normalized);
}

/**
 * Inline script for VitePress <head> to avoid a flash of the wrong theme.
 */
export function buildVitePressBootstrapScript() {
  return `(()=>{const K='${TFG_THEME_KEY}';function n(v){return v==='light'||v==='dark'||v==='auto'?v:null}function r(p){if(p==='light'||p==='dark')return p;return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}const d=r(n(localStorage.getItem(K))||'auto');if(d==='dark')document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=d})();`;
}
