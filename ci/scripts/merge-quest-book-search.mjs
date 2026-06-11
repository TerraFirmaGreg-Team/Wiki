#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  findLocalSearchIndexChunkPaths,
  mergeQuestBookRecordsIntoChunk,
  QUEST_BOOK_SITE_ID,
  WIKI_LOCALES,
} from '../lib/search-merge.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const distDir = process.argv[2] ?? join(root, '.vitepress/dist');
const questBookRoot = join(distDir, QUEST_BOOK_SITE_ID);
const searchIndexDir = join(questBookRoot, 'data/quest-export/search-index');

if (!existsSync(distDir)) {
  console.error(`::error::Missing dist directory: ${distDir}`);
  process.exit(1);
}

if (!existsSync(questBookRoot)) {
  console.warn(`Skipping ${QUEST_BOOK_SITE_ID} search merge: not installed under ${questBookRoot}`);
  process.exit(0);
}

if (!existsSync(searchIndexDir)) {
  console.warn(`Skipping ${QUEST_BOOK_SITE_ID} search merge: missing ${searchIndexDir}`);
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

  const searchIndexPath = join(searchIndexDir, `${locale}.json`);
  if (!existsSync(searchIndexPath)) {
    console.warn(`Skipping locale ${locale}: missing ${searchIndexPath}`);
    continue;
  }

  /** @type {{ quests?: Array<{ id?: string; chapter?: string; chapterTitle?: string; title?: string; content?: string }> }} */
  const payload = JSON.parse(readFileSync(searchIndexPath, 'utf8'));
  const rows = payload.quests ?? [];
  if (rows.length === 0) {
    console.warn(`Skipping locale ${locale}: empty quest list in ${searchIndexPath}`);
    continue;
  }

  const mergedCount = mergeQuestBookRecordsIntoChunk(chunkPath, rows, QUEST_BOOK_SITE_ID, locale);
  totalMerged += mergedCount;
  console.log(`Merged ${mergedCount} quest book record(s) into ${locale} search index`);
}

if (totalMerged === 0) {
  console.warn(`No quest book search records merged from ${searchIndexDir}`);
} else {
  console.log(`Quest book search merge complete (${totalMerged} total record(s))`);
}
