<template>
  <div class="flex items-center gap-4 py-4">
    <button 
      class="btn btn-sm rounded-full gap-2 transition-all active:scale-90 hover:scale-105" 
      :class="[
        userReaction === 'LIKE' 
          ? 'btn-primary text-primary-content shadow-lg shadow-primary/30 scale-110 animate-pop' 
          : 'btn-outline border-base-content/20 text-base-content hover:btn-primary hover:text-primary-content',
        { 'opacity-50 pointer-events-none': loading }
      ]"
      @click="toggle('LIKE')"
      aria-label="Me Gusta"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-current': userReaction === 'LIKE' }">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
      <span class="font-bold text-base">{{ counts.LIKE }}</span>
    </button>
    
    <button 
      class="btn btn-sm rounded-full gap-2 transition-all active:scale-90 hover:scale-105" 
      :class="[
        userReaction === 'DISLIKE' 
          ? 'btn-error text-error-content shadow-lg shadow-error/30 scale-110 animate-pop' 
          : 'btn-outline border-base-content/20 text-base-content hover:btn-error hover:text-error-content',
        { 'opacity-50 pointer-events-none': loading }
      ]"
      @click="toggle('DISLIKE')"
      aria-label="No me Gusta"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-current': userReaction === 'DISLIKE' }">
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
      </svg>
      <span class="font-bold text-base">{{ counts.DISLIKE }}</span>
    </button>
  </div>
</template>

<style scoped>
.animate-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1.1); }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  targetType: 'DESTINATION' | 'BLOG';
  targetId: string;
  token?: string;
}>();

const counts = ref({ LIKE: 0, DISLIKE: 0 });
const userReaction = ref<string | null>(null);
const loading = ref(true);
const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

const fetchReactions = async () => {
  try {
    const headers: Record<string, string> = {};
    if (props.token) headers['Authorization'] = `Bearer ${props.token}`;
    
    const res = await fetch(`${apiBase}/interactions/${props.targetType}/${props.targetId}`, { headers });
    if (res.ok) {
      const { data } = await res.json();
      counts.value = data.counts;
      userReaction.value = data.userReaction;
    }
  } catch (e) {
    console.error('Error fetching reactions:', e);
  } finally {
    loading.value = false;
  }
};

const toggle = async (type: 'LIKE' | 'DISLIKE') => {
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
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (props.token) headers['Authorization'] = `Bearer ${props.token}`;

    const res = await fetch(`${apiBase}/interactions/react`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        targetType: props.targetType,
        destinationId: props.targetType === 'DESTINATION' ? props.targetId : undefined,
        blogId: props.targetType === 'BLOG' ? props.targetId : undefined,
        type
      })
    });

    if (res.status === 401) {
      // Revert optimistic update
      if (previousReaction === type) {
        counts.value[type]++;
      } else {
        if (previousReaction) counts.value[previousReaction as 'LIKE' | 'DISLIKE']++;
        counts.value[type]--;
      }
      userReaction.value = previousReaction;
      
      // Redirect to login via URL parameter
      window.location.href = '/?error=auth_required';
    }
  } catch (e) {
    console.error('Error toggling reaction:', e);
  }
};

onMounted(() => {
  fetchReactions();
});
</script>
