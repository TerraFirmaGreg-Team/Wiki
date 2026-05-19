---
title: TFG Wiki
description: Redirecting to your preferred language…
layout: page
sidebar: false
aside: false
prev: false
next: false
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=en_us/
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en']
  let target = '/en_us/'
  for (const raw of langs) {
    const lang = raw.toLowerCase()
    if (lang.startsWith('zh')) { target = '/zh_cn/'; break }
    if (lang.startsWith('pt')) { target = '/pt_br/'; break }
    if (lang.startsWith('en')) { target = '/en_us/'; break }
  }
  location.replace(withBase(target))
})
</script>

# TFG Wiki

Redirecting to your preferred language…

If you are not redirected automatically:

- [English](/en_us/)
- [简体中文](/zh_cn/)
- [Português (BR)](/pt_br/)
