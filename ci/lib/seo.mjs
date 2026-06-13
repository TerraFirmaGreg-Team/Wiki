import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_WIKI_LOCALE,
  localeHreflang,
  WIKI_UI_LOCALES,
} from './tfg-locale.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(__dirname, '../../docs');

export const LOCALES = WIKI_UI_LOCALES;

const LOCALE_SEGMENT = WIKI_UI_LOCALES.join('|');

function modernDir(docsRoot = DOCS_ROOT) {
  return join(docsRoot, 'modern');
}

export function pageToCanonical(siteUrl, page) {
  const base = siteUrl.replace(/\/$/, '');
  if (page === 'index.md') {
    return `${base}/modern/${DEFAULT_WIKI_LOCALE}/`;
  }
  const indexMatch = page.match(new RegExp(`^modern/(${LOCALE_SEGMENT})/index\\.md$`));
  if (indexMatch) {
    return `${base}/modern/${indexMatch[1]}/`;
  }
  const path = page.replace(/\.md$/, '');
  return `${base}/${path}`;
}

export function localePageSuffix(page) {
  const match = page.match(new RegExp(`^modern/(${LOCALE_SEGMENT})/(.+\\.md)$`));
  if (!match || match[2] === 'index.md') {
    return null;
  }
  return match[2].replace(/\.md$/, '').replace(/\/index$/, '');
}

export function localesForPage(page, docsRoot = DOCS_ROOT) {
  const root = modernDir(docsRoot);
  if (page === 'index.md') {
    return LOCALES.filter((locale) => existsSync(join(root, locale, 'index.md')));
  }

  const suffix = localePageSuffix(page);
  if (!suffix) {
    const indexMatch = page.match(new RegExp(`^modern/(${LOCALE_SEGMENT})/index\\.md$`));
    if (indexMatch) {
      return [indexMatch[1]];
    }
    return [];
  }

  return LOCALES.filter((locale) => existsSync(join(root, locale, `${suffix}.md`)));
}

export function hreflangForLocale(locale) {
  return localeHreflang(locale);
}

export function parseSitemapLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1]);
  }
  return locs;
}

export function buildMergedSitemap(urls) {
  const unique = [...new Set([...urls].filter(Boolean))];
  const body = unique.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    '',
  ].join('\n');
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
