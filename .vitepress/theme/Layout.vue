<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GitalkComments from './GitalkComments.vue'
import NotFound from './NotFound.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #doc-after>
      <GitalkComments />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
