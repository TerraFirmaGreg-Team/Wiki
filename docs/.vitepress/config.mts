import { defineConfig, type DefaultTheme } from 'vitepress'
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

// Pick deployment target based on whether docs/public/CNAME exists.
//
// - With CNAME present  → deploy to the custom domain at site root.
//   `base: '/'`, site URL is `https://<domain>/`.
//   GitHub Pages will 301-redirect `<org>.github.io/<repo>/*` to the domain.
//
// - Without CNAME       → deploy to GitHub Pages at the project subpath.
//   `base: '/<repo>/'`, site URL is `https://<org>.github.io/<repo>/`.
//
// To switch modes, just create or delete docs/public/CNAME and redeploy.
const CNAME_PATH = resolve(__dirname, '..', 'public', 'CNAME')
const CUSTOM_DOMAIN = existsSync(CNAME_PATH)
  ? readFileSync(CNAME_PATH, 'utf8').trim()
  : null
const SITE_BASE = CUSTOM_DOMAIN ? '/' : `/${GITHUB_REPO_NAME}/`
const SITE_ORIGIN = CUSTOM_DOMAIN
  ? `https://${CUSTOM_DOMAIN}`
  : `https://${GITHUB_ORG.toLowerCase()}.github.io`
const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`

// All locale directory names. The first one is the default locale that the
// site root (`/`) redirects to.
const LOCALES = ['en_us', 'zh_cn', 'pt_br'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = LOCALES[0]

// Load the per-locale sidebar definition from `<locale>/sidebar.json` and
// prefix every `link` with `/<locale>` so editors can keep entries locale-
// relative (e.g. `/upgrade-guides/...` → `/en_us/upgrade-guides/...`).
function loadSidebar(locale: Locale): DefaultTheme.SidebarItem[] {
  const path = resolve(__dirname, '..', locale, 'sidebar.json')
  const raw = JSON.parse(readFileSync(path, 'utf8')) as DefaultTheme.SidebarItem[]
  return prefixLinks(raw, `/${locale}`)
}

function prefixLinks(
  items: DefaultTheme.SidebarItem[],
  prefix: string,
): DefaultTheme.SidebarItem[] {
  return items.map((item) => {
    const next: DefaultTheme.SidebarItem = { ...item }
    if (typeof item.link === 'string' && item.link.startsWith('/')) {
      next.link = prefix + item.link
    }
    if (Array.isArray(item.items)) {
      next.items = prefixLinks(item.items, prefix)
    }
    return next
  })
}

// Shared nav across locales; only the visible labels change per locale.
type NavLabels = {
  home: string
  download: string
  officialSite: string
  projects: string
  discord: string
}

function buildNav(locale: Locale, labels: NavLabels): DefaultTheme.NavItem[] {
  return [
    { text: labels.home, link: `/${locale}/` },
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
      sidebar: { '/en_us/': loadSidebar('en_us') },
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
      sidebar: { '/zh_cn/': loadSidebar('zh_cn') },
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
      sidebar: { '/pt_br/': loadSidebar('pt_br') },
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

// The "root" locale in VitePress owns the default lang + pages NOT under any
// other locale directory. We make it the same as the default locale (en_us)
// and point its `link` at `/en_us/` so the language switcher resolves to the
// subpath where English content actually lives.
const rootEntry = localeThemeConfigs[DEFAULT_LOCALE]
const otherLocales = LOCALES.filter((l) => l !== DEFAULT_LOCALE)

export default defineConfig({
  title: 'TFG Wiki',
  description: 'Official TerraFirmaGreg wiki — modpack info, upgrade guides, and developer references.',
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
    logo: { src: '/favicon.png', alt: 'TFG', width: 24, height: 24 },
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
      link: `/${DEFAULT_LOCALE}/`,
      themeConfig: rootEntry.themeConfig,
    },
    ...Object.fromEntries(
      otherLocales.map((locale) => {
        const entry = localeThemeConfigs[locale]
        return [
          locale,
          {
            label: entry.label,
            lang: entry.lang,
            link: `/${locale}/`,
            themeConfig: entry.themeConfig,
          },
        ]
      }),
    ),
  },
})
