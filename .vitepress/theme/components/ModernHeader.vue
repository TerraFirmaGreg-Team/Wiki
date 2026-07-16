<script setup lang="ts">
defineProps<{
  fade?: boolean
  dir?: string
  from?: string
  to?: string
  image?: string
}>()
</script>

<template>
  <div :class="fade ? 'modern-header-fade' : 'modern-header'" :style="{
    '--gt-dir': dir,
    '--gt-from': from,
    '--gt-to': to,
    '--gt-image': image
  }">
    <div class="modern-header-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modern-header, .modern-header-fade {
    display: block;
    text-align: center;
    position: relative;
    z-index: 0;
    isolation: isolate;
    padding: 10px;
    margin-bottom: 1.5rem;
    border-radius: 20px;
    border: 1px solid transparent;

    --gt-dir: to right;
    --gt-from: #fa18cf;
    --gt-to: #ff7967;
    --gt-image: linear-gradient(var(--gt-dir), var(--gt-from), var(--gt-to));
    --fade-start: 0%;
}

.modern-header {
    background-image: radial-gradient(var(--tfg-header-bg-inner), var(--tfg-header-bg-outer));
    box-shadow: 0 0 20px var(--tfg-header-shadow);
}

.modern-header-fade::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  border: 1px solid transparent;

  background: var(--gt-image) border-box;

  -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(to bottom, #fff 0%, transparent 100%) border-box;
  -webkit-mask-composite: destination-out;
  mask:
      linear-gradient(to bottom, #fff 0%, transparent 100%) border-box,
      linear-gradient(#fff 0 0) padding-box;
  mask-composite: subtract;
}

</style>
