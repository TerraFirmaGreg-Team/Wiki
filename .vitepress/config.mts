import { defineConfig, type DefaultTheme } from 'vitepress'
import { withSidebar, type VitePressSidebarOptions } from 'vitepress-sidebar'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITHUB_ORG = 'TerraFirmaGreg-Team'
const GITHUB_REPO_NAME = 'Wiki'
const GITHUB_REPO = `${GITHUB_ORG}/${GITHUB_REPO_NAME}`
const DISCORD_URL = 'https://discord.com/invite/AEaCzCTUwQ'
const OFFICIAL_SITE_URL = 'https://terrafirmagreg.team'
const CURSEFORGE_URL = 'https://www.curseforge.com/members/terrafirmagreg/projects'
const MODRINTH_URL = 'https://modrinth.com/organization/terrafirmagreg'
const NAMESPACE = 'modern'

const CNAME_PATH = resolve(__dirname, '..', 'public', 'CNAME')
const CUSTOM_DOMAIN = existsSync(CNAME_PATH)
  ? readFileSync(CNAME_PATH, 'utf8').trim()
  : null
const SITE_BASE = CUSTOM_DOMAIN ? '/' : `/${GITHUB_REPO_NAME}/`
const SITE_ORIGIN = CUSTOM_DOMAIN
  ? `https://${CUSTOM_DOMAIN}`
  : `https://${GITHUB_ORG.toLowerCase()}.github.io`
const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`

const LOCALES = ['en_us', 'zh_cn', 'pt_br'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = LOCALES[0]

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

type NavLabels = {
  home: string
  download: string
  officialSite: string
  projects: string
  discord: string
}

function buildNav(locale: Locale, labels: NavLabels): DefaultTheme.NavItem[] {
  const base = localeBase(locale)
  return [
    { text: labels.home, link: `${base}/` },
    {
      text: labels.download,
      items: [
        { text: 'CurseForge', link: CURSEFORGE_URL },
        { text: 'Modrinth', link: MODRINTH_URL },
        { text: labels.officialSite, link: OFFICIAL_SITE_URL },
      ],
    },
    {
      text: labels.projects,
      items: [
        { text: 'Modpack-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Modpack-Modern' },
        { text: 'Core-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Core-Modern' },
      ],
    },
    { text: labels.discord, link: DISCORD_URL },
  ]
}

const localeThemeConfigs: Record<
  Locale,
  { label: string; lang: string; themeConfig: DefaultTheme.Config }
> = {
  en_us: {
    label: 'English',
    lang: 'en-US',
    themeConfig: {
      nav: buildNav('en_us', {
        home: 'Home',
        download: 'Download',
        officialSite: 'Official Site',
        projects: 'Projects',
        discord: 'Discord',
      }),
      editLink: {
        pattern: `https://github.com/${GITHUB_REPO}/edit/main/docs/:path`,
        text: 'Edit this page on GitHub',
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} TerraFirmaGreg Team`,
      },
      docFooter: { prev: 'Previous page', next: 'Next page' },
      outline: { label: 'On this page' },
      lastUpdated: { text: 'Last updated' },
      darkModeSwitchLabel: 'Theme',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Back to top',
      langMenuLabel: 'Change language',
    },
  },
  zh_cn: {
    label: '简体中文',
    lang: 'zh-CN',
    themeConfig: {
      nav: buildNav('zh_cn', {
        home: '首页',
        download: '下载',
        officialSite: '官网',
        projects: '项目',
        discord: 'Discord',
      }),
      editLink: {
        pattern: `https://github.com/${GITHUB_REPO}/edit/main/docs/:path`,
        text: '在 GitHub 上编辑此页',
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} TerraFirmaGreg Team`,
      },
      docFooter: { prev: '上一页', next: '下一页' },
      outline: { label: '本页目录' },
      lastUpdated: { text: '最后更新' },
      darkModeSwitchLabel: '主题',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',
      langMenuLabel: '切换语言',
    },
  },
  pt_br: {
    label: 'Português (BR)',
    lang: 'pt-BR',
    themeConfig: {
      nav: buildNav('pt_br', {
        home: 'Início',
        download: 'Download',
        officialSite: 'Site Oficial',
        projects: 'Projetos',
        discord: 'Discord',
      }),
      editLink: {
        pattern: `https://github.com/${GITHUB_REPO}/edit/main/docs/:path`,
        text: 'Edite esta página no GitHub',
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} TerraFirmaGreg Team`,
      },
      docFooter: { prev: 'Página anterior', next: 'Próxima página' },
      outline: { label: 'Nesta página' },
      lastUpdated: { text: 'Última atualização' },
      darkModeSwitchLabel: 'Tema',
      sidebarMenuLabel: 'Menu',
      returnToTopLabel: 'Voltar ao topo',
      langMenuLabel: 'Mudar idioma',
    },
  },
}

const rootEntry = localeThemeConfigs[DEFAULT_LOCALE]

export default defineConfig(
  withSidebar(
    {
      srcDir: 'docs',
      vite: {
        publicDir: resolve(__dirname, '..', 'public'),
      },
      title: 'TFG Wiki',
      description:
        'Official TerraFirmaGreg wiki — modpack info, upgrade guides, and developer references.',
      lang: rootEntry.lang,
      base: SITE_BASE,
      cleanUrls: true,
      lastUpdated: true,
      ignoreDeadLinks: 'localhostLinks',

      head: [
        ['link', { rel: 'icon', type: 'image/png', href: `${SITE_BASE}favicon.png` }],
        ['meta', { name: 'theme-color', content: '#ff0e0b' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'TFG Wiki' }],
        ['meta', { property: 'og:image', content: `${SITE_URL}favicon.png` }],
      ],

      sitemap: {
        hostname: SITE_URL,
      },

      themeConfig: {
        logo: { src: '/logo.png', alt: 'TFG', height: 32 },
        search: { provider: 'local' },
        socialLinks: [
          { icon: 'github', link: `https://github.com/${GITHUB_REPO}` },
          { icon: 'discord', link: DISCORD_URL },
        ],
        externalLinkIcon: true,
      },

      locales: {
        root: {
          label: rootEntry.label,
          lang: rootEntry.lang,
          link: `${localeBase(DEFAULT_LOCALE)}/`,
          themeConfig: {
            nav: rootEntry.themeConfig.nav,
            footer: rootEntry.themeConfig.footer,
          },
        },
        ...Object.fromEntries(
          LOCALES.map((locale) => {
            const entry = localeThemeConfigs[locale]
            return [
              `${NAMESPACE}/${locale}`,
              {
                label: entry.label,
                lang: entry.lang,
                link: `${localeBase(locale)}/`,
                themeConfig: entry.themeConfig,
              },
            ]
          }),
        ),
      },
    },
    LOCALES.map((locale) => sidebarOptions(locale)),
  ),
)
