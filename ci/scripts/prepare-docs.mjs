#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadWikiLanguageConfig } from '../lib/tfg-locale.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const WIKI_ROOT = join(__dirname, '../..')
const SOURCE_DOCS = join(WIKI_ROOT, 'docs')
const BUILD_DOCS = join(WIKI_ROOT, '.build')
const SOURCE_MODERN = join(SOURCE_DOCS, 'modern')
const BUILD_MODERN = join(BUILD_DOCS, 'modern')

function scanMdFiles(dir, base = dir) {
  const entries = []
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

function parseFrontmatter(markdown) {
  const normalized = markdown.replace(/^\uFEFF/, '')
  if (!normalized.startsWith('---')) {
    return { data: {}, body: normalized }
  }
  const end = normalized.indexOf('---', 3)
  if (end === -1) {
    return { data: {}, body: normalized }
  }
  const raw = normalized.slice(3, end).trim()
  const data = {}
  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) {
      continue
    }
    const [, key, value] = match
    if (value === 'true') {
      data[key] = true
    } else if (value === 'false') {
      data[key] = false
    } else if (/^\d+$/.test(value)) {
      data[key] = Number(value)
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }
  return { data, body: normalized.slice(end + 3) }
}

function isGeneratedStub(content) {
  return (
    content.includes('untranslated: true') &&
    content.includes('<!-- @include:') &&
    content.includes('/en_us/')
  )
}

function includePathFor(localeRelPath) {
  const depth = localeRelPath.split('/').length
  return `${'../'.repeat(depth)}en_us/${localeRelPath}`
}

function buildStubFrontmatter(enData) {
  const lines = ['---']
  if (enData.title != null) {
    lines.push(`title: ${JSON.stringify(String(enData.title))}`)
  }
  if (enData.order != null) {
    lines.push(`order: ${enData.order}`)
  }
  lines.push('untranslated: true')
  lines.push('---')
  return lines.join('\n')
}

function cleanupLegacyStubsInSource() {
  if (!existsSync(SOURCE_MODERN)) {
    return 0
  }

  let removed = 0
  for (const rel of scanMdFiles(SOURCE_MODERN)) {
    const path = join(SOURCE_MODERN, rel)
    const content = readFileSync(path, 'utf8')
    if (!isGeneratedStub(content)) {
      continue
    }
    rmSync(path)
    removed++
  }
  return removed
}

function isPlaceholderLocaleIndex(content) {
  return content.includes('translationInProgress: true') && !content.includes('\nfeatures:\n')
}

function injectTranslationInProgress(content) {
  if (/^translationInProgress:\s*true\s*$/m.test(content)) {
    return content
  }
  const normalized = content.replace(/^\uFEFF/, '')
  return normalized.replace(/^(---\nlayout: home\n)/m, '$1translationInProgress: true\n')
}

function rewriteLocaleLinks(content, locale, defaultLocale) {
  return content.replaceAll(`/modern/${defaultLocale}/`, `/modern/${locale}/`)
}

function cleanupLegacyPlaceholderIndexes() {
  if (!existsSync(SOURCE_MODERN)) {
    return 0
  }

  let removed = 0
  for (const rel of scanMdFiles(SOURCE_MODERN)) {
    if (!/^[^/]+\/index\.md$/.test(rel)) {
      continue
    }
    const path = join(SOURCE_MODERN, rel)
    const content = readFileSync(path, 'utf8')
    if (!isPlaceholderLocaleIndex(content)) {
      continue
    }
    rmSync(path)
    removed++
  }
  return removed
}

function writeLocaleFallbackStubs(defaultLocale, enabledLocales) {
  const enDir = join(SOURCE_MODERN, defaultLocale)
  const enPages = scanMdFiles(enDir).filter((rel) => rel !== 'index.md')
  const enIndexContent = readFileSync(join(enDir, 'index.md'), 'utf8')

  let stubsCreated = 0
  let indexFallbacks = 0
  let skipped = 0

  for (const locale of enabledLocales) {
    if (locale === defaultLocale) {
      continue
    }

    const sourceIndex = join(SOURCE_MODERN, locale, 'index.md')
    if (!existsSync(sourceIndex)) {
      let content = rewriteLocaleLinks(enIndexContent, locale, defaultLocale)
      content = injectTranslationInProgress(content)
      const targetIndex = join(BUILD_MODERN, locale, 'index.md')
      mkdirSync(dirname(targetIndex), { recursive: true })
      writeFileSync(targetIndex, content, 'utf8')
      indexFallbacks++
    }

    for (const rel of enPages) {
      const sourcePath = join(SOURCE_MODERN, locale, rel)
      if (existsSync(sourcePath)) {
        skipped++
        continue
      }

      const enPath = join(enDir, rel)
      const { data } = parseFrontmatter(readFileSync(enPath, 'utf8'))
      const stub = `${buildStubFrontmatter(data)}\n\n<!-- @include: ${includePathFor(rel)} -->\n`
      const targetPath = join(BUILD_MODERN, locale, rel)

      mkdirSync(dirname(targetPath), { recursive: true })
      writeFileSync(targetPath, stub, 'utf8')
      stubsCreated++
    }
  }

  return {
    stubsCreated,
    indexFallbacks,
    skipped,
    enPages: enPages.length,
    locales: enabledLocales.length - 1,
  }
}

function main() {
  const { enabledLocales, defaultLocale } = loadWikiLanguageConfig()
  const removedStubs = cleanupLegacyStubsInSource()
  const removedIndexes = cleanupLegacyPlaceholderIndexes()
  rmSync(BUILD_DOCS, { recursive: true, force: true })
  cpSync(SOURCE_DOCS, BUILD_DOCS, { recursive: true })

  const { stubsCreated, indexFallbacks, skipped, enPages, locales } = writeLocaleFallbackStubs(
    defaultLocale,
    enabledLocales,
  )

  console.log(
    `[prepare-docs] build tree → ${relative(WIKI_ROOT, BUILD_DOCS)}; ${indexFallbacks} index fallback(s), ${stubsCreated} page stub(s), ${skipped} translated page(s) kept, ${removedStubs} legacy stub(s) and ${removedIndexes} placeholder index(es) removed from docs/ (${enPages} en_us pages × ${locales} locales)`,
  )
}

main()
