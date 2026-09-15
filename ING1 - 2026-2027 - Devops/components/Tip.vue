<script setup>
defineProps({
  type: { type: String, default: 'info' }, // info, warning, danger, success
})

const config = {
  info: { icon: 'ℹ️', border: 'border-[#c1502e] dark:border-[#e08a63]', bg: 'bg-[#c1502e]/5 dark:bg-[#e08a63]/10' },
  warning: { icon: '⚠️', border: 'border-[#b45309] dark:border-[#f59e0b]', bg: 'bg-[#b45309]/5 dark:bg-[#f59e0b]/10' },
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
