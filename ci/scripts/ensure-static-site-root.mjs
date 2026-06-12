#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getSiteDistPath, getStaticSiteById } from '../lib/static-site.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const DEFAULT_LOCALE = 'en_us';

/**
 * @param {string} target
 */
function writeLocalePathRootRedirect(target) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${DEFAULT_LOCALE}/">
  <link rel="canonical" href="${DEFAULT_LOCALE}/">
  <title>Redirecting…</title>
  <script>location.replace('${DEFAULT_LOCALE}/');</script>
</head>
<body>
  <p><a href="${DEFAULT_LOCALE}/">Continue</a></p>
</body>
</html>
`;
  writeFileSync(target, html);
}

/**
 * @param {string} distDir
 * @param {string} siteId
 */
export function ensureStaticSiteRoot(distDir, siteId) {
  const configPath = join(root, 'ci/static-sites.json');
  const site = getStaticSiteById(siteId, configPath);
  const dest = join(distDir, getSiteDistPath(site));
  const entry = site.entry ?? 'root';

  if (entry === 'locale-path') {
    const localeIndex = join(dest, DEFAULT_LOCALE, 'index.html');
    if (!existsSync(localeIndex)) {
      throw new Error(`${siteId}: missing ${DEFAULT_LOCALE}/index.html under ${dest}`);
    }
    writeLocalePathRootRedirect(join(dest, 'index.html'));
    return;
  }

  if (!existsSync(join(dest, 'index.html'))) {
    throw new Error(`${siteId}: missing index.html under ${dest}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const distDir = process.argv[2];
  const siteId = process.argv[3];
  if (!distDir || !siteId) {
    console.error('Usage: node ci/scripts/ensure-static-site-root.mjs <dist-dir> <site-id>');
    process.exit(1);
  }
  ensureStaticSiteRoot(distDir, siteId);
}
