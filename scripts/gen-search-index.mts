import { readFileSync } from 'node:fs';
import { register } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

register('./loader-hooks.mjs', import.meta.url);

process.env.NODE_ENV ??= 'production';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

for (const file of ['.env.local', '.env']) {
  try {
    for (const line of readFileSync(path.join(root, file), 'utf8').split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  return res.json();
}

async function headOk(url: string): Promise<boolean> {
  try {
    return (await fetch(url, { method: 'HEAD' })).ok;
  } catch {
    return false;
  }
}

async function dumpIndexes() {
  const origin = (
    process.env.NEXT_PUBLIC_DUMP_STORAGE_URL ??
    process.env.DUMP_STORAGE_URL ??
    ''
  ).replace(/\/+$/, '');
  if (!origin) {
    console.warn('[gen-search] dump storage URL is not set, skipping');
    return;
  }
  const { datasetConfig } = await import('../src/config/datasets.ts');
  const { sectionTabs } = await import('../src/config/sections.ts');
  const { registerSectionConfig } = await import(
    '@terrafirmagreg-team/kit/lib/config'
  );
  registerSectionConfig({ sectionTabs });
  const { buildDumpSearchBlobCached, putSearchBlob } = await import(
    '@terrafirmagreg-team/dump/lib/dump-search'
  );
  const { INDEX_BUILDERS } = await import('../src/lib/search-indexes.ts');
  for (const id of Object.keys(datasetConfig)) {
    const versions = (await fetchJson(`${origin}/${id}/versions.json`)) as
      | { versions?: string[] }
      | undefined;
    for (const ver of versions?.versions ?? []) {
      const manifest = (await fetchJson(
        `${origin}/${id}/${ver}/manifest.json`,
      )) as { languages?: string[] } | undefined;
      for (const lang of manifest?.languages ?? []) {
        const file = `${id}/${ver}/search/${lang}.json`;
        if (
          process.env.GEN_SEARCH_FORCE !== '1' &&
          (await headOk(`${origin}/${file}`))
        )
          continue;
        try {
          const blob = await buildDumpSearchBlobCached(id, ver, lang, INDEX_BUILDERS);
          if (!Object.keys(blob.data).length) {
            console.log(`[gen-search] ${file}: empty index, skip`);
            continue;
          }
          const persisted = await putSearchBlob(id, ver, lang, blob);
          console.log(
            `[gen-search] ${file}: built (${persisted ? 'persisted to storage' : 'no DUMP_S3_* creds, will be persisted on first API request'})`,
          );
        } catch (e) {
          console.warn(`[gen-search] ${file}: failed:`, e);
        }
      }
    }
  }
}

await dumpIndexes();

