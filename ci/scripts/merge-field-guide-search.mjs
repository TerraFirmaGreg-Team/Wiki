#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  FIELD_GUIDE_SITE_ID,
  findLocalSearchIndexChunkPaths,
  mergeFieldGuideRecordsIntoChunk,
  WIKI_LOCALES,
} from '../lib/search-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const distDir = process.argv[2] ?? join(root, '.vitepress/dist');
const fieldGuideRoot = join(distDir, FIELD_GUIDE_SITE_ID);

if (!existsSync(distDir)) {
  console.error(`::error::Missing dist directory: ${distDir}`);
  process.exit(1);
}

if (!existsSync(fieldGuideRoot)) {
  console.warn(`Skipping ${FIELD_GUIDE_SITE_ID} search merge: not installed under ${fieldGuideRoot}`);
  process.exit(0);
}

const chunkPaths = findLocalSearchIndexChunkPaths(distDir);
let totalMerged = 0;

for (const locale of WIKI_LOCALES) {
  const chunkPath = chunkPaths.get(locale);
  if (!chunkPath) {
    console.warn(`Skipping locale ${locale}: local search chunk not found`);
    continue;
  }

  const searchIndexPath = join(fieldGuideRoot, locale, 'search_index.json');
  if (!existsSync(searchIndexPath)) {
    console.warn(`Skipping locale ${locale}: missing ${searchIndexPath}`);
    continue;
  }

  /** @type {Array<{ entry?: string; content?: string; url?: string }>} */
  const records = JSON.parse(readFileSync(searchIndexPath, 'utf8'));
  const mergedCount = mergeFieldGuideRecordsIntoChunk(chunkPath, records, FIELD_GUIDE_SITE_ID, locale);
  totalMerged += mergedCount;
  const dedupedFrom = records.length !== mergedCount ? ` (${records.length} raw rows)` : '';
  console.log(`Merged ${mergedCount} field guide document(s) into ${locale} search index${dedupedFrom}`);
}

if (totalMerged === 0) {
  console.warn(`No field guide search records merged from ${fieldGuideRoot}`);
} else {
  console.log(`Field guide search merge complete (${totalMerged} total record(s))`);
}
