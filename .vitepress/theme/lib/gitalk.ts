export interface GitalkSiteConfig {
  enabled?: boolean
  clientID?: string
  clientSecret?: string
  repo?: string
  owner?: string
  admin?: string[]
  proxy?: string
  distractionFreeMode?: boolean
  createIssueManually?: boolean
}

export const GITALK_CONFIG_URL = '/gitalk-config.json'

const GITALK_ID_MAX = 49

const GITALK_LANGUAGE: Record<string, string> = {
  en_us: 'en',
  zh_cn: 'zh-CN',
  zh_tw: 'zh-TW',
  zh_hk: 'zh-TW',
  ja_jp: 'ja',
  ko_kr: 'ko',
  fr_fr: 'fr',
  de_de: 'de',
  es_es: 'es',
  ru_ru: 'ru',
  uk_ua: 'ru',
  pl_pl: 'pl',
  pt_br: 'pt',
  tr_tr: 'tr',
  sv_se: 'sv',
  hu_hu: 'hu',
}

export function gitalkLanguageForLocale(locale: string): string {
  const key = locale.trim().toLowerCase().replace(/-/g, '_')
  return GITALK_LANGUAGE[key] ?? 'en'
}

export function isGitalkConfigured(config: GitalkSiteConfig | null | undefined): config is GitalkSiteConfig & {
  clientID: string
  repo: string
  owner: string
  admin: string[]
} {
  if (!config || config.enabled === false) return false
  if (!config.clientID?.trim() || !config.repo?.trim() || !config.owner?.trim()) return false
  const admin = config.admin?.filter(Boolean) ?? []
  return admin.length > 0
}

export async function loadGitalkConfig(): Promise<GitalkSiteConfig | null> {
  const urls = [
    GITALK_CONFIG_URL,
    'https://wiki.terrafirmagreg.team/gitalk-config.json',
  ]
  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (res.ok) return (await res.json()) as GitalkSiteConfig
    } catch {
      // try next
    }
  }
  return null
}

export function wikiGitalkIssueId(pathname: string, locale: string): string {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const suffix = normalized.replace(new RegExp(`^/modern/${locale}`), '') || '/'
  const raw = `wiki/${locale}${suffix === '/' ? '' : suffix}`
  if (raw.length <= GITALK_ID_MAX) return raw
  return `wiki/${hashPath(raw).slice(0, GITALK_ID_MAX - 5)}`
}

function hashPath(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash.toString(36)
}
