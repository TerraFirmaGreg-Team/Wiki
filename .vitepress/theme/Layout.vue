<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'

const Layout = DefaultTheme.Layout
</script>

<template>
  <Layout>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>
