<script setup lang="ts">
import { VPHomeHero, VPHomeFeatures } from 'vitepress/theme'
import { useData } from 'vitepress'
import UntranslatedBanner from './UntranslatedBanner.vue'

const { frontmatter, theme } = useData()
</script>

<template>
  <div
    class="VPHome"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <VPHomeHero />
    <div class="home-untranslated-banner">
      <UntranslatedBanner />
    </div>
    <VPHomeFeatures />
    <div class="vp-doc home-content">
      <template v-if="frontmatter.markdownStyles !== false">
        <Content />
      </template>
      <Content v-else />
    </div>
  </div>
</template>

<style scoped>
.VPHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}

.home-untranslated-banner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 24px;
}

.home-content {
  margin: auto;
  width: 100%;
  max-width: 1280px;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .home-content {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home-content {
    padding: 0 64px;
  }
}
</style>
