import { readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'
import { buildStaticSiteUrl, loadStaticSitesConfig } from '../../ci/lib/static-site.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export type UiNavLabels = {
  home: string
  download: string
  officialSite: string
  projects: string
  discord: string
  fieldGuide: string
  recipeBook: string
  questBook: string
}

export type UiSearchTranslations = {
  button: {
    buttonText: string
    buttonAriaLabel: string
  }
  modal: {
    displayDetails: string
    resetButtonTitle: string
    backButtonTitle: string
    noResultsText: string
    footer: {
      selectText: string
      selectKeyAriaLabel: string
      navigateText: string
      navigateUpKeyAriaLabel: string
      navigateDownKeyAriaLabel: string
      closeText: string
      closeKeyAriaLabel: string
    }
  }
}

export type UiNotFoundLabels = {
  title: string
  missingQuote: string
  untranslatedQuote: string
  homeLink: string
  englishLink: string
  contributeLink: string
}

export type UiLocale = {
  label: string
  lang: string
  nav: UiNavLabels
  editLink: string
  docFooter: { prev: string; next: string }
  outline: string
  lastUpdated: string
  darkModeSwitchLabel: string
  sidebarMenuLabel: string
  returnToTopLabel: string
  langMenuLabel: string
  notFound: UiNotFoundLabels
  search: UiSearchTranslations
}

export function loadUiLocales(): Record<string, UiLocale> {
  const dir = resolve(__dirname)
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const id = basename(file, '.json')
        const data = JSON.parse(readFileSync(resolve(dir, file), 'utf8')) as UiLocale
        return [id, data]
      }),
  )
}

function buildStaticSiteNavItems(
  nav: UiNavLabels,
  wikiLocale: string,
  siteUrl: string,
): DefaultTheme.NavItem[] {
  const configPath = resolve(__dirname, '../../ci/static-sites.json')
  return loadStaticSitesConfig(configPath)
    .filter((site) => site.navLabelKey)
    .map((site) => {
      const labelKey = site.navLabelKey as keyof UiNavLabels
      const text = nav[labelKey]
      if (!text) {
        throw new Error(`Missing nav label for static site ${site.id}: nav.${site.navLabelKey}`)
      }
      return {
        text,
        link: buildStaticSiteUrl(site, siteUrl, wikiLocale),
      }
    })
}

export function buildThemeConfig(
  ui: UiLocale,
  localeBase: string,
  wikiLocale: string,
  githubRepo: string,
  siteUrl: string,
): DefaultTheme.Config {
  const nav = ui.nav
  return {
    nav: [
      { text: nav.home, link: `${localeBase}/` },
      {
        text: nav.download,
        items: [
          { text: 'CurseForge', link: 'https://www.curseforge.com/members/terrafirmagreg/projects' },
        ],
      },
      {
        text: nav.projects,
        items: [
          { text: 'Modpack-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Modpack-Modern' },
          { text: 'Core-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Core-Modern' },
          ...buildStaticSiteNavItems(nav, wikiLocale, siteUrl),
        ],
      },
      { text: nav.discord, link: 'https://discord.com/invite/AEaCzCTUwQ' },
    ],
    editLink: {
      pattern: `https://github.com/${githubRepo}/edit/main/docs/:path`,
      text: ui.editLink,
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} TerraFirmaGreg Team`,
    },
    docFooter: ui.docFooter,
    outline: { label: ui.outline },
    lastUpdated: { text: ui.lastUpdated },
    darkModeSwitchLabel: ui.darkModeSwitchLabel,
    sidebarMenuLabel: ui.sidebarMenuLabel,
    returnToTopLabel: ui.returnToTopLabel,
    langMenuLabel: ui.langMenuLabel,
    notFound: {
      title: ui.notFound.title,
      quote: ui.notFound.missingQuote,
      linkText: ui.notFound.homeLink,
      linkLabel: ui.notFound.homeLink,
      homeLink: ui.notFound.homeLink,
      missingQuote: ui.notFound.missingQuote,
      untranslatedQuote: ui.notFound.untranslatedQuote,
      englishLink: ui.notFound.englishLink,
      contributeLink: ui.notFound.contributeLink,
    },
  }
}

export function buildSearchOptions(
  ui: Record<string, UiLocale>,
  locales: readonly string[],
  namespace: string,
  defaultLocale: string,
): DefaultTheme.Config['search'] {
  return {
    provider: 'local',
    options: {
      locales: Object.fromEntries(
        locales.map((locale) => [
          locale === defaultLocale ? 'root' : `${namespace}/${locale}`,
          { translations: ui[locale].search },
        ]),
      ),
    },
  }
}

export function assertUiLocales(locales: readonly string[]) {
  const ui = loadUiLocales()
  for (const locale of locales) {
    if (!ui[locale]) {
      throw new Error(`Missing UI locale file: .vitepress/i18n/${locale}.json`)
    }
  }
}

const HOME_INDEX_RE = /^modern\/([^/]+)\/index\.md$/

export function homeEditLinkSuffix(
  relativePath: string,
  ui: Record<string, UiLocale>,
  githubRepo: string,
): string | null {
  const match = relativePath.match(HOME_INDEX_RE)
  if (!match) {
    return null
  }

  const locale = match[1]
  const labels = ui[locale]
  if (!labels?.editLink) {
    return null
  }

  const url = `https://github.com/${githubRepo}/edit/main/docs/${relativePath}`
  return `\n\n[${labels.editLink}](${url})\n`
}
