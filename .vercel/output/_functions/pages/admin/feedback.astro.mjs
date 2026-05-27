import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$Layout, a as $$Header } from '../../chunks/Header_Y8jLrYi7.mjs';
import { g as getUser } from '../../chunks/api_BnOIfECD.mjs';
import { useSSRContext, ref, computed, onMounted, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
export { renderers } from '../../renderers.mjs';

const _sfc_main = {
  __name: 'AdminFeedbackPanel',
  props: {
  apiBase: {
    type: String,
    required: true
  }
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

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

const __returned__ = { props, items, loading, error, filterStatus, filterType, updating, filteredItems, getCookieValue, fetchFeedbacks, updateStatus, getTypeLabel, getTypeBadge, getStatusLabel, getStatusBadge, formatDate, ref, onMounted, computed };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))
  }><div class="flex flex-col sm:flex-row gap-4 items-center justify-between bg-base-200/50 p-4 rounded-2xl"><div class="flex items-center gap-2"><select class="select select-sm select-bordered"><option value=""${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterStatus))
      ? ssrLooseContain($setup.filterStatus, "")
      : ssrLooseEqual($setup.filterStatus, ""))) ? " selected" : ""
  }>Todos los Estados</option><option value="PENDING"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterStatus))
      ? ssrLooseContain($setup.filterStatus, "PENDING")
      : ssrLooseEqual($setup.filterStatus, "PENDING"))) ? " selected" : ""
  }>Pendientes</option><option value="REVIEWED"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterStatus))
      ? ssrLooseContain($setup.filterStatus, "REVIEWED")
      : ssrLooseEqual($setup.filterStatus, "REVIEWED"))) ? " selected" : ""
  }>En Revisión</option><option value="RESOLVED"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterStatus))
      ? ssrLooseContain($setup.filterStatus, "RESOLVED")
      : ssrLooseEqual($setup.filterStatus, "RESOLVED"))) ? " selected" : ""
  }>Resueltos</option></select><select class="select select-sm select-bordered"><option value=""${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterType))
      ? ssrLooseContain($setup.filterType, "")
      : ssrLooseEqual($setup.filterType, ""))) ? " selected" : ""
  }>Todos los Tipos</option><option value="SUGGESTION"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterType))
      ? ssrLooseContain($setup.filterType, "SUGGESTION")
      : ssrLooseEqual($setup.filterType, "SUGGESTION"))) ? " selected" : ""
  }>Sugerencias</option><option value="BUG"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterType))
      ? ssrLooseContain($setup.filterType, "BUG")
      : ssrLooseEqual($setup.filterType, "BUG"))) ? " selected" : ""
  }>Errores</option><option value="DELETION_REQUEST"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterType))
      ? ssrLooseContain($setup.filterType, "DELETION_REQUEST")
      : ssrLooseEqual($setup.filterType, "DELETION_REQUEST"))) ? " selected" : ""
  }>Borrados</option><option value="OTHER"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.filterType))
      ? ssrLooseContain($setup.filterType, "OTHER")
      : ssrLooseEqual($setup.filterType, "OTHER"))) ? " selected" : ""
  }>Otros</option></select></div><button class="btn btn-sm btn-ghost"${
    (ssrIncludeBooleanAttr($setup.loading)) ? " disabled" : ""
  }>`);
  if ($setup.loading) {
    _push(`<svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
  } else {
    _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
  }
  _push(` Refrescar </button></div>`);
  if ($setup.error) {
    _push(`<div class="alert alert-error shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate($setup.error)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.loading && $setup.items.length === 0) {
    _push(`<div class="space-y-4"><!--[-->`);
    ssrRenderList(3, (i) => {
      _push(`<div class="animate-pulse flex space-x-4 bg-base-200 h-24 rounded-2xl w-full"></div>`);
    });
    _push(`<!--]--></div>`);
  } else if ($setup.filteredItems.length === 0) {
    _push(`<div class="text-center py-12 bg-base-200/30 rounded-3xl border border-dashed border-base-300"><div class="text-4xl mb-4">📫</div><h3 class="text-lg font-bold text-base-content">Sin resultados</h3><p class="text-base-content/70">No hay sugerencias o reportes que coincidan con estos filtros.</p></div>`);
  } else {
    _push(`<div class="grid grid-cols-1 gap-4"><!--[-->`);
    ssrRenderList($setup.filteredItems, (item) => {
      _push(`<div class="bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5"><div class="flex flex-col md:flex-row justify-between gap-4"><div class="flex-1 space-y-2"><div class="flex items-center gap-2 flex-wrap"><span class="${
        ssrRenderClass([$setup.getTypeBadge(item.type), "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"])
      }">${
        ssrInterpolate($setup.getTypeLabel(item.type))
      }</span><span class="${
        ssrRenderClass([$setup.getStatusBadge(item.status), "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"])
      }">${
        ssrInterpolate($setup.getStatusLabel(item.status))
      }</span><span class="text-[10px] text-base-content/40 font-bold uppercase tracking-widest ml-1">${
        ssrInterpolate($setup.formatDate(item.createdAt))
      }</span></div><h3 class="font-bold text-lg text-base-content">${
        ssrInterpolate(item.title || 'Sin Título')
      }</h3><p class="text-sm text-base-content/80 whitespace-pre-wrap leading-relaxed bg-base-200/50 p-3 rounded-xl">${
        ssrInterpolate(item.content)
      }</p>`);
      if (item.user) {
        _push(`<div class="text-xs text-base-content/60 flex items-center gap-1.5 pt-2"><div class="avatar"><div class="w-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">${
          ssrInterpolate(item.user.name?.charAt(0) || 'U')
        }</div></div><span class="font-medium">${
          ssrInterpolate(item.user.name)
        }</span> (${
          ssrInterpolate(item.user.email)
        }) </div>`);
      } else {
        _push(`<div class="text-xs text-base-content/50 italic pt-2"> Usuario Anónimo </div>`);
      }
      _push(`</div><div class="flex flex-row md:flex-col gap-2 justify-end items-center md:items-end shrink-0"><div class="dropdown dropdown-end"><button tabindex="0" class="${
        ssrRenderClass([[
                  item.status === 'RESOLVED' 
                    ? 'btn-disabled bg-success/10 text-success border-success/20' 
                    : 'btn-outline border-base-content/20 hover:bg-base-200 hover:text-base-content',
                  {'loading': $setup.updating === item.id}
                ], "btn btn-sm rounded-xl font-bold gap-2 transition-all"])
      }"${
        (ssrIncludeBooleanAttr($setup.updating === item.id || item.status === 'RESOLVED')) ? " disabled" : ""
      }>`);
      if ($setup.updating !== item.id) {
        _push(`<!--[-->`);
        if (item.status === 'RESOLVED') {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(item.status === 'RESOLVED' ? 'Finalizado' : 'Cambiar Estado')}</span>`);
        if (item.status !== 'RESOLVED') {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (item.status !== 'RESOLVED') {
        _push(`<ul tabindex="0" class="dropdown-content z-10 menu p-2 shadow-2xl bg-base-100 rounded-2xl w-44 border border-base-200 mt-2"><li class="menu-title font-bold text-[10px] uppercase tracking-widest opacity-50 px-4 py-2">Elegir nuevo estado</li>`);
        if (item.status !== 'PENDING') {
          _push(`<li><a class="rounded-xl hover:bg-amber-50 hover:text-amber-700">Pendiente</a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (item.status !== 'REVIEWED') {
          _push(`<li><a class="rounded-xl hover:bg-indigo-50 hover:text-indigo-700">En Revisión</a></li>`);
        } else {
          _push(`<!---->`);
        }
        if (item.status !== 'RESOLVED') {
          _push(`<li><a class="rounded-xl hover:bg-emerald-50 hover:text-emerald-700 font-bold">Marcar como Resuelto</a></li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    });
    _push(`<!--]--></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/admin/AdminFeedbackPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const AdminFeedbackPanel = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const $$Feedback = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Feedback;
  const token = Astro2.cookies.get("auth_token")?.value;
  const user = await getUser(token);
  if (!user || user.role?.toUpperCase() !== "ADMIN") {
    return Astro2.redirect("/");
  }
  const API_BASE = "https://dominicango-api.onrender.com/api";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Administración de Sugerencias - DominicanGo" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 bg-base-200/30"> <div class="max-w-[1200px] mx-auto px-4 py-8"> <header class="mb-8"> <h1 class="text-3xl font-heading font-bold text-base-content mb-2">Panel de Moderación</h1> <p class="text-base-content/70">Revisa los reportes de error, sugerencias de usuarios y peticiones de eliminación de contenido.</p> </header> <section class="bg-base-100/50 backdrop-blur-md border border-base-200 rounded-3xl p-6 shadow-sm"> ${renderComponent($$result2, "AdminFeedbackPanel", AdminFeedbackPanel, { "client:load": true, "apiBase": API_BASE, "client:component-hydration": "load", "client:component-path": "@/components/admin/AdminFeedbackPanel.vue", "client:component-export": "default" })} </section> </div> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/admin/feedback.astro", void 0);
const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/admin/feedback.astro";
const $$url = "/admin/feedback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Feedback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
