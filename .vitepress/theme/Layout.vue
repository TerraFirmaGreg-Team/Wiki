<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GitalkComments from './GitalkComments.vue'
import NotFound from './NotFound.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <GitalkComments />
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
