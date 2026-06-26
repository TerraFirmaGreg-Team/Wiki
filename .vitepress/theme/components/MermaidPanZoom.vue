<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useMermaidPanZoom } from 'vitepress-plugin-mermaid-pan-zoom'
import 'vitepress-plugin-mermaid-pan-zoom/dist/style.css'

function normalizeAllMermaidSvgs() {
  document.querySelectorAll('.mermaid svg').forEach((el) => {
    const svg = el as SVGSVGElement
    svg.style.maxWidth = 'none'
    svg.style.width = '100%'
    svg.style.height = '100%'
  })
}

onMounted(() => {
  const schedule = () => nextTick(normalizeAllMermaidSvgs)

  schedule()

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style'],
  })
})

useMermaidPanZoom()
</script>

<template />
