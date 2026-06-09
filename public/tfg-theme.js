/**
 * Shared light/dark preference for wiki.terrafirmagreg.team.
 * Keep in sync with Wiki/ci/lib/tfg-theme.mjs
 */
(() => {
  'use strict';

  const TFG_THEME_KEY = 'tfg-theme';

  function normalizeTfgThemePreference(value) {
    return value === 'light' || value === 'dark' || value === 'auto' ? value : null;
  }

  function readTfgThemePreference() {
    return normalizeTfgThemePreference(localStorage.getItem(TFG_THEME_KEY)) ?? 'auto';
  }

  function resolveTfgTheme(preference = readTfgThemePreference()) {
    if (preference === 'light' || preference === 'dark') {
      return preference;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function writeTfgThemePreference(preference) {
    const normalized = normalizeTfgThemePreference(preference);
    if (!normalized) {
      return;
    }
    localStorage.setItem(TFG_THEME_KEY, normalized);
  }

  globalThis.TFGTheme = {
    key: TFG_THEME_KEY,
    readPreference: readTfgThemePreference,
    resolve: resolveTfgTheme,
    writePreference: writeTfgThemePreference,
  };
})();
