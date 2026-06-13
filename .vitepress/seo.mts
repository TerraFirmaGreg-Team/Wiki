import type { HeadConfig } from 'vitepress'

import {
  CONTENT_LOCALES,
  hreflangForLocale,
  localePageSuffix,
  LOCALES as WIKI_LOCALES,
  pageToCanonical,
} from '../ci/lib/seo.mjs'
import { resolveContentLocale } from '../ci/lib/tfg-locale-core.mjs'

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

const LOCALE_INDEX_RE = new RegExp(`^modern/(${CONTENT_LOCALES.join('|')})/index\\.md$`)

function hreflangUrlForLocale(base: string, suffix: string | null, locale: WikiLocale): string {
  const contentLocale = resolveContentLocale(locale, CONTENT_LOCALES)
  if (!suffix) {
    return `${base}/modern/${contentLocale}/`
  }
  return `${base}/modern/${contentLocale}/${suffix}`
}

function hreflangLinks(base: string, suffix: string | null): HeadConfig[] {
  const urls = LOCALES.map((locale) => hreflangUrlForLocale(base, suffix, locale))
  const links: HeadConfig[] = LOCALES.map((locale, index) => [
    'link',
    { rel: 'alternate', hreflang: hreflangForLocale(locale), href: urls[index]! },
  ])
  links.push([
    'link',
    { rel: 'alternate', hreflang: 'x-default', href: hreflangUrlForLocale(base, suffix, 'en_us') },
  ])
  return links
}

export function buildHreflangHead(siteUrl: string, page: string): HeadConfig[] {
  const base = siteUrl.replace(/\/$/, '')
  const suffix = localePageSuffix(page)
  if (!suffix) {
    if (LOCALE_INDEX_RE.test(page) || page === 'index.md') {
      return hreflangLinks(base, null)
    }
    return []
  }

  return hreflangLinks(base, suffix)
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

  const indexMatch = path.match(new RegExp(`^/modern/(${CONTENT_LOCALES.join('|')})$`))
  if (indexMatch) {
    return hreflangSitemapLinks(null)
  }

  const pageMatch = path.match(new RegExp(`^/modern/(${CONTENT_LOCALES.join('|')})/(.+)$`))
  if (pageMatch) {
    return hreflangSitemapLinks(pageMatch[2]!)
  }

  return undefined
}

function hreflangSitemapLinks(suffix: string | null): WikiSitemapItem['links'] {
  const links = LOCALES.map((locale) => ({
    lang: hreflangForLocale(locale),
    hreflang: hreflangForLocale(locale),
    url: suffix
      ? `/modern/${resolveContentLocale(locale, CONTENT_LOCALES)}/${suffix}`
      : `/modern/${resolveContentLocale(locale, CONTENT_LOCALES)}/`,
  }))
  links.push({ lang: 'x-default', hreflang: 'x-default', url: links[0]!.url })
  return links
}
