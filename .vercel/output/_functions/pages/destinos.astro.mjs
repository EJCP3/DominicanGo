import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, d as addAttribute, e as renderTransition, r as renderComponent, u as unescapeHTML, f as renderScript } from '../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, b as $$Icon, $ as $$Layout, a as $$Header } from '../chunks/Header_Y8jLrYi7.mjs';
import { n as navigate, $ as $$Pagination } from '../chunks/Pagination_BL3Zo68M.mjs';
import { b as getProvincesWithDestinations, d as getFavoriteIds, s as slugify } from '../chunks/api_BnOIfECD.mjs';
import 'clsx';
import { useSSRContext, defineComponent, reactive, shallowRef, computed, watch, onMounted, nextTick, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
/* empty css                                 */
import { $ as $$Image } from '../chunks/_astro_assets_DY3b9lXa.mjs';
import { T as TYPE_LABELS, I as ICONS, R as REGION_COLORS, a as TIPOS } from '../chunks/poi-config_9NakrLaT.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$DestinosHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DestinosHero;
  const { totalCount, provinceCount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="pt-12 pb-8 px-6 text-center"> <p class="text-xs uppercase tracking-[0.3em] text-success font-semibold mb-2">
República Dominicana
</p> <h1 class="font-heading font-bold text-4xl md:text-5xl text-base-content mb-3"> <span>Explora</span> <span class="text-error animate-pulse">&hearts;</span> <span class="text-rotate text-secondary font-extrabold overflow-hidden inline-flex flex-col duration-15000"> <span class="  flex flex-col items-center lg:items-start justify-center"> <span class="h-[1.2em] flex items-center justify-center">los Destinos</span> <span class="h-[1.2em] flex items-center justify-center">las Playas</span> <span class="h-[1.2em] flex items-center justify-center">los Ríos</span> <span class="h-[1.2em] flex items-center justify-center">las Montañas</span> <span class="h-[1.2em] flex items-center justify-center">el Paraíso</span> <span class="h-[1.2em] flex items-center justify-center">la comida</span> </span> </span> </h1> <p class="text-base-content/70 max-w-xl mx-auto text-base"> ${totalCount} lugares increíbles en ${provinceCount} provincias — filtra, busca
        y descubre tu próxima aventura.
</p> </div>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/DestinosHero.astro", void 0);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FiltrosDestinos",
  props: {
    tipos: {},
    typeLabels: {},
    regiones: {},
    regionColors: {},
    provincias: {},
    initialState: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    gsap.registerPlugin(Flip);
    const props = __props;
    const state = reactive({
      tipo: props.initialState?.tipo ?? null,
      provincia: props.initialState?.provincia ?? null,
      region: props.initialState?.region ?? null,
      precio: props.initialState?.precio ?? null,
      search: props.initialState?.search ?? ""
    });
    const isMounted = shallowRef(false);
    const isOpen = shallowRef(false);
    const panelRef = shallowRef(null);
    const triggerRef = shallowRef(null);
    const activeFilters = computed(() => {
      const filters = [];
      if (state.search) {
        filters.push({ key: "search", label: `"${state.search}"` });
      }
      if (state.tipo) {
        filters.push({ key: "tipo", label: props.typeLabels[state.tipo] ?? state.tipo });
      }
      if (state.provincia) {
        const prov = props.provincias.find((p) => p.slug === state.provincia);
        filters.push({ key: "provincia", label: prov?.name ?? state.provincia });
      }
      if (state.region) {
        filters.push({ key: "region", label: state.region });
      }
      if (state.precio) {
        filters.push({ key: "precio", label: state.precio === "gratis" ? "Gratis" : "Pagado" });
      }
      return filters;
    });
    const hasFilter = computed(() => activeFilters.value.length > 0);
    function applyFilters() {
    }
    function buildAndNavigate() {
      const params = new URLSearchParams(window.location.search);
      params.delete("page");
      if (state.tipo) params.set("type", state.tipo);
      else params.delete("type");
      if (state.provincia) params.set("provinceId", state.provincia);
      else params.delete("provinceId");
      if (state.region) params.set("region", state.region);
      else params.delete("region");
      if (state.precio) params.set("price", state.precio);
      else params.delete("price");
      if (state.search) params.set("search", state.search);
      else params.delete("search");
      const newUrl = `/destinos${params.toString() ? "?" + params.toString() : ""}`;
      if (window.location.pathname + window.location.search !== newUrl) {
        navigate();
      }
    }
    let searchTimer = null;
    let isSyncing = false;
    watch(() => [state.tipo, state.provincia, state.region, state.precio], () => {
      if (isSyncing) return;
      buildAndNavigate();
    });
    watch(() => state.search, () => {
      if (isSyncing) return;
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        buildAndNavigate();
      }, 800);
    });
    function toggleRegion(ev, region) {
      ev.stopPropagation();
      state.region = state.region === region ? null : region;
    }
    function togglePrecio(ev, precio) {
      ev.stopPropagation();
      state.precio = state.precio === precio ? null : precio;
    }
    function resetAll() {
      state.tipo = null;
      state.provincia = null;
      state.region = null;
      state.precio = null;
      state.search = "";
    }
    function removeFilter(key) {
      if (key === "search") {
        state.search = "";
      } else {
        state[key] = null;
      }
    }
    async function animateToggle() {
      const panelContent = document.querySelector(".panel-content");
      const panelActions = document.querySelector(".panel-actions");
      if (isOpen.value) {
        if (panelContent || panelActions) {
          gsap.to([panelContent, panelActions], { autoAlpha: 0, duration: 0.1, ease: "power2.out" });
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
        const targets = gsap.utils.toArray("[data-flip-id]");
        const flipState = Flip.getState(targets);
        isOpen.value = false;
        await nextTick();
        const divider = triggerRef.value?.querySelector(".trigger-divider");
        const filterBtn = triggerRef.value?.querySelector(".trigger-filter-btn");
        gsap.set([divider, filterBtn], { autoAlpha: 0 });
        Flip.from(flipState, {
          duration: 0.35,
          ease: "power3.inOut",
          scale: true,
          absolute: true,
          nested: true,
          props: "boxShadow, borderRadius, backgroundColor",
          onComplete: () => {
            gsap.to([divider, filterBtn], { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
          }
        });
      } else {
        const targets = gsap.utils.toArray("[data-flip-id]");
        const flipState = Flip.getState(targets);
        isOpen.value = true;
        await nextTick();
        const newContent = document.querySelector(".panel-content");
        const newActions = document.querySelector(".panel-actions");
        const oldHeader = document.querySelector('[data-flip-id="filter-header"]');
        if (newContent || newActions || oldHeader) {
          gsap.set([newContent, newActions, oldHeader], { autoAlpha: 0, y: 10 });
        }
        Flip.from(flipState, {
          duration: 0.5,
          ease: "power3.inOut",
          scale: true,
          absolute: true,
          nested: true,
          props: "boxShadow, borderRadius, backgroundColor",
          onComplete: () => {
            const finalHeader = document.querySelector('[data-flip-id="filter-header"]');
            if (newContent || newActions || finalHeader) {
              gsap.to([newContent, newActions, finalHeader], { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.05, ease: "power2.out" });
            }
          }
        });
      }
    }
    function togglePanel() {
      animateToggle();
    }
    function closePanel() {
      if (isOpen.value) {
        animateToggle();
      }
    }
    function regionPillStyle(region) {
      const borderColor = props.regionColors[region] ?? "#cbd5e1";
      if (state.region === region) {
        return {
          backgroundColor: borderColor,
          borderColor: "transparent",
          color: "#ffffff"
        };
      }
      return {
        borderColor,
        backgroundColor: "#ffffff"
      };
    }
    function precioPillClass(precio) {
      return state.precio === precio ? "bg-primary/10 border-primary/60 text-primary shadow-inner" : "border-base-300 bg-base-100 hover:border-primary/40";
    }
    function handleDocumentClick(ev) {
      if (!isOpen.value) return;
      const target = ev.target;
      const insidePanel = !!target.closest?.("[data-filter-panel]");
      const insideTrigger = !!target.closest?.("[data-filter-trigger]");
      if (insidePanel || insideTrigger) return;
      closePanel();
    }
    let _nativePanelStop = null;
    function handleKeydown(ev) {
      if (ev.key === "Escape" && isOpen.value) closePanel();
    }
    function syncStateFromURL() {
      isSyncing = true;
      const params = new URLSearchParams(window.location.search);
      state.tipo = params.get("type") || null;
      state.provincia = params.get("provinceId") || null;
      state.region = params.get("region") || null;
      state.precio = params.get("price") || null;
      state.search = params.get("search") || "";
      nextTick(() => {
        isSyncing = false;
      });
    }
    function handleAstroSwap() {
      isMounted.value = false;
      nextTick(() => {
        isMounted.value = true;
      });
    }
    onMounted(() => {
      isMounted.value = true;
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("astro:page-load", syncStateFromURL);
      document.addEventListener("astro:after-swap", handleAstroSwap);
      nextTick(() => {
        if (panelRef.value) {
          _nativePanelStop = (e) => e.stopPropagation();
          panelRef.value.addEventListener("click", _nativePanelStop);
        }
      });
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("astro:page-load", syncStateFromURL);
      document.removeEventListener("astro:after-swap", handleAstroSwap);
      if (panelRef.value && _nativePanelStop) {
        panelRef.value.removeEventListener("click", _nativePanelStop);
      }
      gsap.killTweensOf(".panel-content, .panel-actions, [data-flip-id]");
    });
    const __returned__ = { props, state, isMounted, isOpen, panelRef, triggerRef, activeFilters, hasFilter, applyFilters, buildAndNavigate, get searchTimer() {
      return searchTimer;
    }, set searchTimer(v) {
      searchTimer = v;
    }, get isSyncing() {
      return isSyncing;
    }, set isSyncing(v) {
      isSyncing = v;
    }, toggleRegion, togglePrecio, resetAll, removeFilter, animateToggle, togglePanel, closePanel, regionPillStyle, precioPillClass, handleDocumentClick, get _nativePanelStop() {
      return _nativePanelStop;
    }, set _nativePanelStop(v) {
      _nativePanelStop = v;
    }, handleKeydown, syncStateFromURL, handleAstroSwap };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="relative z-50 h-10 shrink-0" data-v-3f171a5d><div data-flip-id="filter-container" data-filter-trigger class="z-[101] flex items-center h-10 px-4 rounded-full bg-base-100 text-base-content shrink-0 origin-top-right border-0 cursor-text shadow-sm ring-1 ring-base-content/5" style="${ssrRenderStyle(!$setup.isOpen ? null : { display: "none" })}" data-v-3f171a5d><svg class="w-4 h-4 text-base-content/40 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f171a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3f171a5d></path></svg><div data-flip-id="filter-header" class="flex-1 flex items-center" data-v-3f171a5d><input type="text"${ssrRenderAttr("value", $setup.state.search)} placeholder="Buscar destino..." class="bg-transparent border-none outline-none text-sm w-32 sm:w-48 placeholder:text-base-content/40 text-base-content font-medium p-0" data-v-3f171a5d></div><div class="trigger-divider w-px h-4 bg-base-content/10 mx-3 shrink-0" data-v-3f171a5d></div><button class="trigger-filter-btn flex items-center gap-1.5 text-base-content hover:text-primary transition-colors cursor-pointer group shrink-0"${ssrRenderAttr("aria-expanded", $setup.isOpen)} aria-label="Filtros — abrir opciones de filtro" aria-controls="filter-panel" data-v-3f171a5d><svg aria-hidden="true" class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f171a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" data-v-3f171a5d></path></svg><span class="hidden sm:inline font-heading font-extrabold text-[14px]" data-v-3f171a5d>Filtros</span></button></div><div data-flip-id="filter-container" data-filter-panel id="filter-panel" role="dialog" aria-label="Opciones de filtro" class="absolute top-0 right-0 w-[calc(100vw-2rem)] sm:w-[500px] z-[101] bg-base-100 shadow-xl rounded-3xl p-6 origin-top-right overflow-y-auto max-h-[90vh] flex flex-col border border-base-content/8" style="${ssrRenderStyle($setup.isOpen ? null : { display: "none" })}" data-v-3f171a5d><div class="flex items-center justify-between mb-6" data-v-3f171a5d><div data-flip-id="filter-header" class="flex items-center gap-2 origin-left flex-1 min-w-0 mr-4 border-b border-base-200/50 pb-1" data-v-3f171a5d><svg aria-hidden="true" class="w-5 h-5 text-base-content/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f171a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3f171a5d></path></svg><input type="text"${ssrRenderAttr("value", $setup.state.search)} placeholder="Buscar destino..." class="bg-transparent border-none outline-none text-lg w-full placeholder:text-base-content/30 font-heading font-extrabold text-base-content p-0 mb-0.5" data-v-3f171a5d></div><div class="flex items-center gap-2 panel-actions" data-v-3f171a5d>`);
  if ($setup.hasFilter) {
    _push(`<button class="btn btn-sm btn-circle btn-ghost text-base-content/60" aria-label="Limpiar todos los filtros" data-v-3f171a5d><svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f171a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-3f171a5d></path></svg></button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-sm btn-circle btn-ghost text-base-content/60" aria-label="Cerrar panel de filtros" data-v-3f171a5d><svg aria-hidden="true" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-3f171a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-3f171a5d></path></svg></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 panel-content" data-v-3f171a5d><div class="space-y-5" data-v-3f171a5d><div data-v-3f171a5d><label class="text-sm text-base-content/60 font-medium block mb-2 px-1" data-v-3f171a5d> Categoría del destino </label><select class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none" data-v-3f171a5d><option${ssrRenderAttr("value", null)} data-v-3f171a5d${ssrIncludeBooleanAttr(Array.isArray($setup.state.tipo) ? ssrLooseContain($setup.state.tipo, null) : ssrLooseEqual($setup.state.tipo, null)) ? " selected" : ""}>Todos</option><!--[-->`);
  ssrRenderList($setup.props.tipos, (tipo) => {
    _push(`<option${ssrRenderAttr("value", tipo)} data-v-3f171a5d${ssrIncludeBooleanAttr(Array.isArray($setup.state.tipo) ? ssrLooseContain($setup.state.tipo, tipo) : ssrLooseEqual($setup.state.tipo, tipo)) ? " selected" : ""}>${ssrInterpolate($setup.props.typeLabels[tipo])}</option>`);
  });
  _push(`<!--]--></select></div><div data-v-3f171a5d><label class="text-sm text-base-content/60 font-medium block mb-2 px-1" data-v-3f171a5d> Provincia </label><select class="select select-bordered select-md w-full bg-base-200/50 border-none rounded-2xl text-base-content font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none" data-v-3f171a5d><option${ssrRenderAttr("value", null)} data-v-3f171a5d${ssrIncludeBooleanAttr(Array.isArray($setup.state.provincia) ? ssrLooseContain($setup.state.provincia, null) : ssrLooseEqual($setup.state.provincia, null)) ? " selected" : ""}>Todas</option><!--[-->`);
  ssrRenderList($setup.props.provincias, (prov) => {
    _push(`<option${ssrRenderAttr("value", prov.slug)} data-v-3f171a5d${ssrIncludeBooleanAttr(Array.isArray($setup.state.provincia) ? ssrLooseContain($setup.state.provincia, prov.slug) : ssrLooseEqual($setup.state.provincia, prov.slug)) ? " selected" : ""}>${ssrInterpolate(prov.name)}</option>`);
  });
  _push(`<!--]--></select></div></div><div class="space-y-5" data-v-3f171a5d><fieldset class="bg-base-200/50 rounded-2xl p-4 border border-base-content/8 m-0" data-v-3f171a5d><legend class="text-xs font-extrabold tracking-widest text-base-content/50 uppercase mb-4 w-full" data-v-3f171a5d> Región </legend><div class="flex flex-wrap gap-2.5" data-v-3f171a5d><!--[-->`);
  ssrRenderList($setup.props.regiones, (region) => {
    _push(`<button style="${ssrRenderStyle($setup.regionPillStyle(region))}" class="${ssrRenderClass([
      "px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all",
      $setup.state.region === region ? "shadow-md scale-105" : "text-base-content/80"
    ])}"${ssrRenderAttr("aria-pressed", $setup.state.region === region)} data-v-3f171a5d>${ssrInterpolate(region)}</button>`);
  });
  _push(`<!--]--></div></fieldset><fieldset class="bg-base-200/50 rounded-2xl p-4 border border-base-content/8 m-0" data-v-3f171a5d><legend class="text-xs font-extrabold tracking-widest text-base-content/50 uppercase mb-4 w-full" data-v-3f171a5d> Precio </legend><div class="flex gap-3" data-v-3f171a5d><button class="${ssrRenderClass([
    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-base-content border transition-all",
    $setup.precioPillClass("gratis")
  ])}"${ssrRenderAttr("aria-pressed", $setup.state.precio === "gratis")} data-v-3f171a5d> Gratis </button><button class="${ssrRenderClass([
    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-base-content border transition-all",
    $setup.precioPillClass("pagado")
  ])}"${ssrRenderAttr("aria-pressed", $setup.state.precio === "pagado")} data-v-3f171a5d> Pagado </button></div></fieldset></div></div></div></div>`);
  if ($setup.isMounted) {
    ssrRenderTeleport(_push, (_push2) => {
      _push2(`<!--[-->`);
      ssrRenderList($setup.activeFilters, (chip) => {
        _push2(`<button class="chip badge badge-primary h-7 px-3 text-xs text-primary-content font-bold uppercase tracking-wider gap-1.5 shrink-0 border-none hover:bg-error hover:text-white transition-colors cursor-pointer group"${ssrRenderAttr("aria-label", `Quitar filtro: ${chip.label}`)} data-v-3f171a5d>${ssrInterpolate(chip.label)} <span aria-hidden="true" class="text-[14px] leading-none mb-px" data-v-3f171a5d>×</span></button>`);
      });
      _push2(`<!--]-->`);
      if ($setup.hasFilter) {
        _push2(`<button id="reset-filters" class="btn btn-xs btn-ghost text-error font-semibold rounded-full" data-v-3f171a5d> Limpiar todo </button>`);
      } else {
        _push2(`<!---->`);
      }
    }, "#active-chips", false, _parent);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/destinos/FiltrosDestinos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FiltrosDestinos = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3f171a5d"]]);

const $$Astro$1 = createAstro();
const $$DestinoCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DestinoCard;
  const { d, token = "", initialFavorited = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="destino-card relative group block rounded-2xl z-10 hover:z-50 shadow-base hover:shadow-2xl transition duration-300"${addAttribute(d.name.toLowerCase(), "data-name")}${addAttribute(d.description.toLowerCase(), "data-description")}${addAttribute(d.type, "data-tipo")}${addAttribute(d.provinceSlug, "data-provincia")}${addAttribute(d.region, "data-region")}${addAttribute(d.price, "data-precio")}${addAttribute((d.tags ?? []).join(","), "data-tags")}${addAttribute(d.href, "data-href")}${addAttribute(d.name, "data-modal-name")}${addAttribute(d.description, "data-modal-desc")}${addAttribute(d.province, "data-modal-province")}${addAttribute(d.provinceColor, "data-modal-province-color")}${addAttribute(d.region, "data-modal-region")}${addAttribute(d.price, "data-modal-price")}${addAttribute(d.type, "data-modal-type")}${addAttribute(d.image, "data-modal-image")}${addAttribute(d.images ? [d.image, ...d.images.filter((img) => img !== d.image)].join(
    ","
  ) : "", "data-modal-images")}${addAttribute((d.tags ?? []).join(","), "data-modal-tags")} data-astro-cid-soigcsrw> <!-- Full clickable link overlay --> <a${addAttribute(d.href, "href")} class="absolute inset-0 z-30"${addAttribute(`Ver destino: ${d.name}`, "aria-label")} data-astro-cid-soigcsrw></a> <!-- Image section (takes up most of the card) --> <div class="relative h-56 sm:h-64 bg-base-300 overflow-hidden rounded-t-2xl" data-astro-cid-soigcsrw${addAttribute(renderTransition($$result, "4ytfqdva", "", `img-destino-${d.provinceSlug}-${d.poiSlug}`), "data-astro-transition-scope")}> <figure class="w-full h-full m-0" data-astro-cid-soigcsrw> ${renderComponent($$result, "Image", $$Image, { "src": d.image, "alt": d.name, "width": 500, "height": 400, "widths": [300, 500, 800], "sizes": "(max-width: 640px) 300px, (max-width: 1024px) 500px, 800px", "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110", "data-astro-cid-soigcsrw": true })} </figure> <!-- Gradient overlay for hover content --> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-soigcsrw></div> <!-- Type badge (top-left) --> <div class="absolute top-3 left-3 z-10 flex gap-1.5" data-astro-cid-soigcsrw> <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-white/20 backdrop-blur-md text-white border border-white/15 shadow-sm card-type-badge"${addAttribute(d.type, "data-type")} data-astro-cid-soigcsrw> <span class="w-3.5 h-3.5 card-icon flex items-center justify-center shrink-0" data-astro-cid-soigcsrw>${unescapeHTML(ICONS[d.type])}</span> ${TYPE_LABELS[d.type] ?? d.type} </span> </div> <!-- Price badge (top-right) --> <div class="absolute top-3 right-3 z-10" data-astro-cid-soigcsrw> <span${addAttribute(`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide backdrop-blur-md shadow-sm border ${d.price === "gratis" ? "bg-emerald-500/25 text-white border-emerald-400/20" : "bg-amber-500/25 text-white border-amber-400/20"}`, "class")} data-astro-cid-soigcsrw> ${d.price === "gratis" ? "GRATIS" : "PAGADO"} </span> </div> <!-- Hover overlay: just a subtle gradient, no text --> <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-soigcsrw></div> </div> <!-- Info below image --> <div class="p-3 bg-base-100" data-astro-cid-soigcsrw> <div class="flex items-center gap-2 mb-1" data-astro-cid-soigcsrw> <span class="w-2 h-2 rounded-full shrink-0"${addAttribute(`background:${d.provinceColor}`, "style")} data-astro-cid-soigcsrw></span> <span class="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider" data-astro-cid-soigcsrw>${d.province}</span> <span class="text-[11px] text-base-content/30" data-astro-cid-soigcsrw>·</span> <span class="text-[11px] text-base-content/40" data-astro-cid-soigcsrw>${d.region}</span> </div> <h3 class="font-heading font-bold text-base-content text-[15px] leading-tight group-hover:text-primary transition-colors line-clamp-1" data-astro-cid-soigcsrw> ${d.name} </h3> <!-- Description + tags: visible on hover, drops down smoothly --> <div class="card-details absolute left-0 right-0 bottom-0 translate-y-[80%] group-hover:translate-y-full bg-base-100 rounded-b-2xl px-3 pb-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out z-40 shadow-xl border border-t-0 border-base-content/10" data-astro-cid-soigcsrw> <div class="overflow-hidden" data-astro-cid-soigcsrw> <p class="text-base-content/60 text-xs leading-relaxed line-clamp-2 mt-2" data-astro-cid-soigcsrw> ${d.description} </p> <div class="flex flex-wrap items-center gap-1.5 mt-2" data-astro-cid-soigcsrw> ${(d.tags ?? []).slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-0.5 rounded-full bg-base-200 text-base-content/60 text-[10px] font-medium" data-astro-cid-soigcsrw> ${tag} </span>`)} </div> </div> </div> </div> </article> `;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/DestinoCard.astro", "self");

const $$DestinoModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="poi-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4" aria-modal="true" role="dialog" data-astro-cid-w5q6mrel> <!-- Backdrop --> <div id="modal-backdrop" class="absolute inset-0 bg-black/40 backdrop-blur-sm" data-astro-cid-w5q6mrel></div> <!-- Panel --> <div class="modal-panel relative bg-base-100 rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg transform transition-all duration-300 scale-95 opacity-0" data-astro-cid-w5q6mrel> <!-- Image --> <div class="relative h-56 overflow-hidden bg-base-300" data-astro-cid-w5q6mrel> <figure id="modal-gallery" class="w-full h-full m-0" data-astro-cid-w5q6mrel> <!-- Injected via FilterScript --> </figure> <button id="modal-close" class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition" data-astro-cid-w5q6mrel> ${renderComponent($$result, "Icon", $$Icon, { "name": "close", "class": "w-4 h-4", "data-astro-cid-w5q6mrel": true })} </button> <div class="absolute bottom-3 left-3 z-10 pointer-events-none" data-astro-cid-w5q6mrel> <span id="modal-price-badge" class="px-3 py-1 rounded-full text-xs font-bold shadow-sm" data-astro-cid-w5q6mrel></span> </div> </div> <!-- Content --> <div class="p-6" data-astro-cid-w5q6mrel> <div class="flex items-center gap-2 mb-3" data-astro-cid-w5q6mrel> <span id="modal-prov-dot" class="w-3 h-3 rounded-full shrink-0" data-astro-cid-w5q6mrel></span> <span id="modal-province" class="text-xs font-bold text-base-content/50 uppercase tracking-wider" data-astro-cid-w5q6mrel></span> <span class="text-base-content/30" data-astro-cid-w5q6mrel>·</span> <span id="modal-region" class="text-xs text-base-content/50" data-astro-cid-w5q6mrel></span> <span id="modal-type-pill" class="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent/10 border border-accent/20 text-accent" data-astro-cid-w5q6mrel></span> </div> <h2 id="modal-name" class="font-heading font-bold text-2xl text-base-content mb-2 leading-tight" data-astro-cid-w5q6mrel></h2> <p id="modal-desc" class="text-base-content/70 text-sm leading-relaxed mb-4" data-astro-cid-w5q6mrel></p> <div id="modal-tags" class="flex flex-wrap gap-1.5 mb-6" data-astro-cid-w5q6mrel></div> <a id="modal-link" href="#" class="btn btn-secondary w-full rounded-2xl transition-all" data-astro-cid-w5q6mrel>
Ver destino completo →
</a> </div> </div> </div> `;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/DestinoModal.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get("auth_token")?.value ?? "";
  const page = Number(Astro2.url.searchParams.get("page") || 1);
  const type = Astro2.url.searchParams.get("type") || void 0;
  const provinceId = Astro2.url.searchParams.get("provinceId") || void 0;
  const region = Astro2.url.searchParams.get("region") || void 0;
  const price = Astro2.url.searchParams.get("price") || void 0;
  const search = Astro2.url.searchParams.get("search") || void 0;
  const [{ provinces, meta }, { destinationIds: favDestinationIds }] = await Promise.all([
    getProvincesWithDestinations({
      page,
      limit: 12,
      type,
      provinceId,
      region,
      price,
      search
    }),
    getFavoriteIds(token)
  ]);
  const allDestinos = Object.entries(provinces).flatMap(
    ([provinceSlug, province]) => province.pois.map((poi) => ({
      ...poi,
      province: province.name,
      provinceSlug,
      region: province.region,
      provinceColor: province.color,
      poiSlug: slugify(poi.name),
      href: `/destinos/${provinceSlug}/${slugify(poi.name)}`
    }))
  );
  const regiones = [
    ...new Set(Object.values(provinces).map((p) => p.region))
  ].sort();
  const provinciasList = Object.entries(provinces).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([slug, prov]) => ({ slug, name: prov.name }));
  const initialState = {
    tipo: type,
    provincia: provinceId,
    region,
    precio: price,
    search
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Destinos \u2014 DominicanGo", "description": "Explora todos los destinos tur\xEDsticos de Rep\xFAblica Dominicana." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-14"> ${renderComponent($$result2, "DestinosHero", $$DestinosHero, { "totalCount": meta.total, "provinceCount": Object.keys(provinces).length })} <div class="max-w-[1400px] mx-auto px-4 sm:px-6 pb-16"> <section class="w-full"> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-40"> <div class="flex flex-wrap items-center gap-2" id="active-chips"> <span id="result-count" class="text-sm text-base-content/70 font-medium">${meta.total} destinos</span> </div> ${renderComponent($$result2, "FiltrosDestinos", FiltrosDestinos, { "client:load": true, "data-astro-transition-persist": "filtros-destinos", "tipos": TIPOS, "typeLabels": TYPE_LABELS, "regiones": regiones, "regionColors": REGION_COLORS, "provincias": provinciasList, "initialState": initialState, "client:component-hydration": "load", "client:component-path": "@/components/destinos/FiltrosDestinos.vue", "client:component-export": "default" })} </div> <div id="destinos-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${allDestinos.map((d) => renderTemplate`${renderComponent($$result2, "DestinoCard", $$DestinoCard, { "d": d, "token": token, "initialFavorited": favDestinationIds.has(d.id) })}`)} </div> <!-- Pagination --> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": meta.page, "totalPages": meta.totalPages, "baseUrl": "/destinos", "searchParams": Astro2.url.searchParams })} <!-- Empty state --> <div id="empty-state"${addAttribute(`${allDestinos.length === 0 ? "block" : "hidden"} text-center py-24`, "class")}> <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-base-200 flex items-center justify-center"> <svg class="w-8 h-8 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg> </div> <h3 class="font-heading font-semibold text-base-content text-xl mb-2">
Sin resultados
</h3> <p class="text-base-content/60 text-sm">
Intenta con otros filtros o términos de búsqueda.
</p> <a href="/destinos" class="btn btn-outline btn-primary btn-sm rounded-full mt-4">
Limpiar filtros
</a> </div> </section> </div> </main> ${renderComponent($$result2, "DestinoModal", $$DestinoModal, {})}  ${renderScript($$result2, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/index.astro", "self");

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/index.astro";
const $$url = "/destinos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
