<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{
    mapLink: string
    website: string | null
    canManage: boolean
    canEdit: boolean
    poiId: string | null
}>()

const isOpen = ref(false)
const isAnimating = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)

function toggleMenu() {
    if (isAnimating.value) return

    if (!isOpen.value) {
        isOpen.value = true
        isAnimating.value = true
        nextTick(() => {
            if (menuRef.value) {
                gsap.fromTo(menuRef.value, 
                    { scale: 0.9, opacity: 0, y: -10, transformOrigin: 'top right' },
                    { 
                        scale: 1, opacity: 1, y: 0, 
                        duration: 0.4, 
                        ease: 'back.out(1.5)',
                        onComplete: () => { isAnimating.value = false }
                    }
                )
            } else {
                isAnimating.value = false
            }
        })
    } else {
        isAnimating.value = true
        if (menuRef.value) {
            gsap.to(menuRef.value, {
                opacity: 0,
                scale: 0.9,
                y: -10,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    isOpen.value = false
                    isAnimating.value = false
                    // reset inline styles so vue conditional block cleans up properly
                    gsap.set(menuRef.value, { clearProps: "all" })
                }
            })
        }
    }
}

function closeMenuOnClickOutside(e: MouseEvent) {
    if (isOpen.value && !isAnimating.value && menuRef.value && triggerRef.value) {
        if (!menuRef.value.contains(e.target as Node) && !triggerRef.value.contains(e.target as Node)) {
            toggleMenu()
        }
    }
}

onMounted(() => {
    document.addEventListener('click', closeMenuOnClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenuOnClickOutside)
})

function handleDelete() {
    toggleMenu() // Close menu
    // Wait a brief moment for the menu animation to finish before dispatching
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('open-delete-modal'))
    }, 100)
}
</script>

<template>
  <div class="absolute right-0 top-0">
    <button ref="triggerRef" @click="toggleMenu" class="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
    </button>
    <div v-show="isOpen" ref="menuRef" class="z-50 absolute right-0 top-10 mt-2 w-56 p-2 rounded-2xl bg-base-100 shadow-sm shadow-black/10 border border-base-200" style="display: none;">
        <ul class="menu p-0 w-full relative">
            <li class="menu-title px-3 py-1.5 min-h-0">
                <span class="text-[10px] font-bold uppercase tracking-widest text-base-content/50">Explorar más</span>
            </li>
            <li>
                <a :href="mapLink" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50">
                    <div class="w-6 h-6 rounded-md bg-error/10 flex items-center justify-center text-error">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.414a2 2 0 012.553-1.907L10 5l5-2 5.447 2.724A2 2 0 0121 7.515v10.071a2 2 0 01-2.553 1.907L13 17l-4 3z"></path></svg>
                    </div>
                    <span class="text-sm font-semibold text-base-content">Ver en Google Maps</span>
                </a>
            </li>
            <li v-if="website">
                <a :href="website" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50">
                    <div class="w-6 h-6 rounded-md bg-info/10 flex items-center justify-center text-info">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path></svg>
                    </div>
                    <span class="text-sm font-semibold text-base-content">Sitio Web Oficial</span>
                </a>
            </li>
            
            <template v-if="canManage && poiId">
                <div class="divider my-1 before:bg-base-200 after:bg-base-200 h-px"></div>
                <li class="menu-title px-3 py-1.5 min-h-0">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-base-content/50">Gestión del autor</span>
                </li>
                <li v-if="canEdit">
                    <a :href="`/destinos/editar/${poiId}`" class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50">
                        <div class="w-6 h-6 rounded-md bg-base-200 flex items-center justify-center text-base-content/70">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </div>
                        <span class="text-sm font-semibold text-base-content">Editar destino</span>
                    </a>
                </li>
                <li>
                    <button type="button" @click="handleDelete" class="flex items-center gap-2.5 py-2 px-3 hover:bg-error/10 text-error rounded-xl w-full text-left">
                        <div class="w-6 h-6 rounded-md bg-error/10 flex items-center justify-center text-error">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </div>
                        <span class="text-sm font-semibold">Eliminar destino</span>
                    </button>
                </li>
            </template>
        </ul>
    </div>
  </div>
</template>
