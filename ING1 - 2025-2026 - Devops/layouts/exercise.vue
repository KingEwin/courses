<script setup>
defineProps({
  duration: { type: String, default: '' },
  type: { type: String, default: 'solo' }, // solo, group, demo
})

const typeConfig = {
  solo: { icon: '✏️', label: 'Travail individuel', color: 'from-[#059669] to-[#047857]' },
  group: { icon: '👥', label: 'Travail en groupe', color: 'from-[#7c3aed] to-[#6d28d9]' },
  demo: { icon: '🖥️', label: 'Démonstration', color: 'from-[#2563eb] to-[#1d4ed8]' },
}
</script>

<template>
  <div class="slidev-layout h-full flex flex-col">
    <!-- Header bar -->
    <div
      class="flex items-center justify-between px-6 py-3 -mx-14 -mt-8 mb-6 text-white bg-gradient-to-r"
      :class="typeConfig[type]?.color || typeConfig.solo.color"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ typeConfig[type]?.icon || '✏️' }}</span>
        <span class="font-bold text-lg">{{ typeConfig[type]?.label || 'Exercice' }}</span>
      </div>
      <span v-if="duration" class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
        ⏱ {{ duration }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
