import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

import MiniSearch from 'minisearch';

/**
 * @typedef {{ id: string; title: string; titles: string[]; text: string }} SearchDocument
 */

export const WIKI_LOCALES = ['en_us', 'zh_cn', 'pt_br'];

export const FIELD_GUIDE_SITE_ID = 'field-guide-modern';

export const FIELD_GUIDE_SOURCE_LABEL = 'Field Guide';

export const QUEST_BOOK_SITE_ID = 'quest-book-modern';

export const QUEST_BOOK_SOURCE_LABEL = 'Quest Book';

/** @type {Readonly<Record<string, string>>} */
export const VP_LOCALE_TO_WIKI_LOCALE = {
  root: 'en_us',
  'modern/zh_cn': 'zh_cn',
  'modern/pt_br': 'pt_br',
};

export const MINI_SEARCH_OPTIONS = {
  fields: ['title', 'titles', 'text'],
  storeFields: ['title', 'titles'],
};

const LOCAL_SEARCH_CHUNK_RE = /^const e=(.+);export\{e as default\};?$/s;

/**
 * @param {string} literal
 */
function decodeChunkLiteral(literal) {
  if (literal.startsWith("'")) {
    return literal.slice(1, -1).replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  }
  if (literal.startsWith('"')) {
    return JSON.parse(literal);
  }
  throw new Error('Invalid local search chunk string literal');
}

/**
 * @param {string} chunksDir
 * @param {string} prefix
 */
function findJsChunk(chunksDir, prefix) {
  const name = readdirSync(chunksDir).find(
    (file) => file.startsWith(prefix) && file.endsWith('.js'),
  );
  return name ? join(chunksDir, name) : undefined;
}

/**
 * @param {string} source
 */
export function parseLocalSearchChunk(source) {
  const match = source.trim().match(LOCAL_SEARCH_CHUNK_RE);
  if (!match) {
    throw new Error('Invalid local search chunk format');
  }
  return JSON.parse(decodeChunkLiteral(match[1].trim()));
}

/**
 * @param {unknown} indexData
 */
export function serializeLocalSearchChunk(indexData) {
  return `const e=${JSON.stringify(JSON.stringify(indexData))};export{e as default};\n`;
}

/**
 * @param {string} siteId
 * @param {string} locale
 * @param {{ entry?: string; content?: string; url?: string }} record
 * @param {string} [sourceLabel]
 * @returns {SearchDocument}
 */
export function fieldGuideEntryToSearchDocument(
  siteId,
  locale,
  record,
  sourceLabel = FIELD_GUIDE_SOURCE_LABEL,
) {
  const relative = String(record.url ?? '').replace(/^\.\//, '');
  if (!relative || !record.entry) {
    throw new Error(`Invalid field guide search record: ${JSON.stringify(record)}`);
  }

  return {
    id: `/${siteId}/${locale}/${relative}`,
    title: String(record.entry),
    titles: [sourceLabel],
    text: String(record.content ?? ''),
  };
}

/**
 * Field guide emits multiple search rows per page (one per content block) with the same url.
 * MiniSearch requires unique ids, so merge their text into a single document per url.
 *
 * @param {SearchDocument[]} documents
 * @returns {SearchDocument[]}
 */
export function dedupeSearchDocumentsById(documents) {
  /** @type {Map<string, SearchDocument>} */
  const byId = new Map();

  for (const document of documents) {
    const existing = byId.get(document.id);
    if (!existing) {
      byId.set(document.id, { ...document });
      continue;
    }

    const mergedText = [existing.text, document.text].filter(Boolean).join(' ');
    if (mergedText) {
      existing.text = mergedText;
    }
  }

  return [...byId.values()];
}

/**
 * @param {unknown} indexData
 * @param {SearchDocument[]} documents
 */
export function mergeDocumentsIntoMiniSearchIndex(indexData, documents) {
  const search = MiniSearch.loadJSON(JSON.stringify(indexData), MINI_SEARCH_OPTIONS);
  for (const document of dedupeSearchDocumentsById(documents)) {
    search.add(document);
  }
  return search.toJSON();
}

/**
 * @param {string} distDir
 * @returns {Map<string, string>}
 */
export function findLocalSearchIndexChunkPaths(distDir) {
  const chunksDir = join(distDir, 'assets/chunks');
  if (!existsSync(chunksDir)) {
    throw new Error(`Missing VitePress chunks directory: ${chunksDir}`);
  }

  const boxPath = findJsChunk(chunksDir, 'VPLocalSearchBox');
  if (!boxPath) {
    throw new Error('VPLocalSearchBox chunk not found');
  }

  const source = readFileSync(boxPath, 'utf8');
  // VitePress minifies `root` without quotes; other locales stay quoted (`"modern/zh_cn"`).
  const importRe = /(?:"([^"]+)"|(root)):\(\)=>\w+\(\(\)=>import\("\.\/([^"]+)"\)/g;
  /** @type {Map<string, string>} */
  const paths = new Map();

  for (const [, quotedLocale, rootLocale, chunkFile] of source.matchAll(importRe)) {
    const vpLocale = quotedLocale ?? rootLocale;
    const wikiLocale = VP_LOCALE_TO_WIKI_LOCALE[vpLocale] ?? vpLocale;
    paths.set(wikiLocale, join(chunksDir, chunkFile));
  }

  if (!paths.has('en_us')) {
    const rootChunk = findJsChunk(chunksDir, '@localSearchIndexroot');
    if (rootChunk) {
      paths.set('en_us', rootChunk);
    }
  }

  if (paths.size === 0) {
    throw new Error(`Could not resolve local search index chunks from ${basename(boxPath)}`);
  }

  return paths;
}

/**
 * @param {string} chunkPath
 * @param {Array<{ entry?: string; content?: string; url?: string }>} records
 * @param {string} siteId
 * @param {string} locale
 */
export function mergeFieldGuideRecordsIntoChunk(
  chunkPath,
  records,
  siteId = FIELD_GUIDE_SITE_ID,
  locale,
) {
  const indexData = parseLocalSearchChunk(readFileSync(chunkPath, 'utf8'));
  const documents = records.map((record) => fieldGuideEntryToSearchDocument(siteId, locale, record));
  const uniqueDocuments = dedupeSearchDocumentsById(documents);
  const merged = mergeDocumentsIntoMiniSearchIndex(indexData, uniqueDocuments);
  writeFileSync(chunkPath, serializeLocalSearchChunk(merged), 'utf8');
  return uniqueDocuments.length;
}

/**
 * @param {string} siteId
 * @param {string} locale
 * @param {{ id?: string; chapter?: string; chapterTitle?: string; title?: string; content?: string }} row
 * @param {string} [sourceLabel]
 * @returns {SearchDocument}
 */
export function questBookRowToSearchDocument(
  siteId,
  locale,
  row,
  sourceLabel = QUEST_BOOK_SOURCE_LABEL,
) {
  const chapter = String(row.chapter ?? '');
  const questId = String(row.id ?? '');
  if (!chapter || !questId) {
    throw new Error(`Invalid quest book search row: ${JSON.stringify(row)}`);
  }

  const params = new URLSearchParams({ lang: locale, chapter, quest: questId });
  const id = `/${siteId}/?${params.toString()}`;
  const chapterTitle = row.chapterTitle ? String(row.chapterTitle) : chapter;

  return {
    id,
    title: String(row.title || questId),
    titles: [sourceLabel, chapterTitle],
    text: String(row.content ?? ''),
  };
}

/**
 * @param {string} chunkPath
 * @param {Array<{ id?: string; chapter?: string; chapterTitle?: string; title?: string; content?: string }>} rows
 * @param {string} siteId
 * @param {string} locale
 */
export function mergeQuestBookRecordsIntoChunk(
  chunkPath,
  rows,
  siteId = QUEST_BOOK_SITE_ID,
  locale,
) {
  const indexData = parseLocalSearchChunk(readFileSync(chunkPath, 'utf8'));
  const documents = rows.map((row) => questBookRowToSearchDocument(siteId, locale, row));
  const uniqueDocuments = dedupeSearchDocumentsById(documents);
  const merged = mergeDocumentsIntoMiniSearchIndex(indexData, uniqueDocuments);
  writeFileSync(chunkPath, serializeLocalSearchChunk(merged), 'utf8');
  return uniqueDocuments.length;
}
