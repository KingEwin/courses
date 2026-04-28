<script setup>
defineProps({
  left: { type: String, default: 'Option A' },
  right: { type: String, default: 'Option B' },
  leftColor: { type: String, default: 'blue' }, // blue, green, red
  rightColor: { type: String, default: 'purple' },
})

const colors = {
  blue: 'border-[#2563eb] bg-[#2563eb]/5 dark:(border-[#60a5fa] bg-[#60a5fa]/10)',
  green: 'border-[#059669] bg-[#059669]/5 dark:(border-[#34d399] bg-[#34d399]/10)',
  red: 'border-[#dc2626] bg-[#dc2626]/5 dark:(border-[#f87171] bg-[#f87171]/10)',
  purple: 'border-[#7c3aed] bg-[#7c3aed]/5 dark:(border-[#a78bfa] bg-[#a78bfa]/10)',
  orange: 'border-[#d97706] bg-[#d97706]/5 dark:(border-[#fbbf24] bg-[#fbbf24]/10)',
}

const textColors = {
  blue: 'text-[#2563eb] dark:text-[#60a5fa]',
  green: 'text-[#059669] dark:text-[#34d399]',
  red: 'text-[#dc2626] dark:text-[#f87171]',
  purple: 'text-[#7c3aed] dark:text-[#a78bfa]',
  orange: 'text-[#d97706] dark:text-[#fbbf24]',
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4 my-4">
    <div class="rounded-xl border-t-4 p-4" :class="colors[leftColor]">
      <div class="font-bold mb-2" :class="textColors[leftColor]">{{ left }}</div>
      <div class="text-sm leading-relaxed">
        <slot name="left" />
      </div>
    </div>
    <div class="rounded-xl border-t-4 p-4" :class="colors[rightColor]">
      <div class="font-bold mb-2" :class="textColors[rightColor]">{{ right }}</div>
      <div class="text-sm leading-relaxed">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
