<script setup lang="ts">
defineProps<{
  dir?: string
  from?: string
  to?: string
  image?: string
}>()
</script>

<template>
  <span class="gradient-text" :style="{
    '--gt-dir': dir,
    '--gt-from': from,
    '--gt-to': to,
    '--gt-image': image
  }">
    <slot />
  </span>
</template>

<style scoped>
.gradient-text {
  --gt-dir: to right;
  --gt-from: #fa18cf;
  --gt-to: #ff7967;
  --gt-image: linear-gradient(var(--gt-dir), var(--gt-from), var(--gt-to));

  background-image: var(--gt-image);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent !important;
}
</style>
