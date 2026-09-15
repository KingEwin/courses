<script setup>
defineProps({
  section: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c1502e] to-[#b45309] flex-center text-white text-lg">
        📋
      </div>
      <div>
        <div class="font-bold text-lg text-accent">Récapitulatif</div>
        <div v-if="section" class="text-xs text-muted">{{ section }}</div>
      </div>
    </div>

    <div class="divider" />

    <!-- Content -->
    <div class="flex-1 [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2">
      <slot />
    </div>
  </div>
</template>
