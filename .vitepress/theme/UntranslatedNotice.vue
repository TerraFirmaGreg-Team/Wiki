<script setup lang="ts">
import { CROWDIN_NAME, CROWDIN_WIKI_URL, UNTRANSLATED_BEFORE_CROWDIN } from './untranslated-notice'
</script>

<template>
  <div class="UntranslatedNotice custom-block warning">
    <p>
      {{ UNTRANSLATED_BEFORE_CROWDIN }}<a :href="CROWDIN_WIKI_URL" target="_blank" rel="noreferrer">{{ CROWDIN_NAME }}</a
      >.
    </p>
  </div>
</template>
