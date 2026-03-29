<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface Props {
  categories: string[]
  categoryColors: Record<string, string>
  currentCategory: string
}

const props = defineProps<Props>()

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const isMounted = ref(false)
const isAnimating = ref(false)

const state = reactive({
  selectedCategory: props.currentCategory || 'todas',
})

const hasFilter = computed(() => state.selectedCategory !== 'todas')

/* ── Panel Open/Close (GSAP FLIP) ─────────────────── */
async function animateToggle() {
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  const panelContent = document.querySelector('.panel-content')
  const panelActions = document.querySelector('.panel-actions')

  if (isOpen.value) {
    // SECUENCIA DE CIERRE RÁPIDA:
    // 1. Desvanece el interior primero para que NO se deforme
    if (panelContent || panelActions) {
      gsap.to([panelContent, panelActions], { opacity: 0, duration: 0.1, ease: 'power2.out' })
    }

    // 2. Espera muy poco y luego FLIP a botón
    await new Promise(resolve => setTimeout(resolve, 50))

    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id]')
    const flipState = Flip.getState(targets)

    isOpen.value = false
    await nextTick()

    // Cuando vuelve al botón, el header_interior debe volver a ser opaco si queremos que FLIP lo anime.
    // Pero en este caso GSAP automáticamente hace crossfade.
    Flip.from(flipState, {
      duration: 0.35,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      nested: true,
      props: 'boxShadow, borderRadius, backgroundColor',
      onComplete: () => {
        isAnimating.value = false;
      }
    })
  } else {
    // SECUENCIA DE APERTURA:
    const targets = gsap.utils.toArray<HTMLElement>('[data-flip-id]')
    const flipState = Flip.getState(targets)

    isOpen.value = true
    await nextTick()

    const newContent = document.querySelector('.panel-content')
    const newActions = document.querySelector('.panel-actions')

    // Ocultarlos antes del Flip
    const oldHeader = document.querySelector('[data-flip-id="filter-header"]')
    if (newContent || newActions || oldHeader) {
      gsap.set([newContent, newActions, oldHeader], { opacity: 0, y: 10 })
    }

    Flip.from(flipState, {
      duration: 0.5,
      ease: 'power3.inOut',
      scale: true,
      absolute: true,
      nested: true,
      props: 'boxShadow, borderRadius, backgroundColor',
      onComplete: () => {
        // Al terminar de abrirse, aparecen suavemente hacia arriba
        const finalHeader = document.querySelector('[data-flip-id="filter-header"]')
        if (newContent || newActions || finalHeader) {
          gsap.to([newContent, newActions, finalHeader], { 
            opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out',
            onComplete: () => {
              isAnimating.value = false;
            }
          })
        } else {
          isAnimating.value = false;
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

function resetFilters() {
  state.selectedCategory = 'todas'
  closePanel()
}

/* ── Click Outside Handler ────────────────────────── */
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (!panelRef.value || !triggerRef.value) return
  const isInsidePanel = panelRef.value.contains(target)
  const isClickOnBtn = triggerRef.value.contains(target)
  if (!isInsidePanel && !isClickOnBtn && isOpen.value) {
    closePanel()
  }
}

/* ── Lifecycle ────────────────────────────────────── */
onMounted(() => {
  isMounted.value = true
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative z-50 h-10 shrink-0">
    <!-- Trigger Button -->
    <button v-show="!isOpen" ref="triggerRef" data-flip-id="filter-container"  @click.stop="togglePanel"
      class="p-0 flex items-center h-10 px-4 rounded-full bg-[#FCFBF9] text-base-content shrink-0 origin-top-left border-0 cursor-pointer shadow-sm ring-1 ring-base-content/5 hover:shadow-md transition-shadow"
      aria-label="Abrir filtros de blog"
    >

      <!-- Filter Icon -->
     

      <!-- Label -->
      <div data-flip-id="filter-header" class="flex-1 flex items-center trigger-filter-btn ">
         <svg class="w-4 h-4 text-base-content/60 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
        <span class="text-sm font-heading font-extrabold text-base-content whitespace-nowrap">Filtros</span>
      </div>


    </button>

    <!-- Filter Panel -->
    <div v-show="isOpen" ref="panelRef" data-flip-id="filter-container"
      class="absolute top-0 left-0 w-[calc(100vw-2rem)] sm:w-[550px] z-50 bg-[#FCFBF9] rounded-3xl p-6 origin-top-left overflow-hidden flex flex-col shadow-2xl">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div data-flip-id="filter-header" class="flex items-center gap-2 origin-left flex-1 min-w-0 mr-4">
               <svg class="w-4 h-4 text-base-content/60 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
          <h3 class="text-xl font-extrabold text-base-content">Filtros</h3>
        </div>

        <div class="flex items-center gap-1 panel-actions">
          <a v-if="hasFilter" href="/blog"
            class="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center shrink-0"
            title="Limpiar filtros">
            <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </a>
          <button class="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 transition-colors"
            @click="closePanel">
            <svg class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="panel-content space-y-4">
        <!-- Categories Cards -->
        <fieldset class="bg-transparent rounded-2xl p-4 md:p-5 border border-[#F2E8DC] m-0">
          <legend class="text-[11px] font-extrabold tracking-widest text-[#BA9A84] uppercase mb-4 w-full">
            Categorías
          </legend>
          <div class="flex flex-wrap gap-2.5">
            <a
              href="/blog"
              :class="[
                'inline-block text-center px-4 py-1.5 rounded-full text-[13px] font-bold border-[1.5px] transition-all',
                state.selectedCategory === 'todas'
                  ? 'border-[#3b82f6] bg-[#EFF6FF] text-[#1e40af] shadow-sm scale-105'
                  : 'border-[#DEE3EC] bg-white text-[#664634] hover:bg-base-200'
              ]"
              @click.prevent="state.selectedCategory = 'todas'; closePanel()">
              Todas las historias
            </a>

            <a
              v-for="cat in categories"
              :key="cat"
              :href="`/blog?category=${encodeURIComponent(cat)}`"
              :class="[
                'inline-block text-center px-4 py-1.5 rounded-full text-[13px] font-bold border-[1.5px] transition-all',
                state.selectedCategory === cat
                  ? 'shadow-sm scale-105'
                  : 'border-[#DEE3EC] bg-white text-[#664634] hover:bg-base-200'
              ]"
              :style="{
                '--active-border': categoryColors[cat] ?? '#cbd5e1',
                ...(state.selectedCategory === cat ? {
                  borderColor: categoryColors[cat] ?? '#cbd5e1',
                  backgroundColor: (categoryColors[cat] ?? '#cbd5e1') + '20',
                  color: categoryColors[cat] ?? '#664634',
                  boxShadow: `0 2px 8px -2px ${categoryColors[cat] ?? '#cbd5e1'}80`
                } : {})
              }"
              @click.prevent="state.selectedCategory = cat; closePanel()">
              {{ cat }}
            </a>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Suppress borders during GSAP FLIP morphing */
[data-flip-id="filter-container"] {
  border: none !important;
  outline: none !important;
}
</style>