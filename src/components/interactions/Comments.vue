<template>
  <div class="mt-12 bg-base-100 rounded-3xl p-6 md:p-8 shadow-sm border border-base-content/10">
    <h3 class="font-heading text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      Comentarios ({{ comments.length }})
    </h3>

    <!-- Comment Form -->
    <form @submit.prevent="submitComment" class="mb-12 relative z-10">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="avatar shrink-0 hidden sm:flex">
          <div class="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center overflow-hidden border border-base-200 shadow-inner">
            <template v-if="currentUser">
              <img v-if="currentUser.foto" :src="currentUser.foto" :alt="currentUser.name" />
              <span v-else class="text-lg font-bold">{{ currentUser.name.charAt(0).toUpperCase() }}</span>
            </template>
            <span v-else class="text-lg font-bold">U</span>
          </div>
        </div>
        <div class="flex-1 filter drop-shadow-sm">
          <textarea 
            v-on="!props.token ? { focus: () => window.location.href = props.loginUrl || '/api/auth/google' } : {}"
            v-model="newComment"
            class="textarea textarea-bordered w-full resize-none h-24 focus:border-primary transition-colors bg-base-100/80 backdrop-blur-sm placeholder:text-base-content/40 text-base" 
            placeholder="Escribe tu opinión o experiencia..."
            :disabled="submitting"
            required
            aria-label="Texto de comentario"
          ></textarea>
          <div class="flex justify-end mt-3">
            <button 
              type="submit" 
              class="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform"
              :disabled="submitting || (!props.token ? false : !newComment.trim())"
            >
              <span v-if="submitting" class="loading loading-spinner"></span>
              Comentar
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Comments List -->
    <div v-if="loading" class="flex justify-center py-12">
      <span class="loading loading-spinner text-primary loading-lg"></span>
    </div>

    <div v-else-if="comments.length === 0" class="text-center py-10 text-base-content/60 italic bg-base-200/40 rounded-3xl border border-dashed border-base-300">
      Aún no hay opiniones. ¡Sé el primero en compartir la tuya!
    </div>

    <div v-else class="space-y-6">
      <div v-for="c in comments" :key="c.id" class="flex gap-4 group">
        <div class="avatar shrink-0">
          <div class="w-12 h-12 rounded-full bg-neutral text-neutral-content flex items-center justify-center overflow-hidden border border-base-200 shadow-sm mt-1">
            <img v-if="c.user.foto" :src="c.user.foto" :alt="c.user.name" />
            <span v-else class="text-lg font-bold">{{ c.user.name.charAt(0).toUpperCase() }}</span>
          </div>
        </div>
        <div class="flex-1 bg-base-200/50 hover:bg-base-200 transition-colors rounded-2xl rounded-tl-[4px] p-5 w-full relative">
          <!-- Quote Icon Deco -->
          <svg class="absolute top-4 right-4 text-base-content/5 w-8 h-8 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          
          <div class="flex items-baseline justify-between mb-2">
            <h4 class="font-bold text-[15px] text-base-content">{{ c.user.name }}</h4>
            <span class="text-[11px] text-base-content/50 font-bold tracking-wide uppercase">{{ formatDate(c.createdAt) }}</span>
          </div>
          <p class="text-base-content/80 text-sm md:text-[15px] whitespace-pre-wrap leading-relaxed relative z-10">{{ c.content }}</p>

          <!-- Comment Reactions -->
          <div class="mt-3 flex items-center gap-3 relative z-10 border-t border-base-content/5 pt-3">
             <button 
                class="btn btn-xs rounded-full gap-1.5 font-bold transition-all active:scale-95 hover:scale-105"
                :class="c.userReaction === 'LIKE' ? 'btn-primary text-primary-content shadow-sm shadow-primary/20 scale-105' : 'btn-ghost text-base-content/60 hover:text-primary hover:bg-primary/10'"
                @click="toggleCommentReaction(c, 'LIKE')"
                :disabled="reactingCommentId === c.id"
                aria-label="Me gusta este comentario"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-current': c.userReaction === 'LIKE' }">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                {{ c.likes || 0 }}
             </button>

             <button 
                class="btn btn-xs rounded-full gap-1.5 font-bold transition-all active:scale-95 hover:scale-105"
                :class="c.userReaction === 'DISLIKE' ? 'btn-error text-error-content shadow-sm shadow-error/20 scale-105' : 'btn-ghost text-base-content/60 hover:text-error hover:bg-error/10'"
                @click="toggleCommentReaction(c, 'DISLIKE')"
                :disabled="reactingCommentId === c.id"
                aria-label="No me gusta este comentario"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-current': c.userReaction === 'DISLIKE' }">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
                {{ c.dislikes || 0 }}
             </button>
          </div>
        </div>
      </div>
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
}>();

const comments = ref<any[]>([]);
const currentUser = ref<any>(null);
const loading = ref(true);
const submitting = ref(false);
const reactingCommentId = ref<string | null>(null);
const newComment = ref('');
const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

const fetchComments = async () => {
  try {
    const headers: Record<string, string> = {};
    if (props.token) headers['Authorization'] = `Bearer ${props.token}`;
    
    const res = await fetch(`${apiBase}/interactions/${props.targetType}/${props.targetId}`, { headers });
    if (res.ok) {
      const { data } = await res.json();
      comments.value = data.comments;
      currentUser.value = data.currUser;
    }
  } catch (e) {
    console.error('Error fetching comments:', e);
  } finally {
    loading.value = false;
  }
};

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  submitting.value = true;
  
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (props.token) headers['Authorization'] = `Bearer ${props.token}`;

    const res = await fetch(`${apiBase}/interactions/comment`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        targetType: props.targetType,
        destinationId: props.targetType === 'DESTINATION' ? props.targetId : undefined,
        blogId: props.targetType === 'BLOG' ? props.targetId : undefined,
        content: newComment.value.trim()
      })
    });

    if (res.status === 401) {
      window.location.href = props.loginUrl || '/api/auth/google';
      return;
    }

    if (res.ok) {
      const { data } = await res.json();
      data.likes = 0;
      data.dislikes = 0;
      data.userReaction = null;
      comments.value.unshift(data);
      newComment.value = '';
    }
  } catch (e) {
    console.error('Error submitting comment:', e);
  } finally {
    submitting.value = false;
  }
};

const toggleCommentReaction = async (comment: any, type: 'LIKE' | 'DISLIKE') => {
  if (!props.token) {
    window.location.href = props.loginUrl || '/api/auth/google';
    return;
  }

  reactingCommentId.value = comment.id;

  // Optimistic UI update
  const originalReaction = comment.userReaction;
  
  if (originalReaction === type) {
    // Remove reaction
    comment.userReaction = null;
    if (type === 'LIKE') comment.likes--;
    else comment.dislikes--;
  } else {
    // Adding or flipping reaction
    comment.userReaction = type;
    if (type === 'LIKE') {
      comment.likes++;
      if (originalReaction === 'DISLIKE') comment.dislikes--;
    } else {
      comment.dislikes++;
      if (originalReaction === 'LIKE') comment.likes--;
    }
  }

  try {
    const res = await fetch(`${apiBase}/interactions/react`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        targetType: 'COMMENT',
        commentId: comment.id,
        type
      })
    });

    if (res.status === 401) {
      window.location.href = props.loginUrl || '/api/auth/google';
      return;
    }

    if (!res.ok) {
      throw new Error('API Error');
    }
  } catch (e) {
    console.error('Error reacting to comment:', e);
    // Revert on failure
    comment.userReaction = originalReaction;
    // Note: Reverting counts accurately here requires knowing the exact flip delta, 
    // but a full refetch or simpler reload usually suffices for edge cases.
    fetchComments(); 
  } finally {
    reactingCommentId.value = null;
  }
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `Hace ${seconds} seg`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Hace ${days} d`;
  
  return date.toLocaleDateString('es-DO', { month: 'short', day: 'numeric', year: 'numeric' });
};

onMounted(() => {
  fetchComments();
});
</script>
