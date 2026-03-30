<template>
  <div class="space-y-6">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-base-200/50 p-4 rounded-2xl">
      <div class="flex items-center gap-2">
        <select v-model="filterStatus" class="select select-sm select-bordered">
          <option value="">Todos los Estados</option>
          <option value="PENDING">Pendientes</option>
          <option value="REVIEWED">En Revisión</option>
          <option value="RESOLVED">Resueltos</option>
        </select>
        <select v-model="filterType" class="select select-sm select-bordered">
          <option value="">Todos los Tipos</option>
          <option value="SUGGESTION">Sugerencias</option>
          <option value="BUG">Errores</option>
          <option value="DELETION_REQUEST">Borrados</option>
          <option value="OTHER">Otros</option>
        </select>
      </div>
      <button @click="fetchFeedbacks" class="btn btn-sm btn-ghost" :disabled="loading">
        <svg v-if="loading" class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refrescar
      </button>
    </div>

    <!-- Error state -->
    <div v-if="error" class="alert alert-error shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ error }}</span>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading && items.length === 0" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse flex space-x-4 bg-base-200 h-24 rounded-2xl w-full"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredItems.length === 0" class="text-center py-12 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
      <div class="text-4xl mb-4">📫</div>
      <h3 class="text-lg font-bold text-base-content">Sin resultados</h3>
      <p class="text-base-content/70">No hay sugerencias o reportes que coincidan con estos filtros.</p>
    </div>

    <!-- Data Table / List -->
    <div v-else class="grid grid-cols-1 gap-4">
      <div 
        v-for="item in filteredItems" 
        :key="item.id" 
        class="bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5"
      >
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <!-- Left Content -->
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider " :class="getTypeBadge(item.type)">{{ getTypeLabel(item.type) }}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider " :class="getStatusBadge(item.status)">{{ getStatusLabel(item.status) }}</span>
              <span class="text-[10px] text-base-content/40 font-bold uppercase tracking-widest ml-1">{{ formatDate(item.createdAt) }}</span>
            </div>
            
            <h3 class="font-bold text-lg text-base-content">
              {{ item.title || 'Sin Título' }}
            </h3>
            
            <p class="text-sm text-base-content/80 whitespace-pre-wrap leading-relaxed bg-base-200/50 p-3 rounded-xl">
              {{ item.content }}
            </p>
            
            <div v-if="item.user" class="text-xs text-base-content/60 flex items-center gap-1.5 pt-2">
              <div class="avatar">
                <div class="w-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  {{ item.user.name?.charAt(0) || 'U' }}
                </div>
              </div>
              <span class="font-medium">{{ item.user.name }}</span> ({{ item.user.email }})
            </div>
            <div v-else class="text-xs text-base-content/50 italic pt-2">
              Usuario Anónimo
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-row md:flex-col gap-2 justify-end items-center md:items-end shrink-0">
            <div class="dropdown dropdown-end">
              <button tabindex="0" 
                class="btn btn-sm rounded-xl font-bold gap-2 transition-all" 
                :class="[
                  item.status === 'RESOLVED' 
                    ? 'btn-disabled bg-success/10 text-success border-success/20' 
                    : 'btn-outline border-base-content/20 hover:bg-base-200 hover:text-base-content',
                  {'loading': updating === item.id}
                ]" 
                :disabled="updating === item.id || item.status === 'RESOLVED'">
                
                <template v-if="updating !== item.id">
                  <svg v-if="item.status === 'RESOLVED'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ item.status === 'RESOLVED' ? 'Finalizado' : 'Cambiar Estado' }}</span>
                  <svg v-if="item.status !== 'RESOLVED'" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </template>
              </button>
              <ul v-if="item.status !== 'RESOLVED'" tabindex="0" class="dropdown-content z-10 menu p-2 shadow-2xl bg-base-100 rounded-2xl w-44 border border-base-200 mt-2">
                <li class="menu-title font-bold text-[10px] uppercase tracking-widest opacity-50 px-4 py-2">Elegir nuevo estado</li>
                <li v-if="item.status !== 'PENDING'"><a @click="updateStatus(item.id, 'PENDING')" class="rounded-xl hover:bg-amber-50 hover:text-amber-700">Pendiente</a></li>
                <li v-if="item.status !== 'REVIEWED'"><a @click="updateStatus(item.id, 'REVIEWED')" class="rounded-xl hover:bg-indigo-50 hover:text-indigo-700">En Revisión</a></li>
                <li v-if="item.status !== 'RESOLVED'"><a @click="updateStatus(item.id, 'RESOLVED')" class="rounded-xl hover:bg-emerald-50 hover:text-emerald-700 font-bold">Marcar como Resuelto</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  apiBase: {
    type: String,
    required: true
  }
});

const items = ref([]);
const loading = ref(true);
const error = ref(null);
const filterStatus = ref('');
const filterType = ref('');
const updating = ref(null);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
    const matchType = filterType.value ? item.type === filterType.value : true;
    return matchStatus && matchType;
  });
});

const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

const fetchFeedbacks = async () => {
  loading.value = true;
  error.value = null;
  try {
    const token = getCookieValue('auth_token');
    const res = await fetch(`${props.apiBase}/feedback`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error al obtener feedbacks');
    items.value = json.data || [];
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (id, newStatus) => {
  if (updating.value === id) return;
  updating.value = id;
  
  try {
    const token = getCookieValue('auth_token');
    const res = await fetch(`${props.apiBase}/feedback/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || 'Error al actualizar');
    }
    
    // Update local state without re-fetching everything
    const idx = items.value.findIndex(i => i.id === id);
    if (idx !== -1) {
      items.value[idx].status = newStatus;
    }
    
    // Close any active dropdown by blurring active element
    if (document.activeElement) {
        document.activeElement.blur();
    }
  } catch (err) {
    alert(err.message);
  } finally {
    updating.value = null;
  }
};

onMounted(() => {
  fetchFeedbacks();
});

// UI Helpers
const getTypeLabel = (type) => {
  const types = {
    'BUG': 'Error',
    'SUGGESTION': 'Sugerencia',
    'DELETION_REQUEST': 'Petición de Borrado',
    'OTHER': 'Otro'
  };
  return types[type] || type;
};

const getTypeBadge = (type) => {
  const types = {
    'BUG': 'bg-error text-error-content',
    'SUGGESTION': 'bg-info text-info-content',
    'DELETION_REQUEST': 'bg-warning text-warning-content',
    'OTHER': 'bg-neutral text-neutral-content'
  };
  return types[type] || 'bg-neutral text-neutral-content';
};

const getStatusLabel = (status) => {
  const statuses = {
    'PENDING': 'Pendiente',
    'REVIEWED': 'En Revisión',
    'RESOLVED': 'Resuelto',
  };
  return statuses[status] || status;
};

const getStatusBadge = (status) => {
  const statuses = {
    'PENDING': 'bg-warning text-warning-content',
    'REVIEWED': 'bg-info text-info-content',
    'RESOLVED': 'bg-success text-success-content',
  };
  return statuses[status] || '';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return new Intl.DateTimeFormat('es-DO', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(d);
};
</script>
