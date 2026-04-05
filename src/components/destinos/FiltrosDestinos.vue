<script setup lang="ts">
import { reactive, ref, shallowRef, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { navigate } from 'astro:transitions/client'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

/* ── Props from Astro ────────────────────────────────── */
interface Provincia {
  slug: string
  name: string
}

const props = defineProps<{
  tipos: string[]
  typeLabels: Record<string, string>
  regiones: string[]
  regionColors: Record<string, string>
  provincias: Provincia[]
  initialState: {
    tipo?: string | null
    provincia?: string | null
    region?: string | null
    precio?: string | null
    search?: string
  }
}>()

/* ── Reactive State ──────────────────────────────────── */
const state = reactive<{
  tipo: string | null
  provincia: string | null
  region: string | null
  precio: string | null
  search: string
}>({
  tipo: props.initialState?.tipo ?? null,
  provincia: props.initialState?.provincia ?? null,
  region: props.initialState?.region ?? null,
  precio: props.initialState?.precio ?? null,
  search: props.initialState?.search ?? '',
})

const isMounted = shallowRef(false)

const isOpen = shallowRef(false)
const panelRef = shallowRef<HTMLElement | null>(null)
const triggerRef = shallowRef<HTMLElement | null>(null)

/* ── Computed ─────────────────────────────────────────── */
const activeFilters = computed(() => {
  const filters: { key: string; label: string }[] = []

  if (state.search) {
    filters.push({ key: 'search', label: `"${state.search}"` })
  }
  if (state.tipo) {
    filters.push({ key: 'tipo', label: props.typeLabels[state.tipo] ?? state.tipo })
  }
  if (state.provincia) {
    const prov = props.provincias.find(p => p.slug === state.provincia)
    filters.push({ key: 'provincia', label: prov?.name ?? state.provincia })
  }
  if (state.region) {
    filters.push({ key: 'region', label: state.region })
  }
  if (state.precio) {
    filters.push({ key: 'precio', label: state.precio === 'gratis' ? 'Gratis' : 'Pagado' })
  }

  return filters
})

const hasFilter = computed(() => activeFilters.value.length > 0)

function applyFilters() {
  // Empty function: DOM manipulation is removed.
  // URL routing handles the filter application visually natively through Astro now.
}

function buildAndNavigate() {
  const params = new URLSearchParams(window.location.search)
    
  // Al filtrar, resetear paginación a la página 1
  params.delete('page')
    
  if (state.tipo) params.set('type', state.tipo)
  else params.delete('type')
    
  if (state.provincia) params.set('provinceId', state.provincia)
  else params.delete('provinceId')
    
  if (state.region) params.set('region', state.region)
  else params.delete('region')
    
  if (state.precio) params.set('price', state.precio)
  else params.delete('price')
    
  if (state.search) params.set('search', state.search)
  else params.delete('search')

  const newUrl = `/destinos${params.toString() ? '?' + params.toString() : ''}`
    
  if (window.location.pathname + window.location.search !== newUrl) {
    navigate(newUrl)
  }
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
let isSyncing = false

/* ── Watch state → filter ─────────────────────────────── */
// Cambios de selección (Pills/Selects) aplican inmediatamente
watch(() => [state.tipo, state.provincia, state.region, state.precio], () => {
  if (isSyncing) return
  buildAndNavigate()
})

// Texto de búsqueda tiene un debounce largo específico (800ms) para dejar escribir libremente
watch(() => state.search, () => {
  if (isSyncing) return

  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    buildAndNavigate()
  }, 800)
})

/* ── Button Toggles ───────────────────────────────────── */
function toggleRegion(ev: MouseEvent, region: string) {
  ev.stopPropagation()
  state.region = state.region === region ? null : region
}

function togglePrecio(ev: MouseEvent, precio: string) {
  ev.stopPropagation()
  state.precio = state.precio === precio ? null : precio
}

/* ── Reset ────────────────────────────────────────────── */
function resetAll() {
  state.tipo = null
  state.provincia = null
  state.region = null
  state.precio = null
  state.search = ''
}

/* ── Remove single filter (chip click) ────────────────── */
function removeFilter(key: string) {
  if (key === 'search') {
    state.search = ''
  } else {
    ;(state as any)[key] = null
  }
}

/* ── Panel Open/Close (GSAP FLIP) ─────────────────────── */
async function animateToggle() {
  const panelContent = document.querySelector('.panel-content')
  const panelActions = document.querySelector('.panel-actions')

  if (isOpen.value) {
    // 1. Desvanecer interior antes del FLIP para evitar deformación visual
    if (panelContent || panelActions) {
      gsap.to([panelContent, panelActions], { autoAlpha: 0, duration: 0.1, ease: 'power2.out' })
    }

    // 2. Breve pausa y luego FLIP de vuelta al botón
    await new Promise(resolve => setTimeout(resolve, 50))

    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id]')
    const flipState = Flip.getState(targets)

    isOpen.value = false
    await nextTick()

    const divider = triggerRef.value?.querySelector('.trigger-divider')
    const filterBtn = triggerRef.value?.querySelector('.trigger-filter-btn')
    gsap.set([divider, filterBtn], { autoAlpha: 0 })

    Flip.from(flipState, {
      duration: 0.35,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      nested: true,
      props: 'boxShadow, borderRadius, backgroundColor',
      onComplete: () => {
        gsap.to([divider, filterBtn], { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
      }
    })
  } else {
    // Animación FLIP de apertura del panel
    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id]')
    const flipState = Flip.getState(targets)

    isOpen.value = true
    await nextTick()

    const newContent = document.querySelector('.panel-content')
    const newActions = document.querySelector('.panel-actions')
    const oldHeader = document.querySelector('[data-flip-id="filter-header"]')

    if (newContent || newActions || oldHeader) {
      gsap.set([newContent, newActions, oldHeader], { autoAlpha: 0, y: 10 })
    }

    Flip.from(flipState, {
      duration: 0.5,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      nested: true,
      props: 'boxShadow, borderRadius, backgroundColor',
      onComplete: () => {
        const finalHeader = document.querySelector('[data-flip-id="filter-header"]')
        if (newContent || newActions || finalHeader) {
          gsap.to([newContent, newActions, finalHeader], { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' })
        }
      }
    })
  }
}

function togglePanel() {
  animateToggle()
}

function closePanel() {
  if (isOpen.value) {
    animateToggle()
  }
}



/* ── Active Pill Styles ───────────────────────────────── */
function regionPillStyle(region: string) {
  const borderColor = props.regionColors[region] ?? '#cbd5e1'
  if (state.region === region) {
    return {
      backgroundColor: borderColor,
      borderColor: 'transparent',
      color: '#ffffff',
    }
  }
  return {
    borderColor,
    backgroundColor: '#ffffff',
  }
}

function precioPillClass(precio: string) {
  return state.precio === precio
    ? 'bg-primary/10 border-primary/60 text-primary shadow-inner'
    : 'border-base-300 bg-base-100 hover:border-primary/40'
}

/* ── Click-outside handler ────────────────────────────── */
function handleDocumentClick(ev: MouseEvent) {
  if (!isOpen.value) return
  const target = ev.target as HTMLElement
  const insidePanel = !!target.closest?.('[data-filter-panel]')
  const insideTrigger = !!target.closest?.('[data-filter-trigger]')

  if (insidePanel || insideTrigger) return
  closePanel()
}

// Native DOM blocker — bypasses Vue's event system entirely
let _nativePanelStop: ((e: Event) => void) | null = null

/* ── Keyboard: Escape cierra el panel ────────────────── */
function handleKeydown(ev: KeyboardEvent) {
  if (ev.key === 'Escape' && isOpen.value) closePanel()
}

/* ── Sync URLs ────────────────────────────────────────── */
function syncStateFromURL() {
  isSyncing = true
  const params = new URLSearchParams(window.location.search)
  state.tipo = params.get('type') || null
  state.provincia = params.get('provinceId') || null
  state.region = params.get('region') || null
  state.precio = params.get('price') || null
  state.search = params.get('search') || ''
  nextTick(() => {
    isSyncing = false
  })
}

function handleAstroSwap() {
  // Cuando Astro reemplaza el DOM (incluyendo el contenedor #active-chips), 
  // el Teleport de Vue se "rompe". Lo apagamos y prendemos para que se re-ancle al nuevo DOM.
  isMounted.value = false
  nextTick(() => {
    isMounted.value = true
  })
}

/* ── Lifecycle ────────────────────────────────────────── */
onMounted(() => {
  isMounted.value = true

  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('astro:page-load', syncStateFromURL)
  document.addEventListener('astro:after-swap', handleAstroSwap)

  nextTick(() => {
    // Bloqueador nativo: impide que clics internos suban al document
    if (panelRef.value) {
      _nativePanelStop = (e: Event) => e.stopPropagation()
      panelRef.value.addEventListener('click', _nativePanelStop)
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('astro:page-load', syncStateFromURL)
  document.removeEventListener('astro:after-swap', handleAstroSwap)
  if (panelRef.value && _nativePanelStop) {
    panelRef.value.removeEventListener('click', _nativePanelStop)
  }
  // Limpiar tweens GSAP para evitar memory leaks
  gsap.killTweensOf('.panel-content, .panel-actions, [data-flip-id]')
})
</script>

<template>
  <div class="relative z-50 h-10 shrink-0">




    <!-- Trigger Button & Search -->
    <div v-show="!isOpen" ref="triggerRef" data-flip-id="filter-container" data-filter-trigger
      class="z-[101] flex items-center h-10 px-4 rounded-full bg-base-100 text-base-content shrink-0 origin-top-right border-0 cursor-text shadow-sm ring-1 ring-base-content/5"
      @click.stop
    >

      <!-- Search Icon -->
      <svg class="w-4 h-4 text-base-content/40 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <!-- Search Input -->
      <div data-flip-id="filter-header" class="flex-1 flex items-center">
        <input type="text" v-model="state.search" placeholder="Buscar destino..."
          class="bg-transparent border-none outline-none text-sm w-32 sm:w-48 placeholder:text-base-content/40 text-base-content font-medium p-0" />
      </div>

      <div class="trigger-divider w-px h-4 bg-base-content/10 mx-3 shrink-0"></div>

      <!-- Filter Toggle -->
      <button @click.stop="togglePanel"
        class="trigger-filter-btn flex items-center gap-1.5 text-base-content hover:text-primary transition-colors cursor-pointer group shrink-0"
        :aria-expanded="isOpen"
        aria-label="Filtros — abrir opciones de filtro"
        aria-controls="filter-panel">

        <svg aria-hidden="true" class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span class="hidden sm:inline font-heading font-extrabold text-[14px]">Filtros</span>
      </button>
    </div>

    <!-- Filter Panel -->
    <div v-show="isOpen" ref="panelRef" data-flip-id="filter-container" data-filter-panel
      id="filter-panel" role="dialog" aria-label="Opciones de filtro"
      class="absolute top-0 right-0 w-[calc(100vw-2rem)] sm:w-[500px] z-[101] bg-base-100 shadow-xl rounded-3xl p-6 origin-top-right overflow-y-auto max-h-[90vh] flex flex-col border border-base-content/8"
      @click.stop
    >

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div data-flip-id="filter-header"
          class="flex items-center gap-2 origin-left flex-1 min-w-0 mr-4 border-b border-base-200/50 pb-1">
          <svg aria-hidden="true" class="w-5 h-5 text-base-content/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" v-model="state.search" placeholder="Buscar destino..."
            class="bg-transparent border-none outline-none text-lg w-full placeholder:text-base-content/30 font-heading font-extrabold text-base-content p-0 mb-0.5" />
        </div>

        <div class="flex items-center gap-2 panel-actions">
          <button v-if="hasFilter" class="btn btn-sm btn-circle btn-ghost text-base-content/60" aria-label="Limpiar todos los filtros"
            @click.stop="resetAll">
            <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button class="btn btn-sm btn-circle btn-ghost text-base-content/60" aria-label="Cerrar panel de filtros" @click="closePanel">
            <svg aria-hidden="true" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 panel-content">
        <!-- Left Column: Selects -->
        <div class="space-y-5">
          <!-- Categoría -->
          <div>
            <label class="text-sm text-base-content/60 font-medium block mb-2 px-1">
              Categoría del destino
            </label>
            <select v-model="state.tipo"
              class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none">
              <option :value="null">Todos</option>
              <option v-for="tipo in props.tipos" :key="tipo" :value="tipo">
                {{ props.typeLabels[tipo] }}
              </option>
            </select>
          </div>

          <!-- Provincia -->
          <div>
            <label class="text-sm text-base-content/60 font-medium block mb-2 px-1">
              Provincia
            </label>
            <select v-model="state.provincia"
              class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none">
              <option :value="null">Todas</option>
              <option v-for="prov in props.provincias" :key="prov.slug" :value="prov.slug">
                {{ prov.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Right Column: Pill Buttons -->
        <div class="space-y-5">
          <!-- Región -->
          <fieldset class="bg-base-200/50 rounded-2xl p-4 border border-base-content/8 m-0" @click.stop>
            <legend class="text-xs font-extrabold tracking-widest text-base-content/50 uppercase mb-4 w-full">
              Región
            </legend>
            <div class="flex flex-wrap gap-2.5">
              <button v-for="region in props.regiones" :key="region" :style="regionPillStyle(region)" :class="[
                'px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all',
                state.region === region
                  ? 'shadow-md scale-105'
                  : 'text-base-content/80',
              ]" :aria-pressed="state.region === region" @click="toggleRegion($event, region)">
                {{ region }}
              </button>
            </div>
          </fieldset>

          <!-- Precio -->
          <fieldset class="bg-base-200/50 rounded-2xl p-4 border border-base-content/8 m-0" @click.stop>
            <legend class="text-xs font-extrabold tracking-widest text-base-content/50 uppercase mb-4 w-full">
              Precio
            </legend>
            <div class="flex gap-3">
              <button :class="[
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-base-content border transition-all',
                precioPillClass('gratis'),
              ]" :aria-pressed="state.precio === 'gratis'" @click="togglePrecio($event, 'gratis')">
                Gratis
              </button>
              <button :class="[
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-base-content border transition-all',
                precioPillClass('pagado'),
              ]" :aria-pressed="state.precio === 'pagado'" @click="togglePrecio($event, 'pagado')">
                Pagado
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>

  <!-- Active Chips (rendered outside the panel, inside the chips area) -->
  <Teleport to="#active-chips" v-if="isMounted">
    <button v-for="chip in activeFilters" :key="chip.key"
      class="chip badge badge-primary h-7 px-3 text-xs text-primary-content font-bold uppercase tracking-wider gap-1.5 shrink-0 border-none hover:bg-error hover:text-white transition-colors cursor-pointer group"
      :aria-label="`Quitar filtro: ${chip.label}`"
      @click="removeFilter(chip.key)">
      {{ chip.label }}
      <span aria-hidden="true" class="text-[14px] leading-none mb-px">×</span>
    </button>

    <!-- Reset button (outside panel) -->
    <button v-if="hasFilter" id="reset-filters" class="btn btn-xs btn-ghost text-error font-semibold rounded-full"
      @click="resetAll">
      Limpiar todo
    </button>
  </Teleport>
</template>

<style scoped>
/* Accesibilidad: sin animaciones para usuarios con reduced-motion */
@media (prefers-reduced-motion: reduce) {
  [data-flip-id],
  .panel-content,
  .panel-actions {
    transition: none !important;
    animation: none !important;
  }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  cursor: pointer;
}

/* Suppress DaisyUI btn border that flashes during GSAP FLIP morphing */
[data-flip-id="filter-container"] {
  border: none !important;
  outline: none !important;
}
</style>