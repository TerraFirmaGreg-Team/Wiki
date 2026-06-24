#!/usr/bin/env node
/**
 * UI locale files are created manually by translators.
 * This script only validates that en_us.json exists.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_WIKI_LOCALE } from '../lib/tfg-locale-core.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, '../../.vitepress/i18n');
const templatePath = join(i18nDir, `${DEFAULT_WIKI_LOCALE}.json`);

if (!existsSync(templatePath)) {
  console.error(`Missing required UI locale template: ${templatePath}`);
  process.exit(1);
}

console.log(`UI locale template present: ${templatePath}`);
console.log('Other locale JSON files are created manually by translators.');
