<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  itemId: string;
  type: 'destination' | 'blog';
  isLoggedIn: boolean;
  token: string;
  initialState?: boolean;
}>();

const isFavorited = ref(props.initialState ?? false);
const loading = ref(false);

async function toggle(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();

  if (!props.isLoggedIn) {
    window.location.href = '/?error=login_required';
    return;
  }

  // Optimistic UI
  isFavorited.value = !isFavorited.value;
  loading.value = true;

  try {
    const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
      const body: Record<string, string> = {
        type: props.type === 'destination' ? 'DESTINATION' : 'BLOG',
      };
      if (props.type === 'destination') body.destinationId = props.itemId;
      else body.blogId = props.itemId;

      await fetch(`${apiBase}/favorites`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(body),
      });
  } catch (err) {
    // Revert on error
    isFavorited.value = !isFavorited.value;
    console.error('Error toggling favorite:', err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <button
    class="btn btn-circle btn-sm absolute top-2 right-2 z-20 bg-white/90 backdrop-blur shadow-md border-none transition-all duration-200 hover:scale-110 active:scale-95"
    :class="{ 'opacity-70 pointer-events-none': loading }"
    :title="isFavorited ? 'Quitar de favoritos' : 'Guardar en favoritos'"
    @click="toggle"
    type="button"
  >
    <svg
      class="w-4 h-4 transition-all duration-200"
      :class="isFavorited ? 'fill-error text-error' : 'fill-transparent text-base-content/60'"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </button>
</template>
