import languageConfig from '../../language.json' with { type: 'json' };

export const TFG_LOCALE_KEY = 'tfg-locale';

export const WIKI_NAMESPACE = 'modern';

export const LOCALE_BCP47 = {
  en_us: 'en-US',
  de_de: 'de-DE',
  es_es: 'es-ES',
  fr_fr: 'fr-FR',
  hu_hu: 'hu-HU',
  ja_jp: 'ja-JP',
  ko_kr: 'ko-KR',
  pl_pl: 'pl-PL',
  pt_br: 'pt-BR',
  ru_ru: 'ru-RU',
  sv_se: 'sv-SE',
  tr_tr: 'tr-TR',
  uk_ua: 'uk-UA',
  zh_cn: 'zh-CN',
  zh_hk: 'zh-HK',
  zh_tw: 'zh-TW',
};

export const WIKI_UI_LOCALES = languageConfig.enabledLocales;

export const DEFAULT_WIKI_LOCALE = languageConfig.defaultLocale;

export const WIKI_LOCALES = WIKI_UI_LOCALES;

const LOCALE_PATH_RE = new RegExp(
  `^/${WIKI_NAMESPACE}/(${WIKI_UI_LOCALES.join('|')})(?:/|$)`,
);

const LOCALE_DETECT_RULES = [
  { prefix: 'zh-hk', locale: 'zh_hk' },
  { prefix: 'zh-tw', locale: 'zh_tw' },
  { prefix: 'zh', locale: 'zh_cn' },
  { prefix: 'pt', locale: 'pt_br' },
  { prefix: 'de', locale: 'de_de' },
  { prefix: 'es', locale: 'es_es' },
  { prefix: 'fr', locale: 'fr_fr' },
  { prefix: 'hu', locale: 'hu_hu' },
  { prefix: 'ja', locale: 'ja_jp' },
  { prefix: 'ko', locale: 'ko_kr' },
  { prefix: 'pl', locale: 'pl_pl' },
  { prefix: 'ru', locale: 'ru_ru' },
  { prefix: 'sv', locale: 'sv_se' },
  { prefix: 'tr', locale: 'tr_tr' },
  { prefix: 'uk', locale: 'uk_ua' },
  { prefix: 'en', locale: 'en_us' },
];

export function normalizeWikiLocale(value) {
  return WIKI_UI_LOCALES.includes(value) ? value : null;
}

export function parseLocaleFromPath(pathname) {
  const match = pathname.match(LOCALE_PATH_RE);
  return match ? normalizeWikiLocale(match[1]) : null;
}

export function localeBasePath(locale) {
  return `/${WIKI_NAMESPACE}/${locale}/`;
}

export function detectBrowserLocale(navigator = globalThis.navigator) {
  const langs = navigator?.languages?.length ? navigator.languages : [navigator?.language || 'en'];
  for (const raw of langs) {
    const lang = raw.toLowerCase();
    for (const rule of LOCALE_DETECT_RULES) {
      if (lang === rule.prefix || lang.startsWith(`${rule.prefix}-`)) {
        return rule.locale;
      }
    }
  }
  return DEFAULT_WIKI_LOCALE;
}

export function readSavedWikiLocale(storage) {
  return normalizeWikiLocale(storage.getItem(TFG_LOCALE_KEY));
}

export function writeSavedWikiLocale(storage, locale) {
  const normalized = normalizeWikiLocale(locale);
  if (normalized) {
    storage.setItem(TFG_LOCALE_KEY, normalized);
  }
}

export function resolveWikiLocalePreference(storage, navigator = globalThis.navigator) {
  return readSavedWikiLocale(storage) ?? detectBrowserLocale(navigator);
}

export function buildLocaleRedirectScript() {
  const uiLocalesJson = JSON.stringify(WIKI_UI_LOCALES);
  const detectRulesJson = JSON.stringify(
    LOCALE_DETECT_RULES.map((rule) => [rule.prefix, rule.locale]),
  );

  return `(()=>{const p=location.pathname;if(p!=='/'&&p!=='')return;const K='${TFG_LOCALE_KEY}';const UI=${uiLocalesJson};const RULES=${detectRulesJson};const DEFAULT='${DEFAULT_WIKI_LOCALE}';function n(v){return UI.includes(v)?v:null}function d(){const ls=navigator.languages?.length?navigator.languages:[navigator.language||'en'];for(const raw of ls){const l=raw.toLowerCase();for(const [prefix,locale] of RULES){if(l===prefix||l.startsWith(prefix+'-'))return locale}}return DEFAULT}const loc=n(localStorage.getItem(K))??d();location.replace('/${WIKI_NAMESPACE}/'+loc+'/')})();`;
}

export function localeHreflang(locale) {
  return LOCALE_BCP47[locale]?.split('-')[0] ?? locale;
}

export { LOCALE_DETECT_RULES };
