<script setup>
defineProps({
  section: { type: [String, Number], default: '' },
})
</script>

<template>
  <div class="slidev-layout flex items-center h-full relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] dark:(from-[#1e40af] to-[#1e3a8a])" />
    <div class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
    <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-white/3 rounded-full translate-y-1/2" />

    <div class="relative z-10 px-16 text-white w-full">
      <!-- Section number -->
      <div v-if="section" class="mb-4">
        <span class="inline-block px-4 py-1 rounded-full bg-white/15 text-white/90 text-sm font-mono font-bold tracking-wider">
          SECTION {{ section }}
        </span>
      </div>

      <!-- Title slot -->
      <div class="text-white [&_h1]:text-white [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:border-none [&_p]:text-white/75 [&_p]:text-lg [&_p]:font-light">
        <slot />
      </div>

      <!-- Bottom accent line -->
      <div class="mt-8 w-24 h-1 bg-white/30 rounded-full" />
    </div>
  </div>
</template>
