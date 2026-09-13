<script setup>
defineProps({
  author: { type: String, default: '' },
  source: { type: String, default: '' },
})
</script>

<template>
  <div class="text-xs text-muted text-right mt-2 italic">
    <span v-if="author">— {{ author }}</span>
    <span v-if="source"> · {{ source }}</span>
  </div>
</template>
