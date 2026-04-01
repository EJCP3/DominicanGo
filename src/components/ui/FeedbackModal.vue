<template>
  <dialog id="feedback_modal" class="modal backdrop-blur-sm transition-all duration-500">
    <div class="modal-box max-w-md bg-base-100 border border-base-300 shadow-2xl rounded-3xl p-8 relative">
      <!-- Close button top-right -->
      <button 
        type="button" 
        class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:rotate-90 transition-transform duration-300" 
        @click="closeModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <div class="mb-6">
        <h3 class="font-['Gluten_Variable'] text-2xl font-bold text-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          Sugerencias
        </h3>
        <p class="mt-2 text-sm text-base-content/70 leading-relaxed font-medium">
          ¿Encontraste un error o tienes una idea para mejorar **DominicanGo**? ¡Queremos escucharte!
        </p>
      </div>

      <form @submit.prevent="submitFeedback" class="space-y-5">
        <div class="form-control">
          <label class="label pt-0">
            <span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Tipo de mensaje
            </span>
          </label>
          <select 
            v-model="form.type" 
            class="select select-bordered w-full bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none" 
            required
          >
            <option value="SUGGESTION">Sugerencia</option>
            <option value="BUG">Reportar Error</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label pt-0">
            <span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
              Título (Opcional)
            </span>
          </label>
          <input 
            type="text" 
            v-model="form.title" 
            placeholder="Ej: Problema al ver fotos" 
            class="input input-bordered w-full bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
          />
        </div>

        <div class="form-control">
          <label class="label pt-0">
            <span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Detalles
            </span>
          </label>
          <textarea 
            v-model="form.content" 
            class="textarea textarea-bordered h-28 bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none" 
            placeholder="Describe aquí..."
            required
          ></textarea>
        </div>

        <div v-if="success" class="alert alert-success mt-4 rounded-xl shadow-lg border-none text-white font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>¡Gracias! Lo revisaremos pronto.</span>
        </div>
        
        <div v-if="error" class="alert alert-error mt-4 rounded-xl shadow-lg border-none text-white font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ error }}</span>
        </div>

        <div class="modal-action mt-8 flex gap-3">
          <button type="button" class="btn btn-ghost rounded-xl flex-1 hover:bg-error/10 hover:text-error transition-all font-bold" @click="closeModal">
            Cerrar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary rounded-xl flex-1 shadow-md shadow-primary/20 active:scale-95 transition-all font-bold group" 
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <span v-else class="flex items-center gap-2">
              Enviar
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </span>
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  apiBase: {
    type: String,
    required: true
  }
});

const form = ref({
  type: 'SUGGESTION',
  title: '',
  content: ''
});

const loading = ref(false);
const success = ref(false);
const error = ref(null);

const openModal = () => {
  const modal = document.getElementById('feedback_modal');
  if (modal) modal.showModal();
};

const closeModal = () => {
  document.getElementById('feedback_modal').close();
  success.value = false;
  error.value = null;
  form.value = { type: 'SUGGESTION', title: '', content: '' };
};

const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

const submitFeedback = async () => {
  loading.value = true;
  success.value = false;
  error.value = null;

  try {
    const token = getCookieValue('auth_token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${props.apiBase}/api/feedback`, {
      method: 'POST',
      headers,
      body: JSON.stringify(form.value)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al enviar');

    success.value = true;
    form.value.title = '';
    form.value.content = '';
    
    setTimeout(() => {
      closeModal();
    }, 2000);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
