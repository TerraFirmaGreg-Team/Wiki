import { defineConfig } from 'vitepress'
import { withSidebar, type VitePressSidebarOptions } from 'vitepress-sidebar'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  buildLocaleRedirectScript,
  DEFAULT_WIKI_LOCALE,
  WIKI_UI_LOCALES,
} from '../ci/lib/tfg-locale.mjs'
import { buildVitePressBootstrapScript } from '../ci/lib/tfg-theme.mjs'
import { assertUiLocales, buildSearchOptions, buildThemeConfig, loadUiLocales } from './i18n/index.ts'
import { homeEditLinkPlugin } from './plugins/home-edit-link.mts'
import {
  buildPageSeoHead,
  buildWebSiteJsonLd,
  transformWikiSitemapItems,
} from './seo.mts'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITHUB_ORG = 'TerraFirmaGreg-Team'
const GITHUB_REPO = `${GITHUB_ORG}/Wiki`
const NAMESPACE = 'modern'
const SITE_DOMAIN = readFileSync(resolve(__dirname, '..', 'public', 'CNAME'), 'utf8').trim()
const SITE_URL = `https://${SITE_DOMAIN}`
const OG_IMAGE = `${SITE_URL}/logo.png`
const SITE_TITLE = 'TerraFirmaGreg Wiki'
const SITE_DESCRIPTION =
  'Official TerraFirmaGreg wiki — modpack info, upgrade guides, field guide, recipe book, and developer references.'

const LOCALES = WIKI_UI_LOCALES
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = DEFAULT_WIKI_LOCALE

const UI = loadUiLocales()
assertUiLocales(LOCALES)

function localeBase(locale: Locale) {
  return `/${NAMESPACE}/${locale}`
}

function sidebarOptions(locale: Locale): VitePressSidebarOptions {
  return {
    documentRootPath: '/docs',
    scanStartPath: `${NAMESPACE}/${locale}`,
    resolvePath: `${localeBase(locale)}/`,
    collapsed: false,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    excludeByGlobPattern: ['**/sidebar.json'],
  }
}

function localeEntry(locale: Locale) {
  const ui = UI[locale]
  return {
    label: ui.label,
    lang: ui.lang,
    link: `${localeBase(locale)}/`,
    themeConfig: buildThemeConfig(ui, localeBase(locale), locale, GITHUB_REPO, SITE_URL),
  }
}

const rootEntry = localeEntry(DEFAULT_LOCALE)

export default defineConfig(
  withSidebar(
    {
      srcDir: 'docs',
      theme: resolve(__dirname, 'theme/index.ts'),
      vite: {
        publicDir: resolve(__dirname, '..', 'public'),
        define: {
          'import.meta.env.VITE_EXTRA_EXTENSIONS': JSON.stringify('html'),
        },
        plugins: [homeEditLinkPlugin(resolve(__dirname, '..', 'docs'), UI, GITHUB_REPO)],
      },
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      lang: rootEntry.lang,
      base: '/',
      cleanUrls: true,
      lastUpdated: true,
      ignoreDeadLinks: 'localhostLinks',
      appearance: {
        storageKey: 'tfg-theme',
      },

      head: [
        ['script', {}, buildVitePressBootstrapScript()],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        ['meta', { name: 'theme-color', content: '#ff0e0b' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: SITE_TITLE }],
        ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
        ['meta', { property: 'og:image', content: OG_IMAGE }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: '@TerraFirmaGreg' }],
        ['script', { type: 'application/ld+json' }, buildWebSiteJsonLd(SITE_URL)],
      ],

      transformHead({ page, title, description }) {
        const head = buildPageSeoHead(SITE_URL, page, title, description, OG_IMAGE)
        if (page === 'index.md') {
          head.push(['script', {}, buildLocaleRedirectScript()])
        }
        return head
      },

      sitemap: {
        hostname: SITE_URL,
        transformItems(items) {
          return transformWikiSitemapItems(SITE_URL, items)
        },
      },

      themeConfig: {
        logo: { src: '/logo.png', alt: 'TFG', height: 32 },
        search: buildSearchOptions(UI, LOCALES, NAMESPACE, DEFAULT_LOCALE),
        socialLinks: [
          { icon: 'github', link: `https://github.com/${GITHUB_REPO}` },
          { icon: 'discord', link: 'https://discord.com/invite/AEaCzCTUwQ' },
        ],
        externalLinkIcon: true,
      },

      locales: {
        root: {
          label: rootEntry.label,
          lang: rootEntry.lang,
          link: rootEntry.link,
          themeConfig: rootEntry.themeConfig,
        },
        ...Object.fromEntries(
          LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => [
            `${NAMESPACE}/${locale}`,
            localeEntry(locale),
          ]),
        ),
      },
    },
    LOCALES.map((locale) => sidebarOptions(locale)),
  ),
)
