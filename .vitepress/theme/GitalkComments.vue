<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  gitalkLanguageForLocale,
  isGitalkConfigured,
  loadGitalkConfig,
  wikiGitalkIssueId,
  wikiGitalkRawKey,
  type GitalkSiteConfig,
} from './lib/gitalk'
import 'gitalk/dist/gitalk.css'
import './gitalk.css'

const route = useRoute()
const { frontmatter, title } = useData()

const containerRef = ref<HTMLDivElement | null>(null)
const gitalkConfig = ref<GitalkSiteConfig | null>(null)
const ready = ref(false)

const showComments = computed(() => {
  const layout = frontmatter.value.layout
  return layout !== 'home' && layout !== 'page'
})

const locale = computed(() => {
  const match = route.path.match(/^\/modern\/([a-z]{2}_[a-z]{2})(?:\/|$)/)
  return match?.[1] ?? 'en_us'
})

const commentsTitle = computed(() => {
  const lang = locale.value
  if (lang === 'zh_cn' || lang === 'zh_tw' || lang === 'zh_hk') return '评论'
  return 'Comments'
})

onMounted(async () => {
  if (!showComments.value) return
  const config = await loadGitalkConfig()
  gitalkConfig.value = config
  ready.value = isGitalkConfigured(config)
})

let cleanup: (() => void) | undefined

watch(
  () => [route.path, ready.value] as const,
  async ([path, isReady]) => {
    cleanup?.()
    cleanup = undefined

    const container = containerRef.value
    if (!isReady || !container || !showComments.value) return

    const config = gitalkConfig.value
    if (!isGitalkConfigured(config)) return

    let cancelled = false
    const pageUrl = window.location.origin + path
    const pageTitle = title.value || document.title

    const { default: Gitalk } = await import('gitalk')
    if (cancelled) return

    const rawKey = wikiGitalkRawKey(path, locale.value)
    const id = await wikiGitalkIssueId(path, locale.value)

    container.replaceChildren()
    const gitalk = new Gitalk({
      clientID: config.clientID.trim(),
      clientSecret: config.clientSecret?.trim() || undefined,
      repo: config.repo.trim(),
      owner: config.owner.trim(),
      admin: config.admin.map((name) => name.trim()).filter(Boolean),
      id,
      title: pageTitle,
      body: ['Wiki discussion', '', `- Key: \`${rawKey}\``, `- Page: ${pageUrl}`].join('\n'),
      labels: ['wiki'],
      language: gitalkLanguageForLocale(locale.value),
      distractionFreeMode: config.distractionFreeMode ?? false,
      createIssueManually: config.createIssueManually ?? false,
      proxy: config.proxy?.trim() || undefined,
    })
    gitalk.render(container)

    cleanup = () => {
      cancelled = true
      container.replaceChildren()
    }
  },
  { flush: 'post' },
)

onUnmounted(() => {
  cleanup?.()
  containerRef.value?.replaceChildren()
})
</script>

<template>
  <section v-if="showComments && ready" class="wiki-gitalk">
    <h2 class="wiki-gitalk__title">{{ commentsTitle }}</h2>
    <div ref="containerRef" />
  </section>
</template>
