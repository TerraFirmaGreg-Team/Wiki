import { readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:tfg-page-index'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

function scanMdFiles(dir: string, base: string): string[] {
  const entries: string[] = []
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      entries.push(...scanMdFiles(path, base))
      continue
    }
    if (name.endsWith('.md')) {
      entries.push(relative(base, path).replace(/\\/g, '/'))
    }
  }
  return entries
}

export function pageIndexPlugin(docsDir: string): Plugin {
  const docsRoot = resolve(docsDir)

  return {
    name: 'tfg-page-index',
    resolveId(id) {
      if (id === VIRTUAL_ID) {
        return RESOLVED_ID
      }
    },
    load(id) {
      if (id !== RESOLVED_ID) {
        return
      }
      const pages = scanMdFiles(docsRoot, docsRoot)
      return `export default new Set(${JSON.stringify(pages)})\n`
    },
  }
}
