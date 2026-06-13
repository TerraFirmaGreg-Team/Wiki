import type { HeadConfig } from 'vitepress'

import {
  hreflangForLocale,
  localePageSuffix,
  localesForPage,
  LOCALES as WIKI_LOCALES,
  pageToCanonical,
} from '../ci/lib/seo.mjs'

export const LOCALES = WIKI_LOCALES
export type WikiLocale = (typeof LOCALES)[number]

export { pageToCanonical, parseSitemapLocs, buildMergedSitemap } from '../ci/lib/seo.mjs'

type SitemapLink = {
  lang: string
  hreflang?: string
  url: string
}

type WikiSitemapItem = {
  url: string
  links?: SitemapLink[]
  lastmod?: string | number | Date
}

const LOCALE_INDEX_RE = new RegExp(`^modern/(${LOCALES.join('|')})/index\\.md$`)

function hreflangUrlForLocale(base: string, suffix: string | null, locale: WikiLocale): string {
  if (!suffix) {
    return `${base}/modern/${locale}/`
  }
  return `${base}/modern/${locale}/${suffix}`
}

function hreflangLinks(base: string, suffix: string | null, locales: readonly WikiLocale[]): HeadConfig[] {
  const urls = locales.map((locale) => hreflangUrlForLocale(base, suffix, locale))
  const links: HeadConfig[] = locales.map((locale, index) => [
    'link',
    { rel: 'alternate', hreflang: hreflangForLocale(locale), href: urls[index]! },
  ])
  if (urls[0]) {
    links.push(['link', { rel: 'alternate', hreflang: 'x-default', href: urls[0]! }])
  }
  return links
}

export function buildHreflangHead(siteUrl: string, page: string): HeadConfig[] {
  const base = siteUrl.replace(/\/$/, '')
  const suffix = localePageSuffix(page)
  const locales = localesForPage(page)

  if (!suffix) {
    if (LOCALE_INDEX_RE.test(page) || page === 'index.md') {
      return hreflangLinks(base, null, locales)
    }
    return []
  }

  return hreflangLinks(base, suffix, locales)
}

export function buildPageSeoHead(
  siteUrl: string,
  page: string,
  title: string,
  description: string,
  ogImage: string,
): HeadConfig[] {
  const canonical = pageToCanonical(siteUrl, page)
  return [
    ['link', { rel: 'canonical', href: canonical }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ...buildHreflangHead(siteUrl, page),
  ]
}

export function buildWebSiteJsonLd(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '')
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TerraFirmaGreg Wiki',
    url: base,
    description:
      'Official TerraFirmaGreg wiki — modpack info, upgrade guides, and developer references.',
    publisher: {
      '@type': 'Organization',
      name: 'TerraFirmaGreg Team',
      url: 'https://terrafirmagreg.team',
    },
  })
}

export function transformWikiSitemapItems(_siteUrl: string, items: WikiSitemapItem[]): WikiSitemapItem[] {
  return items
    .filter((item) => {
      const path = normalizeSitemapPath(item.url)
      return path !== '/'
    })
    .map((item) => {
      const links = sitemapHreflangLinks(item.url)
      return links ? { ...item, links } : item
    })
}

function normalizeSitemapPath(url: string): string {
  const path = url.startsWith('/') ? url : `/${url}`
  return path.replace(/\/$/, '') || '/'
}

function sitemapHreflangLinks(url: string): WikiSitemapItem['links'] | undefined {
  const path = normalizeSitemapPath(url)

  const indexMatch = path.match(new RegExp(`^/modern/(${LOCALES.join('|')})$`))
  if (indexMatch) {
    const locales = localesForPage(`modern/${indexMatch[1]}/index.md`)
    return hreflangSitemapLinks(null, locales)
  }

  const pageMatch = path.match(new RegExp(`^/modern/(${LOCALES.join('|')})/(.+)$`))
  if (pageMatch) {
    const suffix = pageMatch[2]!
    const locales = localesForPage(`modern/${pageMatch[1]}/${suffix}.md`)
    return hreflangSitemapLinks(suffix, locales)
  }

  return undefined
}

function hreflangSitemapLinks(suffix: string | null, locales: readonly WikiLocale[]): WikiSitemapItem['links'] {
  const links = locales.map((locale) => ({
    lang: hreflangForLocale(locale),
    hreflang: hreflangForLocale(locale),
    url: suffix ? `/modern/${locale}/${suffix}` : `/modern/${locale}/`,
  }))
  if (links[0]) {
    links.push({ lang: 'x-default', hreflang: 'x-default', url: links[0].url })
  }
  return links
}
