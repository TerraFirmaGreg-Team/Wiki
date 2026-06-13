import staticSitesConfig from '../../ci/static-sites.json'

export type StaticSiteEntry = {
  id: string
  publicPath: string
  entry?: 'locale-path' | 'lang-query' | 'root'
}

export type StaticSiteMatch = {
  site: StaticSiteEntry
  prefix: string
}

const STATIC_SITES: StaticSiteEntry[] = (staticSitesConfig.sites ?? []).map((site) => ({
  id: String(site.id),
  publicPath: String(site.publicPath).replace(/\/$/, ''),
  entry: site.entry as StaticSiteEntry['entry'],
}))

export function matchStaticSitePathname(pathname: string): StaticSiteMatch | null {
  for (const site of STATIC_SITES) {
    const prefix = site.publicPath
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return { site, prefix }
    }
  }
  return null
}

export function isStaticSitePathname(pathname: string): boolean {
  return matchStaticSitePathname(pathname) !== null
}

export function staticSiteHomeHref(pathname: string, match: StaticSiteMatch): string {
  const { site, prefix } = match
  if (site.entry === 'locale-path') {
    const localeMatch = pathname.match(new RegExp(`^${escapeRegExp(prefix)}/([^/]+)`))
    const locale = localeMatch?.[1] ?? 'en_us'
    return `${prefix}/${locale}/`
  }
  if (site.entry === 'lang-query') {
    return `${prefix}/?lang=en_us`
  }
  return `${prefix}/`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
