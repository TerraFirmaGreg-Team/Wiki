import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export * from './tfg-locale-core.mjs';

import {
  DEFAULT_WIKI_LOCALE,
  WIKI_NAMESPACE,
  WIKI_UI_LOCALES,
  resolveContentLocale as resolveContentLocaleCore,
} from './tfg-locale-core.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIKI_ROOT = join(__dirname, '../..');

export function loadWikiLanguageConfig(configPath = join(WIKI_ROOT, 'language.json')) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const enabledLocales = (config.enabledLocales ?? []).map((locale) => String(locale));
  const localeNames = config.localeNames ?? {};
  const defaultLocale = String(config.defaultLocale ?? 'en_us');

  if (!enabledLocales.length) {
    throw new Error('language.json: enabledLocales must not be empty');
  }
  if (!enabledLocales.includes(defaultLocale)) {
    throw new Error(`language.json: defaultLocale ${defaultLocale} is not enabled`);
  }

  return { enabledLocales, localeNames, defaultLocale };
}

export function getWikiContentLocales(docsRoot) {
  const modernDir = join(docsRoot, WIKI_NAMESPACE);
  if (!existsSync(modernDir)) {
    return [DEFAULT_WIKI_LOCALE];
  }

  return readdirSync(modernDir)
    .filter((entry) => {
      if (!WIKI_UI_LOCALES.includes(entry)) {
        return false;
      }
      return existsSync(join(modernDir, entry));
    })
    .sort((left, right) => WIKI_UI_LOCALES.indexOf(left) - WIKI_UI_LOCALES.indexOf(right));
}

export function resolveContentLocale(
  locale,
  contentLocales = getWikiContentLocales(join(WIKI_ROOT, 'docs')),
) {
  return resolveContentLocaleCore(locale, contentLocales);
}

export function rewritePathToContentLocale(
  pathname,
  contentLocales = getWikiContentLocales(join(WIKI_ROOT, 'docs')),
) {
  const locale = pathname.match(new RegExp(`^/${WIKI_NAMESPACE}/([^/]+)`))?.[1] ?? null;
  const normalized = WIKI_UI_LOCALES.includes(locale) ? locale : null;
  if (!normalized) {
    return pathname;
  }

  const contentLocale = resolveContentLocaleCore(normalized, contentLocales);
  if (contentLocale === normalized) {
    return pathname;
  }

  return pathname.replace(`/${WIKI_NAMESPACE}/${normalized}`, `/${WIKI_NAMESPACE}/${contentLocale}`);
}
