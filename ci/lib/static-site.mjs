import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @typedef {'locale-path' | 'lang-query' | 'root'} StaticSiteEntryKind */

const DEFAULT_WIKI_LOCALE = 'en_us';

/**
 * @param {string} configPath
 * @returns {Array<Record<string, unknown> & { id: string; enabled?: boolean; navLabelKey?: string; entry?: StaticSiteEntryKind }>}
 */
export function loadStaticSitesConfig(configPath = join(__dirname, '../static-sites.json')) {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const sites = (config.sites ?? []).filter((site) => site.enabled);
  return sites;
}

/**
 * @param {{ id: string; entry?: StaticSiteEntryKind }} site
 * @param {string} [wikiLocale]
 */
export function buildStaticSitePath(site, wikiLocale = DEFAULT_WIKI_LOCALE) {
  const id = String(site.id);
  const entry = site.entry ?? 'root';

  switch (entry) {
    case 'locale-path':
      return `/${id}/${wikiLocale}/`;
    case 'lang-query':
      return `/${id}/?lang=${wikiLocale}`;
    default:
      return `/${id}/`;
  }
}

/**
 * Absolute URL so VitePress treats the link as external and performs a full navigation.
 *
 * @param {{ id: string; entry?: StaticSiteEntryKind }} site
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
