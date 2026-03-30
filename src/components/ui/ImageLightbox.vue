<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isOpen = ref(false);
const images = ref<string[]>([]);
const currentIndex = ref(0);
const baseAlt = ref('');

const activeImage = computed(() => images.value[currentIndex.value] || '');
const activeAlt = computed(() => {
  if (images.value.length <= 1) return baseAlt.value;
  return `${baseAlt.value} (${currentIndex.value + 1} / ${images.value.length})`;
});

function open(payload: any) {
  if (Array.isArray(payload.images)) {
    images.value = payload.images;
    currentIndex.value = payload.currentIndex || 0;
  } else {
    images.value = [payload.img];
    currentIndex.value = 0;
  }
  baseAlt.value = payload.alt || '';
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function close() {
  isOpen.value = false;
  images.value = [];
  document.body.style.overflow = '';
}

function next() {
  if (images.value.length <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

function prev() {
  if (images.value.length <= 1) return;
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  // Listen for custom events from Astro components
  window.addEventListener('open-lightbox', (e: any) => {
    open(e.detail);
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 select-none" @click.self="close">
      <!-- Close Button -->
      <button 
        @click="close"
        class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
        aria-label="Cerrar"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Navigation: Prev -->
      <button 
        v-if="images.length > 1"
        @click="prev"
        class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/5"
        aria-label="Anterior"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Navigation: Next -->
      <button 
        v-if="images.length > 1"
        @click="next"
        class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/5"
        aria-label="Siguiente"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Image Container -->
      <div class="relative max-w-full max-h-full flex flex-col items-center justify-center animate-in zoom-in duration-300 pointer-events-none">
        <img 
          :key="activeImage"
          :src="activeImage" 
          :alt="activeAlt"
          class="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl pointer-events-auto"
        />
        
        <!-- Caption -->
        <div class="mt-6 text-center px-4">
          <p class="text-white/90 text-sm md:text-base font-medium tracking-wide drop-shadow-md">
            {{ activeAlt }}
          </p>
        </div>

        <!-- Dots Indicator -->
        <div v-if="images.length > 1" class="flex gap-1.5 mt-4">
          <div 
            v-for="(_, index) in images" 
            :key="index"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            :class="index === currentIndex ? 'bg-primary w-4' : 'bg-white/20'"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-in {
  animation-fill-mode: forwards;
}

@keyframes zoom-in {
  from {
    transform: scale(0.92);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation-name: zoom-in;
}

/* Glassmorphism utility for buttons if needed */
button {
  -webkit-tap-highlight-color: transparent;
}
</style>
