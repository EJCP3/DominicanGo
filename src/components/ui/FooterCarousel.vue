<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    destinations: any[]
}>();

// Get unique images from destinations
const baseImages = computed(() => {
    const images: any[] = [];
    props.destinations.forEach(dest => {
        if (dest.image) images.push({ url: dest.image, name: dest.name });
        if (dest.images && Array.isArray(dest.images)) {
            dest.images.forEach((img: any) => {
                const url = typeof img === 'string' ? img : img.url;
                if (url) images.push({ url, name: dest.name });
            });
        }
    });
    // Remove duplicates if same URL is used
    return images.filter((v, i, a) => a.findIndex(t => t.url === v.url) === i);
});

// To ensure a seamless loop, we repeat the list enough times to cover any screen width
// and then double it for the marquee effect.
const displayedImages = computed(() => {
    const list = baseImages.value;
    if (list.length === 0) return [];
    
    let repeated = [...list];
    // Ensure we have at least 15 items to fill screen width
    while (repeated.length < 15) {
        repeated = [...repeated, ...list];
    }
    // Double it for a perfect loop (0 to -50%)
    return [...repeated, ...repeated];
});

const openLightbox = (index: number) => {
    const urls = baseImages.value.map(img => img.url);
    const item = baseImages.value[index % baseImages.value.length];
    window.dispatchEvent(new CustomEvent('open-lightbox', {
        detail: { 
            images: urls, 
            currentIndex: index % baseImages.value.length, 
            alt: item.name 
        }
    }));
};

const isPaused = ref(false);
</script>

<template>
    <div 
        class="w-full overflow-hidden bg-black py-1 border-y border-white/10 relative group h-70 flex items-center"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
    >
        <!-- The Track -->
        <div 
            class="flex gap-2 min-w-max animate-marquee"
            :class="{ 'pause-animation': isPaused }"
        >
            <div 
                v-for="(img, index) in displayedImages" 
                :key="index"
                class="relative h-60 aspect-square overflow-hidden cursor-pointer group/item rounded-lg border border-white/10 shrink-0 shadow-lg"
                @click="openLightbox(index)"
            >
                <img 
                    :src="img.url" 
                    :alt="img.name" 
                    class="w-full h-full object-cover grayscale-30 group-hover/item:grayscale-0 transition-all duration-700 scale-105 group-hover/item:scale-110"
                    loading="lazy"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center p-2 backdrop-blur-[1px]">
                    <span class="text-[10px] font-bold text-white uppercase tracking-widest text-center leading-tight drop-shadow-md">
                        {{ img.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-marquee {
    animation: marquee 80s linear infinite;
}

.pause-animation {
    animation-play-state: paused;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        /* Since we doubled the repeated list, -50% is the exact point of loop */
        transform: translateX(-50%);
    }
}
</style>


