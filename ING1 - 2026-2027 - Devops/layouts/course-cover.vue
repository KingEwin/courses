<script setup>
defineProps({
  subtitle: { type: String, default: '' },
  session: { type: String, default: '' },
  instructor: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-[#7c3aed]/5 dark:(from-[#60a5fa]/10 to-[#a78bfa]/10)" />
    <div class="absolute top-0 right-0 w-80 h-80 bg-[#2563eb]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
    <div class="absolute bottom-0 left-0 w-60 h-60 bg-[#7c3aed]/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

    <div class="relative z-10 max-w-3xl">
      <!-- Session badge -->
      <div v-if="session" class="mb-6">
        <span class="badge-accent text-sm font-semibold px-4 py-1.5">{{ session }}</span>
      </div>

      <!-- Title -->
      <div class="mb-6">
        <slot />
      </div>

      <!-- Subtitle -->
      <div v-if="subtitle" class="text-xl text-muted mb-8 font-light">
        {{ subtitle }}
      </div>

      <!-- Separator -->
      <div class="w-16 h-1 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-full mx-auto mb-6" />

      <!-- Context -->
      <div class="text-sm text-muted">
        <div class="font-medium">Master Ingénierie Informatique et Management</div>
        <div v-if="instructor" class="mt-1 opacity-75">{{ instructor }}</div>
      </div>
    </div>
  </div>
</template>
