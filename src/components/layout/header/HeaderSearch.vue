<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ apiBase: string }>()

const query = ref('')
const isOpen = ref(false)
const searchRef = ref<HTMLElement | null>(null)
const isLoading = ref(false)

interface POI {
  name: string
  slug?: string
  type?: string
  image?: string
  description?: string
  province?: string
  provinceSlug?: string
}

const results = ref<POI[]>([])
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (newVal) => {
  const q = newVal.trim()
  
  if (q.length < 2) {
    results.value = []
    isOpen.value = false
    return
  }

  if (debounceTimer) clearTimeout(debounceTimer)
  
  isLoading.value = true
  isOpen.value = true
  // We can clear results immediately, or leave old results visible while loading.
  // Clearing them gives immediate UI feedback that a new search is happening.
  results.value = [] 
  
  debounceTimer = setTimeout(async () => {
    try {
      // Use Astro proxy to avoid CORS issues
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=20`)
      if (!res.ok) throw new Error('Search failed')
      
      const json = await res.json()
      
      if (json.success && json.data) {
        const ql = q.toLowerCase()
        const mapped = json.data.map((dest: any) => ({
          name: dest.name,
          slug: dest.poiSlug,
          type: dest.type,
          // Try every possible image field the API might return
          image: dest.thumbImage
            || (dest.images && dest.images[0]?.url)
            || (dest.images && dest.images[0])
            || dest.imageUrl
            || dest.image
            || '',
          description: dest.description,
          province: dest.province?.name || dest.province || '',
          provinceSlug: dest.provinceSlug || '',
        }))

        // Sort: exact name match → starts with query → contains query in name → rest
        mapped.sort((a: any, b: any) => {
          const an = a.name.toLowerCase()
          const bn = b.name.toLowerCase()
          const aExact = an === ql ? 0 : an.startsWith(ql) ? 1 : an.includes(ql) ? 2 : 3
          const bExact = bn === ql ? 0 : bn.startsWith(ql) ? 1 : bn.includes(ql) ? 2 : 3
          return aExact - bExact
        })

        results.value = mapped.slice(0, 8)
      } else {
        results.value = []
      }
    } catch (err) {
      console.error(err)
      results.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
})

function goTo(dest: POI) {
  if (dest.provinceSlug && dest.slug) {
    window.location.href = `/destinos/${dest.provinceSlug}/${dest.slug}`
  }
}

function handleClickOutside(e: MouseEvent) {
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function handleFocus() {
  if (results.value.length > 0 && query.value.length >= 2) {
    isOpen.value = true
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="searchRef" class="relative w-full">
    <!-- Search Input -->
    <svg class="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>

    <input
      v-model="query"
      type="text"
      placeholder="Buscar destino..."
      class="input h-10 w-full pl-10 bg-base-200/50 hover:bg-base-200/70 border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm font-medium placeholder:font-normal placeholder:text-base-content/40 transition-all"
      @focus="handleFocus"
      @keydown.escape="isOpen = false"
    />

    <!-- Results Dropdown -->
    <Transition name="dropdown">
      <div
        v-if="isOpen && results.length > 0"
        class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
      >
        <div class="p-2">
          <p class="text-[10px] uppercase tracking-widest font-bold text-base-content/30 px-3 py-1.5">
            {{ results.length }} resultado{{ results.length !== 1 ? 's' : '' }}
          </p>

          <button
            v-for="dest in results"
            :key="dest.slug"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200/60 transition-colors text-left group cursor-pointer"
            @click="goTo(dest)"
          >
            <!-- Thumbnail -->
            <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-base-200">
              <img 
                v-if="dest.image" 
                :src="dest.image" 
                :alt="dest.name" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-base-content/20 text-lg">🏝️</div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-bold text-sm text-base-content truncate group-hover:text-primary transition-colors">
                {{ dest.name }}
              </p>
              <p class="text-[11px] text-base-content/50 truncate">
                {{ dest.province || '' }}
                <span v-if="dest.type" class="text-base-content/30"> · {{ dest.type }}</span>
              </p>
            </div>

            <!-- Arrow -->
            <svg class="w-4 h-4 text-base-content/20 group-hover:text-primary shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Loading State -->
    <Transition name="dropdown">
      <div
        v-if="query.length >= 2 && isLoading"
        class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 z-50 p-6 flex flex-col items-center justify-center gap-3"
      >
        <span class="loading loading-spinner loading-md text-primary"></span>
        <span class="text-xs text-base-content/50 font-medium animate-pulse">Buscando destinos...</span>
      </div>
    </Transition>

    <!-- No results -->
    <Transition name="dropdown">
      <div
        v-if="query.length >= 2 && results.length === 0 && !isLoading"
        class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 z-50 p-6 text-center"
      >
        <div class="text-3xl mb-2">🔍</div>
        <p class="text-sm text-base-content/50">No se encontraron resultados para "<span class="font-bold">{{ query }}</span>"</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
