import type { HeadConfig } from 'vitepress'

export const LOCALES = ['en_us', 'zh_cn', 'pt_br'] as const
export type WikiLocale = (typeof LOCALES)[number]

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

const HREFLANG: Record<WikiLocale, string> = {
  en_us: 'en',
  zh_cn: 'zh-CN',
  pt_br: 'pt-BR',
}

const LOCALE_INDEX_RE = /^modern\/(en_us|zh_cn|pt_br)\/index\.md$/

/** Map a docs-relative path to the public URL (cleanUrls). */
export function pageToCanonical(siteUrl: string, page: string): string {
  const base = siteUrl.replace(/\/$/, '')
  if (page === 'index.md') {
    return `${base}/modern/en_us/`
  }
  const indexMatch = page.match(/^modern\/(en_us|zh_cn|pt_br)\/index\.md$/)
  if (indexMatch) {
    return `${base}/modern/${indexMatch[1]}/`
  }
  const path = page.replace(/\.md$/, '')
  return `${base}/${path}`
}

function localePageSuffix(page: string): string | null {
  const match = page.match(/^modern\/(en_us|zh_cn|pt_br)\/(.+\.md)$/)
  if (!match || match[2] === 'index.md') {
    return null
  }
  return match[2].replace(/\.md$/, '').replace(/\/index$/, '')
}

export function buildHreflangHead(siteUrl: string, page: string): HeadConfig[] {
  const base = siteUrl.replace(/\/$/, '')
  const suffix = localePageSuffix(page)
  if (!suffix) {
    if (LOCALE_INDEX_RE.test(page) || page === 'index.md') {
      return hreflangLinks(base, LOCALES.map((locale) => `${base}/modern/${locale}/`))
    }
    return []
  }
  const urls = LOCALES.map((locale) => `${base}/modern/${locale}/${suffix}`)
  return hreflangLinks(base, urls)
}

function hreflangLinks(_base: string, urls: string[]): HeadConfig[] {
  const links: HeadConfig[] = LOCALES.map((locale, index) => [
    'link',
    { rel: 'alternate', hreflang: HREFLANG[locale], href: urls[index] },
  ])
  links.push(['link', { rel: 'alternate', hreflang: 'x-default', href: urls[0] }])
  return links
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

  const indexMatch = path.match(/^\/modern\/(en_us|zh_cn|pt_br)$/)
  if (indexMatch) {
    return hreflangSitemapLinks((locale) => `/modern/${locale}/`)
  }

  const pageMatch = path.match(/^\/modern\/(en_us|zh_cn|pt_br)\/(.+)$/)
  if (pageMatch) {
    const suffix = pageMatch[2]!
    return hreflangSitemapLinks((locale) => `/modern/${locale}/${suffix}`)
  }

  return undefined
}

function hreflangSitemapLinks(urlForLocale: (locale: WikiLocale) => string): WikiSitemapItem['links'] {
  const links = LOCALES.map((locale) => ({
    lang: HREFLANG[locale],
    hreflang: HREFLANG[locale],
    url: urlForLocale(locale),
  }))
  links.push({ lang: 'x-default', hreflang: 'x-default', url: urlForLocale('en_us') })
  return links
}

export function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = []
  const re = /<loc>([^<]+)<\/loc>/g
  let match: RegExpExecArray | null
  while ((match = re.exec(xml)) !== null) {
    locs.push(match[1]!)
  }
  return locs
}

export function buildMergedSitemap(urls: Iterable<string>): string {
  const unique = [...new Set([...urls].filter(Boolean))]
  const body = unique.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    '',
  ].join('\n')
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
