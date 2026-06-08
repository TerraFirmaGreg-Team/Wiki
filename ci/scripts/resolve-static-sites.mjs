#!/usr/bin/env node
import { appendFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  fetchBuildJson,
  githubOutputName,
  loadStaticSitesConfig,
  releaseDownloadUrl,
  validateBuildJson,
} from '../lib/static-site.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const configPath = join(root, 'ci/static-sites.json');
const resolvedPath = join(root, 'ci/static-sites-resolved.json');
const githubOutput = process.env.GITHUB_OUTPUT;

const sites = loadStaticSitesConfig(configPath);
/** @type {Array<Record<string, string>>} */
const resolved = [];

for (const site of sites) {
  const { id, buildJsonUrl, releaseRepo, releaseAssetName } = site;
  if (!id || !buildJsonUrl || !releaseRepo || !releaseAssetName) {
    console.error('::error::Invalid static site entry:', JSON.stringify(site));
    process.exit(1);
  }

  const build = await fetchBuildJson(buildJsonUrl);
  const { contentHash, releaseTag } = validateBuildJson(build, id);
  const downloadUrl = releaseDownloadUrl(releaseRepo, releaseTag, releaseAssetName);

  resolved.push({
    id,
    contentHash,
    releaseTag,
    downloadUrl,
    releaseAssetName,
  });

  if (githubOutput) {
    appendFileSync(
      githubOutput,
      `${githubOutputName(id, 'content_hash')}=${contentHash}\n`,
    );
    appendFileSync(
      githubOutput,
      `${githubOutputName(id, 'release_tag')}=${releaseTag}\n`,
    );
  }

  console.log(`${id}: contentHash=${contentHash} releaseTag=${releaseTag}`);
}

writeFileSync(resolvedPath, `${JSON.stringify({ sites: resolved }, null, 2)}\n`);
console.log(`Wrote ${resolvedPath}`);

if (resolved.length === 0) {
  console.log('No enabled static sites');
}
