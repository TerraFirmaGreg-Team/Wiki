import {
  DEFAULT_WIKI_LOCALE,
  parseLocaleFromPath,
  WIKI_NAMESPACE,
} from '../../ci/lib/tfg-locale-core.mjs'
import pageIndex from 'virtual:tfg-page-index'
import { matchStaticSitePathname, staticSiteHomeHref } from './static-site'

const GITHUB_REPO = 'TerraFirmaGreg-Team/Wiki'

export type NotFoundLabels = {
  title: string
  missingQuote: string
  untranslatedQuote: string
  homeLink: string
  englishLink: string
  contributeLink: string
}

type ThemeNotFound = Partial<NotFoundLabels> & {
  quote?: string
  linkText?: string
  linkLabel?: string
}

export function readNotFoundLabels(raw: ThemeNotFound | undefined): NotFoundLabels {
  const nf = raw ?? {}
  const combined = nf.quote

  return {
    title: nf.title ?? 'PAGE NOT FOUND',
    missingQuote: nf.missingQuote ?? combined ?? 'This page does not exist.',
    untranslatedQuote: nf.untranslatedQuote ?? combined ?? 'This page has not been translated yet.',
    homeLink: nf.homeLink ?? nf.linkText ?? 'Take me home',
    englishLink: nf.englishLink ?? 'Read in English',
    contributeLink: nf.contributeLink ?? 'Contribute on GitHub',
  }
}

export type NotFoundView = {
  quote: string
  homeHref: string
  englishHref: string | null
  contributeHref: string | null
}

function pageFile(locale: string, subpath: string): string {
  return subpath
    ? `${WIKI_NAMESPACE}/${locale}/${subpath}.md`
    : `${WIKI_NAMESPACE}/${locale}/index.md`
}

function pageExists(locale: string, subpath: string): boolean {
  return pageIndex.has(pageFile(locale, subpath))
}

function subpathFromPathname(pathname: string, locale: string): string {
  const base = `/${WIKI_NAMESPACE}/${locale}`
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname
  return rest.replace(/^\/+|\/+$/g, '')
}

function wikiEditOnGitHubUrl(relativePath: string): string {
  return `https://github.com/${GITHUB_REPO}/edit/main/docs/${relativePath}`
}

export function resolveNotFoundView(pathname: string, labels: NotFoundLabels): NotFoundView {
  const staticSite = matchStaticSitePathname(pathname)
  if (staticSite) {
    return {
      quote: labels.missingQuote,
      homeHref: staticSiteHomeHref(pathname, staticSite),
      englishHref: null,
      contributeHref: null,
    }
  }

  const locale = parseLocaleFromPath(pathname) ?? DEFAULT_WIKI_LOCALE
  const subpath = subpathFromPathname(pathname, locale)
  const homeHref = `/${WIKI_NAMESPACE}/${locale}/`

  const englishExists = pageExists(DEFAULT_WIKI_LOCALE, subpath)
  const untranslated =
    locale !== DEFAULT_WIKI_LOCALE && englishExists && !pageExists(locale, subpath)

  const englishPath = subpath
    ? `/${WIKI_NAMESPACE}/${DEFAULT_WIKI_LOCALE}/${subpath}`
    : `/${WIKI_NAMESPACE}/${DEFAULT_WIKI_LOCALE}/`

  return {
    quote: untranslated ? labels.untranslatedQuote : labels.missingQuote,
    homeHref,
    englishHref: untranslated ? englishPath : null,
    contributeHref: untranslated ? wikiEditOnGitHubUrl(pageFile(locale, subpath)) : null,
  }
}
