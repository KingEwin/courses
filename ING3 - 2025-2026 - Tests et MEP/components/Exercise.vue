<script setup>
defineProps({
  title: { type: String, default: 'Exercice' },
  duration: { type: String, default: '' },
  type: { type: String, default: 'solo' }, // solo, group, demo
})

const typeConfig = {
  solo: { icon: '✏️', label: 'Individuel' },
  group: { icon: '👥', label: 'En groupe' },
  demo: { icon: '🖥️', label: 'Démonstration' },
}
</script>

<template>
  <div class="rounded-xl border-2 border-dashed border-[#059669] dark:border-[#34d399] bg-[#059669]/5 dark:bg-[#34d399]/10 p-5 my-4">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-xl">{{ typeConfig[type]?.icon || '✏️' }}</span>
        <span class="font-bold text-[#059669] dark:text-[#34d399] text-lg">{{ title }}</span>
        <span class="badge bg-success text-xs">{{ typeConfig[type]?.label || 'Pratique' }}</span>
      </div>
      <span v-if="duration" class="badge bg-warning text-xs">⏱ {{ duration }}</span>
    </div>
    <div class="text-sm leading-relaxed">
      <slot />
    </div>
  </div>
</template>
