import { readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'
import {
  DEFAULT_WIKI_LOCALE,
  LOCALE_BCP47,
  WIKI_UI_LOCALES,
} from '../../ci/lib/tfg-locale-core.mjs'
import { loadWikiLanguageConfig } from '../../ci/lib/tfg-locale.mjs'
import { buildStaticSitePath, loadStaticSitesConfig } from '../../ci/lib/static-site.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const I18N_DIR = resolve(__dirname, '../i18n')

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

type UiLocaleOverrides = Partial<Omit<UiLocale, 'nav' | 'docFooter' | 'notFound' | 'search'>> & {
  nav?: Partial<UiNavLabels>
  docFooter?: Partial<UiLocale['docFooter']>
  notFound?: Partial<UiNotFoundLabels>
  search?: {
    button?: Partial<UiSearchTranslations['button']>
    modal?: Partial<Omit<UiSearchTranslations['modal'], 'footer'>> & {
      footer?: Partial<UiSearchTranslations['modal']['footer']>
    }
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge<T>(base: T, overrides: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(overrides)) {
    return base
  }

  const result = { ...base } as Record<string, unknown>
  for (const [key, value] of Object.entries(overrides)) {
    const existing = result[key]
    if (isPlainObject(existing) && isPlainObject(value)) {
      result[key] = deepMerge(existing, value)
    } else if (value !== undefined) {
      result[key] = value
    }
  }
  return result as T
}

function readLocaleFiles(): Record<string, UiLocaleOverrides> {
  return Object.fromEntries(
    readdirSync(I18N_DIR)
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const id = basename(file, '.json')
        const data = JSON.parse(readFileSync(resolve(I18N_DIR, file), 'utf8')) as UiLocaleOverrides
        return [id, data]
      }),
  )
}

function stripLocaleMeta(data: UiLocaleOverrides | UiLocale) {
  const { label: _label, lang: _lang, ...content } = data
  return content
}

function hasTranslatedKeys(overrides: UiLocaleOverrides, base: UiLocale): boolean {
  return JSON.stringify(stripLocaleMeta(overrides)) !== JSON.stringify(stripLocaleMeta(base))
}

export function resolveUiLocale(
  locale: string,
  base: UiLocale,
  overrides: UiLocaleOverrides | undefined,
  localeNames: Record<string, string>,
): UiLocale {
  const merged = overrides ? deepMerge(base, overrides) : structuredClone(base)
  merged.label = localeNames[locale] ?? overrides?.label ?? merged.label
  merged.lang = LOCALE_BCP47[locale as keyof typeof LOCALE_BCP47] ?? overrides?.lang ?? merged.lang
  return merged
}

export function loadUiLocales(): Record<string, UiLocale> {
  const files = readLocaleFiles()
  const base = files[DEFAULT_WIKI_LOCALE]
  if (!base) {
    throw new Error(`Missing UI locale file: .vitepress/i18n/${DEFAULT_WIKI_LOCALE}.json`)
  }

  const { localeNames } = loadWikiLanguageConfig()
  const resolvedBase = resolveUiLocale(DEFAULT_WIKI_LOCALE, base as UiLocale, base, localeNames)

  return Object.fromEntries(
    WIKI_UI_LOCALES.map((locale) => {
      const overrides = files[locale]
      if (!overrides) {
        return [locale, resolveUiLocale(locale, resolvedBase, undefined, localeNames)]
      }
      if (!hasTranslatedKeys(overrides, resolvedBase)) {
        return [locale, resolveUiLocale(locale, resolvedBase, undefined, localeNames)]
      }
      return [locale, resolveUiLocale(locale, resolvedBase, overrides, localeNames)]
    }),
  )
}

function buildStaticSiteNavItems(
  nav: UiNavLabels,
  wikiLocale: string,
): DefaultTheme.NavItem[] {
  return loadStaticSitesConfig()
    .filter((site) => site.navLabelKey)
    .map((site) => {
      const labelKey = site.navLabelKey as keyof UiNavLabels
      const text = nav[labelKey]
      if (!text) {
        throw new Error(`Missing nav label for static site ${site.id}: nav.${site.navLabelKey}`)
      }
      return {
        text,
        link: buildStaticSitePath(site, wikiLocale),
      }
    })
}

export function buildThemeConfig(
  ui: UiLocale,
  localeBase: string,
  wikiLocale: string,
  githubRepo: string,
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
          ...buildStaticSiteNavItems(nav, wikiLocale),
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

export function assertUiLocales(locales: readonly string[], ui: Record<string, UiLocale>) {
  for (const locale of locales) {
    if (!ui[locale]) {
      throw new Error(`Cannot resolve UI locale: ${locale}`)
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
