---
title: TerraFirmaGreg Wiki
description: Official TerraFirmaGreg wiki — choose your language to continue.
layout: page
sidebar: false
aside: false
prev: false
next: false
head:
  - - link
    - rel: canonical
      href: https://wiki.terrafirmagreg.team/modern/en_us/
  - - meta
    - http-equiv: refresh
      content: 0; url=/modern/en_us/
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en']
  let target = '/modern/en_us/'
  for (const raw of langs) {
    const lang = raw.toLowerCase()
    if (lang.startsWith('zh')) { target = '/modern/zh_cn/'; break }
    if (lang.startsWith('pt')) { target = '/modern/pt_br/'; break }
    if (lang.startsWith('en')) { target = '/modern/en_us/'; break }
  }
  location.replace(withBase(target))
})
</script>

# TerraFirmaGreg Wiki

Redirecting to your preferred language…

If you are not redirected automatically:

- [English](/modern/en_us/)
- [简体中文](/modern/zh_cn/)
- [Português (BR)](/modern/pt_br/)
