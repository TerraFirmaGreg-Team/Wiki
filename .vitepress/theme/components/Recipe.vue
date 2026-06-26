<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(
  defineProps<{
    id: string
    lang?: string
    minHeight?: number
    baseUrl?: string
  }>(),
  {
    lang: '',
    minHeight: 300,
    baseUrl: '',
  },
)

const EMBED_SOURCE = 'recipe-book-embed'
const EMBED_NAVIGATE_EVENT = 'navigate'
const EMBED_RESIZE_EVENT = 'resize'
const RECIPE_BOOK_PREFIX = '/modern/recipe-book/'
const REMOTE_RECIPE_BOOK_ORIGIN = 'https://wiki.terrafirmagreg.team'

const frameId = `wiki-recipe-${Math.random().toString(36).slice(2, 10)}`
const iframeHeight = ref(props.minHeight)
const iframeRef = ref<HTMLIFrameElement | null>(null)
const loadError = ref<string | null>(null)
let loadCheckTimer: number | null = null
const { page } = useData()

const recipeOrigin = computed(() => {
  const raw = props.baseUrl.trim()
  if (!raw) {
    if (typeof window === 'undefined') {
      return ''
    }
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      return REMOTE_RECIPE_BOOK_ORIGIN
    }
    return window.location.origin
  }
  try {
    return new URL(raw).origin
  } catch {
    return typeof window === 'undefined' ? '' : window.location.origin
  }
})

const localeFromPage = computed(() => {
  const match = page.value.relativePath.match(/^modern\/([^/]+)\//)
  return match?.[1] ?? 'en_us'
})

const locale = computed(() => {
  const explicit = props.lang.trim()
  return explicit || localeFromPage.value
})

const recipeHref = computed(() => {
  const params = new URLSearchParams()
  params.set('embed', '1')
  params.set('lang', locale.value)
  params.set('recipe', props.id)
  params.set('frame', frameId)
  if (typeof window !== 'undefined') {
    params.set('parentOrigin', window.location.origin)
  }
  const base = recipeOrigin.value
  return `${base}${RECIPE_BOOK_PREFIX}?${params.toString()}`
})

function normalizeRecipeBookHref(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }
  try {
    const url = new URL(value, recipeOrigin.value || window.location.origin)
    if (url.origin !== recipeOrigin.value) {
      return null
    }
    if (!url.pathname.startsWith(RECIPE_BOOK_PREFIX)) {
      return null
    }
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

function onMessage(event: MessageEvent) {
  if (event.origin !== recipeOrigin.value) {
    return
  }
  const data = event.data as
    | {
        source?: string
        type?: string
        href?: string
        height?: number
        frameId?: string
      }
    | undefined
  if (!data || data.source !== EMBED_SOURCE) {
    return
  }

  if (data.type === EMBED_NAVIGATE_EVENT) {
    if (data.frameId !== frameId) {
      return
    }
    const href = normalizeRecipeBookHref(data.href)
    if (!href) {
      return
    }
    window.location.assign(href)
    return
  }

  if (data.type === EMBED_RESIZE_EVENT) {
    if (loadError.value) {
      return
    }
    if (data.frameId !== frameId) {
      return
    }
    const nextHeight = Number(data.height)
    if (!Number.isFinite(nextHeight) || nextHeight < 200) {
      return
    }
    iframeHeight.value = Math.max(props.minHeight, Math.ceil(nextHeight))
  }
}

function detect404Frame(): string | null {
  const iframe = iframeRef.value
  if (!iframe) {
    return null
  }
  try {
    const doc = iframe.contentDocument
    if (!doc) {
      return null
    }
    const title = (doc.title || '').toLowerCase()
    const bodyText = (doc.body?.innerText || '').slice(0, 4000).toLowerCase()
    const renderedWikiShell = Boolean(
      doc.querySelector('.VPNav, .VPDoc, .VPHome, .VPNotFound, .VPSidebar'),
    )
    const is404 =
      /\b404\b/.test(title) ||
      /\bpage not found\b/.test(bodyText) ||
      /页面未找到/.test(bodyText) ||
      /this page does not exist/.test(bodyText)
    if (renderedWikiShell) {
      return 'Recipe Book app is unavailable (received Wiki page instead).'
    }
    if (!is404) {
      return null
    }
    return 'Recipe Book page returned 404.'
  } catch {
    return null
  }
}

function onLoad() {
  iframeHeight.value = Math.max(props.minHeight, iframeHeight.value)
  if (loadCheckTimer != null) {
    window.clearTimeout(loadCheckTimer)
  }
  loadCheckTimer = window.setTimeout(() => {
    const error = detect404Frame()
    loadError.value = error
  }, 180)
}

function onFrameError() {
  loadError.value = 'Recipe Book iframe failed to load.'
}

onMounted(() => {
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  if (loadCheckTimer != null) {
    window.clearTimeout(loadCheckTimer)
  }
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <figure class="recipe-embed">
    <iframe
      ref="iframeRef"
      class="recipe-embed__frame"
      :src="recipeHref"
      :title="`Recipe ${id}`"
      loading="lazy"
      frameborder="0"
      :style="{ height: `${iframeHeight}px` }"
      :hidden="Boolean(loadError)"
      @load="onLoad"
      @error="onFrameError"
    />
    <div v-if="loadError" class="recipe-embed__error" role="alert">
      <div class="recipe-embed__error-title">Recipe unavailable</div>
      <div><strong>ID:</strong> <code>{{ id }}</code></div>
      <div><strong>Reason:</strong> {{ loadError }}</div>
    </div>
    <figcaption class="recipe-embed__caption">
      <a :href="recipeHref" target="_blank" rel="noopener noreferrer">Open in Recipe Book</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.recipe-embed {
  margin: 16px 0;
}

.recipe-embed__frame {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.recipe-embed__caption {
  margin-top: 8px;
  font-size: 0.85rem;
}

.recipe-embed__error {
  border: 1px solid var(--vp-c-danger-2);
  background: var(--vp-c-danger-soft);
  border-radius: 8px;
  padding: 12px;
  color: var(--vp-c-text-1);
}

.recipe-embed__error-title {
  font-weight: 600;
  margin-bottom: 6px;
}
</style>
