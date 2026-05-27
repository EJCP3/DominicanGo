import { c as createComponent, m as maybeRenderHead, a as renderTemplate, d as addAttribute, f as renderScript, b as createAstro, r as renderComponent, F as Fragment, q as renderSlot, v as renderHead } from './astro/server_BPHVUzso.mjs';
import 'piccolore';
/* empty css                            */
import 'clsx';
import { b as getProvincesWithDestinations, s as slugify, f as getDestinations, g as getUser } from './api_BnOIfECD.mjs';
import { useSSRContext, defineComponent, ref, computed, onMounted, onUnmounted, mergeProps, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const $$IconSprite = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg width="0" height="0" class="hidden" style="display: none;" aria-hidden="true"> <!-- General UI --> <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </symbol> <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 18L18 6M6 6l12 12"></path> </symbol> <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 13l4 4L19 7"></path> </symbol> <symbol id="icon-cash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path> </symbol> <symbol id="icon-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </symbol> <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14M12 5l7 7-7 7"></path> </symbol> <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 12H5M12 19l-7-7 7-7"></path> </symbol> <symbol id="icon-arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> </symbol> <symbol id="icon-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle> </symbol> <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line> </symbol> <symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline> </symbol> <symbol id="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </symbol> <!-- Seasons / Themes --> <symbol id="icon-seasons" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path> </symbol> <symbol id="icon-spring" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="3"></circle><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"></path> </symbol> <symbol id="icon-summer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path> </symbol> <symbol id="icon-autumn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path> </symbol> <symbol id="icon-winter" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m20 17.5-6.5-6.5"></path><path d="m4 6.5 6.5 6.5"></path><path d="m20 6.5-6.5 6.5"></path><path d="m4 17.5 6.5-6.5"></path><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="m16 9-4-4-4 4"></path><path d="m16 15-4 4-4-4"></path> </symbol> <symbol id="icon-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"></path> </symbol> </svg>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/ui/IconSprite.astro", void 0);

const $$Astro$6 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/node_modules/.pnpm/astro@5.18.1_@vercel+functi_6c629c168703b0977f33b0fd560f9bbe/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/node_modules/.pnpm/astro@5.18.1_@vercel+functi_6c629c168703b0977f33b0fd560f9bbe/node_modules/astro/components/ClientRouter.astro", void 0);

const $$ViewToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Toggle now lives in the Header — this component no longer renders anything -->`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/ViewToggle.astro", void 0);

const $$Astro$5 = createAstro();
const $$RandomDestinationPop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$RandomDestinationPop;
  const { provinces } = await getProvincesWithDestinations();
  const allDestinations = [];
  try {
    for (const [provId, provData] of Object.entries(provinces)) {
      if (provData && provData.pois) {
        provData.pois.forEach((poi) => {
          if (poi && poi.name) {
            allDestinations.push({
              nombre: poi.name,
              desc: poi.description || "Un hermoso lugar por descubrir en Rep\xFAblica Dominicana.",
              url: `/destinos/${provId}/${poi.slug || slugify(poi.name)}`
            });
          }
        });
      }
    }
  } catch {
  }
  return renderTemplate`${maybeRenderHead()}<div class="fixed bottom-28 md:bottom-6 right-1 z-50 flex flex-col items-end pointer-events-none" data-astro-cid-pwzsdgqo> <!-- Popover Tooltip --> <div id="random-popover" class="mb-3 bg-base-100 rounded-3xl p-5 shadow-xl border border-base-200 w-72 invisible opacity-0 scale-95 transition-all duration-300 ease-out origin-bottom-right" data-astro-cid-pwzsdgqo> <div class="flex items-center justify-between mb-3" data-astro-cid-pwzsdgqo> <h3 class="text-sm font-semibold text-base-content/80" data-astro-cid-pwzsdgqo>¿A dónde vamos hoy?</h3> <button id="close-random-btn" class="btn btn-circle btn-ghost btn-xs text-base-content/50 hover:bg-base-200" data-astro-cid-pwzsdgqo> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-pwzsdgqo> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-pwzsdgqo></path> </svg> </button> </div> <p id="random-dest-desc" class="text-sm text-base-content/70 my-3 leading-snug line-clamp-3 italic" data-astro-cid-pwzsdgqo>
Encontrando tu próxima aventura...
</p> <a id="random-dest-link" href="" data-no-smooth class="flex flex-col items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-2xl p-4 text-center transition-colors group mt-2" data-astro-cid-pwzsdgqo> <span id="random-dest-name" class="text-lg leading-tight mb-1 text-balance" data-astro-cid-pwzsdgqo>Descubriendo...</span> <span class="text-xs font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all inline-flex items-center gap-1" data-astro-cid-pwzsdgqo>
Explorar destino
<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline-block" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-pwzsdgqo> <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-pwzsdgqo></path> </svg> </span> </a> </div> <!-- Bolita Trigger — destinations injected as a data attribute --> <button id="random-trigger" class="btn btn-circle btn-accent btn-lg shadow-2xl hover:scale-110 active:scale-95 transition-transform pointer-events-auto" aria-label="Destino Aleatorio"${addAttribute(JSON.stringify(allDestinations), "data-destinations")} data-astro-cid-pwzsdgqo> <!-- Shuffle Icon --> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7" data-astro-cid-pwzsdgqo> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" data-astro-cid-pwzsdgqo></path> </svg> </button> </div>  ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/RandomDestinationPop.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/destinos/RandomDestinationPop.astro", void 0);

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ImageLightbox",
  setup(__props, { expose: __expose }) {
    __expose();
    const isOpen = ref(false);
    const images = ref([]);
    const currentIndex = ref(0);
    const baseAlt = ref("");
    const activeImage = computed(() => images.value[currentIndex.value] || "");
    const activeAlt = computed(() => {
      if (images.value.length <= 1) return baseAlt.value;
      return `${baseAlt.value} (${currentIndex.value + 1} / ${images.value.length})`;
    });
    function open(payload) {
      if (Array.isArray(payload.images)) {
        images.value = payload.images;
        currentIndex.value = payload.currentIndex || 0;
      } else {
        images.value = [payload.img];
        currentIndex.value = 0;
      }
      baseAlt.value = payload.alt || "";
      isOpen.value = true;
      document.body.style.overflow = "hidden";
    }
    function close() {
      isOpen.value = false;
      images.value = [];
      document.body.style.overflow = "";
    }
    function next() {
      if (images.value.length <= 1) return;
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    }
    function prev() {
      if (images.value.length <= 1) return;
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
    }
    function handleKeydown(e) {
      if (!isOpen.value) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("open-lightbox", (e) => {
        open(e.detail);
      });
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    const __returned__ = { isOpen, images, currentIndex, baseAlt, activeImage, activeAlt, open, close, next, prev, handleKeydown };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.isOpen) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 select-none" }, _attrs))} data-v-127970f2><button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2" aria-label="Cerrar" data-v-127970f2><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-127970f2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-127970f2></path></svg></button>`);
    if ($setup.images.length > 1) {
      _push(`<button class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/5" aria-label="Anterior" data-v-127970f2><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-127970f2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-127970f2></path></svg></button>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.images.length > 1) {
      _push(`<button class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all z-[110] backdrop-blur-sm border border-white/5" aria-label="Siguiente" data-v-127970f2><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-127970f2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-127970f2></path></svg></button>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="relative max-w-full max-h-full flex flex-col items-center justify-center animate-in zoom-in duration-300 pointer-events-none" data-v-127970f2><img${ssrRenderAttr("src", $setup.activeImage)}${ssrRenderAttr("alt", $setup.activeAlt)} class="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl pointer-events-auto" data-v-127970f2><div class="mt-6 text-center px-4" data-v-127970f2><p class="text-white/90 text-sm md:text-base font-medium tracking-wide drop-shadow-md" data-v-127970f2>${ssrInterpolate($setup.activeAlt)}</p></div>`);
    if ($setup.images.length > 1) {
      _push(`<div class="flex gap-1.5 mt-4" data-v-127970f2><!--[-->`);
      ssrRenderList($setup.images, (_, index) => {
        _push(`<div class="${ssrRenderClass([index === $setup.currentIndex ? "bg-primary w-4" : "bg-white/20", "w-1.5 h-1.5 rounded-full transition-all duration-300"])}" data-v-127970f2></div>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/ImageLightbox.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ImageLightbox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-127970f2"]]);

const $$Astro$4 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Icon;
  const { name, class: className = "w-4 h-4" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(className, "class")} aria-hidden="true" focusable="false"> <use${addAttribute(`#icon-${name}`, "href")}></use> </svg>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/ui/Icon.astro", void 0);

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FooterCarousel",
  props: {
    destinations: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const baseImages = computed(() => {
      const images = [];
      props.destinations.forEach((dest) => {
        if (dest.image) images.push({ url: dest.image, name: dest.name });
        if (dest.images && Array.isArray(dest.images)) {
          dest.images.forEach((img) => {
            const url = typeof img === "string" ? img : img.url;
            if (url) images.push({ url, name: dest.name });
          });
        }
      });
      return images.filter((v, i, a) => a.findIndex((t) => t.url === v.url) === i);
    });
    const displayedImages = computed(() => {
      const list = baseImages.value;
      if (list.length === 0) return [];
      let repeated = [...list];
      while (repeated.length < 15) {
        repeated = [...repeated, ...list];
      }
      return [...repeated, ...repeated];
    });
    const openLightbox = (index) => {
      const urls = baseImages.value.map((img) => img.url);
      const item = baseImages.value[index % baseImages.value.length];
      window.dispatchEvent(new CustomEvent("open-lightbox", {
        detail: {
          images: urls,
          currentIndex: index % baseImages.value.length,
          alt: item.name
        }
      }));
    };
    const isPaused = ref(false);
    const __returned__ = { props, baseImages, displayedImages, openLightbox, isPaused };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full overflow-hidden bg-black py-1 border-y border-white/10 relative group h-70 flex items-center" }, _attrs))} data-v-bf327a17><div class="${ssrRenderClass([{ "pause-animation": $setup.isPaused }, "flex gap-2 min-w-max animate-marquee"])}" data-v-bf327a17><!--[-->`);
  ssrRenderList($setup.displayedImages, (img, index) => {
    _push(`<div class="relative h-60 aspect-square overflow-hidden cursor-pointer group/item rounded-lg border border-white/10 shrink-0 shadow-lg" data-v-bf327a17><img${ssrRenderAttr("src", img.url)}${ssrRenderAttr("alt", img.name)} class="w-full h-full object-cover grayscale-30 group-hover/item:grayscale-0 transition-all duration-700 scale-105 group-hover/item:scale-110" loading="lazy" data-v-bf327a17><div class="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center p-2 backdrop-blur-[1px]" data-v-bf327a17><span class="text-[10px] font-bold text-white uppercase tracking-widest text-center leading-tight drop-shadow-md" data-v-bf327a17>${ssrInterpolate(img.name)}</span></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/FooterCarousel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FooterCarousel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-bf327a17"]]);

const datosRD = [
	"La Catedral de Santo Domingo es la más antigua de América.",
	"El Pico Duarte es el punto más alto del Caribe (3,087m).",
	"El Larimar solo se encuentra en República Dominicana.",
	"Tenemos el lago más grande del Caribe (Lago Enriquillo).",
	"La primera ciudad fundada en el Nuevo Mundo fue La Isabela.",
	"La Zona Colonial de Santo Domingo es Patrimonio de la Humanidad desde 1990.",
	"El Parque Nacional Submarino La Caleta alberga el naufragio del Hickory, cubierto de coral.",
	"Las Salinas de Baní (Punta Salinas) son uno de los mejores puntos de windsurf y kitesurf del Caribe.",
	"El Parque Nacional Sierra de Neiba protege uno de los bosques más húmedos del suroeste del país.",
	"Las playas San Rafael y Los Patos son de los pocos lugares donde un río de montaña desemboca directamente en el mar Caribe.",
	"El mercado binacional de Dajabón es uno de los intercambios comerciales fronterizos más grandes del Caribe.",
	"San Francisco de Macorís produce uno de los cacaos finos de aroma más reconocidos del mundo.",
	"El río Artibonito, que nace en esta provincia, es el río más largo de toda la isla de La Española.",
	"El Parque Nacional del Este resguarda la Isla Saona, una de las playas más fotografiadas del Caribe.",
	"Los 27 Charcos de Damajagua son una serie de cascadas y pozas turquesas únicas en la Cordillera Septentrional.",
	"La Cueva de Fun Fun ofrece una de las experiencias de espeleología más completas de la región, con rápel y ríos subterráneos.",
	"En Conuco nació Minerva Mirabal, símbolo mundial de la lucha contra la dictadura.",
	"El Lago Enriquillo, en esta provincia, es el punto más bajo del Caribe con -40 metros sobre el nivel del mar.",
	"Punta Cana recibe más del 60% de todos los turistas que visitan la República Dominicana.",
	"Altos de Chavón es una réplica de un pueblo medieval del siglo XVI construida sobre el Río Chavón.",
	"La Reserva Científica Ébano Verde protege la especie de árbol más amenazada de la Cordillera Central.",
	"Playa Grande en Cabrera ha sido catalogada como una de las 10 playas más hermosas del Caribe.",
	"Bonao alberga una de las minas de ferroníquel más grandes de América Latina.",
	"El Morro es una meseta calcárea de 242 metros que domina el paisaje árido del noroeste del país.",
	"Esta provincia es puerta de entrada al sector norte del Parque Nacional Los Haitises.",
	"Bahía de las Águilas tiene 8 km de arena blanca sin un solo hotel, restaurante ni construcción.",
	"Las Dunas de Baní (Las Calderas) son el campo de dunas más grande de las Antillas, formadas por arenas oscuras de origen volcánico.",
	"El teleférico de Isabel de Torres es el único teleférico del Caribe y asciende 800 metros.",
	"Cada año, más de 3,000 ballenas jorobadas migran a la Bahía de Samaná para aparearse.",
	"Las Grutas del Pomier albergan más de 6,000 pictografías taínas, la mayor colección del Caribe.",
	"El Salto La Jalda, en Miches, es la cascada más alta del Caribe con aproximadamente 120 metros de altura.",
	"El Corral de los Indios es el mayor monumento ceremonial taíno conservado en La Española.",
	"Esta provincia ha dado al béisbol más jugadores de Grandes Ligas per cápita que ningún otro lugar del mundo.",
	"La Presa de Hatillo es una de las mayores reservas de agua dulce de toda la isla.",
	"El Monumento a los Héroes de la Restauración tiene 67 metros de altura y domina el Valle del Cibao.",
	"El Parque Nacional Armando Bermúdez es la principal fuente de agua del río Yaque del Norte.",
	"La Línea Noroeste, que atraviesa esta provincia, fue históricamente la ruta comercial más importante del Cibao occidental.",
	"El Museo del Ámbar en Puerto Plata prestó la pieza de ámbar con el mosquito que fue utilizada en la película Jurassic Park de 1993."
];

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  const datoVibra = datosRD[Math.floor(Math.random() * datosRD.length)];
  const { data: destinations } = await getDestinations({ limit: 12 });
  return renderTemplate`${maybeRenderHead()}<footer class="relative z-40 w-full"> <!-- Seccion Superior: DaisyUI Base Color --> <div class="bg-base-200 py-16 px-6 sm:px-12 border-t border-base-300"> <div class="max-w-[1400px] mx-auto"> <div class="flex flex-col lg:flex-row justify-between gap-12"> <!-- Columna Izquierda: Logo Gigante --> <div class="flex-1"> <h2 class="font-heading font-black text-6xl md:text-6xl tracking-tighter mb-8 max-w-sm">
Dominican <br> <span class="text-primary inline-block">Go</span> </h2> <div class="space-y-4"> <span class="inline-block px-3 py-1 bg-neutral text-neutral-content text-[10px] font-bold uppercase tracking-widest rounded-sm">Visítanos</span> <span class="inline-block px-3 py-1 bg-neutral text-neutral-content text-[10px] font-bold uppercase tracking-widest rounded-sm">Descubre</span> <span class="inline-block px-3 py-1 bg-neutral text-neutral-content text-[10px] font-bold uppercase tracking-widest rounded-sm">Vive</span> <p class="text-sm font-medium leading-relaxed max-w-xs text-base-content">
República Dominicana, <br>
Desde la <span class="text-base-content font-black">Zona Colonial</span> hasta el <span class="text-base-content font-black">Pico Duarte</span>.
</p> </div> </div> <!-- Columna Centro: Navegación --> <div class="flex gap-16 md:gap-24"> <nav aria-label="Navegación del pie de página"> <h4 class="text-[10px] font-bold uppercase tracking-widest text-base-content/40 mb-6 font-heading">Explora</h4> <ul class="grid grid-cols-3 gap-2"> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Playas</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Naturaleza</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Aventura</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Cultura</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Museo</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Gastronomia</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Parque</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">compras</li> <li class="badge badge-outline text-sm font-bold no-underline transition-all">Montaña</li> </ul> </nav> </div> <!-- Columna Derecha: Widget interactivo (estilo Spotify) --> <aside class="lg:w-[400px] h-full " aria-label="Dato Curioso"> <div class="bg-neutral text-neutral-content rounded-3xl p-6 shadow-2xl relative overflow-hidden group"> <div class="flex items-center justify-between mb-8"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-success-content text-xl"> <img src="/RD.svg" alt="RD" class="size-10"> </div> <div> <p class="text-[14px] font-bold uppercase tracking-widest ">Sabias que...</p> </div> </div> </div> <div class="space-y-6 relative z-10"> <div class="min-h-[90px] flex items-center"> <h3 id="dato-vibra-text" class="text-2xl font-light leading-tight">${datoVibra}</h3> </div> <div class="flex items-center justify-between pt-4"> <div class="flex items-center gap-4"> <button class="hover:scale-110 transition-transform" aria-label="Dato anterior">${renderComponent($$result, "Icon", $$Icon, { "name": "prev", "class": "w-4 h-4" })}</button> <button id="play-btn" class="w-12 h-12 bg-success text-success-content border-none rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-success/20" aria-label="Volar"> <span id="play-icon" class="flex items-center justify-center w-5 h-5"> ${renderComponent($$result, "Icon", $$Icon, { "name": "plane", "class": "w-5 h-5 animate-[spin_4s_linear_infinite]" })} </span> </button> <button class="hover:scale-110 transition-transform" aria-label="Siguiente dato">${renderComponent($$result, "Icon", $$Icon, { "name": "next", "class": "w-4 h-4" })}</button> </div> <div id="en-vivo-badge" class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md relative overflow-hidden"> <span id="en-vivo-text">En Vivo</span> </div> </div> </div> <!-- Fondo decorativo sutil --> <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-success/10 rounded-full blur-3xl group-hover:bg-success/20 transition-colors"></div> </div> </aside> </div> </div> </div> <!-- Seccion Media: Carrusel Automático de Destinos --> <div class="bg-primary pt-0"> ${renderComponent($$result, "FooterCarousel", FooterCarousel, { "client:visible": true, "destinations": destinations, "client:component-hydration": "visible", "client:component-path": "@/components/ui/FooterCarousel.vue", "client:component-export": "default" })} </div> <!-- Seccion Inferior: Dark Footer --> <div class="bg-neutral py-10 px-6 sm:px-12 text-[10px] font-bold uppercase tracking-widest"> <div class="px-4 md:px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-0 text-center md:text-left text-[10px] text-neutral-content/50 tracking-widest uppercase max-w-[1400px] w-full mx-auto"> <span class="flex flex-col sm:flex-row items-center gap-2 text-neutral-content"> ${renderComponent($$result, "Icon", $$Icon, { "name": "map", "class": "w-3 h-3 hidden sm:inline-block" })}
Guía Turística Interactiva de República Dominicana &hearts;
</span> <span class="text-neutral-content">&copy; 2026 DominicanGo &bull; Hecho con &hearts; en RD</span> </div> </div> </footer> ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/layout/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/layout/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "DominicanGo \u2014 Mapa Interactivo de Rep\xFAblica Dominicana",
    description = "Explora Rep\xFAblica Dominicana provincia por provincia. Gu\xEDa tur\xEDstica interactiva con mapa, playas, monta\xF1as, cultura y aventura.",
    image = "/og-image.jpg",
    showWidgets = true
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html lang="es" data-theme="cupcake"> <head><meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="index, follow"><meta name="description"', '><link rel="canonical"', '><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><script>\n            // Evita el flashazo blanco/oscuro aplicando el tema antes del render\n            (function () {\n                var theme = localStorage.getItem("theme");\n                if (!theme) {\n                    theme = "cupcake"; // Verano / default\n                    localStorage.setItem("theme", theme);\n                }\n                document.documentElement.setAttribute("data-theme", theme);\n\n                // Retener el tema durante Single Page Navigations (ViewTransitions)\n                document.addEventListener("astro:after-swap", function () {\n                    var currentTheme =\n                        localStorage.getItem("theme") || "cupcake";\n                    document.documentElement.setAttribute(\n                        "data-theme",\n                        currentTheme,\n                    );\n                });\n            })();\n        <\/script><title>', "</title>", '</head> <body class="font-body min-h-screen"> ', " ", " ", " ", " ", " </body></html>"])), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), addAttribute(description, "content"), addAttribute(Astro2.url.href, "href"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), title, renderHead(), renderComponent($$result, "IconSprite", $$IconSprite, {}), renderSlot($$result, $$slots["default"]), showWidgets && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ViewToggle", $$ViewToggle, {})} ${renderComponent($$result2, "RandomDestinationPop", $$RandomDestinationPop, {})} ` })}`, renderComponent($$result, "ImageLightbox", ImageLightbox, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/ImageLightbox.vue", "client:component-export": "default" }), renderComponent($$result, "Footer", $$Footer, {}));
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/layouts/Layout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$ThemeScript = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ThemeScript;
  return renderTemplate(_a || (_a = __template([`<script>
    function initThemeDropdown() {
        const themeBtns = document.querySelectorAll(".theme-btn");
        if (!themeBtns.length) return; // Salir si no encuentra los botones

        // 1. Leer el tema actual (por defecto 'cupcake')
        const currentTheme = localStorage.getItem("theme") || "cupcake";

        // 2. Marcar el bot\xF3n activo al cargar la p\xE1gina
        themeBtns.forEach((btn) => {
            const btnTheme = btn.getAttribute("data-theme-btn");
            if (btnTheme === currentTheme) {
                btn.classList.add(
                    "bg-base-200",
                    "text-primary-content",
                    "font-bold",
                );
                btn.classList.remove("font-medium");
            } else {
                btn.classList.remove(
                    "bg-base-200",
                    "text-primary-content",
                    "font-bold",
                );
                btn.classList.add("font-medium");
            }
        });

        // 3. Agregar el evento de clic a cada bot\xF3n
        themeBtns.forEach((btn) => {
            // Usamos una funci\xF3n tradicional para asegurarnos de que no se dupliquen eventos
            btn.onclick = function (e) {
                const newTheme =
                    this.getAttribute("data-theme-btn") || "cupcake";

                // Cambiar el tema en el HTML y guardar
                document.documentElement.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);

                // Limpiar todos los botones
                themeBtns.forEach((b) => {
                    b.classList.remove(
                        "bg-base-200",
                        "text-primary-content",
                        "font-bold",
                    );
                    b.classList.add("font-medium");
                });

                // Resaltar solo el bot\xF3n clickeado
                this.classList.add(
                    "bg-base-200",
                    "text-primary-content",
                    "font-bold",
                );
                this.classList.remove("font-medium");

                // Cerrar el dropdown quitando el foco
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            };
        });
    }

    // Ejecutar en cada navegaci\xF3n (inicial de navegador o recarga por p\xE1gina SPA de Astro)
    document.addEventListener("astro:page-load", initThemeDropdown);
<\/script>`])));
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/layout/header/ThemeScript.astro", void 0);

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeaderSearch",
  props: {
    apiBase: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const query = ref("");
    const isOpen = ref(false);
    const searchRef = ref(null);
    const isLoading = ref(false);
    const results = ref([]);
    let debounceTimer = null;
    watch(query, (newVal) => {
      const q = newVal.trim();
      if (q.length < 2) {
        results.value = [];
        isOpen.value = false;
        return;
      }
      if (debounceTimer) clearTimeout(debounceTimer);
      isLoading.value = true;
      isOpen.value = true;
      results.value = [];
      debounceTimer = setTimeout(async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=20`);
          if (!res.ok) throw new Error("Search failed");
          const json = await res.json();
          if (json.success && json.data) {
            const ql = q.toLowerCase();
            const mapped = json.data.map((dest) => ({
              name: dest.name,
              slug: dest.poiSlug,
              type: dest.type,
              // Try every possible image field the API might return
              image: dest.thumbImage || dest.images && dest.images[0]?.url || dest.images && dest.images[0] || dest.imageUrl || dest.image || "",
              description: dest.description,
              province: dest.province?.name || dest.province || "",
              provinceSlug: dest.provinceSlug || ""
            }));
            mapped.sort((a, b) => {
              const an = a.name.toLowerCase();
              const bn = b.name.toLowerCase();
              const aExact = an === ql ? 0 : an.startsWith(ql) ? 1 : an.includes(ql) ? 2 : 3;
              const bExact = bn === ql ? 0 : bn.startsWith(ql) ? 1 : bn.includes(ql) ? 2 : 3;
              return aExact - bExact;
            });
            results.value = mapped.slice(0, 8);
          } else {
            results.value = [];
          }
        } catch (err) {
          console.error(err);
          results.value = [];
        } finally {
          isLoading.value = false;
        }
      }, 300);
    });
    function goTo(dest) {
      if (dest.provinceSlug && dest.slug) {
        window.location.href = `/destinos/${dest.provinceSlug}/${dest.slug}`;
      }
    }
    function handleClickOutside(e) {
      if (searchRef.value && !searchRef.value.contains(e.target)) {
        isOpen.value = false;
      }
    }
    function handleFocus() {
      if (results.value.length > 0 && query.value.length >= 2) {
        isOpen.value = true;
      }
    }
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    const __returned__ = { props, query, isOpen, searchRef, isLoading, results, get debounceTimer() {
      return debounceTimer;
    }, set debounceTimer(v) {
      debounceTimer = v;
    }, goTo, handleClickOutside, handleFocus };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "searchRef",
    class: "relative w-full"
  }, _attrs))} data-v-daafdacd><svg class="w-4 h-4 text-base-content/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-daafdacd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-daafdacd></path></svg><input${ssrRenderAttr("value", $setup.query)} type="text" placeholder="Buscar destino..." class="input h-10 w-full pl-10 bg-base-200/50 hover:bg-base-200/70 border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm font-medium placeholder:font-normal placeholder:text-base-content/40 transition-all" data-v-daafdacd>`);
  if ($setup.isOpen && $setup.results.length > 0) {
    _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 overflow-hidden z-50 max-h-[400px] overflow-y-auto" data-v-daafdacd><div class="p-2" data-v-daafdacd><p class="text-[10px] uppercase tracking-widest font-bold text-base-content/30 px-3 py-1.5" data-v-daafdacd>${ssrInterpolate($setup.results.length)} resultado${ssrInterpolate($setup.results.length !== 1 ? "s" : "")}</p><!--[-->`);
    ssrRenderList($setup.results, (dest) => {
      _push(`<button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-base-200/60 transition-colors text-left group cursor-pointer" data-v-daafdacd><div class="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-base-200" data-v-daafdacd>`);
      if (dest.image) {
        _push(`<img${ssrRenderAttr("src", dest.image)}${ssrRenderAttr("alt", dest.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" data-v-daafdacd>`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center text-base-content/20 text-lg" data-v-daafdacd>🏝️</div>`);
      }
      _push(`</div><div class="flex-1 min-w-0" data-v-daafdacd><p class="font-bold text-sm text-base-content truncate group-hover:text-primary transition-colors" data-v-daafdacd>${ssrInterpolate(dest.name)}</p><p class="text-[11px] text-base-content/50 truncate" data-v-daafdacd>${ssrInterpolate(dest.province || "")} `);
      if (dest.type) {
        _push(`<span class="text-base-content/30" data-v-daafdacd> · ${ssrInterpolate(dest.type)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p></div><svg class="w-4 h-4 text-base-content/20 group-hover:text-primary shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-daafdacd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-daafdacd></path></svg></button>`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.isOpen && $setup.query.length >= 2 && $setup.isLoading) {
    _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 z-50 p-6 flex flex-col items-center justify-center gap-3" data-v-daafdacd><span class="loading loading-spinner loading-md text-primary" data-v-daafdacd></span><span class="text-xs text-base-content/50 font-medium animate-pulse" data-v-daafdacd>Buscando destinos...</span></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.isOpen && $setup.query.length >= 2 && $setup.results.length === 0 && !$setup.isLoading) {
    _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-base-100 rounded-2xl shadow-2xl border border-base-200/60 z-50 p-6 text-center" data-v-daafdacd><div class="text-3xl mb-2" data-v-daafdacd>🔍</div><p class="text-sm text-base-content/50" data-v-daafdacd>No se encontraron resultados para &quot;<span class="font-bold" data-v-daafdacd>${ssrInterpolate($setup.query)}</span>&quot;</p></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/header/HeaderSearch.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const HeaderSearch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-daafdacd"]]);

const _sfc_main = {
  __name: 'FeedbackModal',
  props: {
  apiBase: {
    type: String,
    required: true
  }
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const form = ref({
  type: 'SUGGESTION',
  title: '',
  content: ''
});

const loading = ref(false);
const success = ref(false);
const error = ref(null);

const openModal = () => {
  const modal = document.getElementById('feedback_modal');
  if (modal) modal.showModal();
};

const closeModal = () => {
  document.getElementById('feedback_modal').close();
  success.value = false;
  error.value = null;
  form.value = { type: 'SUGGESTION', title: '', content: '' };
};

const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

const submitFeedback = async () => {
  loading.value = true;
  success.value = false;
  error.value = null;

  try {
    const token = getCookieValue('auth_token');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${props.apiBase}/api/feedback`, {
      method: 'POST',
      headers,
      body: JSON.stringify(form.value)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al enviar');

    success.value = true;
    form.value.title = '';
    form.value.content = '';
    
    setTimeout(() => {
      closeModal();
    }, 2000);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const __returned__ = { props, form, loading, success, error, openModal, closeModal, getCookieValue, submitFeedback, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<dialog${
    ssrRenderAttrs(mergeProps({
      id: "feedback_modal",
      class: "modal backdrop-blur-sm transition-all duration-500"
    }, _attrs))
  }><div class="modal-box max-w-md bg-base-100 border border-base-300 shadow-2xl rounded-3xl p-8 relative"><button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 hover:rotate-90 transition-transform duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button><div class="mb-6"><h3 class="font-[&#39;Gluten_Variable&#39;] text-2xl font-bold text-primary flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg> Sugerencias </h3><p class="mt-2 text-sm text-base-content/70 leading-relaxed font-medium"> ¿Encontraste un error o tienes una idea para mejorar **DominicanGo**? ¡Queremos escucharte! </p></div><form class="space-y-5"><div class="form-control"><label class="label pt-0"><span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg> Tipo de mensaje </span></label><select class="select select-bordered w-full bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none" required><option value="SUGGESTION"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.form.type))
      ? ssrLooseContain($setup.form.type, "SUGGESTION")
      : ssrLooseEqual($setup.form.type, "SUGGESTION"))) ? " selected" : ""
  }>Sugerencia</option><option value="BUG"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.form.type))
      ? ssrLooseContain($setup.form.type, "BUG")
      : ssrLooseEqual($setup.form.type, "BUG"))) ? " selected" : ""
  }>Reportar Error</option><option value="OTHER"${
    (ssrIncludeBooleanAttr((Array.isArray($setup.form.type))
      ? ssrLooseContain($setup.form.type, "OTHER")
      : ssrLooseEqual($setup.form.type, "OTHER"))) ? " selected" : ""
  }>Otro</option></select></div><div class="form-control"><label class="label pt-0"><span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h10"></path></svg> Título (Opcional) </span></label><input type="text"${
    ssrRenderAttr("value", $setup.form.title)
  } placeholder="Ej: Problema al ver fotos" class="input input-bordered w-full bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"></div><div class="form-control"><label class="label pt-0"><span class="label-text font-bold text-xs uppercase tracking-wider opacity-60 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Detalles </span></label><textarea class="textarea textarea-bordered h-28 bg-base-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none" placeholder="Describe aquí..." required>${
    ssrInterpolate($setup.form.content)
  }</textarea></div>`);
  if ($setup.success) {
    _push(`<div class="alert alert-success mt-4 rounded-xl shadow-lg border-none text-white font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>¡Gracias! Lo revisaremos pronto.</span></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($setup.error) {
    _push(`<div class="alert alert-error mt-4 rounded-xl shadow-lg border-none text-white font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate($setup.error)}</span></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="modal-action mt-8 flex gap-3"><button type="button" class="btn btn-ghost rounded-xl flex-1 hover:bg-error/10 hover:text-error transition-all font-bold"> Cerrar </button><button type="submit" class="btn btn-primary rounded-xl flex-1 shadow-md shadow-primary/20 active:scale-95 transition-all font-bold group"${(ssrIncludeBooleanAttr($setup.loading)) ? " disabled" : ""}>`);
  if ($setup.loading) {
    _push(`<span class="loading loading-spinner loading-sm"></span>`);
  } else {
    _push(`<span class="flex items-center gap-2"> Enviar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg></span>`);
  }
  _push(`</button></div></form></div><form method="dialog" class="modal-backdrop"><button>close</button></form></dialog>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/ui/FeedbackModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const FeedbackModal = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const isMapActive = currentPath === "/" || currentPath === "/index";
  const isGridActive = currentPath === "/destinos" || currentPath === "/destinos/";
  const isOnTogglePage = isMapActive || isGridActive;
  const token = Astro2.cookies.get("auth_token")?.value;
  const user = await getUser(token);
  const API_BASE = "https://dominicango-api.onrender.com/api"?.replace("/api", "") || "http://localhost:3000";
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-200/40"> <div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3"> <!-- Logo (Left) --> <div class="flex items-center shrink-0"> <a href="/" class="no-underline font-heading font-extrabold text-neutral text-lg sm:text-xl transition-all hover:opacity-80">
Dominican<span class="text-success font-extrabold text-2xl">Go</span> </a> </div> <!-- Search (Center) — visible on md+ --> <div class="hidden md:flex flex-1 max-w-md mx-4 relative"> ${renderComponent($$result, "HeaderSearch", HeaderSearch, { "client:load": true, "apiBase": API_BASE, "client:component-hydration": "load", "client:component-path": "@/components/layout/header/HeaderSearch.vue", "client:component-export": "default" })} </div> <!-- Right side: View Toggle + Hamburger --> <div class="flex items-center gap-2 sm:gap-3 shrink-0"> <!-- View Toggle (Mapa / Listas) — inline pill --> <nav id="view-toggle-header" class="hidden md:flex items-center bg-base-200/50 p-1 rounded-full relative"> <!-- Sliding Highlighter (hidden when not on a toggle page) --> <div id="header-toggle-highlighter"${addAttribute(["absolute h-[calc(100%-8px)] top-1 left-1 bg-primary rounded-full shadow-[0_2px_8px_rgba(var(--p),0.3)] z-0 pointer-events-none transition-all duration-300", !isOnTogglePage && "opacity-0"], "class:list")}></div> <a href="/" id="header-toggle-map" data-astro-prefetch="hover"${addAttribute([
    "header-toggle-btn relative z-10 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-sm font-bold transition-colors duration-300",
    isMapActive ? "text-primary-content" : "text-base-content/50 hover:text-base-content/70"
  ], "class:list")}> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
Mapa
</a> <a href="/destinos" id="header-toggle-grid" data-astro-prefetch="hover"${addAttribute([
    "header-toggle-btn relative z-10 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-sm font-bold transition-colors duration-300",
    isGridActive ? "text-primary-content" : "text-base-content/50 hover:text-base-content/70"
  ], "class:list")}> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
Listas
</a> </nav> <!-- Hamburger Menu (all screen sizes) --> <div class="dropdown dropdown-end"> <button tabindex="0" class="btn btn-ghost btn-circle btn-sm" aria-label="Abrir menú"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path> </svg> </button> <ul tabindex="0" class="dropdown-content menu bg-base-100/95 backdrop-blur-md rounded-2xl z-50 w-64 p-4 mt-3 shadow-2xl border border-base-200"> <!-- Mobile-only: Search --> <li class="md:hidden mb-2"> <div class="relative w-full p-0"> ${renderComponent($$result, "HeaderSearch", HeaderSearch, { "client:load": true, "apiBase": API_BASE, "client:component-hydration": "load", "client:component-path": "@/components/layout/header/HeaderSearch.vue", "client:component-export": "default" })} </div> </li> <!-- Mobile-only: View Toggle --> <li class="md:hidden"> <div class="flex items-center gap-2 bg-base-200/50 rounded-full p-1"> <a href="/"${addAttribute(["flex-1 text-center py-1.5 rounded-full text-xs font-bold transition-all", isMapActive ? "bg-primary text-primary-content" : "text-base-content/50"], "class:list")}>
Mapa
</a> <a href="/destinos"${addAttribute(["flex-1 text-center py-1.5 rounded-full text-xs font-bold transition-all", isGridActive ? "bg-primary text-primary-content" : "text-base-content/50"], "class:list")}>
Listas
</a> </div> </li> <div class="divider my-1"></div> <!-- Navigation Links --> <li> <a href="/" data-astro-prefetch="hover" class="font-medium px-4 py-2"> <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
Destinos
</a> </li> <li> <a href="/blog" data-astro-prefetch="hover" class="font-medium px-4 py-2"> <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
Blog
</a> </li> ${user && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <div class="divider my-1"></div> <li> <a href="/favoritos" data-astro-prefetch="hover" class="font-medium px-4 py-2"> <svg class="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path> </svg>
Mis Favoritos
</a> </li> <li> <a href="/destinos/nuevo" data-astro-prefetch="hover" class="font-medium px-4 py-2"> <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Registrar Destino
</a> </li> ${user?.role?.toUpperCase() === "ADMIN" ? renderTemplate`<li> <a href="/admin/feedback" data-astro-prefetch="hover" class="text-info font-medium px-4 py-2 text-left"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
Manejo de Reportes
</a> </li>` : renderTemplate`<li> <button onclick="document.getElementById('feedback_modal').showModal()" class="text-info font-medium px-4 py-2 text-left"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
Sugerencias
</button> </li>`}` })}`} <div class="divider my-1"></div> <!-- Theme Options (Estaciones) --> <li class="menu-title px-1 pb-2 pt-1"> <span class="text-xs font-bold uppercase tracking-wider opacity-60">Estaciones (Tema)</span> </li> <li> <button data-theme-btn="pastel" class="theme-btn w-full flex items-center px-4 py-2 text-sm rounded-xl hover:bg-base-200"> ${renderComponent($$result, "Icon", $$Icon, { "name": "spring", "class": "w-4 h-4 mr-2" })} Primavera
</button> </li> <li> <button data-theme-btn="cupcake" class="theme-btn w-full flex items-center px-4 py-2 text-sm rounded-xl hover:bg-base-200"> ${renderComponent($$result, "Icon", $$Icon, { "name": "summer", "class": "w-4 h-4 mr-2" })} Verano
</button> </li> <li> <button data-theme-btn="caramellatte" class="theme-btn w-full flex items-center px-4 py-2 text-sm rounded-xl hover:bg-base-200"> ${renderComponent($$result, "Icon", $$Icon, { "name": "autumn", "class": "w-4 h-4 mr-2" })} Otoño
</button> </li> <li> <button data-theme-btn="nord" class="theme-btn w-full flex items-center px-4 py-2 text-sm rounded-xl hover:bg-base-200"> ${renderComponent($$result, "Icon", $$Icon, { "name": "winter", "class": "w-4 h-4 mr-2" })} Invierno
</button> </li> <div class="divider my-1"></div> ${user ? renderTemplate`<li> <a href="/logout" data-astro-reload class="text-error font-medium px-4 py-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path> </svg>
Cerrar sesión
</a> </li>` : renderTemplate`<li class="mt-2"> <a${addAttribute(`${API_BASE}/auth/google`, "href")} class="btn btn-primary btn-md rounded-full w-full justify-center gap-2" data-astro-reload> <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path> <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path> <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path> <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path> </svg>
Iniciar sesión
</a> </li>`} </ul> </div> </div> </div> </header> ${renderComponent($$result, "ThemeScript", $$ThemeScript, {})} ${renderComponent($$result, "FeedbackModal", FeedbackModal, { "client:load": true, "apiBase": API_BASE, "client:component-hydration": "load", "client:component-path": "@/components/ui/FeedbackModal.vue", "client:component-export": "default" })} ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/layout/Header.astro", void 0);

export { $$Layout as $, _export_sfc as _, $$Header as a, $$Icon as b };
