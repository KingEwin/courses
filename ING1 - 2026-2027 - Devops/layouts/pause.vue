<script setup>
defineProps({
  duration: { type: String, default: '15 min' },
})
</script>

<template>
  <div class="slidev-layout flex-col-center h-full bg-gradient-to-br from-[#f7f1ea] to-[#e7ddd3] dark:(from-[#211c18] to-[#181513]) text-center">
    <div class="text-6xl mb-6">☕</div>
    <div class="text-3xl font-bold text-heading mb-2">Pause</div>
    <div class="text-xl text-muted">{{ duration }}</div>
    <div class="mt-8 w-16 h-1 bg-gradient-to-r from-[#c1502e] to-[#b45309] rounded-full mx-auto" />
    <div class="mt-6 text-sm text-muted opacity-60">
      <slot>On se retrouve dans quelques minutes...</slot>
    </div>
  </div>
</template>
