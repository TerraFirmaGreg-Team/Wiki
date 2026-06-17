import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(
  process.env.GISCUS_CONFIG_DIST || resolve(__dirname, '../../.vitepress/dist'),
  'giscus-config.json',
)

const enabled = process.env.GISCUS_ENABLED === 'true'
const repoId = process.env.GISCUS_REPO_ID?.trim()

if (!enabled || !repoId) {
  console.log('Giscus config: skipped (set GISCUS_ENABLED=true and GISCUS_REPO_ID to override dist)')
  process.exit(0)
}

const config = {
  enabled: true,
  repo: process.env.GISCUS_REPO?.trim() || 'TerraFirmaGreg-Team/Modpack-Modern',
  repoId,
  category: process.env.GISCUS_CATEGORY?.trim() || 'General',
  categoryId: process.env.GISCUS_CATEGORY_ID?.trim() || '',
}

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, `${JSON.stringify(config, null, 2)}\n`)
console.log(`Wrote ${outPath}`)
