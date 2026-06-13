import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import { homeEditLinkSuffix, type UiLocale } from '../i18n/index.ts'

function isHomeLayout(markdown: string): boolean {
  const end = markdown.indexOf('---', 3)
  if (end === -1) {
    return false
  }
  const frontmatter = markdown.slice(3, end)
  return /^layout:\s*home\s*$/m.test(frontmatter) && !/^editLink:\s*false\s*$/m.test(frontmatter)
}

export function homeEditLinkPlugin(
  docsDir: string,
  ui: Record<string, UiLocale>,
  githubRepo: string,
): Plugin {
  const docsRoot = resolve(docsDir)

  return {
    name: 'tfg-home-edit-link',
    enforce: 'pre',
    transform(code, id) {
      const file = id.split('?')[0]
      if (!file.startsWith(docsRoot) || !file.endsWith('/index.md')) {
        return
      }

      if (!isHomeLayout(code)) {
        return
      }

      const relativePath = file.slice(docsRoot.length + 1)
      const suffix = homeEditLinkSuffix(relativePath, ui, githubRepo)
      if (!suffix) {
        return
      }

      const url = `https://github.com/${githubRepo}/edit/main/docs/${relativePath}`
      if (code.includes(url)) {
        return
      }

      return {
        code: `${code.trimEnd()}${suffix}`,
        map: null,
      }
    },
  }
}
