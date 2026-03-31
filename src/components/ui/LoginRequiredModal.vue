<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm" @click.self="$emit('close')">
      <!-- Modal Panel -->
      <div 
        class="bg-base-100 w-full max-w-sm rounded-[24px] shadow-2xl relative overflow-hidden transform transition-all flex flex-col items-center p-8 text-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <!-- Close Button -->
        <button 
          @click="$emit('close')"
          class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-base-content/50 hover:bg-base-200"
          aria-label="Cerrar modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Illustration / Icon -->
        <div class="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <!-- Text Content -->
        <h3 id="modal-headline" class="text-2xl font-black font-heading text-base-content mb-2 tracking-tight">
          Inicia sesión para interactuar
        </h3>
        <p class="text-sm text-base-content/60 mb-8 leading-relaxed">
          Para poder comentar, dar me gusta o guardar en tus favoritos, necesitas iniciar sesión en DominicanGo.
        </p>

        <!-- Google Login Button -->
        <a 
          :href="loginUrl"
          class="btn flex items-center justify-center gap-3 w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl h-12 text-base font-bold shadow-sm transition-all"
        >
          <svg class="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          Continuar con Google
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  loginUrl: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Prevent body scroll when modal is open
watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>
