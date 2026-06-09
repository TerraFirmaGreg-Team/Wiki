/** Shared SEO helpers usable from Node CI scripts and VitePress config. */

export const LOCALES = ['en_us', 'zh_cn', 'pt_br'];

/** @param {string} siteUrl @param {string} page docs-relative path */
export function pageToCanonical(siteUrl, page) {
  const base = siteUrl.replace(/\/$/, '');
  if (page === 'index.md') {
    return `${base}/modern/en_us/`;
  }
  const indexMatch = page.match(/^modern\/(en_us|zh_cn|pt_br)\/index\.md$/);
  if (indexMatch) {
    return `${base}/modern/${indexMatch[1]}/`;
  }
  const path = page.replace(/\.md$/, '');
  return `${base}/${path}`;
}

/** @param {string} xml */
export function parseSitemapLocs(xml) {
  /** @type {string[]} */
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1]);
  }
  return locs;
}

/** @param {Iterable<string>} urls */
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

/** @param {string} value */
function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
