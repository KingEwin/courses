<script setup>
defineProps({
  title: { type: String, default: 'Récapitulatif' },
})
</script>

<template>
  <div class="rounded-xl bg-gradient-to-br from-[#2563eb]/10 to-[#7c3aed]/10 dark:(from-[#60a5fa]/15 to-[#a78bfa]/15) border border-[#2563eb]/20 dark:border-[#60a5fa]/20 p-6 my-4">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xl">📋</span>
      <span class="font-bold text-lg text-accent">{{ title }}</span>
    </div>
    <div class="text-sm leading-relaxed">
      <slot />
    </div>
  </div>
</template>
