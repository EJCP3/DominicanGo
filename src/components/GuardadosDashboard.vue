<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface FavoriteItem {
  id: string
  type: 'DESTINATION' | 'BLOG'
  destination?: {
    id: string; slug: string; name: string; description: string;
    image: string; images: string[]; price: string; provinceId: string;
    province: { name: string; color: string };
  }
  blog?: {
    id: string; slug: string; title: string; excerpt: string;
    images: string[]; category: string; publishedAt: string | null; createdAt: string;
  }
}

const props = defineProps<{
  token: string;
}>();

const activeTab = ref<'destinos' | 'blog'>('destinos');
const favorites = ref<FavoriteItem[]>([]);
const loading = ref(true);
const error = ref('');

const apiBase = (import.meta as any).env?.PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchFavorites() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${apiBase}/favorites`, {
      credentials: 'include',
      headers: { Authorization: `Bearer ${props.token}` },
    });
    const json = await res.json();
    if (json.success) favorites.value = json.data;
    else error.value = json.message || 'Error al cargar favoritos';
  } catch (e) {
    error.value = 'No se pudo conectar al servidor';
  } finally {
    loading.value = false;
  }
}

async function removeFavorite(itemId: string, type: 'destination' | 'blog', favId: string) {
  // Optimistic removal
  favorites.value = favorites.value.filter(f => f.id !== favId);
  try {
    await fetch(`${apiBase}/favorites`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({ itemId, type }),
    });
  } catch {
    // Silently ignore – item already removed visually
  }
}

const savedDestinos = computed(() => favorites.value.filter(f => f.type === 'DESTINATION' && f.destination));
const savedBlogs = computed(() => favorites.value.filter(f => f.type === 'BLOG' && f.blog));
const activeList = computed(() => activeTab.value === 'destinos' ? savedDestinos.value : savedBlogs.value);

onMounted(fetchFavorites);
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center md:text-left mb-10">
      <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">
        Mis Viajes <span class="text-secondary">Guardados</span>
      </h1>
      <p class="text-base-content/70 max-w-2xl text-lg mx-auto md:mx-0">
        Aquí tienes todos los lugares y diarios que has marcado para tu próxima aventura.
      </p>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="flex justify-center py-24">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-error max-w-md mx-auto">{{ error }}</div>

    <template v-else>
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
      <div v-if="activeList.length === 0" class="py-24 text-center bg-white rounded-3xl border border-[#f0e6d2] shadow-sm max-w-3xl mx-auto">
        <div class="w-20 h-20 mx-auto bg-base-100/50 rounded-full flex items-center justify-center shadow-inner mb-6 border border-base-200">
          <svg class="w-10 h-10 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="font-heading font-bold text-2xl text-base-content mb-3">
          Aún no has guardado ningún {{ activeTab === 'destinos' ? 'destino' : 'diario' }}
        </h3>
        <p class="text-base-content/60 mb-8 max-w-md mx-auto">
          Explora el sitio y pulsa el corazón en cualquier tarjeta para guardarla aquí.
        </p>
        <a :href="activeTab === 'destinos' ? '/destinos' : '/blog'" class="btn btn-primary rounded-full px-8 shadow-md">
          Explorar {{ activeTab === 'destinos' ? 'Destinos' : 'Diarios' }}
        </a>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <!-- Destination cards -->
        <template v-if="activeTab === 'destinos'">
          <a
            v-for="fav in activeList"
            :key="fav.id"
            :href="`/destino/${fav.destination!.provinceId}/${fav.destination!.slug}`"
            class="group block bg-white rounded-2xl overflow-hidden border border-[#f0e6d2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
          >
            <!-- Remove button -->
            <button
              class="absolute top-2 right-2 z-20 btn btn-circle btn-sm bg-white/90 backdrop-blur border-none shadow-md text-error hover:bg-error hover:text-white transition-all duration-200 hover:scale-110"
              @click.prevent="removeFavorite(fav.destination!.id, 'destination', fav.id)"
              title="Quitar de favoritos"
              type="button"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <div class="relative h-44 bg-base-300 overflow-hidden">
              <img :src="fav.destination!.image" :alt="fav.destination!.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute top-3 left-3 z-10 pointer-events-none">
                <span class="badge badge-sm font-bold shadow-sm" :class="fav.destination!.price === 'gratis' ? 'badge-success' : 'badge-warning'">
                  {{ fav.destination!.price === 'gratis' ? 'GRATIS' : 'PAGADO' }}
                </span>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: fav.destination!.province.color }"></span>
                <span class="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">{{ fav.destination!.province.name }}</span>
              </div>
              <h3 class="font-heading font-bold text-base-content text-base mb-1 truncate group-hover:text-primary transition-colors">{{ fav.destination!.name }}</h3>
              <p class="text-base-content/70 text-xs line-clamp-2">{{ fav.destination!.description }}</p>
            </div>
          </a>
        </template>

        <!-- Blog cards -->
        <template v-if="activeTab === 'blog'">
          <a
            v-for="fav in activeList"
            :key="fav.id"
            :href="`/blog/${fav.blog!.slug}`"
            class="group block bg-white rounded-2xl overflow-hidden border border-[#f0e6d2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
          >
            <!-- Remove button -->
            <button
              class="absolute top-2 right-2 z-20 btn btn-circle btn-sm bg-white/90 backdrop-blur border-none shadow-md text-error hover:bg-error hover:text-white transition-all duration-200 hover:scale-110"
              @click.prevent="removeFavorite(fav.blog!.id, 'blog', fav.id)"
              title="Quitar de favoritos"
              type="button"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <div class="relative h-44 bg-base-300 overflow-hidden shrink-0">
              <img :src="fav.blog!.images[0]" :alt="fav.blog!.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute top-3 left-3 z-10">
                <span class="bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm">{{ fav.blog!.category }}</span>
              </div>
            </div>
            <div class="p-4 flex flex-col grow">
              <h3 class="font-heading font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">{{ fav.blog!.title }}</h3>
              <p class="text-base-content/60 text-xs line-clamp-2 mb-4">{{ fav.blog!.excerpt }}</p>
              <div class="mt-auto flex items-center justify-between text-[11px] text-base-content/50 font-medium pt-3 border-t border-base-200">
                <span>{{ new Date(fav.blog!.publishedAt || fav.blog!.createdAt).toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
                <span>5 min read</span>
              </div>
            </div>
          </a>
        </template>
      </div>
    </template>
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
