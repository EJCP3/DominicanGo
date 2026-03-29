<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { TYPE_LABELS } from '../../data/poi-config.ts'
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
const isFilterOpen = ref(false)
const isAnimating = ref(false)
const provinceId = ref<string | null>(null)
const provincesData = ref<ProvincesMap | null>(null)
const currentCategory = ref<string>('all')
const currentPrice = ref<string>('all')

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
    return catOk && priceOk
  })
})

const typeEntries = computed(() => Object.entries(TYPE_LABELS) as [string, string][])

/* ── Helpers ────────────────────────────────────────────── */
const isFilterAnimating = ref(false)

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
}

async function animateToggleFilter(force?: boolean) {
  if (isFilterAnimating.value) return;
  isFilterAnimating.value = true;
  
  const targetState = force !== undefined ? force : !isFilterOpen.value;
  
  const panelBg = document.querySelector('[data-flip-id="prov-filter-bg"]')
  const panelContent = document.querySelector('#prov-filter-content')

  if (!targetState) {
    // SECUENCIA DE CIERRE:
    if (panelContent) {
      gsap.to(panelContent, { opacity: 0, duration: 0.15, ease: 'power2.out' })
    }

    await new Promise(resolve => setTimeout(resolve, 80))

    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id^="prov-filter-"]')
    const flipState = Flip.getState(targets)

    isFilterOpen.value = false
    await nextTick()

    Flip.from(flipState, {
      duration: 0.3,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      nested: true,
      onComplete: () => {
        isFilterAnimating.value = false;
      }
    })
  } else {
    // SECUENCIA DE APERTURA:
    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id^="prov-filter-"]')
    const flipState = Flip.getState(targets)

    isFilterOpen.value = true
    await nextTick()

    const newContent = document.querySelector('#prov-filter-content')
    const oldHeader = document.querySelector('[data-flip-id="prov-filter-header"]')
    
    if (newContent || oldHeader) {
      gsap.set([newContent, oldHeader], { opacity: 0, y: 12 })
    }

    Flip.from(flipState, {
      duration: 0.45,
      ease: 'power2.inOut',
      scale: true,
      absolute: true,
      nested: true,
      onComplete: () => {
        if (newContent || oldHeader) {
          gsap.to([newContent, oldHeader], { 
            opacity: 1, y: 0, duration: 0.25, stagger: 0.05, ease: 'back.out(1.2)',
            onComplete: () => {
              isFilterAnimating.value = false;
              // Asegurar que el contenedor sea auto-ajustable y no tenga altura fija de GSAP
              if (panelBg) {
                gsap.set(panelBg, { 
                  height: "auto", 
                  width: "20rem", 
                  clearProps: "all" 
                })
              }
              // Inicializar flechas de scroll
              nextTick(() => handleScroll())
            }
          })
        } else {
          isFilterAnimating.value = false;
        }
      }
    })
  }
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
  if (isFilterOpen.value) {
    isFilterOpen.value = false
  }

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
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)",
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
    isFilterOpen.value = false
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
          <div class="px-8 bg-base-200/20 border-b border-base-200/50 relative z-30 shrink-0 h-[72px] flex flex-col justify-center">
            <div class="relative flex justify-end w-full">
              <!-- Filter Toggle Button (Morphs to header) -->
              <button v-show="!isFilterOpen" data-flip-id="prov-filter-bg"
                class="btn btn-sm h-9 px-5 rounded-full flex items-center gap-2 cursor-pointer btn-ghost bg-base-100 shadow-sm hover:shadow-md transition-shadow border-none"
                @click="animateToggleFilter()"
                aria-label="Abrir filtros"
              >
                <div data-flip-id="prov-filter-header" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span class="font-bold">Filtros</span>
                </div>
              </button>

              <!-- Filter Panel -->
              <div v-show="isFilterOpen" data-flip-id="prov-filter-bg"
                class="absolute top-0 right-0 w-80 min-h-fit bg-[#fdfcfa]/98 backdrop-blur-2xl shadow-2xl rounded-2xl flex flex-col z-50 origin-top-right">
                
                <!-- Panel Header -->
                <div class="flex items-center justify-between p-6 pb-4 border-b border-base-200/50 bg-white/50">
                  <div data-flip-id="prov-filter-header" class="flex items-center gap-2 flex-1 origin-left">
                    <svg class="w-4 h-4 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <h4 class="font-heading font-extrabold text-xl text-base-content whitespace-nowrap">Filtros</h4>
                  </div>
                  
                  <div id="prov-filter-icons" class="flex items-center gap-1.5 origin-right">
                    <button
                      class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-primary transition-colors border-none"
                      title="Restablecer" @click="resetFilters">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      class="btn btn-xs btn-circle btn-ghost text-base-content/40 hover:text-error transition-colors border-none"
                      @click="animateToggleFilter(false)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div id="prov-filter-content" class="p-6 pb-20 relative z-10 shrink-0">
                  <!-- Category Horizontal Slider -->
                  <fieldset class="mb-6 border-none p-0 m-0">
                    <legend class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">
                      Categorías
                    </legend>
                    <div class="relative group/scroll">
                      <!-- Left Fade & Arrow -->
                      <div v-show="canScrollLeft" 
                        class="absolute left-0 top-0 bottom-2 w-12 bg-linear-to-r from-[#fdfcfa] to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center">
                        <button class="btn btn-xs btn-circle bg-white shadow-md border-none hover:bg-white pointer-events-auto -ml-1 focus:ring-2 focus:ring-primary focus:outline-none"
                          tabindex="0"
                          @keydown.enter.space.prevent="scrollCat('left')"
                          @click.stop="scrollCat('left')"
                          aria-label="Desplazar categorías a la izquierda">
                          <svg class="w-3 h-3 text-[#B58C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      </div>

                      <!-- Right Fade & Arrow -->
                      <div v-show="canScrollRight" 
                        class="absolute right-0 top-0 bottom-2 w-12 bg-linear-to-l from-[#fdfcfa] to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-end">
                        <button class="btn btn-xs btn-circle bg-white shadow-md border-none hover:bg-white pointer-events-auto -mr-1 focus:ring-2 focus:ring-primary focus:outline-none"
                          tabindex="0"
                          @keydown.enter.space.prevent="scrollCat('right')"
                          @click.stop="scrollCat('right')"
                          aria-label="Desplazar categorías a la derecha">
                          <svg class="w-3 h-3 text-[#B58C73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <!-- Scroll Container -->
                      <div ref="scrollContainer" @scroll="handleScroll"
                        class="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar-hide snap-x scroll-smooth">
                        <button class="filter-pill snap-start whitespace-nowrap px-5 focus:ring-2 focus:ring-primary focus:outline-none" 
                          :class="{ active: currentCategory === 'all' }"
                          @click="currentCategory = 'all'"
                          tabindex="0">Todas</button>
                        <button v-for="[value, label] in typeEntries" :key="value" 
                          class="filter-pill snap-start whitespace-nowrap px-5 focus:ring-2 focus:ring-primary focus:outline-none"
                          :class="{ active: currentCategory === value }" 
                          @click="currentCategory = value"
                          tabindex="0">{{ label }}</button>
                      </div>
                    </div>
                  </fieldset>

                  <!-- Price Pills -->
                  <fieldset class="mt-2 border-none p-0 m-0">
                    <legend class="text-[10px] font-extrabold tracking-[0.15em] text-[#B58C73] uppercase mb-4 opacity-80">
                      Precio
                    </legend>
                    <div class="flex gap-2">
                      <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'all' }"
                        @click="currentPrice = 'all'">Todos</button>
                      <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'gratis' }"
                        @click="currentPrice = 'gratis'">Gratis</button>
                      <button class="filter-pill flex-1 text-center" :class="{ active: currentPrice === 'pagado' }"
                        @click="currentPrice = 'pagado'">Pagado</button>
                    </div>
                  </fieldset>
                </div>
              </div>
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

.custom-scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
