<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

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
}>()

/* ── Reactive State ──────────────────────────────────── */
const state = reactive<{
  tipo: string | null
  provincia: string | null
  region: string | null
  precio: string | null
  search: string
}>({
  tipo: null,
  provincia: null,
  region: null,
  precio: null,
  search: '',
})

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

let cards: HTMLElement[] = []

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

/* ── Filter Logic ─────────────────────────────────────── */
function applyFilters() {
  const q = (state.search ?? '').toLowerCase()
  let visible = 0

  cards.forEach((card) => {
    const dName = (card.dataset.name ?? '').toLowerCase()
    const dDesc = (card.dataset.description ?? '').toLowerCase()
    const dTags = (card.dataset.tags ?? '').toLowerCase()

    const ok =
      (!q || dName.includes(q) || dDesc.includes(q) || dTags.includes(q)) &&
      (!state.tipo || card.dataset.tipo === state.tipo) &&
      (!state.provincia || card.dataset.provincia === state.provincia) &&
      (!state.region || card.dataset.region === state.region) &&
      (!state.precio || card.dataset.precio === state.precio)

    card.style.display = ok ? '' : 'none'
    if (ok) visible++
  })

  const resultCount = document.getElementById('result-count')
  const emptyState = document.getElementById('empty-state')
  const grid = document.getElementById('destinos-grid')
  const resetEmpty = document.getElementById('reset-empty')

  if (resultCount) resultCount.textContent = `${visible} destino${visible !== 1 ? 's' : ''}`

  const showEmpty = hasFilter.value && visible === 0
  if (emptyState) emptyState.classList.toggle('hidden', !showEmpty)
  if (grid) grid.classList.toggle('hidden', showEmpty)

  // Wire the "reset empty" button
  if (resetEmpty) {
    resetEmpty.onclick = resetAll
  }
}

/* ── Watch state → filter ─────────────────────────────── */
watch(state, () => {
  applyFilters()
}, { deep: true })

/* ── Button Toggles ───────────────────────────────────── */
function toggleRegion(region: string) {
  state.region = state.region === region ? null : region
}

function togglePrecio(precio: string) {
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

/* ── Panel Open/Close ─────────────────────────────────── */
function togglePanel() {
  isOpen.value = !isOpen.value
}

function closePanel() {
  isOpen.value = false
}

/* ── Click Outside Handler ────────────────────────────── */
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (!panelRef.value || !triggerRef.value) return
  const isInsidePanel = panelRef.value.contains(target)
  const isClickOnBtn = triggerRef.value.contains(target)
  if (!isInsidePanel && !isClickOnBtn && isOpen.value) {
    closePanel()
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
    ? 'bg-[#FFF1E0] border-[#D5A77B] text-[#5A3824] shadow-inner'
    : 'border-[#E8D4BE] bg-white hover:border-[#D5A77B]'
}

/* ── Lifecycle ────────────────────────────────────────── */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  nextTick(() => {
    cards = Array.from(document.querySelectorAll<HTMLElement>('.destino-card'))
    const resultCount = document.getElementById('result-count')
    if (resultCount) resultCount.textContent = `${cards.length} destinos`
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative z-50">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      class="btn btn-sm h-10 px-5 rounded-full bg-base-100 hover:bg-base-200 text-base-content border-base-300 shadow-sm flex items-center gap-2 shrink-0"
      @click="togglePanel"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      Filtros
    </button>

    <!-- Filter Panel -->
    <div
      ref="panelRef"
      :class="[
        'absolute top-14 right-0 w-[calc(100vw-2rem)] sm:w-[500px] z-50',
        'bg-[#fdfcfa] border border-[#f0e6d2] shadow-2xl rounded-3xl p-6',
        'transition-all duration-300 ease-out origin-top-right',
        isOpen
          ? 'visible opacity-100 scale-100 pointer-events-auto'
          : 'invisible opacity-0 scale-95 pointer-events-none',
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-heading font-extrabold text-xl text-base-content">Filtros</h3>
        <div class="flex items-center gap-2">
          <button
            v-if="hasFilter"
            class="btn btn-sm btn-circle btn-ghost text-base-content/60"
            title="Limpiar filtros"
            @click="resetAll"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            class="btn btn-sm btn-circle btn-ghost text-base-content/60"
            @click="closePanel"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column: Selects -->
        <div class="space-y-5">
          <!-- Categoría -->
          <div>
            <label class="text-sm text-base-content/60 font-medium block mb-2 px-1">
              Categoría del destino
            </label>
            <select
              v-model="state.tipo"
              class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
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
            <select
              v-model="state.provincia"
              class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
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
          <div class="bg-[#FFFDF9] rounded-2xl p-4 border border-[#F2E8DA]">
            <h4 class="text-xs font-extrabold tracking-widest text-[#B58C73] uppercase mb-4">
              Región
            </h4>
            <div class="flex flex-wrap gap-2.5">
              <button
                v-for="region in props.regiones"
                :key="region"
                :style="regionPillStyle(region)"
                :class="[
                  'px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all',
                  state.region === region
                    ? 'shadow-md scale-105'
                    : 'text-[#7A4B3A]',
                ]"
                @click="toggleRegion(region)"
              >
                {{ region }}
              </button>
            </div>
          </div>

          <!-- Precio -->
          <div class="bg-[#FFFDF9] rounded-2xl p-4 border border-[#F2E8DA]">
            <h4 class="text-xs font-extrabold tracking-widest text-[#B58C73] uppercase mb-4">
              Precio
            </h4>
            <div class="flex gap-3">
              <button
                :class="[
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-[#7A4B3A] border transition-all',
                  precioPillClass('gratis'),
                ]"
                @click="togglePrecio('gratis')"
              >
                ✓ Gratis
              </button>
              <button
                :class="[
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-[#7A4B3A] border transition-all',
                  precioPillClass('pagado'),
                ]"
                @click="togglePrecio('pagado')"
              >
                💳 Pagado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Active Chips (rendered outside the panel, inside the chips area) -->
  <Teleport to="#active-chips">
    <button
      v-for="chip in activeFilters"
      :key="chip.key"
      class="chip badge badge-neutral h-7 px-3 text-xs text-primary font-semibold uppercase tracking-wider gap-1.5 shrink-0 border-none bg-base-300 hover:bg-error hover:text-white transition-colors cursor-pointer group"
      @click="removeFilter(chip.key)"
    >
      {{ chip.label }}
      <span class="text-[14px] leading-none mb-px">×</span>
    </button>

    <!-- Reset button (outside panel) -->
    <button
      v-if="hasFilter"
      id="reset-filters"
      class="btn btn-xs btn-ghost text-error font-semibold rounded-full"
      @click="resetAll"
    >
      Limpiar todo
    </button>
  </Teleport>
</template>

<style scoped>
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
</style>
