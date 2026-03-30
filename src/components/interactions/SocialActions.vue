<template>
  <div class="group/card bg-white rounded-3xl p-5 transition-all duration-700 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:gap-6 relative overflow-visible">
    
    <!-- Content Section (Left on mobile row, top on PC column) -->
    <div class="text-left md:text-center space-y-1">
      <h3 class="font-heading font-black text-lg md:text-2xl text-base-content tracking-tighter leading-none group-hover/card:text-primary transition-colors duration-500">
        {{ title || "¿Te gustó?" }}
      </h3>
      <p class="text-base-content/40 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">
        {{ subtitle || "Comparte tu experiencia" }}
      </p>
    </div>

    <!-- Actions Bar (DaisyUI Join Group: Row on both, but centered on PC) -->
    <div class="join bg-neutral/3  p-1">
      
      <!-- Reactions -->
      <button 
        class="btn btn-ghost join-item h-10 md:h-11 px-3 md:px-5 gap-2 transition-all duration-300 active:scale-95 group/btn border-none" 
        :class="[
          userReaction === 'LIKE' 
            ? 'bg-primary text-white z-10' 
            : 'text-base-content/40 hover:text-primary hover:bg-primary/10'
        ]"
        @click="toggleReaction('LIKE')"
        :disabled="loading"
      >
        <svg class="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :class="{ 'fill-current': userReaction === 'LIKE' }">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 10v12 M2 10v12 M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span class="font-black text-[10px] md:text-xs tracking-tight">{{ counts.LIKE }}</span>
      </button>

      <button 
        class="btn btn-ghost join-item h-10 md:h-11 px-3 md:px-5 gap-2 transition-all duration-300 active:scale-95 group/btn border-none" 
        :class="[
          userReaction === 'DISLIKE' 
            ? 'bg-error text-white z-10' 
            : 'text-base-content/40 hover:text-error hover:bg-error/10'
        ]"
        @click="toggleReaction('DISLIKE')"
        :disabled="loading"
      >
        <svg class="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :class="{ 'fill-current': userReaction === 'DISLIKE' }">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 14V2 M22 14V2 M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
        <span class="font-black text-[10px] md:text-xs tracking-tight">{{ counts.DISLIKE }}</span>
      </button>

      <!-- Favorite & Share -->
      <button
        v-if="token"
        class="btn btn-ghost join-item h-10 md:h-11 w-10 md:w-14 flex items-center justify-center transition-all duration-500 active:scale-90 relative group/fav border-none"
        :class="isFavorited 
          ? 'bg-secondary text-white z-10' 
          : 'text-base-content hover:text-secondary hover:bg-secondary/10'"
        @click="toggleFavorite"
        :disabled="favLoading"
      >
        <span v-if="favLoading" class="loading loading-spinner loading-xs"></span>
        <svg v-else class="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover/fav:scale-125" :class="{ 'fill-current': isFavorited }" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      <button
        class="btn btn-ghost join-item h-10 md:h-11 w-10 md:w-14 flex items-center justify-center text-base-content/40 hover:text-primary hover:bg-primary/5 active:scale-90 transition-all duration-500 group/share border-none"
        @click="share"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5 transition-all duration-500 group-hover/share:rotate-12 group-hover/share:scale-110" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  targetType: 'DESTINATION' | 'BLOG';
  targetId: string;
  token?: string;
  loginUrl?: string;
  title?: string;
  subtitle?: string;
  shareUrl?: string;
  shareTitle?: string;
  initialFavorited?: boolean;
}>();

// Reactions State
const counts = ref({ LIKE: 0, DISLIKE: 0 });
const userReaction = ref<string | null>(null);
const loading = ref(true);

// Favorite State
const isFavorited = ref(props.initialFavorited || false);
const favLoading = ref(false);

const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

// Fetch Reactions on mount
const fetchReactions = async () => {
  try {
    const headers: Record<string, string> = {};
    if (props.token) headers['Authorization'] = `Bearer ${props.token}`;
    
    const res = await fetch(`${apiBase}/interactions/${props.targetType}/${props.targetId}`, { headers });
    if (res.ok) {
      const { data } = await res.json();
      counts.value = data.counts || { LIKE: 0, DISLIKE: 0 };
      userReaction.value = data.userReaction;
    }
  } catch (e) {
    console.error('Error fetching reactions:', e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReactions();
});

// Toggle Reaction Logic
const toggleReaction = async (type: 'LIKE' | 'DISLIKE') => {
  if (!props.token) {
    window.location.href = props.loginUrl || '/api/auth/google';
    return;
  }
  
  const previousReaction = userReaction.value;
  
  // Optimistic UI update
  if (previousReaction === type) {
    counts.value[type]--;
    userReaction.value = null;
  } else {
    if (previousReaction) {
      counts.value[previousReaction as 'LIKE' | 'DISLIKE']--;
    }
    counts.value[type]++;
    userReaction.value = type;
  }

  try {
    const res = await fetch(`${apiBase}/interactions/react`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        targetType: props.targetType,
        destinationId: props.targetType === 'DESTINATION' ? props.targetId : undefined,
        blogId: props.targetType === 'BLOG' ? props.targetId : undefined,
        type
      })
    });

    if (res.status === 401) {
      window.location.href = props.loginUrl || '/api/auth/google';
    }
    if (!res.ok) throw new Error('Reaction failed');
  } catch (e) {
    console.error('Error toggling reaction:', e);
    // Revert optimistic update
    if (previousReaction === type) {
      counts.value[type]++;
    } else {
      if (previousReaction) counts.value[previousReaction as 'LIKE' | 'DISLIKE']++;
      counts.value[type]--;
    }
    userReaction.value = previousReaction;
  }
};

// Favorite Logic
const toggleFavorite = async (e: MouseEvent) => {
  e.preventDefault();
  if (!props.token) {
    window.location.href = props.loginUrl || '/api/auth/google';
    return;
  }

  const prevFav = isFavorited.value;
  isFavorited.value = !isFavorited.value;
  favLoading.value = true;

  try {
    const body: Record<string, string> = {
      type: props.targetType,
    };
    if (props.targetType === 'DESTINATION') body.destinationId = props.targetId;
    else body.blogId = props.targetId;

    const res = await fetch(`${apiBase}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) window.location.href = props.loginUrl || '/api/auth/google';
    if (!res.ok) throw new Error('Favorite failed');
  } catch (err) {
    isFavorited.value = prevFav;
    console.error('Error toggling favorite:', err);
  } finally {
    favLoading.value = false;
  }
};

// Share Logic
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: props.shareTitle || document.title,
      url: props.shareUrl || window.location.href,
    }).catch(() => {});
  } else {
    const url = props.shareUrl || window.location.href;
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("¡URL copiada al portapapeles!");
  }
};
</script>
