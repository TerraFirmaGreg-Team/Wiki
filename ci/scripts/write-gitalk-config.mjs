import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = process.env.GITALK_CONFIG_DIST || resolve(__dirname, '../../.vitepress/dist')
const outPath = resolve(distDir, 'gitalk-config.json')

const enabled = process.env.GITALK_ENABLED === 'true'
const clientID = process.env.GITALK_CLIENT_ID?.trim()

if (!enabled || !clientID) {
  console.log('Gitalk config: skipped (set GITALK_ENABLED=true and GITALK_CLIENT_ID to override dist)')
  process.exit(0)
}

const admin = (process.env.GITALK_ADMIN || '')
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean)

const config = {
  enabled: true,
  clientID,
  repo: process.env.GITALK_REPO?.trim() || '',
  owner: process.env.GITALK_OWNER?.trim() || '',
  admin,
  proxy: process.env.GITALK_PROXY?.trim() || '',
  distractionFreeMode: process.env.GITALK_DISTRACTION_FREE === 'true',
}

mkdirSync(distDir, { recursive: true })
writeFileSync(outPath, `${JSON.stringify(config, null, 2)}\n`)
console.log(`Wrote ${outPath}`)
