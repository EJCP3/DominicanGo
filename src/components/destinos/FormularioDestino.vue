<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps<{
  provincias: { slug: string; name: string }[]
  tipos: string[]
  typeLabels: Record<string, string>
  user: { name: string; email: string; foto?: string } | null
  token: string | undefined
}>()

// ── State Machine ───────────────────────────────────────────────────────────
const step = ref<1 | 2 | 3>(1)

const PRESET_SCHEDULES = [
  'Todos los días: 8:00 AM - 5:00 PM',
  'Lunes a Viernes: 9:00 AM - 6:00 PM',
  'Fines de Semana: 10:00 AM - 6:00 PM',
  'Abierto 24 Horas',
  'Cerrado'
]
const destinationId = ref<string | null>(null)
const otpCode = ref('')

// ── Form State ───────────────────────────────────────────────────────────────
const form = reactive({
  nombre: '',
  descripcion: '',
  provincia: '',
  categoria: '',
  precio: 'gratis',
  horario_weekdays: '',
  horario_weekend: '',
  etiquetas: [] as string[],
  googleMaps: '',
  sitioWeb: '',
  imagenPrincipal: '',
  galeria: [{ type: 'url' as 'url' | 'local', url: '', file: null as File | null, fileName: '' }]
})

// ── UI State ─────────────────────────────────────────────────────────────────
const currentTag = ref('')
const isLoading = ref(false)
const submitError = ref('')
const otpError = ref('')

const uploadType = ref<'url' | 'local'>('url')
const localFileName = ref('')
const localFile = ref<File | null>(null)

// ── Tag Helpers ───────────────────────────────────────────────────────────────
function addTag() {
  const tag = currentTag.value.trim()
  if (tag && !form.etiquetas.includes(tag)) form.etiquetas.push(tag)
  currentTag.value = ''
}
function removeTag(index: number) { form.etiquetas.splice(index, 1) }

// ── Gallery Helpers ───────────────────────────────────────────────────────────
function addGalleryUrl() {
  if (form.galeria.length < 6)
    form.galeria.push({ type: 'url', url: '', file: null, fileName: '' })
}
function removeGalleryUrl(index: number) { form.galeria.splice(index, 1) }

function handleGalleryFileUpload(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    form.galeria[index].file = target.files[0]
    form.galeria[index].fileName = target.files[0].name
  }
}
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    localFile.value = target.files[0]
    localFileName.value = target.files[0].name
  }
}

// ── Step 1: Submit Form → POST /api/destinations ─────────────────────────────
async function submitForm() {
  if (!form.nombre || !form.provincia || !form.categoria || !form.descripcion) {
    submitError.value = 'Por favor, completa todos los campos obligatorios (marcados con *).'
    return
  }
  if (uploadType.value === 'url' && !form.imagenPrincipal) {
    submitError.value = 'Por favor, ingresa la URL de la imagen principal.'
    return
  }
  if (uploadType.value === 'local' && !localFile.value) {
    submitError.value = 'Por favor, selecciona una imagen desde tu PC.'
    return
  }

  isLoading.value = true
  submitError.value = ''

  try {
    const apiBase = 'http://localhost:3000/api'

    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

    let finalImagenPrincipal = 'https://picsum.photos/seed/default/600/400';
    if (uploadType.value === 'url' && form.imagenPrincipal) {
      finalImagenPrincipal = form.imagenPrincipal;
    } else if (uploadType.value === 'local' && localFile.value) {
      finalImagenPrincipal = await toBase64(localFile.value);
    }

    const finalGalleryImages: string[] = [];
    for (const g of form.galeria) {
      if (g.type === 'url' && g.url) finalGalleryImages.push(g.url);
      else if (g.type === 'local' && g.file) finalGalleryImages.push(await toBase64(g.file));
    }

    const body = {
      name: form.nombre,
      description: form.descripcion,
      provinceId: form.provincia,
      type: form.categoria,
      price: form.precio,
      hoursWeekdays: form.horario_weekdays || undefined,
      hoursWeekend: form.horario_weekend || undefined,
      tags: form.etiquetas,
      website: form.sitioWeb || undefined,
      image: finalImagenPrincipal,
      images: finalGalleryImages,
    }

    const res = await fetch(`${apiBase}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      submitError.value = data?.message || 'Error al enviar el destino. Intenta de nuevo.'
      return
    }

    destinationId.value = data.data?.id || data.id
    step.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    submitError.value = 'Error de conexión. Verifica tu internet e intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// ── Step 2: Verify OTP → POST /api/destinations/verify ───────────────────────
async function verifyOTP() {
  if (!otpCode.value.trim() || otpCode.value.length < 6) {
    otpError.value = 'Ingresa el código de 6 dígitos que recibiste por correo.'
    return
  }

  isLoading.value = true
  otpError.value = ''

  try {
    const apiBase = 'http://localhost:3000/api'

    const res = await fetch(`${apiBase}/destinations/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`,
      },
      body: JSON.stringify({ destinationId: destinationId.value, code: otpCode.value.trim() }),
    })

    const data = await res.json()

    if (!res.ok) {
      otpError.value = data?.message || 'Código incorrecto o expirado. Intenta de nuevo.'
      otpCode.value = ''
      return
    }

    step.value = 3
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => { window.location.href = '/destinos' }, 3000)
  } catch (e) {
    otpError.value = 'Error de conexión. Verifica tu internet e intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         STEP 3: Success screen
    ════════════════════════════════════════════════════════════════════════════ -->
    <div v-if="step === 3"
      class="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-[#f0e6d2] text-center max-w-2xl mx-auto my-8 animate-in">
      <div
        class="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-8 border-[6px] border-success/30">
        <svg class="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="font-heading font-extrabold text-3xl text-base-content mb-4">¡Destino Publicado!</h2>
      <p class="text-base-content/70 text-lg mb-3 max-w-md mx-auto">
        "<strong>{{ form.nombre }}</strong>" ya está disponible en el directorio 🎉
      </p>
      <p class="text-sm text-base-content/40 mb-8">Redirigiendo a destinos en 3 segundos...</p>
      <a href="/destinos" class="btn btn-primary text-white rounded-full shadow-md px-10">Ir a Destinos</a>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         STEP 2: OTP Verification
    ════════════════════════════════════════════════════════════════════════════ -->
    <div v-else-if="step === 2" class="max-w-lg mx-auto my-8 animate-in">
      <div class="bg-white rounded-3xl p-10 shadow-sm border border-[#f0e6d2] text-center">

        <div
          class="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 border-4 border-primary/20">
          <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 class="font-heading font-extrabold text-2xl text-base-content mb-2">Verifica tu correo</h2>
        <p class="text-base-content/60 text-sm mb-8 max-w-xs mx-auto">
          Hemos enviado un código de 6 dígitos a <strong>{{ props.user?.email }}</strong>. Ingrésalo aquí para publicar
          tu destino.
        </p>

        <!-- OTP Input -->
        <div class="mb-4">
          <input v-model="otpCode" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code"
            placeholder="_ _ _ _ _ _" @keydown.enter.prevent="verifyOTP"
            class="input input-bordered w-full text-center text-3xl font-bold tracking-[0.5em] rounded-2xl h-16 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-base-100" />
        </div>

        <div v-if="otpError" class="alert alert-error mb-4 rounded-2xl text-sm text-left">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ otpError }}
        </div>

        <button @click="verifyOTP" :disabled="isLoading || otpCode.length < 6"
          class="btn btn-primary text-white w-full rounded-2xl h-12 font-bold text-base shadow-lg disabled:opacity-60 mb-4">
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          {{ isLoading ? 'Verificando...' : 'Verificar y Publicar' }}
        </button>

        <button @click="step = 1" class="btn btn-ghost text-base-content/50 text-sm rounded-2xl w-full">
          ← Volver al formulario
        </button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         STEP 1: Main Form
    ════════════════════════════════════════════════════════════════════════════ -->
    <div v-else class="space-y-8 animate-in">

      <!-- Section 1: Basic Info -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
        <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">Información
          Básica</h3>
        <div class="space-y-5">
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Nombre del destino *</label>
            <input v-model="form.nombre" type="text" required
              class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Ej. Cueva de las Maravillas" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Categoría *</label>
              <select v-model="form.categoria" required
                class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="tipo in props.tipos" :key="tipo" :value="tipo">{{ props.typeLabels[tipo] }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Tipo de acceso *</label>
              <div class="flex gap-4">
                <label
                  class="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"
                  :class="form.precio === 'gratis' ? 'bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824] shadow-inner' : 'border-base-300 hover:border-base-content/30'">
                  <input type="radio" value="gratis" v-model="form.precio"
                    class="radio radio-sm radio-primary opacity-0 absolute" />
                  <span class="font-medium text-sm">Gratis</span>
                </label>
                <label
                  class="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"
                  :class="form.precio === 'pagado' ? 'bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824] shadow-inner' : 'border-base-300 hover:border-base-content/30'">
                  <input type="radio" value="pagado" v-model="form.precio"
                    class="radio radio-sm radio-primary opacity-0 absolute" />
                  <span class="font-medium text-sm">Pagado</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Descripción corta *</label>
            <textarea v-model="form.descripcion" required rows="3"
              class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
              placeholder="Describe por qué este lugar es especial..."></textarea>
          </div>
        </div>
      </section>

      <!-- Section 2: Location and Details -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
        <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">Ubicación y
          Detalles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Provincia *</label>
            <select v-model="form.provincia" required
              class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="" disabled>Selecciona la provincia</option>
              <option v-for="prov in props.provincias" :key="prov.slug" :value="prov.slug">{{ prov.name }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Horario (opcional)</label>
            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span
                    class="flex justify-between text-[10px] uppercase font-extrabold opacity-40 ml-1 mb-1 block">Dias de
                    semana
                    <button @click.prevent="form.horario_weekdays = 'Cerrado'"
                      class="text-error hover:underline lowercase font-bold text-[9px]">Cerrado</button>
                  </span>
                  <input v-model="form.horario_weekdays" type="text" list="schedule-presets"
                    class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Ej. 8:00 AM - 5:00 PM" />
                </div>
                <div>
                  <span
                    class="text-[10px] uppercase font-extrabold opacity-40 ml-1 mb-1 flex justify-between items-center">
                    Fin de semana
                    <button @click.prevent="form.horario_weekend = 'Cerrado'"
                      class="text-error hover:underline lowercase font-bold text-[9px]">Cerrado</button>
                  </span>
                  <input v-model="form.horario_weekend" type="text" list="weekend-presets"
                    class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Ej. 9:00 AM - 1:00 PM" />
                </div>
              </div>

              <datalist id="schedule-presets">
                <option v-for="preset in PRESET_SCHEDULES" :key="preset" :value="preset.split(': ')[1] || preset" />
              </datalist>

              <div class="flex flex-wrap gap-2 mt-2">
                <button v-for="preset in PRESET_SCHEDULES.slice(0, 5)" :key="preset" type="button" @click="() => {
                  const time = preset.split(': ')[1] || preset;
                  if (preset.includes('Todos')) {
                    form.horario_weekdays = time;
                    form.horario_weekend = time;
                  } else if (preset.includes('Viernes')) {
                    form.horario_weekdays = time;
                    form.horario_weekend = 'Cerrado';
                  } else if (preset.includes('Fin')) {
                    form.horario_weekend = time;
                    form.horario_weekdays = 'Cerrado';
                  } else if (preset.includes('24')) {
                    form.horario_weekdays = 'Abierto 24 Horas';
                    form.horario_weekend = 'Abierto 24 Horas';
                  }
                  else if (preset.includes('Cerrado')) {
                    form.horario_weekdays = 'Cerrado';
                    form.horario_weekend = 'Cerrado';
                  }
                }"
                  class="btn btn-xs btn-outline rounded-lg text-[10px] font-medium border-base-300 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
                  {{ preset.split(':')[0] }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-5">
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Enlace a Google Maps
              (opcional)</label>
            <input v-model="form.googleMaps" type="url"
              class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="https://maps.google.com/..." />
          </div>
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Sitio Web / Reserva (opcional)</label>
            <input v-model="form.sitioWeb" type="url"
              class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="https://paginaoficial.com" />
          </div>
        </div>
      </section>

      <!-- Section 3: Tags -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
        <h3 class="font-heading font-extrabold text-xl text-base-content mb-2">Qué encontrarás allí</h3>
        <p class="text-base-content/60 text-sm mb-5 border-b border-base-200 pb-3">Añade palabras clave para ayudar a
          otros viajeros (ej. parqueo, comida local, senderismo).</p>
        <div class="flex gap-2 mb-4">
          <input v-model="currentTag" @keydown.enter.prevent="addTag" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Escribe una etiqueta y presiona Intro..." />
          <button @click.prevent="addTag" type="button"
            class="btn btn-secondary text-white rounded-2xl px-6 font-bold shadow-sm">Agregar</button>
        </div>
        <div
          class="flex flex-wrap gap-2 min-h-[40px] items-center p-3 bg-base-200/30 rounded-2xl border border-dashed border-base-300">
          <span v-if="form.etiquetas.length === 0" class="text-xs text-base-content/40 italic">No has añadido
            etiquetas...</span>
          <div v-for="(tag, index) in form.etiquetas" :key="index"
            class="badge badge-lg h-8 gap-2 bg-white border border-base-300 text-base-content px-3 font-semibold shadow-sm">
            #{{ tag }}
            <button @click.prevent="removeTag(index)"
              class="text-base-content/50 hover:text-error transition-colors mt-px">✕</button>
          </div>
        </div>
      </section>

      <!-- Section 4: Images -->
      <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
        <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">Fotografías
        </h3>
        <div class="space-y-6">
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1 flex items-center gap-2">
              <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                </path>
              </svg>
              Imagen Principal *
            </label>
            <div class="flex gap-4 mb-3 ml-1">
              <label class="cursor-pointer flex items-center gap-2">
                <input type="radio" v-model="uploadType" value="url" class="radio radio-sm radio-primary" />
                <span class="text-sm font-medium">Usar URL</span>
              </label>
              <label class="cursor-pointer flex items-center gap-2">
                <input type="radio" v-model="uploadType" value="local" class="radio radio-sm radio-primary" />
                <span class="text-sm font-medium">Subir desde PC</span>
              </label>
            </div>
            <div v-if="uploadType === 'url'">
              <input v-model="form.imagenPrincipal" type="url" :required="uploadType === 'url'"
                class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="https://ejemplo.com/foto-principal.jpg" />
            </div>
            <div v-else>
              <input type="file" accept="image/*" @change="handleFileUpload" :required="uploadType === 'local'"
                class="file-input file-input-bordered w-full rounded-2xl bg-base-100" />
              <p v-if="localFileName" class="text-xs text-success mt-2 font-medium ml-2">✓ {{ localFileName }}
                seleccionado</p>
            </div>
          </div>

          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1 flex justify-between">
              <span>Galería Extra (Opcional, Máx 6)</span>
              <span class="text-xs font-normal opacity-70">{{ form.galeria.length }}/6 permitidas</span>
            </label>
            <div class="space-y-4">
              <div v-for="(item, index) in form.galeria" :key="index"
                class="p-4 rounded-2xl bg-base-200/50 border border-base-200 relative">
                <button v-if="form.galeria.length > 1" @click.prevent="removeGalleryUrl(index)"
                  class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost text-error hover:bg-error hover:text-white">✕</button>
                <div class="flex gap-4 mb-3">
                  <label class="cursor-pointer flex items-center gap-2">
                    <input type="radio" v-model="item.type" value="url" class="radio radio-xs radio-primary" />
                    <span class="text-xs font-medium">Usar URL</span>
                  </label>
                  <label class="cursor-pointer flex items-center gap-2">
                    <input type="radio" v-model="item.type" value="local" class="radio radio-xs radio-primary" />
                    <span class="text-xs font-medium">Subir desde PC</span>
                  </label>
                </div>
                <div v-if="item.type === 'url'">
                  <input v-model="item.url" type="url"
                    class="input input-sm input-bordered w-full rounded-xl bg-base-100 text-sm"
                    :placeholder="`URL Imagen ${index + 1}...`" />
                </div>
                <div v-else>
                  <input type="file" accept="image/*" @change="handleGalleryFileUpload($event, index)"
                    class="file-input file-input-sm file-input-bordered w-full rounded-xl bg-base-100" />
                  <p v-if="item.fileName" class="text-[10px] text-success mt-1 font-medium ml-1">✓ {{ item.fileName }}
                  </p>
                </div>
              </div>
              <button v-if="form.galeria.length < 6" @click.prevent="addGalleryUrl"
                class="btn btn-sm btn-ghost text-primary mt-2 rounded-xl">+ Añadir otra imagen</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Error banner -->
      <div v-if="submitError" class="alert alert-error rounded-2xl text-sm">
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ submitError }}
      </div>

      <!-- Submit Actions -->
      <div class="pt-4 flex justify-end gap-4">
        <a href="/destinos"
          class="btn btn-ghost rounded-full px-6 text-base-content/70 hover:text-base-content">Cancelar</a>
        <button type="button" @click="submitForm" :disabled="isLoading"
          class="btn btn-primary text-base-content rounded-full px-10 shadow-lg font-bold disabled:opacity-70 disabled:text-white transition-all hover:-translate-y-1">
          <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          {{ isLoading ? 'Enviando...' : 'Enviar Destino' }}
          <svg v-if="!isLoading" class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
            </path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: fade-up 0.4s ease-out;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
