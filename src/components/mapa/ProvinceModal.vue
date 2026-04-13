<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { TYPE_LABELS } from '@/data/poi-config.ts'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

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
const isAnimating = ref(false)
const provinceId = ref<string | null>(null)
const provincesData = ref<ProvincesMap | null>(null)
const currentCategory = ref<string>('all')
const currentPrice = ref<string>('all')
const searchQuery = ref<string>('')

const panelRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

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
    const searchOk = !searchQuery.value || 
      poi.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      poi.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return catOk && priceOk && searchOk
  })
})

const availableTypeEntries = computed(() => {
  if (!province.value || !province.value.pois) return []
  const typesInProvince = new Set(province.value.pois.map(poi => poi.type))
  return Object.entries(TYPE_LABELS).filter(([typeKey]) => typesInProvince.has(typeKey)) as [string, string][]
})

/* ── Helpers ────────────────────────────────────────────── */
function handleScroll() {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 10
}

function scrollCat(dir: 'left' | 'right') {
  if (!scrollContainer.value) return
  const moveAmount = 200
  scrollContainer.value.scrollBy({
    left: dir === 'left' ? -moveAmount : moveAmount,
    behavior: 'smooth'
  })
}

function resetFilters() {
  currentCategory.value = 'all'
  currentPrice.value = 'all'
  searchQuery.value = ''
}

function handleBackdropClick() {
  closeModal()
}

/* ── Public API (called by useApp.js via window.__provinceModal) ── */
async function openModal(id: string, data: ProvincesMap) {
  if (isAnimating.value) return
  isAnimating.value = true

  provinceId.value = id
  provincesData.value = data
  resetFilters()

  const originEl = document.querySelector(`[data-province="${id}"]`)
  let rect = null;
  if (originEl) {
    rect = originEl.getBoundingClientRect();
  }

  isOpen.value = true
  document.body.style.overflow = 'hidden'

  await nextTick()

  // Highlight the clicked province on the map
  document.querySelectorAll('.map-province.active').forEach(el => el.classList.remove('active'))
  if (originEl) originEl.classList.add('active')

  const tooltip = document.getElementById('province-tooltip')
  if (tooltip) tooltip.style.opacity = '0'

  if (panelRef.value && contentRef.value) {
    // Esconder el contenido interno inicialmente
    gsap.set(contentRef.value, { opacity: 0, y: 15 })

    if (rect) {
      const panelRect = panelRef.value.getBoundingClientRect()
      // Distancia desde el centro físico del HTML al centro físico de la Provincia en el SVG
      const startX = rect.left + rect.width / 2 - (panelRect.left + panelRect.width / 2)
      const startY = rect.top + rect.height / 2 - (panelRect.top + panelRect.height / 2)

      gsap.fromTo(panelRef.value,
        {
          x: startX,
          y: startY,
          scale: 0.05,
          opacity: 0,
          transformOrigin: "center center"
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          onComplete: () => {
            gsap.to(contentRef.value, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => { isAnimating.value = false }
            })
          }
        }
      )
    } else {
      gsap.fromTo(panelRef.value,
        { scale: 0.9, opacity: 0, y: 20 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)",
          onComplete: () => {
            gsap.to(contentRef.value, { opacity: 1, y: 0, duration: 0.3 })
            isAnimating.value = false
          }
        }
      )
    }
  } else {
    isAnimating.value = false
  }
}

async function closeModal() {
  if (isAnimating.value) return
  isAnimating.value = true

  if (panelRef.value) {
    if (contentRef.value) {
      gsap.to(contentRef.value, { opacity: 0, duration: 0.15 })
    }

    const originEl = document.querySelector(`[data-province="${provinceId.value}"]`)
    let rect = null;
    if (originEl) {
      rect = originEl.getBoundingClientRect();
    }

    if (rect) {
      const panelRect = panelRef.value.getBoundingClientRect()
      const targetX = rect.left + rect.width / 2 - (panelRect.left + panelRect.width / 2)
      const targetY = rect.top + rect.height / 2 - (panelRect.top + panelRect.height / 2)

      gsap.to(panelRef.value, {
        x: targetX,
        y: targetY,
        scale: 0.05,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: finishClose
      })
    } else {
      gsap.to(panelRef.value, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: finishClose
      })
    }
  } else {
    finishClose()
  }

  function finishClose() {
    isOpen.value = false
    document.body.style.overflow = ''
    isAnimating.value = false

    document.querySelectorAll('.map-province.active').forEach(el => el.classList.remove('active'))
    const mapContainer = document.getElementById('map-container')
    if (mapContainer) mapContainer.classList.remove('shifted')
  }
}

/* ── Expose for external callers ───────────────────────── */
defineExpose({ openModal, closeModal })

/* ── Self-register on window so useApp.js can call openModal/closeModal ── */
onMounted(() => {
  window.__provinceModal = { openModal, closeModal }

  // Listener para el evento personalizado desde MapSection.astro
  window.addEventListener('open-province-modal', (e: any) => {
    const { provinceSlug } = e.detail
    if (provinceSlug && provincesData.value) {
      openModal(provinceSlug, provincesData.value)
    } else if (provinceSlug && (window as any).__PROVINCES__) {
      // Fallback si data.value aún no está sincronizado
      openModal(provinceSlug, (window as any).__PROVINCES__)
    }
  })
})
</script>

<template>
  <!-- DaisyUI modal via v-if + class toggling — no showModal() needed -->
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @mousedown="handleBackdropClick" />

      <!-- Modal Panel -->
      <div ref="panelRef"
        class="relative w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style="background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);" @click.stop>

        <!-- Animated Content Wrapper -->
        <div ref="contentRef" class="flex flex-col overflow-hidden h-full">
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
            class="px-5 sm:px-8 bg-base-200/20 border-b border-base-200/50 relative z-[999] shrink-0 h-[72px] flex flex-row items-center justify-between gap-4">
            
            <!-- Buscador -->
            <div class="relative flex-1 max-w-[14rem] sm:max-w-xs">
              <svg class="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" v-model="searchQuery" placeholder="Buscar destino..." class="input h-10 w-full pl-10 bg-base-100 hover:bg-base-100/80 border-none shadow-sm rounded-full focus:ring-2 focus:ring-primary/20 text-sm font-medium placeholder:font-normal placeholder:text-base-content/40 transition-shadow" />
            </div>

            <div class="flex items-center gap-2 sm:gap-3 shrink-0">
              
              <!-- Dropdown Precio (Entrada) -->
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn h-9 sm:h-10 px-4 rounded-[1.25rem] flex items-center gap-1.5 shadow-none transition-all duration-200 outline-none text-xs sm:text-sm font-bold border-2"
                     :class="currentPrice !== 'all' ? 'border-base-content/80 text-base-content bg-transparent shadow-sm' : 'border-transparent bg-base-200/60 hover:bg-base-200 text-base-content/70'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-70"><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"></path></svg>
                  <span class="hidden sm:inline">Entrada</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <!-- Menu -->
                <ul tabindex="0" class="dropdown-content z-[1000] menu p-2 mt-2 shadow-2xl bg-base-100 rounded-[1.25rem] w-40 flex flex-col gap-1 border border-base-200/50">
                  <li><button class="rounded-lg text-sm font-medium" :class="currentPrice === 'all' ? 'active font-bold bg-base-200/50' : ''" @click="currentPrice = 'all'; document.activeElement?.blur()">Todas</button></li>
                  <li><button class="rounded-lg text-sm font-medium" :class="currentPrice === 'gratis' ? 'active font-bold bg-base-200/50' : ''" @click="currentPrice = 'gratis'; document.activeElement?.blur()">Gratis</button></li>
                  <li><button class="rounded-lg text-sm font-medium" :class="currentPrice === 'pagado' ? 'active font-bold bg-base-200/50' : ''" @click="currentPrice = 'pagado'; document.activeElement?.blur()">De pago</button></li>
                </ul>
              </div>

              <!-- Dropdown Categorías -->
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn h-9 sm:h-10 px-4 rounded-[1.25rem] flex items-center gap-1.5 shadow-none transition-all duration-200 outline-none text-xs sm:text-sm font-bold border-2"
                     :class="currentCategory !== 'all' ? 'border-base-content/80 text-base-content bg-transparent shadow-sm' : 'border-transparent bg-base-200/60 hover:bg-base-200 text-base-content/70'">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-70"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
                  <span class="hidden sm:inline">Categorías</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="opacity-50"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <!-- Menu -->
                <ul tabindex="0" class="dropdown-content z-[1000] menu p-2 mt-2 shadow-2xl bg-base-100 rounded-[1.25rem] w-48 flex flex-col gap-1 border border-base-200/50 max-h-64 overflow-y-auto custom-scrollbar">
                  <li><button class="rounded-lg text-sm font-medium" :class="currentCategory === 'all' ? 'active font-bold bg-base-200/50' : ''" @click="currentCategory = 'all'; document.activeElement?.blur()">Todas</button></li>
                  <li v-for="[value, label] in availableTypeEntries" :key="value">
                    <button class="rounded-lg text-sm font-medium" :class="currentCategory === value ? 'active font-bold bg-base-200/50' : ''" @click="currentCategory = value; document.activeElement?.blur()">{{ label }}</button>
                  </li>
                </ul>
              </div>

              <!-- Filter Reset Button (if filters are active) -->
              <button v-if="currentPrice !== 'all' || currentCategory !== 'all' || searchQuery !== ''" 
                class="btn btn-sm btn-circle btn-ghost text-base-content/40 hover:text-error transition-colors" 
                title="Limpiar filtros" @click="resetFilters">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              
            </div>
          </div>

          <!-- POI List -->
          <div class="px-8 py-6 overflow-y-auto bg-base-200/5 custom-scrollbar grow">
            <!-- Empty State -->
            <div v-if="filteredPois.length === 0" class="py-16 text-center opacity-30">
              <div class="text-5xl mb-3">🏝️</div>
              <p class="font-medium">No hay resultados para esta selección</p>
            </div>

            <!-- POI Cards -->
            <article v-for="poi in filteredPois" :key="poi.name"
              class="card card-side bg-base-100 shadow-sm border border-base-200 mb-4 hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              <figure class="w-1/3 sm:w-40 md:w-48 shrink-0 relative overflow-hidden">
                <img :src="poi.image" :alt="poi.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy" />
                <div class="absolute top-2 left-2">
                  <span class="badge badge-sm font-bold uppercase tracking-tighter text-[9px]"
                    :class="poi.price === 'gratis' ? 'badge-success text-white' : 'badge-warning'">{{ poi.price
                    }}</span>
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
            </article>
          </div> <!-- End POI List -->
        </div> <!-- End contentRef -->
      </div> <!-- End panelRef -->
    </div> <!-- End v-if isOpen -->
  </Teleport>
</template>

<style scoped>
.filter-pill {
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  border: 1px solid var(--fallback-bc, oklch(var(--bc)/0.2));
  background: var(--fallback-b1, oklch(var(--b1)/1));
  color: var(--fallback-bc, oklch(var(--bc)/0.8));
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.filter-pill:hover {
  border-color: var(--fallback-p, oklch(var(--p)/0.4));
  transform: translateY(-1px);
}

.filter-pill:active {
  transform: translateY(0);
}

.filter-pill.active {
  border-color: var(--fallback-p, oklch(var(--p)/1));
  color: var(--fallback-pc, oklch(var(--pc)/1));
  background: var(--fallback-p, oklch(var(--p)/1));
  box-shadow: 0 0 0 1px var(--fallback-p, oklch(var(--p)/1));
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

.custom-scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar-x::-webkit-scrollbar {
  height: 6px;
  display: block;
}

.custom-scrollbar-x::-webkit-scrollbar-track {
  background: var(--fallback-b2, oklch(var(--b2)/0.5));
  border-radius: 10px;
  margin: 0 10px;
}

.custom-scrollbar-x::-webkit-scrollbar-thumb {
  background: var(--fallback-bc, oklch(var(--bc)/0.3));
  border-radius: 10px;
  border: 1px solid var(--fallback-b1, oklch(var(--b1)/1));
}

.custom-scrollbar-x::-webkit-scrollbar-thumb:hover {
  background: var(--fallback-bc, oklch(var(--bc)/0.5));
}

/* Ensure the arrows container doesn't block clicks */
.group\/scroll .absolute {
  pointer-events: none;
}

.group\/scroll .absolute button {
  pointer-events: auto;
}
</style>
