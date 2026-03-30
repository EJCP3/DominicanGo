<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const props = defineProps<{
  destination: {
    id: string;
    name: string;
    description: string;
    provinceId: string;
    type: string;
    price: string;
    hoursWeekdays?: string | null;
    hoursWeekend?: string | null;
    tags: string[];
    website?: string | null;
    image: string;
    images: string[];
    createdAt: string;
  };
  provincias: { slug: string; name: string }[];
  tipos: string[];
  typeLabels: Record<string, string>;
  token: string | undefined;
  isAdmin: boolean;
}>()

// ── Form State ───────────────────────────────────────────────────────────────
const form = reactive({
  nombre: props.destination.name,
  descripcion: props.destination.description,
  provincia: props.destination.provinceId,
  categoria: props.destination.type,
  precio: props.destination.price,
  horario_weekdays: props.destination.hoursWeekdays || '',
  horario_weekend: props.destination.hoursWeekend || '',
  etiquetas: [...(props.destination.tags || [])],
  sitioWeb: props.destination.website || '',
  imagenPrincipal: props.destination.image,
  // Gallery state for editing: allows mixing existing URLs and new local files
  galeria: props.destination.images.map(img => ({
    type: 'url' as 'url' | 'local',
    url: img,
    file: null as File | null,
    fileName: ''
  }))
})

// If gallery is empty, start with one empty slot
onMounted(() => {
  if (form.galeria.length === 0) {
    addGallerySlot()
  }
})

// ── UI State ─────────────────────────────────────────────────────────────────
const currentTag = ref('')
const isLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const uploadType = ref<'url' | 'local'>('url')
const localFileName = ref('')
const localFile = ref<File | null>(null)

// ── Time remaining logic ─────────────────────────────────────────────────────
const timeLeft = ref('')
const canEdit = ref(true)

onMounted(() => {
  if (!props.isAdmin) {
    const checkTimer = () => {
      const created = new Date(props.destination.createdAt).getTime()
      const now = Date.now()
      const remaining = (60 * 60 * 1000) - (now - created)
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
    const interval = setInterval(checkTimer, 1000)
  }
})

// ── Tag Helpers ───────────────────────────────────────────────────────────────
function addTag() {
  const tag = currentTag.value.trim()
  if (tag && !form.etiquetas.includes(tag)) form.etiquetas.push(tag)
  currentTag.value = ''
}
function removeTag(index: number) { form.etiquetas.splice(index, 1) }

// ── Image Helpers ─────────────────────────────────────────────────────────────
const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    localFile.value = target.files[0]
    localFileName.value = target.files[0].name
  }
}

function addGallerySlot() {
  if (form.galeria.length < 6) {
    form.galeria.push({ type: 'url', url: '', file: null, fileName: '' })
  }
}

function removeGallerySlot(index: number) {
  form.galeria.splice(index, 1)
  if (form.galeria.length === 0) addGallerySlot()
}

function handleGalleryFileUpload(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  if (target.files?.length) {
    form.galeria[index].file = target.files[0]
    form.galeria[index].fileName = target.files[0].name
  }
}

// ── Submit ────────────────────────────────────────────────────────────────────
async function submitEdit() {
  if (!canEdit.value) {
    errorMsg.value = 'El tiempo de edición ha expirado.'
    return
  }
  if (!form.nombre || !form.provincia || !form.categoria || !form.descripcion) {
    errorMsg.value = 'Por favor, completa los campos obligatorios.'
    return
  }

  isLoading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const apiBase = 'http://localhost:3000/api'
    
    // Process main image
    let finalImagenPrincipal = form.imagenPrincipal
    if (uploadType.value === 'local' && localFile.value) {
      finalImagenPrincipal = await toBase64(localFile.value)
    }

    // Process gallery
    const finalGalleryImages: string[] = []
    for (const item of form.galeria) {
      if (item.type === 'url' && item.url) {
        finalGalleryImages.push(item.url)
      } else if (item.type === 'local' && item.file) {
        finalGalleryImages.push(await toBase64(item.file))
      }
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

    const res = await fetch(`${apiBase}/destinations/${props.destination.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al actualizar')

    successMsg.value = '¡Destino actualizado exitosamente!'
    setTimeout(() => { window.location.href = `/destinos` }, 1500)
  } catch (e: any) {
    errorMsg.value = e.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-8 animate-in">
    <!-- Timer banner -->
    <div v-if="!isAdmin && timeLeft" class="alert rounded-2xl text-sm"
      :class="canEdit ? 'alert-info' : 'alert-error'">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span><strong>Ventana de edición:</strong> {{ timeLeft }}</span>
    </div>

    <!-- Section: Basic Info -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">
        Información Básica
      </h3>
      <div class="space-y-5">
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Nombre del destino *</label>
          <input v-model="form.nombre" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Nombre del destino" :disabled="!canEdit" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Categoría *</label>
            <select v-model="form.categoria"
              class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
              :disabled="!canEdit">
              <option v-for="tipo in props.tipos" :key="tipo" :value="tipo">{{ props.typeLabels[tipo] }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Tipo de acceso *</label>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"
                :class="form.precio === 'gratis' ? 'bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824]' : 'border-base-300'">
                <input type="radio" value="gratis" v-model="form.precio" class="radio radio-sm radio-primary opacity-0 absolute" />
                <span class="font-medium text-sm">Gratis</span>
              </label>
              <label class="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-2xl border transition-colors relative"
                :class="form.precio === 'pagado' ? 'bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824]' : 'border-base-300'">
                <input type="radio" value="pagado" v-model="form.precio" class="radio radio-sm radio-primary opacity-0 absolute" />
                <span class="font-medium text-sm">Pagado</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Descripción *</label>
          <textarea v-model="form.descripcion" rows="3"
            class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
            placeholder="Describe este destino..." :disabled="!canEdit"></textarea>
        </div>
      </div>
    </section>

    <!-- Section: Location -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">
        Ubicación y Detalles
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Provincia *</label>
          <select v-model="form.provincia"
            class="select select-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            :disabled="!canEdit">
            <option v-for="prov in props.provincias" :key="prov.slug" :value="prov.slug">{{ prov.name }}</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Sitio Web (opcional)</label>
          <input v-model="form.sitioWeb" type="url"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://..." :disabled="!canEdit" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Horario semana (opcional)</label>
          <input v-model="form.horario_weekdays" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="9:00 AM - 5:00 PM" :disabled="!canEdit" />
        </div>
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Horario fin de semana (opcional)</label>
          <input v-model="form.horario_weekend" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="10:00 AM - 3:00 PM" :disabled="!canEdit" />
        </div>
      </div>
    </section>

    <!-- Section: Tags -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-2">Etiquetas</h3>
      <p class="text-base-content/60 text-sm mb-5 border-b border-base-200 pb-3">
        Palabras clave para ayudar a otros viajeros.
      </p>
      <div class="flex gap-2 mb-4">
        <input v-model="currentTag" @keydown.enter.prevent="addTag" type="text"
          class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Escribe una etiqueta y presiona Intro..." :disabled="!canEdit" />
        <button @click.prevent="addTag" type="button" :disabled="!canEdit"
          class="btn btn-secondary text-white rounded-2xl px-6 font-bold shadow-sm">Agregar</button>
      </div>
      <div class="flex flex-wrap gap-2 min-h-[40px] items-center p-3 bg-base-200/30 rounded-2xl border border-dashed border-base-300">
        <span v-if="form.etiquetas.length === 0" class="text-xs text-base-content/40 italic">No hay etiquetas...</span>
        <div v-for="(tag, index) in form.etiquetas" :key="index"
          class="badge badge-lg h-8 gap-2 bg-white border border-base-300 text-base-content px-3 font-semibold shadow-sm">
          #{{ tag }}
          <button @click.prevent="removeTag(index)" class="text-base-content/50 hover:text-error transition-colors mt-px" :disabled="!canEdit">✕</button>
        </div>
      </div>
    </section>

    <!-- Section: Image Main -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Imagen Principal
      </h3>
      
      <div class="flex gap-4 mb-4">
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
        <input v-model="form.imagenPrincipal" type="url"
          class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="https://ejemplo.com/imagen.jpg" :disabled="!canEdit" />
      </div>
      <div v-else>
        <input type="file" accept="image/*" @change="handleFileUpload" :required="uploadType === 'local'"
          class="file-input file-input-bordered w-full rounded-2xl bg-base-100" :disabled="!canEdit" />
        <p v-if="localFileName" class="text-xs text-success mt-2 font-medium ml-2">✓ {{ localFileName }} seleccionado</p>
      </div>

      <div v-if="uploadType === 'url' && form.imagenPrincipal" class="mt-4 rounded-2xl overflow-hidden max-h-48 border border-base-200">
        <img :src="form.imagenPrincipal" class="w-full object-cover max-h-48" />
      </div>
    </section>

    <!-- Section: Gallery -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3 flex justify-between items-center">
        <span>Galería Extra (Máx 6)</span>
        <span class="text-xs font-normal opacity-50">{{ form.galeria.filter(i => i.url || i.file).length }}/6</span>
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(item, index) in form.galeria" :key="index" class="p-4 rounded-2xl bg-base-200/50 border border-base-200 relative">
          <button @click.prevent="removeGallerySlot(index)"
            class="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error text-white shadow-lg z-10" :disabled="!canEdit">✕</button>
          
          <div class="flex gap-3 mb-3">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" v-model="item.type" value="url" class="radio radio-xs radio-primary" />
              <span class="text-[11px] font-bold">URL</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" v-model="item.type" value="local" class="radio radio-xs radio-primary" />
              <span class="text-[11px] font-bold">PC</span>
            </label>
          </div>

          <div v-if="item.type === 'url'" class="space-y-3">
            <input v-model="item.url" type="url"
              class="input input-sm input-bordered w-full rounded-xl bg-base-100"
              placeholder="https://..." :disabled="!canEdit" />
            <div v-if="item.url" class="w-full h-20 rounded-lg overflow-hidden border border-base-300">
              <img :src="item.url" class="w-full h-full object-cover" />
            </div>
          </div>
          <div v-else class="space-y-2">
            <input type="file" accept="image/*" @change="handleGalleryFileUpload($event, index)"
              class="file-input file-input-xs file-input-bordered w-full" :disabled="!canEdit" />
            <p v-if="item.fileName" class="text-[10px] text-success font-bold truncate">✓ {{ item.fileName }}</p>
          </div>
        </div>
      </div>

      <button v-if="form.galeria.length < 6" @click.prevent="addGallerySlot" :disabled="!canEdit"
        class="btn btn-sm btn-ghost text-primary mt-4 rounded-xl border border-dashed border-primary/30 w-full">
        + Añadir otra imagen
      </button>
    </section>

    <!-- Messages -->
    <div v-if="successMsg" class="alert alert-success rounded-2xl text-sm font-bold shadow-lg text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="alert alert-error rounded-2xl text-sm font-bold shadow-lg text-white">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorMsg }}
    </div>

    <!-- Actions -->
    <div class="pt-4 flex justify-end gap-4 border-t border-base-200 pt-8">
      <a href="/destinos" class="btn btn-ghost rounded-full px-8 text-base-content/50 hover:text-base-content font-bold">Cancelar</a>
      <button type="button" @click="submitEdit" :disabled="isLoading || !canEdit"
        class="btn btn-primary text-base-content rounded-full px-12 shadow-xl font-extrabold disabled:opacity-70 transition-all hover:-translate-y-1 hover:shadow-primary/20">
        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
        {{ isLoading ? 'Aplicando cambios...' : 'Guardar y Publicar' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
