<script setup>
defineProps({
  duration: { type: String, default: '' },
  questions: { type: Number },
  cover: { type: String },
})
</script>

<template>
  <div class="slidev-layout h-full flex flex-col">
    <!-- Header bar -->
    <div
      class="flex items-center justify-between px-6 py-3 -mx-14 -mt-9 mb-6 text-white bg-gradient-to-r from-[#2b2620] to-[#c1502e]"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl" aria-hidden="true">❓</span>
        <span class="font-bold text-lg">QCM interactif</span>
      </div>
      <span v-if="duration" class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
        ⏱ {{ duration }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1">
      <div class="grid grid-cols-2 gap-8 items-center h-full">
        <div>


          <strong>Couvre</strong> : <p>{{ cover }}</p>

          <ul>
            <li>{{ questions }} questions</li>
            <li>Certaines questions à <strong>réponses multiples</strong>, indiqué sur chaque question</li>
          </ul>

        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <div
            class="relative w-56 h-56 bg-white rounded-lg shadow-xl border-4 border-[#2b2620] flex items-center justify-center"
            style="background-image: repeating-conic-gradient(#2b2620 0% 25%, #ffffff 0% 50%); background-size: 16px 16px;"
          >
            <div class="absolute top-2 left-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
            <div class="absolute top-2 right-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
            <div class="absolute bottom-2 left-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
            <div class="relative z-10 bg-white/95 px-4 py-3 rounded-md border-2 border-[#c1502e] text-center leading-tight">
              <span class="block font-bold text-[#c1502e]">QR CODE</span>
              <span class="block font-bold text-[#c1502e]">À REMPLACER</span>
            </div>
          </div>
          <div class="text-center">
            <div class="font-semibold text-heading">Kahoot ou équivalent</div>
            <div class="text-sm text-muted">Rejoignez le quiz avec le PIN affiché à l'écran</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
