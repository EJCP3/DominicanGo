<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  show: boolean;
  resourceId: string;
  resourceType: 'destination' | 'blog';
  resourceTitle: string;
  token: string | undefined;
}>();

const emit = defineEmits(['close', 'deleted', 'update:show']);

const internalShow = ref(props.show);
const reason = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

watch(() => props.show, (newVal) => {
  internalShow.value = newVal;
});

watch(internalShow, (newVal) => {
  if (newVal) {
    reason.value = '';
    errorMsg.value = '';
    successMsg.value = '';
  }
});

const open = () => { internalShow.value = true; };

const close = () => {
  if (!isLoading.value) {
    internalShow.value = false;
    emit('close');
  }
};

const handleOpenEvent = () => { open(); };

onMounted(() => {
  document.addEventListener('open-delete-modal', handleOpenEvent);
});
onUnmounted(() => {
  document.removeEventListener('open-delete-modal', handleOpenEvent);
});

const confirmDelete = async () => {
  if (!reason.value.trim()) {
    errorMsg.value = 'Por favor, explica el motivo para que el administrador pueda revisarlo.';
    return;
  }

  isLoading.value = true;
  errorMsg.value = '';

  try {
    const apiBase = (import.meta as any).env?.PUBLIC_API_URL || 'http://localhost:3000/api';
    const endpoint = props.resourceType === 'destination' ? 'destinations' : 'blogs';
    const res = await fetch(`${apiBase}/${endpoint}/${props.resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ reason: reason.value.trim() })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al eliminar');

    successMsg.value = '¡Contenido eliminado! Tu motivo ha sido enviado al administrador.';
    emit('deleted');

    setTimeout(() => {
      close();
      window.location.href = props.resourceType === 'destination' ? '/destinos' : '/blog';
    }, 1800);
  } catch (err: any) {
    errorMsg.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="internalShow" class="fixed inset-0 z-999 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="close"></div>

        <!-- Modal Panel -->
        <div class="relative bg-white sm:rounded-3xl rounded-t-3xl w-full sm:max-w-lg shadow-2xl overflow-hidden modal-panel">

          <!-- Red top accent -->
          <div class="h-1.5 w-full bg-linear-to-r from-error via-red-400 to-error"></div>

          <!-- Header -->
          <div class="flex items-start justify-between p-6 sm:p-8 pb-0">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-error/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 class="font-heading font-extrabold text-lg text-base-content leading-tight">Eliminar contenido</h3>
                <p class="text-xs text-base-content/50 mt-0.5">Esta acción es permanente</p>
              </div>
            </div>
            <button @click="close" class="w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center text-base-content/50 hover:text-base-content transition-colors shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 sm:p-8 space-y-5">

            <!-- Resource name chip -->
            <div class="flex items-center gap-3 bg-base-100 rounded-2xl px-4 py-3 border border-base-200">
              <svg class="w-4 h-4 text-base-content/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-sm font-semibold text-base-content line-clamp-1">{{ resourceTitle }}</span>
            </div>

            <!-- Warning banner -->
            <div class="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
              <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-xs text-amber-700 leading-relaxed">Tu motivo será enviado al buzón del administrador para revisión. No podrás deshacer esta acción.</p>
            </div>

            <!-- Reason textarea -->
            <div class="space-y-2">
              <label class="flex items-center gap-1.5 text-sm font-bold text-base-content/80">
                <svg class="w-3.5 h-3.5 text-error" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                Motivo de la eliminación
              </label>
              <textarea
                v-model="reason"
                rows="3"
                placeholder="Ej: El lugar ya no existe, contiene información incorrecta, es un duplicado..."
                class="w-full rounded-2xl border border-base-200 bg-base-50 px-4 py-3 text-sm text-base-content placeholder:text-base-content/30 resize-none focus:outline-none focus:ring-2 focus:ring-error/20 focus:border-error/40 transition-all"
                :disabled="isLoading || !!successMsg"
              ></textarea>
            </div>

            <!-- Error -->
            <div v-if="errorMsg" class="flex items-center gap-2.5 bg-error/8 border border-error/20 rounded-2xl px-4 py-3">
              <svg class="w-4 h-4 text-error shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-error">{{ errorMsg }}</span>
            </div>

            <!-- Success -->
            <div v-if="successMsg" class="flex items-center gap-2.5 bg-success/10 border border-success/20 rounded-2xl px-4 py-3">
              <svg class="w-4 h-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-success font-medium">{{ successMsg }}</span>
            </div>

          </div>

          <!-- Footer actions -->
          <div class="px-6 sm:px-8 pb-6 sm:pb-8 flex gap-3 justify-end">
            <button
              @click="close"
              type="button"
              class="px-5 py-2.5 rounded-full text-sm font-semibold text-base-content/70 hover:text-base-content bg-base-100 hover:bg-base-200 border border-base-200 transition-all"
              :disabled="isLoading"
            >
              Cancelar
            </button>
            <button
              @click="confirmDelete"
              type="button"
              class="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-error hover:bg-error/90 shadow-sm shadow-error/20 transition-all flex items-center gap-2 disabled:opacity-50"
              :disabled="isLoading || !!successMsg"
            >
              <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {{ isLoading ? 'Eliminando...' : 'Eliminar' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
.modal-enter-from .modal-panel {
  transform: translateY(20px) scale(0.97);
  opacity: 0;
}
.modal-leave-to .modal-panel {
  transform: translateY(10px) scale(0.97);
  opacity: 0;
}
</style>
