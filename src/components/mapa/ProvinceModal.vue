<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { TYPE_LABELS } from '../../data/poi-config.ts'

/* ── Types ──────────────────────────────────────────────── */
interface POI {
  name: string
  type: string
  price: string
  image: string
  description: string
  slug?: string
  province?: string
}

interface ProvinceData {
  name: string
  description: string
  color?: string
  pois: POI[]
}

type ProvincesMap = Record<string, ProvinceData>

/* ── State ──────────────────────────────────────────────── */
const isOpen = ref(false)
const isFilterOpen = ref(false)
const provinceId = ref<string | null>(null)
const provincesData = ref<ProvincesMap | null>(null)
const currentCategory = ref<string>('all')
const currentPrice = ref<string>('all')

/* ── Derived data ───────────────────────────────────────── */
const province = computed<ProvinceData | null>(() => {
  if (!provincesData.value || !provinceId.value) return null
  return provincesData.value[provinceId.value] ?? null
})

const filteredPois = computed<POI[]>(() => {
  if (!province.value) return []
  return province.value.pois.filter(poi => {
    const catOk = currentCategory.value === 'all' || poi.type === currentCategory.value
    const priceOk = currentPrice.value === 'all' || poi.price === currentPrice.value
    return catOk && priceOk
  })
})

const typeEntries = computed(() => Object.entries(TYPE_LABELS) as [string, string][])

/* ── Helpers ────────────────────────────────────────────── */
function resetFilters() {
  currentCategory.value = 'all'
  currentPrice.value = 'all'
}

function toggleFilter(force?: boolean) {
  isFilterOpen.value = force !== undefined ? force : !isFilterOpen.value
}

function handleBackdropClick() {
  if (isFilterOpen.value) {
    toggleFilter(false)
  }
}

/* ── Public API (called by useApp.js via window.__provinceModal) ── */
function openModal(id: string, data: ProvincesMap) {
  provinceId.value = id
  provincesData.value = data
  resetFilters()
  isFilterOpen.value = false
  isOpen.value = true
  document.body.style.overflow = 'hidden'

  // Highlight the clicked province on the map
  document.querySelectorAll('.map-province.active').forEach(el => el.classList.remove('active'))
  const path = document.querySelector<HTMLElement>(`[data-province="${id}"]`)
  if (path) path.classList.add('active')

  // Hide tooltip
  const tooltip = document.getElementById('province-tooltip')
  if (tooltip) tooltip.style.opacity = '0'
}

function closeModal() {
  isOpen.value = false
  isFilterOpen.value = false
  document.body.style.overflow = ''

  document.querySelectorAll('.map-province.active').forEach(el => el.classList.remove('active'))

  const mapContainer = document.getElementById('map-container')
  if (mapContainer) mapContainer.classList.remove('shifted')
}

/* ── Expose for external callers ───────────────────────── */
defineExpose({ openModal, closeModal })

/* ── Self-register on window so useApp.js can call openModal/closeModal ── */
onMounted(() => {
  ; (window as any).__provinceModal = { openModal, closeModal }
})
</script>

<template>
  <!-- DaisyUI modal via v-if + class toggling — no showModal() needed -->
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
      @mousedown.self="handleBackdropClick">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="closeModal" />

      <!-- Modal Panel -->
      <div class="relative w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style="background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);" @click.stop>
        <!-- Close Button -->
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-30 text-base-content/40 hover:text-base-content hover:bg-base-200"
          @click="closeModal">✕</button>

        <!-- Header -->
        <div class="p-8 pb-5 border-b border-base-200/50 bg-white/40 shrink-0">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-3.5 h-3.5 rounded-full shadow-sm"
              :style="{ backgroundColor: province?.color ?? '#4a90d9' }" />
            <span class="text-[10px] uppercase tracking-[0.2em] font-extrabold opacity-40">Provincia</span>
          </div>
          <h3 class="font-logo font-bold text-3xl sm:text-5xl text-base-content mb-3 tracking-tighter">
            {{ province?.name }}
          </h3>
          <p class="font-map text-base-content/60 text-sm sm:text-lg leading-relaxed max-w-xl">
            {{ province?.description }}
          </p>
        </div>

        <!-- Action Bar -->
        <div
          class="px-8 py-4 bg-base-200/20 border-b border-base-200/50 flex items-center justify-between relative z-20 shrink-0">
          <div class="text-[10px] uppercase tracking-widest font-extrabold opacity-30 flex items-center gap-2">
            Puntos de Interés
            <span class="badge badge-sm font-bold bg-base-300 border-none text-[10px]">
              {{ filteredPois.length }}
            </span>
          </div>

          <!-- Filter Toggle Button -->
          <button class="btn btn-sm h-9 px-5 rounded-full flex items-center gap-2 transition-all duration-300" :class="isFilterOpen
            ? 'btn-primary text-white shadow-md'
            : 'btn-ghost bg-base-100 border-base-300 shadow-sm'" @click="toggleFilter()">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span class="font-bold">Filtros</span>
          </button>

          <!-- Filter Popover -->
          <Transition name="filter-pop">
            <div v-if="isFilterOpen"
              class="absolute top-[calc(100%+8px)] right-8 w-80 bg-[#fdfcfa]/98 backdrop-blur-2xl border border-[#f0e6d2] shadow-2xl rounded-2xl p-6 z-50">
              <!-- Popover Header -->
              <div class="flex items-center justify-between mb-6">
                <h4 class="font-heading font-extrabold text-xl text-base-content">Filtros</h4>
                <div class="flex items-center gap-1.5">
                  <button
                    class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-primary transition-colors"
                    title="Restablecer" @click="resetFilters">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-error transition-colors"
                    @click="toggleFilter(false)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Category Pills -->
              <div class="mb-6">
                <h5 class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">
                  Categorías
                </h5>
                <div class="flex flex-wrap gap-2">
                  <button class="filter-pill" :class="{ active: currentCategory === 'all' }"
                    @click="currentCategory = 'all'">Todas</button>
                  <button v-for="[value, label] in typeEntries" :key="value" class="filter-pill"
                    :class="{ active: currentCategory === value }" @click="currentCategory = value">{{ label }}</button>
                </div>
              </div>

              <!-- Price Pills -->
              <div>
                <h5 class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">
                  Precio
                </h5>
                <div class="flex gap-2">
                  <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'all' }"
                    @click="currentPrice = 'all'">Todos</button>
                  <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'gratis' }"
                    @click="currentPrice = 'gratis'">Gratis</button>
                  <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'pagado' }"
                    @click="currentPrice = 'pagado'">Pagado</button>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- POI List -->
        <div class="px-8 py-6 overflow-y-auto bg-base-200/5 custom-scrollbar grow">
          <!-- Empty State -->
          <div v-if="filteredPois.length === 0" class="py-16 text-center opacity-30">
            <div class="text-5xl mb-3">🏝️</div>
            <p class="font-medium">No hay resultados para esta selección</p>
          </div>

          <!-- POI Cards -->
          <div v-for="poi in filteredPois" :key="poi.name"
            class="card card-side bg-base-100 shadow-sm border border-base-200 mb-4 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            <figure class="w-1/3 sm:w-40 md:w-48 shrink-0 relative overflow-hidden">
              <img :src="poi.image" :alt="poi.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />
              <div class="absolute top-2 left-2">
                <span class="badge badge-sm font-bold uppercase tracking-tighter text-[9px]"
                  :class="poi.price === 'gratis' ? 'badge-success text-white' : 'badge-warning'">{{ poi.price }}</span>
              </div>
            </figure>
            <div class="card-body p-4 sm:p-5 w-2/3">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  {{ TYPE_LABELS[poi.type] || poi.type }}
                </span>
              </div>
              <h2 class="card-title text-base sm:text-lg text-base-content font-heading leading-tight">
                {{ poi.name }}
              </h2>
              <p class="font-map text-xs sm:text-sm text-base-content/80 line-clamp-2 sm:line-clamp-3">
                {{ poi.description }}
              </p>
              <div class="card-actions justify-end mt-2 sm:mt-4">
                <a :href="`/destinos/${provinceId}/${poi.slug}`"
                  class="btn btn-primary btn-xs sm:btn-sm rounded-full px-4 sm:px-6" @click="closeModal">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.filter-pill {
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  background: white;
  color: #7A4B3A;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.filter-pill:hover {
  border-color: #D5A77B;
  transform: translateY(-1px);
}

.filter-pill:active {
  transform: translateY(0);
}

.filter-pill.active {
  border-color: #3b82f6;
  color: #1d4ed8;
  background: #eff6ff;
  box-shadow: 0 0 0 1px #3b82f6;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}

/* Filter popover transition */
.filter-pop-enter-active,
.filter-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-pop-enter-from,
.filter-pop-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
  transform-origin: top right;
}
</style>
