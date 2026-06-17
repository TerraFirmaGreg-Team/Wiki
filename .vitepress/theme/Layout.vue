<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GiscusComments from './GiscusComments.vue'
import NotFound from './NotFound.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #doc-after>
      <GiscusComments />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
