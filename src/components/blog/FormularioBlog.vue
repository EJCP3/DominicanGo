<template>
 

    <!-- Timer banner for non-admin users when editing -->
    <div v-if="isEditing && !isAdmin && timeLeft" class="alert rounded-2xl text-sm mb-6 shadow-sm animate-in"
      :class="canEdit ? 'alert-info' : 'alert-error'">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span><strong>Ventana de edición:</strong> {{ timeLeft }}</span>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6" v-if="!showOtpModal">
      
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text font-bold text-base-content">Título de tu historia</span>
        </label>
        <input v-model="form.title" type="text" placeholder="Ej: Amanecer mágico en Bahía de las Águilas..." class="input input-bordered input-primary w-full focus:outline-none" :disabled="!canEdit" required />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text font-bold text-base-content">Destino relacionado</span>
          </label>
          <select v-model="form.destinationId" class="select select-bordered select-primary w-full focus:outline-none" :disabled="!canEdit">
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
          <select v-model="form.category" class="select select-bordered select-primary w-full focus:outline-none" :disabled="!canEdit" required>
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

      <!-- Selector de Apariencia (Color & Size) -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2] transition-all duration-300 relative overflow-hidden">
        <!-- Fondo de Preview -->
        <div :class="'absolute inset-0 opacity-10 pointer-events-none bg-' + form.color"></div>
        <div class="relative z-10">
          <h3 class="font-heading font-extrabold text-xl mb-4 border-b pb-3 flex justify-between items-center" :class="'text-' + (form.color.includes('base') ? 'base-content' : form.color) + ' border-' + (form.color.includes('base') ? 'base-200' : form.color) + '/20'">
            Apariencia de la publicación
            <span class="badge" :class="'badge-' + (form.color.includes('base') ? 'neutral' : form.color)">Vista Previa</span>
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-bold text-base-content">Color de Tarjeta</span>
                <span class="label-text-alt text-base-content/70">Paleta principal</span>
              </label>
              <div class="flex flex-wrap gap-2 mt-2">
                <button
                  v-for="color in daisyColors"
                  :key="color"
                  type="button"
                  @click="form.color = color"
                  class="w-8 h-8 rounded-full border-2 transition-transform focus:outline-none"
                  :class="['bg-' + color, form.color === color ? 'scale-125 border-neutral shadow-md ring-2 ring-primary ring-offset-1' : 'border-base-300 border-opacity-50 hover:scale-110']"
                  :title="color"
                  :disabled="!canEdit"
                ></button>
              </div>
            </div>
            
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-bold text-base-content">Tamaño (Galería)</span>
              </label>
              <div class="join w-full mt-2 shadow-sm">
                <button type="button" class="btn join-item flex-1" :class="form.size === 'col-span-1' ? 'btn-active btn-neutral' : 'btn-ghost border-base-200 bg-base-100'" @click="form.size = 'col-span-1'" :disabled="!canEdit">Normal</button>
                <button type="button" class="btn join-item flex-1" :class="form.size === 'col-span-2' ? 'btn-active btn-neutral' : 'btn-ghost border-base-200 bg-base-100'" @click="form.size = 'col-span-2'" :disabled="!canEdit">Ancho</button>
                <button type="button" class="btn join-item flex-1" :class="form.size === 'row-span-2' ? 'btn-active btn-neutral' : 'btn-ghost border-base-200 bg-base-100'" @click="form.size = 'row-span-2'" :disabled="!canEdit">Alto</button>
                <button type="button" class="btn join-item hidden md:flex flex-1" :class="form.size === 'col-span-2 row-span-2' ? 'btn-active btn-neutral' : 'btn-ghost border-base-200 bg-base-100'" @click="form.size = 'col-span-2 row-span-2'" :disabled="!canEdit">Grande</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fotografias (Main + Gallery) -->
      <section class="bg-white rounded-3xl shadow-sm border border-[#f0e6d2] mt-6 overflow-hidden">
        <div class="px-6 py-4 border-b border-base-200 bg-white">
          <h3 class="font-heading font-extrabold text-xl text-base-content m-0">
            Fotografías
          </h3>
        </div>

        <div class="p-6 space-y-8">
          <!-- Imagen Principal -->
          <div class="form-control w-full">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <label class="label p-0">
                <span class="label-text font-bold text-base-content flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Imagen Principal <span class="text-error">*</span>
                </span>
              </label>
              
              <!-- Tobble Main -->
              <div class="flex items-center gap-4 bg-base-100 px-3 py-1.5 rounded-full border border-base-200 text-sm shadow-sm font-medium">
                <label class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <input type="radio" value="url" v-model="mainImageType" class="radio radio-primary radio-sm border-base-300" :disabled="!canEdit" />
                  <span>Usar URL</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <input type="radio" value="file" v-model="mainImageType" class="radio radio-primary radio-sm border-base-300" :disabled="!canEdit" />
                  <span>Subir desde PC</span>
                </label>
              </div>
            </div>

            <!-- Inputs Main -->
            <div v-show="mainImageType === 'url'" class="animate-in fade-in duration-300">
              <input v-model="mainImageUrl" type="url" class="input input-bordered w-full rounded-2xl bg-base-100/50 focus:bg-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" placeholder="https://ejemplo.com/foto-principal.jpg" :disabled="!canEdit" />
            </div>
            
             <div v-show="mainImageType === 'file'" class="animate-in fade-in duration-300">
              <input type="file" @change="handleMainFileUpload" class="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-2xl bg-base-100" accept="image/png, image/jpeg, image/webp" :disabled="!canEdit" />
              <div v-if="mainImageFile" class="mt-4 relative group w-max">
                <img :src="mainImageFile" class="w-32 h-32 object-cover rounded-2xl shadow-md border border-base-200" />
                <button type="button" @click="mainImageFile = ''" class="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" :disabled="!canEdit">X</button>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- Galeria Extra -->
          <div class="form-control w-full">
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1 flex justify-between">
              <span>Galería Extra (Opcional, Máx 6)</span>
              <span class="text-xs font-normal opacity-70">{{ form.galeria.length }}/6 permitidas</span>
            </label>
            <div class="space-y-4">
              <div v-for="(item, index) in form.galeria" :key="'gal-'+index" class="p-4 rounded-2xl bg-base-100 border border-base-200 relative shadow-sm">
                <button v-if="form.galeria.length > 1" @click.prevent="removeGalleryUrl(index)"
                  class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost text-base-content/40 hover:bg-error hover:text-white transition-colors" :disabled="!canEdit">✕</button>
                <div class="flex gap-4 mb-3">
                  <label class="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <input type="radio" v-model="item.type" value="url" class="radio radio-xs radio-primary" :disabled="!canEdit" />
                    <span class="text-xs font-bold text-base-content/80">Usar URL</span>
                  </label>
                  <label class="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <input type="radio" v-model="item.type" value="local" class="radio radio-xs radio-primary" :disabled="!canEdit" />
                    <span class="text-xs font-bold text-base-content/80">Subir desde PC</span>
                  </label>
                </div>
                <div v-if="item.type === 'url'" class="animate-in fade-in duration-300">
                  <input v-model="item.url" type="url"
                    class="input input-sm input-bordered w-full rounded-xl bg-base-100/50 text-sm focus:outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                    :placeholder="`URL Imagen ${index + 1}...`" :disabled="!canEdit" />
                </div>
                <div v-else class="animate-in fade-in duration-300">
                  <input type="file" accept="image/png, image/jpeg, image/webp" @change="handleGalleryFileUpload($event, index)"
                    class="file-input file-input-sm file-input-bordered file-input-primary w-full rounded-xl bg-base-100" :disabled="!canEdit" />
                  <p v-if="item.fileName" class="text-[10px] text-success mt-1.5 font-bold ml-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    {{ item.fileName }}
                  </p>
                </div>
              </div>
              <button v-if="form.galeria.length < 6" @click.prevent="addGalleryUrl"
                class="btn btn-sm btn-ghost text-primary mt-2 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/5 px-4 font-bold flex gap-2" :disabled="!canEdit">
                <span class="text-lg leading-none">+</span> Añadir otra imagen
              </button>
            </div>
          </div>
        </div>
      </section>

      <div class="form-control w-full">
        <label class="label mb-1">
          <span class="label-text font-bold text-base-content/80 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Tu historia de viaje
          </span>
        </label>
        
        <div class="
          group relative flex flex-col
          rounded-sm border border-base-300 bg-white shadow-sm transition-all duration-300
          focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/5
          
          /* Quill Toolbar - United and Minimalist */
          [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-base-200 [&_.ql-toolbar]:bg-white [&_.ql-toolbar]:rounded-t-sm [&_.ql-toolbar]:px-4 [&_.ql-toolbar]:py-2
          [&_.ql-toolbar]:flex [&_.ql-toolbar]:flex-wrap [&_.ql-toolbar]:gap-0.5
          
          /* Picker (Heading Select) - Clean and Squareish */
          [&_.ql-picker]:h-8 [&_.ql-picker]:rounded-md [&_.ql-picker]:bg-white [&_.ql-picker]:border [&_.ql-picker]:border-base-200/80 [&_.ql-picker]:transition-colors
          [&_.ql-picker-label]:pl-2 [&_.ql-picker-label]:pr-6 [&_.ql-picker-label]:flex [&_.ql-picker-label]:items-center [&_.ql-picker-label]:text-xs [&_.ql-picker-label]:font-bold
          [&_.ql-picker-options]:rounded-md [&_.ql-picker-options]:shadow-lg [&_.ql-picker-options]:border-base-200/80 [&_.ql-picker-options]:mt-1
          
          /* Formats/Buttons - Connected Groups */
          [&_.ql-formats]:bg-white/30 [&_.ql-formats]:px-1 [&_.ql-formats]:py-0.5 [&_.ql-formats]:rounded-md [&_.ql-formats]:border [&_.ql-formats]:border-base-200/30 [&_.ql-formats]:flex [&_.ql-formats]:items-center
          [&_button]:w-7 [&_button]:h-7 [&_button]:rounded-sm [&_button]:transition-all [&_button]:flex [&_button]:items-center [&_button]:justify-center
          [&_button:hover]:bg-primary/5 [&_button:hover_.ql-stroke]:stroke-primary
          [&_button.ql-active]:bg-primary/10 [&_button.ql-active_.ql-stroke]:stroke-primary [&_button.ql-active_.ql-fill]:fill-primary
          
          /* Icons - Sharp and Clear */
          [&_.ql-stroke]:stroke-base-content/70 [&_.ql-stroke]:stroke-[1.5px]
          [&_.ql-fill]:fill-base-content/70
          
          /* Container & Editor - Seamless */
          [&_.ql-container]:border-0 [&_.ql-container]:font-sans [&_.ql-container]:text-sm
          [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:p-5 [&_.ql-editor]:leading-normal [&_.ql-editor]:text-base-content
          [&_.ql-editor.ql-blank::before]:left-5 [&_.ql-editor.ql-blank::before]:text-base-content/30 [&_.ql-editor.ql-blank::before]:not-italic
        ">
          <div ref="quillEditor" :class="{'opacity-50 pointer-events-none': !canEdit}"></div>
        </div>
      </div>

      <div class="form-control mt-8">
        <button type="button" @click="submitForm" :disabled="isSubmitting || !canEdit" class="btn btn-primary btn-lg w-full rounded-full shadow-lg disabled:text-white transition-all hover:-translate-y-1">
          <span v-if="isSubmitting" class="loading loading-spinner"></span>
          {{ isSubmitting ? (isEditing ? 'Guardando...' : 'Preparando...') : (isEditing ? 'Guardar Cambios' : 'Publicar historia') }}
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

   <div class="relative">
    <!-- Mensajes de Alerta -->
    <div v-if="alert.show" :class="['alert mb-6 shadow-sm', alert.type === 'success' ? 'alert-success' : 'alert-error']">
      <svg v-if="alert.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ alert.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  provinces: { type: Object, default: () => ({}) },
  token: { type: String, required: true },
  blogData: { type: Object, default: null }, // If present, implies Edit mode
  isAdmin: { type: Boolean, default: false }
});

const isEditing = !!props.blogData;

const form = ref({
  title: props.blogData?.title || '',
  excerpt: props.blogData?.excerpt || '',
  destinationId: props.blogData?.destinationId || '',
  category: props.blogData?.category || '',
  content: props.blogData?.content || '',
  color: props.blogData?.color || 'base-100',
  size: props.blogData?.size || 'col-span-1',
  galeria: props.blogData?.images?.length > 1 
           ? props.blogData.images.slice(1).map(url => ({ type: 'url', url, file: null, fileName: '' }))
           : [{ type: 'url', url: '', file: null, fileName: '' }]
});

const isSubmitting = ref(false);
const isVerifying = ref(false);
const showOtpModal = ref(false);
const otpCode = ref('');
const pendingBlogId = ref(null);
const alert = ref({ show: false, message: '', type: 'error' });

const canEdit = ref(true);
const timeLeft = ref('');

const mainImageType = ref('url');
const mainImageUrl = ref(isEditing && props.blogData.images?.length > 0 ? props.blogData.images[0] : '');
const mainImageFile = ref('');

const daisyColors = ['base-100', 'base-200', 'base-300', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];

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

const handleMainFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    mainImageFile.value = '';
    return;
  }
  const base64 = await toBase64(file);
  mainImageFile.value = base64;
};

const addGalleryUrl = () => {
  if (form.value.galeria.length < 6)
    form.value.galeria.push({ type: 'url', url: '', file: null, fileName: '' });
};

const removeGalleryUrl = (index) => {
  form.value.galeria.splice(index, 1);
};

const handleGalleryFileUpload = (event, index) => {
  const target = event.target;
  if (target.files?.length) {
    form.value.galeria[index].file = target.files[0];
    form.value.galeria[index].fileName = target.files[0].name;
  }
};

onMounted(() => {
  // Timer for edit window
  if (isEditing && !props.isAdmin) {
    const checkTimer = () => {
      const created = new Date(props.blogData.createdAt).getTime()
      const remaining = (60 * 60 * 1000) - (Date.now() - created)
      if (remaining <= 0) {
        canEdit.value = false
        timeLeft.value = 'Tiempo de edición expirado'
      } else {
        const mins = Math.floor(remaining / 60000)
        const secs = Math.floor((remaining % 60000) / 1000)
        timeLeft.value = `${mins}m ${secs}s restantes`
      }
    }
    checkTimer()
    setInterval(checkTimer, 1000)
  }

  const initQuill = () => {
    if (window.Quill && quillEditor.value && !quillInstance) {
      quillInstance = new window.Quill(quillEditor.value, {
        theme: 'snow',
        modules: {
          toolbar: [
             [{ header: [2, 3, 4,5,6] }],
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
  
  const mainImageResolved = mainImageType.value === 'url' ? mainImageUrl.value.trim() : mainImageFile.value;
  
  if (!mainImageResolved) {
    alert.value = { show: true, type: 'error', message: 'La Imagen Principal es obligatoria.' };
    return;
  }

  const finalGalleryImages = [];
  for (const g of form.value.galeria) {
    if (g.type === 'url' && g.url.trim()) finalGalleryImages.push(g.url.trim());
    else if (g.type === 'local' && g.file) finalGalleryImages.push(await toBase64(g.file));
  }

  const finalImages = [mainImageResolved, ...finalGalleryImages].filter(img => img);

  isSubmitting.value = true;

  try {
    const payload = {
      title: form.value.title,
      excerpt: form.value.excerpt,
      content: form.value.content,
      category: form.value.category,
      images: finalImages,
      color: form.value.color,
      size: form.value.size
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

    const isPatch = isEditing;
    const endpoint = isPatch ? `${apiBase}/blogs/${props.blogData.id}` : `${apiBase}/blogs`;

    const res = await fetch(endpoint, {
      method: isPatch ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || (isPatch ? 'Error al actualizar el blog.' : 'Error al guardar el blog. Por favor verifica los datos o intenta de nuevo.'));
    }

    if (isPatch) {
      alert.value = { show: true, type: 'success', message: '¡Blog actualizado exitosamente!' };
      setTimeout(() => {
        window.location.href = '/blog';
      }, 1500);
    } else {
      alert.value = { show: true, type: 'success', message: '¡Tu historia ha sido publicada exitosamente!' };
      setTimeout(() => {
        if (data.data && data.data.slug) {
          window.location.href = `/blog/${data.data.slug}`;
        }
      }, 1500);
    }
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


