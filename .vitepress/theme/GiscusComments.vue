<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import Giscus from '@giscus/vue'
import './giscus.css'

const GISCUS_DEFAULT = {
  repo: 'TerraFirmaGreg-Team/Modpack-Modern' as const,
  repoId: 'R_kgDOH_FIbA',
  category: 'General',
  categoryId: 'DIC_kwDOH_FIbM4CbMDm',
}

const GISCUS_LANG: Record<string, string> = {
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

type GiscusConfig = typeof GISCUS_DEFAULT & { enabled?: boolean }

const route = useRoute()
const { frontmatter } = useData()

const giscus = ref<GiscusConfig | null>(null)
const ready = ref(false)
const theme = ref<'light' | 'dark'>('light')
const sectionRef = ref<HTMLElement | null>(null)

const showComments = computed(() => {
  const layout = frontmatter.value.layout
  return layout !== 'home' && layout !== 'page'
})

const locale = computed(() => route.path.match(/^\/modern\/([a-z]{2}_[a-z]{2})(?:\/|$)/)?.[1] ?? 'en_us')

const commentsTitle = computed(() => {
  const lang = locale.value
  if (lang === 'zh_cn' || lang === 'zh_tw' || lang === 'zh_hk') return '评论'
  return 'Comments'
})

const giscusKey = computed(() => route.path)
const giscusTerm = computed(() => route.path)

function giscusLang() {
  return GISCUS_LANG[locale.value] ?? 'en'
}

function readTheme() {
  theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function syncGiscusWidgetTheme(value: 'light' | 'dark') {
  const widget = sectionRef.value?.querySelector('giscus-widget') as HTMLElement & { theme?: string } | null
  if (widget) widget.theme = value
}

watch(theme, (value) => {
  syncGiscusWidgetTheme(value)
})

let sectionObserver: MutationObserver | null = null

watch(sectionRef, (section) => {
  sectionObserver?.disconnect()
  sectionObserver = null
  if (!section) return
  sectionObserver = new MutationObserver(() => syncGiscusWidgetTheme(theme.value))
  sectionObserver.observe(section, { childList: true, subtree: true })
  syncGiscusWidgetTheme(theme.value)
})

onUnmounted(() => sectionObserver?.disconnect())

onMounted(async () => {
  readTheme()
  new MutationObserver(readTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  if (!showComments.value) return
  try {
    const res = await fetch('/giscus-config.json')
    if (res.ok) {
      const json = (await res.json()) as GiscusConfig
      if (json.enabled !== false && json.repoId) {
        giscus.value = { ...GISCUS_DEFAULT, ...json }
        ready.value = true
        return
      }
    }
  } catch {
  }
  giscus.value = GISCUS_DEFAULT
  ready.value = true
})
</script>

<template>
  <section v-if="showComments && ready && giscus" ref="sectionRef" class="wiki-giscus">
    <h2 class="wiki-giscus__title">{{ commentsTitle }}</h2>
    <Giscus
      :key="giscusKey"
      :repo="giscus.repo"
      :repo-id="giscus.repoId"
      :category="giscus.category"
      :category-id="giscus.categoryId"
      mapping="specific"
      :term="giscusTerm"
      strict="1"
      :theme="theme"
      :lang="giscusLang()"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      loading="lazy"
    />
  </section>
</template>
