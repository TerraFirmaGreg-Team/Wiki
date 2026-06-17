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

export async function hashGitalkRaw(raw: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw))
    return Array.from(new Uint8Array(buf))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  }
  return syncHashGitalkRaw(raw)
}

function syncHashGitalkRaw(raw: string): string {
  const parts: string[] = []
  for (let seed = 0; seed < 4; seed++) {
    let hash = seed
    for (let i = 0; i < raw.length; i++) {
      hash = Math.imul(hash ^ raw.charCodeAt(i), 0x5bd1e995)
      hash = (hash ^ (hash >>> 15)) >>> 0
    }
    parts.push(hash.toString(16).padStart(8, '0'))
  }
  return parts.join('')
}

export async function gitalkHashedId(sitePrefix: string, raw: string): Promise<string> {
  const hash = await hashGitalkRaw(raw)
  const hashBudget = GITALK_ID_MAX - sitePrefix.length - 1
  return `${sitePrefix}/${hash.slice(0, hashBudget)}`
}

/** Canonical key before hashing. */
export function wikiGitalkRawKey(pathname: string, locale: string): string {
  const normalized = pathname.replace(/\/$/, '') || '/'
  const suffix = normalized.replace(new RegExp(`^/modern/${locale}`), '') || '/'
  return `wiki/${locale}${suffix === '/' ? '' : suffix}`
}

export async function wikiGitalkIssueId(pathname: string, locale: string): Promise<string> {
  const raw = wikiGitalkRawKey(pathname, locale)
  return gitalkHashedId('wiki', raw)
}
