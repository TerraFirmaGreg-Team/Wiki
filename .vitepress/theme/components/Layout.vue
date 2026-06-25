<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GiscusComments from './GiscusComments.vue'
import NotFound from './NotFound.vue'
import UntranslatedBanner from './UntranslatedBanner.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #doc-before>
      <UntranslatedBanner />
    </template>
    <template #home-hero-after>
      <div class="home-untranslated-banner">
        <UntranslatedBanner />
      </div>
    </template>
    <template #doc-after>
      <GiscusComments />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>

<style scoped>
.home-untranslated-banner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 24px;
}
</style>
