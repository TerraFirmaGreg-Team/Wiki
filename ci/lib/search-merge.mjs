import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import MiniSearch from 'minisearch';

export const WIKI_LOCALES = ['en_us', 'zh_cn', 'pt_br'];

export const FIELD_GUIDE_SITE_ID = 'field-guide-modern';

export const FIELD_GUIDE_SOURCE_LABEL = 'Field Guide';

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

/**
 * @param {string} source
 */
export function parseLocalSearchChunk(source) {
  const trimmed = source.trim();
  const match = trimmed.match(/^const e=(.+);export\{e as default\};?$/s);
  if (!match) {
    throw new Error('Invalid local search chunk format');
  }

  const literal = match[1].trim();
  let inner;

  if (literal.startsWith("'")) {
    inner = literal.slice(1, -1).replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  } else if (literal.startsWith('"')) {
    inner = JSON.parse(literal);
  } else {
    throw new Error('Invalid local search chunk string literal');
  }

  return JSON.parse(inner);
}

/**
 * @param {unknown} indexData
 */
export function serializeLocalSearchChunk(indexData) {
  const inner = JSON.stringify(indexData);
  return `const e=${JSON.stringify(inner)};export{e as default};\n`;
}

/**
 * @param {string} siteId
 * @param {string} locale
 * @param {{ entry?: string; content?: string; url?: string }} record
 * @param {string} [sourceLabel]
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
 * @param {unknown} indexData
 * @param {Array<{ id: string; title: string; titles: string[]; text: string }>} documents
 */
export function mergeDocumentsIntoMiniSearchIndex(indexData, documents) {
  const search = MiniSearch.loadJSON(JSON.stringify(indexData), MINI_SEARCH_OPTIONS);
  for (const document of documents) {
    search.add(document);
  }
  return search.toJSON();
}

/**
 * @param {string} distDir
 */
export function findLocalSearchIndexChunkPaths(distDir) {
  const chunksDir = join(distDir, 'assets/chunks');
  if (!existsSync(chunksDir)) {
    throw new Error(`Missing VitePress chunks directory: ${chunksDir}`);
  }

  const boxFile = readdirSync(chunksDir).find(
    (file) => file.startsWith('VPLocalSearchBox') && file.endsWith('.js'),
  );
  if (!boxFile) {
    throw new Error('VPLocalSearchBox chunk not found');
  }

  const source = readFileSync(join(chunksDir, boxFile), 'utf8');
  const importRe = /"([^"]+)":\(\)=>\w+\(\(\)=>import\("\.\/([^"]+)"\)/g;
  /** @type {Map<string, string>} */
  const paths = new Map();

  for (const match of source.matchAll(importRe)) {
    const vpLocale = match[1];
    const chunkFile = match[2];
    const wikiLocale = VP_LOCALE_TO_WIKI_LOCALE[vpLocale] ?? vpLocale;
    paths.set(wikiLocale, join(chunksDir, chunkFile));
  }

  if (paths.size === 0) {
    throw new Error(`Could not resolve local search index chunks from ${boxFile}`);
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
  const source = readFileSync(chunkPath, 'utf8');
  const indexData = parseLocalSearchChunk(source);
  const documents = records.map((record) =>
    fieldGuideEntryToSearchDocument(siteId, locale, record),
  );
  const merged = mergeDocumentsIntoMiniSearchIndex(indexData, documents);
  writeFileSync(chunkPath, serializeLocalSearchChunk(merged), 'utf8');
  return documents.length;
}
