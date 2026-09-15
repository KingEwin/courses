<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentLayout, currentPage, total } = useNav()

const hiddenLayouts = ['course-cover', 'cover', 'intro', 'end', 'pause', 'section-cover']

const progress = computed(() => ((currentPage.value - 1) / (total.value - 1)) * 100)
</script>

<template>
  <!-- Top progress bar -->
  <div
    v-if="!hiddenLayouts.includes(currentLayout)"
    class="absolute top-0 left-0 right-0 z-10"
  >
    <div
      class="h-0.5 bg-gradient-to-r from-[#c1502e] to-[#b45309] transition-all duration-300"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
