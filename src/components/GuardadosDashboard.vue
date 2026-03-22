<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface SavedItem {
  slug: string
  type: 'destino' | 'blog'
}

const props = defineProps<{
  destinos: any[]
  blogs: any[]
}>()

const activeTab = ref<'destinos' | 'blog'>('destinos')
const savedItems = ref<SavedItem[]>([])

onMounted(() => {
  const data = localStorage.getItem('dominicango_favoritos')
  if (data) {
    try {
      savedItems.value = JSON.parse(data)
    } catch (e) {
      console.error('Error parsing saved items', e)
    }
  }
})

const savedDestinos = computed(() => {
  const savedSlugs = savedItems.value.filter(i => i.type === 'destino').map(i => i.slug)
  return props.destinos.filter(d => savedSlugs.includes(d.poiSlug))
})

const savedBlogs = computed(() => {
  const savedSlugs = savedItems.value.filter(i => i.type === 'blog').map(i => i.slug)
  return props.blogs.filter(b => savedSlugs.includes(b.slug))
})

const activeItemsList = computed(() => activeTab.value === 'destinos' ? savedDestinos.value : savedBlogs.value)

function removeFromSaved(slug: string, type: 'destino' | 'blog') {
  savedItems.value = savedItems.value.filter(i => !(i.slug === slug && i.type === type))
  localStorage.setItem('dominicango_favoritos', JSON.stringify(savedItems.value))
}
</script>

<template>
  <div>
    <!-- Header Area -->
    <div class="text-center md:text-left mb-10">
      <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">
        Mis Viajes <span class="text-secondary">Guardados</span>
      </h1>
      <p class="text-base-content/70 max-w-2xl text-lg mx-auto md:mx-0">
        Aquí tienes todos los lugares y diarios que has marcado para tu próxima aventura.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center md:justify-start mb-10">
      <div class="tabs tabs-boxed bg-base-200/50 p-1.5 rounded-full inline-flex border border-base-200">
        <button
          class="tab h-10 px-6 rounded-full font-bold transition-all text-sm"
          :class="activeTab === 'destinos' ? 'bg-primary text-white shadow-md' : 'text-base-content/60 hover:text-base-content'"
          @click="activeTab = 'destinos'"
        >
          Destinos ({{ savedDestinos.length }})
        </button>
        <button
          class="tab h-10 px-6 rounded-full font-bold transition-all text-sm"
          :class="activeTab === 'blog' ? 'bg-secondary text-white shadow-md' : 'text-base-content/60 hover:text-base-content'"
          @click="activeTab = 'blog'"
        >
          Diarios de Viaje ({{ savedBlogs.length }})
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="activeItemsList.length === 0" class="py-24 text-center bg-white rounded-3xl border border-[#f0e6d2] shadow-sm max-w-3xl mx-auto">
      <div class="w-20 h-20 mx-auto bg-base-100/50 rounded-full flex items-center justify-center shadow-inner mb-6 border border-base-200">
        <svg class="w-10 h-10 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
      <h3 class="font-heading font-bold text-2xl text-base-content mb-3">
        Aún no has guardado ningún {{ activeTab === 'destinos' ? 'destino' : 'diario' }}
      </h3>
      <p class="text-base-content/60 mb-8 max-w-md mx-auto">
        Explora el sitio y marca tus lugares y lecturas favoritas con el corazón para encontrarlas aquí después.
      </p>
      <a :href="activeTab === 'destinos' ? '/destinos' : '/blog'" class="btn btn-primary rounded-full px-8 shadow-md">
        Explorar {{ activeTab === 'destinos' ? 'Destinos' : 'Diarios' }}
      </a>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      <!-- Destinos Cards -->
      <template v-if="activeTab === 'destinos'">
        <a
          v-for="d in activeItemsList"
          :key="d.poiSlug"
          :href="d.href"
          class="group block bg-white rounded-2xl overflow-hidden border border-[#f0e6d2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
        >
          <!-- Delete button (intercept click to prevent navigation) -->
          <button 
            class="absolute top-3 right-3 z-20 btn btn-circle btn-sm bg-white/90 backdrop-blur border-none shadow-md text-error hover:bg-error hover:text-white transition-colors"
            @click.prevent="removeFromSaved(d.poiSlug, 'destino')"
            title="Quitar de guardados"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </button>

          <div class="relative h-44 bg-base-300 overflow-hidden">
            <img :src="d.image" :alt="d.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute top-3 left-3 z-10 pointer-events-none">
                <span class="badge badge-sm font-bold shadow-sm" :class="d.price === 'gratis' ? 'badge-success text-white' : 'badge-warning'">
                    {{ d.price === 'gratis' ? 'GRATIS' : 'PAGADO' }}
                </span>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: d.provinceColor }"></span>
              <span class="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">{{ d.province }}</span>
            </div>
            <h3 class="font-heading font-bold text-base-content text-base mb-1 truncate group-hover:text-primary transition-colors">{{ d.name }}</h3>
            <p class="text-base-content/70 text-xs line-clamp-2">{{ d.description }}</p>
          </div>
        </a>
      </template>

      <!-- Blogs Cards -->
      <template v-if="activeTab === 'blog'">
        <a
          v-for="post in activeItemsList"
          :key="post.slug"
          :href="`/blog/${post.slug}`"
          class="group block bg-white rounded-2xl overflow-hidden border border-[#f0e6d2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
        >
          <!-- Delete button -->
          <button 
            class="absolute top-3 right-3 z-20 btn btn-circle btn-sm bg-white/90 backdrop-blur border-none shadow-md text-error hover:bg-error hover:text-white transition-colors"
            @click.prevent="removeFromSaved(post.slug, 'blog')"
            title="Quitar de guardados"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </button>

          <div class="relative h-44 bg-base-300 overflow-hidden shrink-0">
            <img :src="post.images[0]" :alt="post.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute top-3 left-3 z-10">
              <span class="bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm">{{ post.category }}</span>
            </div>
          </div>
          <div class="p-4 flex flex-col grow">
            <h3 class="font-heading font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">{{ post.title }}</h3>
            <p class="text-base-content/60 text-xs line-clamp-2 mb-4">{{ post.excerpt }}</p>
            <div class="mt-auto flex items-center justify-between text-[11px] text-base-content/50 font-medium pt-3 border-t border-base-200">
              <span>{{ post.date }}</span>
              <span>5 min read</span>
            </div>
          </div>
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
