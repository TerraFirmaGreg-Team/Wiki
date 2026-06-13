#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALE_BCP47 } from '../lib/tfg-locale-core.mjs';
import { loadWikiLanguageConfig } from '../lib/tfg-locale.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const i18nDir = join(root, '.vitepress/i18n');
const templatePath = join(i18nDir, 'en_us.json');
const translatedLocales = new Set(['zh_cn']);

const template = JSON.parse(readFileSync(templatePath, 'utf8'));
const { enabledLocales, localeNames } = loadWikiLanguageConfig();

for (const locale of enabledLocales) {
  const targetPath = join(i18nDir, `${locale}.json`);
  const existing = existsSync(targetPath)
    ? JSON.parse(readFileSync(targetPath, 'utf8'))
    : null;

  const base = translatedLocales.has(locale) && existing ? existing : structuredClone(template);
  base.label = localeNames[locale] ?? locale;
  base.lang = LOCALE_BCP47[locale] ?? locale.replace('_', '-');

  if (translatedLocales.has(locale) && existing) {
    base.label = existing.label ?? base.label;
    base.lang = existing.lang ?? base.lang;
  }

  writeFileSync(targetPath, `${JSON.stringify(base, null, 2)}\n`, 'utf8');
  console.log(`Synced ${targetPath}`);
}
