<template>
  <div class="relative">
    <!-- Mensajes de Alerta -->
    <div v-if="alert.show" :class="['alert mb-6 shadow-sm', alert.type === 'success' ? 'alert-success' : 'alert-error']">
      <svg v-if="alert.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ alert.message }}</span>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6" v-if="!showOtpModal">
      
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold text-base-content">Título de tu historia</span>
        </label>
        <input v-model="form.title" type="text" placeholder="Ej: Amanecer mágico en Bahía de las Águilas..." class="input input-bordered input-primary w-full focus:outline-none" required />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold text-base-content">Destino relacionado</span>
          </label>
          <select v-model="form.destinationId" class="select select-bordered select-primary w-full focus:outline-none">
            <option value="">Ninguno específico...</option>
            <template v-for="(prov, slug) in provinces" :key="slug">
              <optgroup v-if="prov.pois && prov.pois.length > 0" :label="prov.name">
                <option v-for="poi in prov.pois" :key="poi.id" :value="poi.id">
                  {{ poi.name }}
                </option>
              </optgroup>
            </template>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold text-base-content">Tipo de historia</span>
          </label>
          <select v-model="form.category" class="select select-bordered select-primary w-full focus:outline-none" required>
            <option disabled value="">Selecciona la categoría...</option>
            <option value="Aventura">Aventura</option>
            <option value="Cultura">Cultura</option>
            <option value="Naturaleza">Naturaleza</option>
            <option value="Experiencia">Experiencia</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Relajación">Relajación</option>
            <option value="Romance">Romance</option>
            <option value="Fotografía">Fotografía</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold text-base-content">Imágenes de tu viaje</span>
          <span class="label-text-alt text-base-content/50">Sube entre 1 y 10 imágenes</span>
        </label>
        <input type="file" @change="handleFileUpload" class="file-input file-input-bordered file-input-primary w-full" accept="image/png, image/jpeg, image/webp" multiple />
        <div class="flex flex-wrap gap-2 mt-3">
          <img v-for="(img, idx) in previewImages" :key="idx" :src="img" class="w-24 h-24 object-cover rounded-lg shadow-sm border border-base-300" />
        </div>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold text-base-content">Tu historia de viaje</span>
        </label>
        <div ref="quillEditor" class="bg-base-100 text-base-content h-64 rounded-b-xl"></div>
      </div>

      <div class="form-control mt-8">
        <button type="button" @click="submitForm" :disabled="isSubmitting" class="btn btn-primary btn-lg w-full rounded-full shadow-lg disabled:text-white">
          <span v-if="isSubmitting" class="loading loading-spinner"></span>
          {{ isSubmitting ? 'Preparando...' : 'Publicar historia' }}
        </button>
      </div>
    </form>

    <!-- OTP Modal -->
    <div v-if="showOtpModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="modal-box max-w-sm rounded-3xl p-8 text-center bg-base-100">
        <h3 class="font-heading font-bold text-2xl text-base-content mb-2">Verifica tu correo</h3>
        <p class="text-base-content/70 text-sm mb-6">Hemos enviado un código de 6 dígitos de seguridad para publicar el post.</p>
        
        <input v-model="otpCode" type="text" placeholder="######" class="input input-bordered input-lg w-full text-center text-2xl tracking-widest font-mono mb-4 bg-base-200" maxlength="6" />
        
        <button @click="verifyOtp" :disabled="isVerifying || otpCode.length !== 6" class="btn btn-primary w-full rounded-full mb-3 disabled:text-white">
          <span v-if="isVerifying" class="loading loading-spinner"></span>
          Publicar Ahora
        </button>
        <button @click="showOtpModal = false" class="btn btn-ghost w-full rounded-full" :disabled="isVerifying">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  provinces: { type: Object, default: () => ({}) },
  token: { type: String, required: true }
});

const form = ref({
  title: '',
  excerpt: '',
  destinationId: '',
  category: '',
  content: ''
});

const isSubmitting = ref(false);
const isVerifying = ref(false);
const showOtpModal = ref(false);
const otpCode = ref('');
const pendingBlogId = ref(null);
const alert = ref({ show: false, message: '', type: 'error' });

const filesToUpload = ref([]);
const previewImages = ref([]);

const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

const quillEditor = ref(null);
let quillInstance = null;

// Helpers
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const handleFileUpload = async (event) => {
  const inputFiles = Array.from(event.target.files);
  if (inputFiles.length === 0) return;
  
  if (inputFiles.length > 10) {
    alert.value = { show: true, type: 'error', message: 'Máximo 10 imágenes permitidas.' };
    return;
  }

  filesToUpload.value = inputFiles;
  previewImages.value = [];
  
  for (const f of inputFiles) {
    const base64 = await toBase64(f);
    previewImages.value.push(base64);
  }
};

onMounted(() => {
  const initQuill = () => {
    if (window.Quill && quillEditor.value && !quillInstance) {
      quillInstance = new window.Quill(quillEditor.value, {
        theme: 'snow',
        modules: {
          toolbar: [
             [{ header: [2, 3, false] }],
             ['bold', 'italic', 'underline', 'strike'],
             [{ list: 'ordered' }, { list: 'bullet' }],
             ['blockquote', 'link'],
             ['clean']
          ]
        },
        placeholder: 'Cuenta tu historia, aventuras y secretos del viaje...'
      });

      if (form.value.content) {
        quillInstance.root.innerHTML = form.value.content;
      }
    }
  };

  initQuill();

  if (!quillInstance) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      initQuill();
      if (quillInstance || attempts > 25) {
        clearInterval(interval);
        if (!quillInstance) console.error("Quill failed to load after 5s.");
      }
    }, 200);
  }
});

const submitForm = async () => {
  alert.value.show = false;
  
  if (!form.value.title || !form.value.category) {
    alert.value = { show: true, type: 'error', message: 'Por favor, completa los campos requeridos.' };
    return;
  }
  
  if (quillInstance) {
    form.value.content = quillInstance.root.innerHTML;
    const plainText = quillInstance.getText().trim();
    form.value.excerpt = plainText.substring(0, 180) + (plainText.length > 180 ? '...' : '');
  }
  
  const textContent = quillInstance ? quillInstance.getText().trim() : '';
  if (!textContent || textContent.length < 50) {
    alert.value = { show: true, type: 'error', message: 'El contenido es muy corto. Cuenta un poco más de tu experiencia.' };
    return;
  }
  
  if (previewImages.value.length === 0) {
    alert.value = { show: true, type: 'error', message: 'Agrega al menos una imagen de tu viaje.' };
    return;
  }

  isSubmitting.value = true;

  try {
    const payload = {
      title: form.value.title,
      excerpt: form.value.excerpt,
      content: form.value.content,
      category: form.value.category,
      images: previewImages.value,
    };
    
    if (form.value.destinationId) {
      payload.destinationId = form.value.destinationId;
      for (const prov of Object.values(props.provinces)) {
        if (prov.pois.find(p => p.id === form.value.destinationId)) {
          payload.provinceId = Object.keys(props.provinces).find(key => props.provinces[key] === prov);
          break;
        }
      }
    }

    const res = await fetch(`${apiBase}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert.value = { show: true, type: 'success', message: '¡Tu historia ha sido publicada exitosamente!' };
    
    setTimeout(() => {
      window.location.href = `/blog/${data.data.slug}`;
    }, 1500);
  } catch (err) {
    alert.value = { show: true, type: 'error', message: err.message };
  } finally {
    isSubmitting.value = false;
  }
};

const verifyOtp = async () => {
  isVerifying.value = true;
  alert.value.show = false;

  try {
    const res = await fetch(`${apiBase}/blogs/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        blogId: pendingBlogId.value,
        code: otpCode.value.toUpperCase()
      })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Código OTP inválido');
    }

    alert.value = { show: true, type: 'success', message: '¡Tu historia ha sido publicada exitosamente!' };
    showOtpModal.value = false;
    
    setTimeout(() => {
      window.location.href = `/blog/${data.data.slug}`;
    }, 1500);

  } catch (err) {
    alert.value = { show: true, type: 'error', message: err.message };
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style>
/* Estilos premium para Quill dentro del componente Vue */
.ql-toolbar.ql-snow {
    border: 1px solid oklch(var(--p) / 0.2) !important;
    border-bottom: none !important;
    background: oklch(var(--b2) / 0.5) !important;
    border-radius: 1.5rem 1.5rem 0 0 !important;
    padding: 0.75rem !important;
    backdrop-filter: blur(10px);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
}

.ql-container.ql-snow {
    border: 1px solid oklch(var(--p) / 0.2) !important;
    border-radius: 0 0 1.5rem 1.5rem !important;
    font-family: inherit !important;
    font-size: 1.1rem !important;
    min-height: 300px;
}

.ql-editor {
    min-height: 250px;
    padding: 1.5rem !important;
    line-height: 1.7;
    color: oklch(var(--bc));
}

.ql-editor.ql-blank::before {
    color: oklch(var(--bc) / 0.4);
    font-style: normal;
    left: 1.5rem !important;
}

/* Fix para los Selects (Pickers) bugeados */
.ql-snow .ql-picker {
    height: 32px !important;
    color: oklch(var(--bc)) !important;
    background: oklch(var(--b1)) !important;
    border-radius: 0.75rem !important;
    border: 1px solid oklch(var(--bc) / 0.1) !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
}

.ql-snow .ql-picker-label {
    padding-left: 12px !important;
    padding-right: 24px !important;
    display: flex !important;
    align-items: center !important;
    border: none !important;
    outline: none !important;
}

.ql-snow .ql-picker-options {
    background: oklch(var(--b1)) !important;
    border: 1px solid oklch(var(--p) / 0.2) !important;
    border-radius: 1rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
    padding: 0.5rem !important;
    margin-top: 4px !important;
}

.ql-snow .ql-picker-item {
    border-radius: 0.5rem !important;
    padding: 4px 8px !important;
}

/* Hovers y Activos */
.ql-snow .ql-picker:hover {
    border-color: oklch(var(--p)) !important;
    background: oklch(var(--b2)) !important;
}

.ql-snow.ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow.ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected {
    color: oklch(var(--p)) !important;
}

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
    stroke: oklch(var(--p)) !important;
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill {
    fill: oklch(var(--p)) !important;
}

/* Ocultar svgs default de los pickers si causan ruido visual */
.ql-snow .ql-picker-label svg {
    right: 8px !important;
    width: 14px !important;
    height: 14px !important;
}
</style>
