<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const activeImage = ref('');
const activeAlt = ref('');

function open(img: string, alt: string) {
  activeImage.value = img;
  activeAlt.value = alt;
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function close() {
  isOpen.value = false;
  document.body.style.overflow = '';
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc);
  // Listen for custom events from Astro components
  window.addEventListener('open-lightbox', (e: any) => {
    open(e.detail.img, e.detail.alt);
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10" @click.self="close">
      <button 
        @click="close"
        class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
        aria-label="Cerrar"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="relative max-w-full max-h-full flex items-center justify-center animate-in zoom-in duration-300">
        <img 
          :src="activeImage" 
          :alt="activeAlt"
          class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
        />
        <div class="absolute -bottom-10 left-0 right-0 text-center">
          <p class="text-white/80 text-sm font-medium">{{ activeAlt }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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
    transform: scale(0.95);
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
</style>
