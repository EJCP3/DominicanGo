<template>
  <!-- Estado de carga: esqueleto para evitar saltos de layout -->
  <div v-if="loading" class="hidden md:flex items-center gap-2">
    <div class="skeleton w-9 h-9 rounded-full"></div>
  </div>

  <!-- Usuario autenticado: Avatar dropdown (desktop) -->
  <nav v-else-if="user" class="hidden md:block" aria-label="Menú de usuario">
    <div class="dropdown dropdown-end z-100">
      <button tabindex="0" class="btn btn-ghost btn-circle avatar" aria-haspopup="true" aria-expanded="false">
        <div class="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
          <img v-if="user.foto" :alt="user.name" :src="user.foto" referrerpolicy="no-referrer" />
          <div v-else class="bg-primary text-primary-content flex items-center justify-center w-full h-full text-sm font-bold rounded-full select-none">
            {{ user.name?.charAt(0).toUpperCase() }}
          </div>
        </div>
      </button>
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-100 p-2 shadow-xl bg-base-100 rounded-2xl w-60 border border-base-200">
        <li class="menu-title px-2 py-1">
          <span class="font-semibold text-sm text-base-content truncate">{{ user.name }}</span>
        </li>
        <div class="divider my-0.5"></div>
        <li>
          <a href="/favoritos" data-astro-prefetch="hover">
            <svg class="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Mis Favoritos
          </a>
        </li>
        <li>
          <a href="/destinos/nuevo" data-astro-prefetch="hover">
            <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Registrar Destino
          </a>
        </li>
        <div class="divider my-0.5"></div>

        <!-- Admin -->
        <li v-if="user.role?.toUpperCase() === 'ADMIN'">
          <a href="/admin/feedback" class="text-info font-medium" data-astro-prefetch="hover">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            Manejo de Reportes
          </a>
        </li>
        <!-- Usuario normal -->
        <li v-else>
          <button @click="openFeedback" class="text-info font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            Sugerencias
          </button>
        </li>

        <div class="divider my-0.5"></div>
        <li class="menu-title px-2"><span class="text-xs">Estaciones (Tema)</span></li>
        <li><button data-theme-btn="pastel" class="theme-btn"><span>🌸</span> Primavera</button></li>
        <li><button data-theme-btn="cupcake" class="theme-btn"><span>☀️</span> Verano</button></li>
        <li><button data-theme-btn="caramellatte" class="theme-btn"><span>🍂</span> Otoño</button></li>
        <li><button data-theme-btn="nord" class="theme-btn"><span>❄️</span> Invierno</button></li>

        <div class="divider my-0.5"></div>
        <li>
          <a href="/logout" data-astro-reload class="text-error font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- No autenticado: botón de login (desktop) -->
  <a
    v-else
    :href="`${apiBase}/auth/google`"
    class="hidden md:inline-flex btn btn-primary btn-sm rounded-full shadow-sm gap-2"
    data-astro-reload
  >
    <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    Iniciar sesión
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
  foto?: string;
  role?: string;
}

const props = defineProps<{
  apiBase: string;
}>();

const user = ref<User | null>(null);
const loading = ref(true);

const openFeedback = () => {
  const modal = document.getElementById('feedback_modal') as HTMLDialogElement;
  if (modal) modal.showModal();
};

onMounted(async () => {
  console.log('🔍 [UserMenu] Intentando leer cookie auth_token...');
  console.log('🍪 [UserMenu] Todas las cookies:', document.cookie);

  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];

  if (!token) {
    console.warn('❌ [UserMenu] No se encontró la cookie auth_token');
    loading.value = false;
    return;
  }

  console.log('✅ [UserMenu] Token encontrado, llamando a la API...');

  try {
    const apiUrl = props.apiBase || import.meta.env.PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(`📡 [UserMenu] Respuesta de la API: ${res.status}`);

    if (res.ok) {
      const json = await res.json();
      user.value = json.success ? json.data : json;
      console.log('👤 [UserMenu] Usuario cargado:', user.value);
    } else {
      console.warn('❌ [UserMenu] La API rechazó el token:', res.status);
    }
  } catch (err) {
    console.error('💥 [UserMenu] Error fatal en el fetch:', err);
  } finally {
    loading.value = false;
  }
});
</script>
