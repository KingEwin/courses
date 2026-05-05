<template>
  <div class="slidev-layout flex-col-center h-full text-center relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-[#7c3aed]/5 dark:(from-[#60a5fa]/10 to-[#a78bfa]/10)" />

    <div class="relative z-10">
      <div class="text-5xl mb-6">🎓</div>
      <div class="[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-accent [&_h1]:mb-4 [&_h1]:border-none [&_p]:text-muted [&_p]:text-lg">
        <slot />
      </div>
      <div class="mt-8 w-16 h-1 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-full mx-auto" />
      <div class="mt-6 text-sm text-muted">
        Master Ingénierie Informatique et Management
      </div>
    </div>
  </div>
</template>
