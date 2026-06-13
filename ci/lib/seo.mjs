import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_WIKI_LOCALE,
  getWikiContentLocales,
  localeHreflang,
  WIKI_UI_LOCALES,
} from './tfg-locale.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = join(__dirname, '../../docs');

export const LOCALES = WIKI_UI_LOCALES;

export const CONTENT_LOCALES = getWikiContentLocales(DOCS_ROOT);

const CONTENT_LOCALE_RE = new RegExp(`^modern/(${CONTENT_LOCALES.join('|')})`);

export function pageToCanonical(siteUrl, page) {
  const base = siteUrl.replace(/\/$/, '');
  if (page === 'index.md') {
    return `${base}/modern/${DEFAULT_WIKI_LOCALE}/`;
  }
  const indexMatch = page.match(new RegExp(`^modern/(${CONTENT_LOCALES.join('|')})/index\\.md$`));
  if (indexMatch) {
    return `${base}/modern/${indexMatch[1]}/`;
  }
  const path = page.replace(/\.md$/, '');
  return `${base}/${path}`;
}

export function pageContentLocale(page) {
  const match = page.match(CONTENT_LOCALE_RE);
  return match ? match[1] : null;
}

export function localePageSuffix(page) {
  const match = page.match(new RegExp(`^modern/(${CONTENT_LOCALES.join('|')})/(.+\\.md)$`));
  if (!match || match[2] === 'index.md') {
    return null;
  }
  return match[2].replace(/\.md$/, '').replace(/\/index$/, '');
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
