<script setup>
defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '💡' },
})
</script>

<template>
  <div class="card-accent my-4">
    <div class="flex items-start gap-3">
      <span class="text-2xl mt-0.5">{{ icon }}</span>
      <div class="flex-1">
        <div class="font-bold text-lg mb-1 text-accent">{{ title }}</div>
        <div class="text-sm leading-relaxed opacity-90">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
