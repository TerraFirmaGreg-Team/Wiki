import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme } from 'vitepress'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export type UiNavLabels = {
  home: string
  download: string
  officialSite: string
  projects: string
  discord: string
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

export function buildThemeConfig(
  ui: UiLocale,
  localeBase: string,
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
          { text: 'Modrinth', link: 'https://modrinth.com/organization/terrafirmagreg' },
          { text: nav.officialSite, link: 'https://terrafirmagreg.team' },
        ],
      },
      {
        text: nav.projects,
        items: [
          { text: 'Modpack-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Modpack-Modern' },
          { text: 'Core-Modern', link: 'https://github.com/TerraFirmaGreg-Team/Core-Modern' },
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
  }
}

export function assertUiLocales(docsRoot: string, locales: readonly string[]) {
  const ui = loadUiLocales()
  for (const locale of locales) {
    if (!ui[locale]) {
      throw new Error(`Missing UI locale file: .vitepress/i18n/${locale}.json`)
    }
    const contentDir = resolve(docsRoot, 'modern', locale)
    if (!existsSync(contentDir)) {
      throw new Error(`Missing content directory: docs/modern/${locale}/`)
    }
  }
}
