<script setup>
import { useNav } from '@slidev/client'

const { currentLayout, currentPage, total } = useNav()

const hiddenLayouts = ['course-cover', 'cover', 'intro', 'end', 'pause', 'section-cover']
</script>

<template>
  <footer
    v-if="!hiddenLayouts.includes(currentLayout)"
    class="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-2.5 text-xs text-[#94a3b8] dark:text-[#475569] z-10"
  >
    <span class="opacity-60">Master IIM — G4</span>
    <span class="font-mono">{{ currentPage }} / {{ total }}</span>
  </footer>
</template>
