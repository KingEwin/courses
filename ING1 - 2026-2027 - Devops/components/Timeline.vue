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
            ? 'bg-[#2563eb] ring-[#2563eb]/20 dark:(bg-[#60a5fa] ring-[#60a5fa]/20)'
            : 'bg-[#94a3b8] ring-[#94a3b8]/10 dark:(bg-[#475569] ring-[#475569]/10)'"
        />
        <div
          v-if="i < steps.length - 1"
          class="w-0.5 flex-1 -mt-0.5"
          :class="step.active ? 'bg-[#2563eb]/30 dark:bg-[#60a5fa]/30' : 'bg-[#e2e8f0] dark:bg-[#334155]'"
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
