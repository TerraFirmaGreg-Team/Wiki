import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export * from './tfg-locale-core.mjs';

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
