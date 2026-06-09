import { defineConfig } from 'vitepress'
import { withSidebar, type VitePressSidebarOptions } from 'vitepress-sidebar'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { assertUiLocales, buildSearchOptions, buildThemeConfig, loadUiLocales } from './i18n/index.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITHUB_ORG = 'TerraFirmaGreg-Team'
const GITHUB_REPO = `${GITHUB_ORG}/Wiki`
const NAMESPACE = 'modern'
const SITE_DOMAIN = readFileSync(resolve(__dirname, '..', 'public', 'CNAME'), 'utf8').trim()
const SITE_URL = `https://${SITE_DOMAIN}`

const LOCALES = ['en_us', 'zh_cn', 'pt_br'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = LOCALES[0]

const UI = loadUiLocales()
assertUiLocales(resolve(__dirname, '..', 'docs'), LOCALES)

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
      vite: {
        publicDir: resolve(__dirname, '..', 'public'),
      },
      title: 'TerraFirmaGreg Wiki',
      description:
        'Official TerraFirmaGreg wiki — modpack info, upgrade guides, and developer references.',
      lang: rootEntry.lang,
      base: '/',
      cleanUrls: true,
      lastUpdated: true,
      ignoreDeadLinks: 'localhostLinks',

      head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        ['meta', { name: 'theme-color', content: '#ff0e0b' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'TerraFirmaGreg Wiki' }],
        ['meta', { property: 'og:image', content: `${SITE_URL}favicon.png` }],
      ],

      sitemap: {
        hostname: SITE_URL,
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
