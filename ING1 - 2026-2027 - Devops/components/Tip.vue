<script setup>
defineProps({
  type: { type: String, default: 'info' }, // info, warning, danger, success
})

const config = {
  info: { icon: 'ℹ️', border: 'border-[#2563eb] dark:border-[#60a5fa]', bg: 'bg-[#2563eb]/5 dark:bg-[#60a5fa]/10' },
  warning: { icon: '⚠️', border: 'border-[#d97706] dark:border-[#fbbf24]', bg: 'bg-[#d97706]/5 dark:bg-[#fbbf24]/10' },
  danger: { icon: '🚨', border: 'border-[#dc2626] dark:border-[#f87171]', bg: 'bg-[#dc2626]/5 dark:bg-[#f87171]/10' },
  success: { icon: '✅', border: 'border-[#059669] dark:border-[#34d399]', bg: 'bg-[#059669]/5 dark:bg-[#34d399]/10' },
}
</script>

<template>
  <div
    class="rounded-lg border-l-4 px-4 py-3 my-3 text-sm leading-relaxed"
    :class="[config[type].border, config[type].bg]"
  >
    <span class="mr-1.5">{{ config[type].icon }}</span>
    <slot />
  </div>
</template>
