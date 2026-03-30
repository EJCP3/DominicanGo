<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const props = defineProps<{
  blog: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    images: string[];
    createdAt: string;
    provinceId?: string | null;
    destinationId?: string | null;
  };
  token: string | undefined;
  isAdmin: boolean;
}>()

const form = reactive({
  title: props.blog.title,
  excerpt: props.blog.excerpt,
  content: props.blog.content,
  category: props.blog.category,
  images: [...(props.blog.images || [])],
})

const isLoading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')
const timeLeft = ref('')
const canEdit = ref(true)

onMounted(() => {
  if (!props.isAdmin) {
    const checkTimer = () => {
      const created = new Date(props.blog.createdAt).getTime()
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
})

function addImageField() {
  if (form.images.length < 10) form.images.push('')
}
function removeImageField(index: number) {
  form.images.splice(index, 1)
}

async function submitEdit() {
  if (!canEdit.value) {
    errorMsg.value = 'El tiempo de edición ha expirado (máximo 1 hora desde la creación).'
    return
  }
  if (!form.title || !form.excerpt || !form.content || !form.category) {
    errorMsg.value = 'Por favor, completa todos los campos obligatorios.'
    return
  }
  if (form.images.filter(i => i.trim()).length === 0) {
    errorMsg.value = 'Agrega al menos una imagen.'
    return
  }

  isLoading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const apiBase = 'http://localhost:3000/api'
    const body = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      images: form.images.filter(i => i.trim()),
      provinceId: props.blog.provinceId || undefined,
      destinationId: props.blog.destinationId || undefined,
    }

    const res = await fetch(`${apiBase}/blogs/${props.blog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al actualizar')

    successMsg.value = '¡Blog actualizado exitosamente!'
    setTimeout(() => { window.location.href = '/blog' }, 1500)
  } catch (e: any) {
    errorMsg.value = e.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-8 animate-in">
    <!-- Timer banner for non-admin users -->
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
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Título *</label>
          <input v-model="form.title" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Título de tu historia" :disabled="!canEdit" />
        </div>
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Categoría *</label>
          <input v-model="form.category" type="text"
            class="input input-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Aventura, Cultura, Playa..." :disabled="!canEdit" />
        </div>
        <div>
          <label class="text-sm text-base-content/70 font-bold block mb-2 ml-1">Resumen / Extracto *</label>
          <textarea v-model="form.excerpt" rows="2" maxlength="300"
            class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Un breve resumen de tu historia..." :disabled="!canEdit"></textarea>
          <p class="text-xs text-base-content/40 mt-1 ml-1">{{ form.excerpt.length }}/300</p>
        </div>
      </div>
    </section>

    <!-- Section: Content -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">
        Contenido del Blog
      </h3>
      <textarea v-model="form.content" rows="12"
        class="textarea textarea-bordered w-full rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-sm leading-relaxed"
        placeholder="Escribe tu historia aquí..." :disabled="!canEdit"></textarea>
    </section>

    <!-- Section: Images -->
    <section class="bg-white rounded-3xl p-6 shadow-sm border border-[#f0e6d2]">
      <h3 class="font-heading font-extrabold text-xl text-base-content mb-5 border-b border-base-200 pb-3">
        Imágenes
      </h3>
      <div class="space-y-3">
        <div v-for="(img, index) in form.images" :key="index" class="flex gap-3 items-center">
          <input v-model="form.images[index]" type="url"
            class="input input-bordered flex-1 rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
            :placeholder="`URL Imagen ${index + 1}...`" :disabled="!canEdit" />
          <button v-if="form.images.length > 1" @click.prevent="removeImageField(index)"
            class="btn btn-sm btn-circle btn-ghost text-error" :disabled="!canEdit">✕</button>
        </div>
        <button v-if="form.images.length < 10 && canEdit" @click.prevent="addImageField"
          type="button" class="btn btn-sm btn-ghost text-primary mt-2 rounded-xl">
          + Añadir imagen
        </button>
      </div>
    </section>

    <!-- Success / Error messages -->
    <div v-if="successMsg" class="alert alert-success rounded-2xl text-sm">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successMsg }}
    </div>
    <div v-if="errorMsg" class="alert alert-error rounded-2xl text-sm">
      <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorMsg }}
    </div>

    <!-- Actions -->
    <div class="pt-4 flex justify-end gap-4">
      <a href="/blog" class="btn btn-ghost rounded-full px-6 text-base-content/70 hover:text-base-content">Cancelar</a>
      <button type="button" @click="submitEdit" :disabled="isLoading || !canEdit"
        class="btn btn-primary text-base-content rounded-full px-10 shadow-lg font-bold disabled:opacity-70 transition-all hover:-translate-y-1">
        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
        {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: fade-up 0.4s ease-out;
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
