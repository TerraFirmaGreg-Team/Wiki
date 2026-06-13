#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildMergedSitemap, parseSitemapLocs } from '../lib/seo.mjs';
import { buildStaticSiteUrl, getSiteDistPath, loadStaticSitesConfig } from '../lib/static-site.mjs';
import { WIKI_UI_LOCALES } from '../lib/tfg-locale.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const distDir = process.argv[2] ?? join(root, '.vitepress/dist');
const siteUrl = `https://${readFileSync(join(root, 'public/CNAME'), 'utf8').trim()}`;

const wikiSitemap = join(distDir, 'sitemap.xml');
if (!existsSync(wikiSitemap)) {
  console.error(`::error::Missing wiki sitemap: ${wikiSitemap}`);
  process.exit(1);
}

/** @type {string[]} */
let urls = parseSitemapLocs(readFileSync(wikiSitemap, 'utf8')).filter(
  (url) => url !== `${siteUrl}/` && url !== siteUrl,
);

for (const site of loadStaticSitesConfig()) {
  const distPath = getSiteDistPath(site);
  const siteSitemap = join(distDir, distPath, 'sitemap.xml');
  if (existsSync(siteSitemap)) {
    const locs = parseSitemapLocs(readFileSync(siteSitemap, 'utf8'));
    console.log(`Merging ${locs.length} URL(s) from ${site.id} (${distPath})`);
    urls.push(...locs);
    continue;
  }

  const siteRoot = join(distDir, distPath);
  if (!existsSync(siteRoot)) {
    console.warn(`Skipping ${site.id}: not installed under ${siteRoot}`);
    continue;
  }

  for (const locale of WIKI_UI_LOCALES) {
    urls.push(buildStaticSiteUrl(site, siteUrl, locale));
  }
  console.warn(`Merged ${WIKI_UI_LOCALES.length} landing URL(s) for ${site.id} (no sitemap.xml)`);
}

const merged = buildMergedSitemap(urls);
writeFileSync(wikiSitemap, merged, 'utf8');
console.log(`Wrote merged sitemap (${new Set(urls).size} unique URLs) → ${wikiSitemap}`);
