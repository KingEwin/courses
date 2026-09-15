<script setup>
defineProps({
  steps: {
    type: Array,
    required: true,
    // Each step: { time: '00:00', title: 'Step', desc?: 'Description', active?: false }
  },
})
</script>

<template>
  <div class="my-4">
    <div
      v-for="(step, i) in steps"
      :key="i"
      class="flex gap-4 relative"
    >
      <!-- Timeline line -->
      <div class="flex flex-col items-center">
        <div
          class="w-3 h-3 rounded-full mt-1.5 z-1 ring-4"
          :class="step.active
            ? 'bg-[#c1502e] ring-[#c1502e]/20 dark:(bg-[#e08a63] ring-[#e08a63]/20)'
            : 'bg-[#94a3b8] ring-[#94a3b8]/10 dark:(bg-[#6b6259] ring-[#6b6259]/10)'"
        />
        <div
          v-if="i < steps.length - 1"
          class="w-0.5 flex-1 -mt-0.5"
          :class="step.active ? 'bg-[#c1502e]/30 dark:bg-[#e08a63]/30' : 'bg-[#e7ddd3] dark:bg-[#3d362f]'"
        />
      </div>
      <!-- Content -->
      <div class="pb-5 flex-1">
        <div class="flex items-baseline gap-2">
          <span class="font-mono text-xs text-accent font-bold">{{ step.time }}</span>
          <span class="font-semibold text-sm">{{ step.title }}</span>
        </div>
        <div v-if="step.desc" class="text-xs text-muted mt-0.5">{{ step.desc }}</div>
      </div>
    </div>
  </div>
</template>
