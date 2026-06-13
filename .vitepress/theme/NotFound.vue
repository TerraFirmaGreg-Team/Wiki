<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import { resolveNotFoundView, readNotFoundLabels } from './not-found'

const route = useRoute()
const { theme } = useData()

const labels = computed(() => readNotFoundLabels(theme.value.notFound))
const view = computed(() => resolveNotFoundView(route.path, labels.value))
</script>

<template>
  <div class="NotFound">
    <p class="code">{{ theme.notFound?.code ?? '404' }}</p>
    <h1 class="title">{{ labels.title }}</h1>
    <div class="divider" />
    <blockquote class="quote">
      {{ view.quote }}
    </blockquote>

    <div class="actions">
      <a class="link" :href="withBase(view.homeHref)" :aria-label="labels.homeLink">
        {{ labels.homeLink }}
      </a>
      <a v-if="view.englishHref" class="link" :href="withBase(view.englishHref)">
        {{ labels.englishLink }}
      </a>
      <a
        v-if="view.contributeHref"
        class="link"
        :href="view.contributeHref"
        target="_blank"
        rel="noreferrer"
      >
        {{ labels.contributeLink }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 320px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
