import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @typedef {'locale-path' | 'lang-query' | 'root'} StaticSiteEntryKind */

const DEFAULT_WIKI_LOCALE = 'en_us';

/**
 * @param {string} configPath
 * @returns {Array<Record<string, unknown> & { id: string; enabled?: boolean; navLabelKey?: string; entry?: StaticSiteEntryKind; publicPath?: string; distPath?: string }>}
 */
export function loadStaticSitesConfig(configPath = join(__dirname, '../static-sites.json')) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const sites = (config.sites ?? []).filter((site) => site.enabled);
  return sites;
}

/**
 * @param {string} siteId
 * @param {string} [configPath]
 */
export function getStaticSiteById(siteId, configPath) {
  const site = loadStaticSitesConfig(configPath).find((entry) => entry.id === siteId);
  if (!site) {
    throw new Error(`Unknown or disabled static site: ${siteId}`);
  }
  return site;
}

/**
 * Filesystem path under VitePress dist (no leading slash).
 *
 * @param {{ id: string; distPath?: string }} site
 */
export function getSiteDistPath(site) {
  return String(site.distPath ?? site.id).replace(/^\/+|\/+$/g, '');
}

/**
 * URL path prefix (leading slash, no trailing slash).
 *
 * @param {{ id: string; publicPath?: string }} site
 */
export function getSitePublicPathPrefix(site) {
  const raw = site.publicPath ?? `/${site.id}`;
  return `/${String(raw).replace(/^\/+|\/+$/g, '')}`;
}

/**
 * @param {{ id: string; publicPath?: string; entry?: StaticSiteEntryKind }} site
 * @param {string} [wikiLocale]
 */
export function buildStaticSitePath(site, wikiLocale = DEFAULT_WIKI_LOCALE) {
  const prefix = getSitePublicPathPrefix(site);
  const entry = site.entry ?? 'root';

  switch (entry) {
    case 'locale-path':
      return `${prefix}/${wikiLocale}/`;
    case 'lang-query':
      return `${prefix}/?lang=${wikiLocale}`;
    default:
      return `${prefix}/`;
  }
}

/**
 * Absolute URL so VitePress treats the link as external and performs a full navigation.
 *
 * @param {{ id: string; publicPath?: string; entry?: StaticSiteEntryKind }} site
 * @param {string} siteUrl
 * @param {string} [wikiLocale]
 */
export function buildStaticSiteUrl(site, siteUrl, wikiLocale = DEFAULT_WIKI_LOCALE) {
  const base = String(siteUrl).replace(/\/$/, '');
  return `${base}${buildStaticSitePath(site, wikiLocale)}`;
}

export function githubOutputName(siteId, suffix) {
  return `${String(siteId).replace(/-/g, '_')}_${suffix}`;
}

export function releaseDownloadUrl(releaseRepo, releaseTag, assetName) {
  const repo = String(releaseRepo).replace(/\/$/, '');
  const tag = encodeURIComponent(String(releaseTag));
  const asset = encodeURIComponent(String(assetName));
  return `https://github.com/${repo}/releases/download/${tag}/${asset}`;
}

export async function fetchBuildJson(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`Failed to fetch build.json (${response.status}) from ${url}`);
  }
  return response.json();
}

export function validateBuildJson(build, siteId) {
  if (!build?.contentHash || !build?.releaseTag) {
    throw new Error(
      `${siteId}: build.json missing contentHash or releaseTag — upstream may not have published a release yet`,
    );
  }
  return {
    contentHash: String(build.contentHash),
    releaseTag: String(build.releaseTag),
  };
}
