<template>
  <dialog id="feedback_modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Sugerencias o Reportar Error</h3>
      <p class="py-4 text-sm opacity-80">
        ¿Encontraste un error o tienes una idea para mejorar DominicanGo? ¡Queremos escucharte!
      </p>

      <form @submit.prevent="submitFeedback">
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Tipo</span>
          </label>
          <select v-model="form.type" class="select select-bordered w-full" required>
            <option value="SUGGESTION">Sugerencia</option>
            <option value="BUG">Reportar Error</option>
            <option value="OTHER">Otro</option>
          </select>
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Título (Opcional)</span>
          </label>
          <input 
            type="text" 
            v-model="form.title" 
            placeholder="Ej: Problema al ver fotos" 
            class="input input-bordered w-full" 
          />
        </div>

        <div class="form-control mb-6">
          <label class="label">
            <span class="label-text">Detalles</span>
          </label>
          <textarea 
            v-model="form.content" 
            class="textarea textarea-bordered h-24" 
            placeholder="Describe aquí..."
            required
          ></textarea>
        </div>

        <div v-if="success" class="alert alert-success mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>¡Gracias por tu mensaje! Lo revisaremos pronto.</span>
        </div>
        <div v-if="error" class="alert alert-error mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ error }}</span>
        </div>

        <div class="modal-action">
          <button type="button" class="btn" @click="closeModal">Cerrar</button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            Enviar
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
