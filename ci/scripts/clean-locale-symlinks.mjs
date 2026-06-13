#!/usr/bin/env node
import { lstatSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadWikiLanguageConfig } from '../lib/tfg-locale.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../../docs/modern');
const { enabledLocales } = loadWikiLanguageConfig();

for (const locale of enabledLocales) {
  const localeDir = join(root, locale);
  let entries;
  try {
    entries = readdirSync(localeDir);
  } catch {
    continue;
  }

  for (const entry of entries) {
    if (entry === 'index.md') {
      continue;
    }
    const target = join(localeDir, entry);
    try {
      if (lstatSync(target).isSymbolicLink()) {
        rmSync(target);
      }
    } catch {
      continue;
    }
  }
}
