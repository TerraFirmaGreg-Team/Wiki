<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { isUntranslatedPage } from '../untranslated-notice'
import UntranslatedNotice from './UntranslatedNotice.vue'

const { frontmatter } = useData()

const visible = computed(() => isUntranslatedPage(frontmatter.value))
</script>

<template>
  <UntranslatedNotice v-if="visible" class="UntranslatedBanner" />
</template>

<style scoped>
.UntranslatedBanner {
  margin: 0 0 24px;
}
</style>
