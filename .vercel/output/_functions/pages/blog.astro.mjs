import { c as createComponent, m as maybeRenderHead, r as renderComponent, f as renderScript, a as renderTemplate, b as createAstro, d as addAttribute, e as renderTransition } from '../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$Layout, a as $$Header } from '../chunks/Header_Y8jLrYi7.mjs';
import { useSSRContext, defineComponent, ref, reactive, computed, onMounted, onUnmounted, nextTick, mergeProps } from 'vue';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { n as navigate, $ as $$Pagination } from '../chunks/Pagination_BL3Zo68M.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
/* empty css                                 */
import { $ as $$Image } from '../chunks/_astro_assets_DY3b9lXa.mjs';
import { d as getFavoriteIds, c as getBlogs } from '../chunks/api_BnOIfECD.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlogFilters",
  props: {
    categories: {},
    categoryColors: {},
    currentCategory: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    gsap.registerPlugin(Flip);
    const props = __props;
    const isOpen = ref(false);
    const panelRef = ref(null);
    const triggerRef = ref(null);
    const isMounted = ref(false);
    const isAnimating = ref(false);
    const state = reactive({
      selectedCategory: props.currentCategory || "todas"
    });
    const hasFilter = computed(() => state.selectedCategory !== "todas");
    async function animateToggle() {
      if (isAnimating.value) return;
      isAnimating.value = true;
      const panelContent = document.querySelector(".panel-content");
      const panelActions = document.querySelector(".panel-actions");
      if (isOpen.value) {
        if (panelContent || panelActions) {
          gsap.to([panelContent, panelActions], { opacity: 0, duration: 0.1, ease: "power2.out" });
        }
        await new Promise((resolve) => setTimeout(resolve, 50));
        const targets = gsap.utils.toArray("[data-flip-id]");
        const flipState = Flip.getState(targets);
        isOpen.value = false;
        await nextTick();
        Flip.from(flipState, {
          duration: 0.35,
          ease: "power3.inOut",
          scale: true,
          absolute: true,
          nested: true,
          props: "boxShadow, borderRadius, backgroundColor",
          onComplete: () => {
            isAnimating.value = false;
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
          gsap.set([newContent, newActions, oldHeader], { opacity: 0, y: 10 });
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
              gsap.to([newContent, newActions, finalHeader], {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.out",
                onComplete: () => {
                  isAnimating.value = false;
                }
              });
            } else {
              isAnimating.value = false;
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
    function resetFilters() {
      state.selectedCategory = "todas";
      closePanel();
    }
    function handleClickOutside(event) {
      const target = event.target;
      if (!panelRef.value || !triggerRef.value) return;
      const isInsidePanel = panelRef.value.contains(target);
      const isClickOnBtn = triggerRef.value.contains(target);
      if (!isInsidePanel && !isClickOnBtn && isOpen.value) {
        closePanel();
      }
    }
    function applyFilter(category) {
      state.selectedCategory = category;
      closePanel();
      setTimeout(() => {
        navigate();
      }, 200);
    }
    onMounted(() => {
      isMounted.value = true;
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    const __returned__ = { props, isOpen, panelRef, triggerRef, isMounted, isAnimating, state, hasFilter, animateToggle, togglePanel, closePanel, resetFilters, handleClickOutside, applyFilter };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative z-50 h-10 shrink-0" }, _attrs))} data-v-d80f2acb><button data-flip-id="filter-container" class="p-0 flex items-center h-10 px-4 rounded-full bg-[#FCFBF9] text-base-content shrink-0 origin-top-left border-0 cursor-pointer shadow-sm ring-1 ring-base-content/5 hover:shadow-md transition-shadow" aria-label="Abrir filtros de blog" style="${ssrRenderStyle(!$setup.isOpen ? null : { display: "none" })}" data-v-d80f2acb><div data-flip-id="filter-header" class="flex-1 flex items-center trigger-filter-btn" data-v-d80f2acb><svg class="w-4 h-4 text-base-content/60 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80f2acb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" data-v-d80f2acb></path></svg><span class="text-sm font-heading font-extrabold text-base-content whitespace-nowrap" data-v-d80f2acb>Filtros</span></div></button><div data-flip-id="filter-container" class="absolute top-0 left-0 w-[calc(100vw-2rem)] sm:w-[550px] z-50 bg-[#FCFBF9] rounded-3xl p-6 origin-top-left overflow-hidden flex flex-col shadow-2xl" style="${ssrRenderStyle($setup.isOpen ? null : { display: "none" })}" data-v-d80f2acb><div class="flex items-center justify-between mb-6" data-v-d80f2acb><div data-flip-id="filter-header" class="flex items-center gap-2 origin-left flex-1 min-w-0 mr-4" data-v-d80f2acb><svg class="w-4 h-4 text-base-content/60 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80f2acb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" data-v-d80f2acb></path></svg><h3 class="text-xl font-extrabold text-base-content" data-v-d80f2acb>Filtros</h3></div><div class="flex items-center gap-1 panel-actions" data-v-d80f2acb>`);
  if ($setup.hasFilter) {
    _push(`<a href="/blog" class="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center justify-center shrink-0" title="Limpiar filtros" data-v-d80f2acb><svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80f2acb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-d80f2acb></path></svg></a>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<button class="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-700 transition-colors" data-v-d80f2acb><svg class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d80f2acb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-v-d80f2acb></path></svg></button></div></div><div class="panel-content space-y-4" data-v-d80f2acb><fieldset class="bg-transparent rounded-2xl p-4 md:p-5 border border-[#F2E8DC] m-0" data-v-d80f2acb><legend class="text-[11px] font-extrabold tracking-widest text-[#BA9A84] uppercase mb-4 w-full" data-v-d80f2acb> Categorías </legend><div class="flex flex-wrap gap-2.5" data-v-d80f2acb><a href="/blog" class="${ssrRenderClass([
    "inline-block text-center px-4 py-1.5 rounded-full text-[13px] font-bold border-[1.5px] transition-all",
    $setup.state.selectedCategory === "todas" ? "border-[#3b82f6] bg-[#EFF6FF] text-[#1e40af] shadow-sm scale-105" : "border-[#DEE3EC] bg-white text-[#664634] hover:bg-base-200"
  ])}" data-v-d80f2acb> Todas las historias </a><!--[-->`);
  ssrRenderList($props.categories, (cat) => {
    _push(`<a${ssrRenderAttr("href", `/blog?category=${encodeURIComponent(cat)}`)} class="${ssrRenderClass([
      "inline-block text-center px-4 py-1.5 rounded-full text-[13px] font-bold border-[1.5px] transition-all",
      $setup.state.selectedCategory === cat ? "shadow-sm scale-105" : "border-[#DEE3EC] bg-white text-[#664634] hover:bg-base-200"
    ])}" style="${ssrRenderStyle({
      "--active-border": $props.categoryColors[cat] ?? "#cbd5e1",
      ...$setup.state.selectedCategory === cat ? {
        borderColor: $props.categoryColors[cat] ?? "#cbd5e1",
        backgroundColor: ($props.categoryColors[cat] ?? "#cbd5e1") + "20",
        color: $props.categoryColors[cat] ?? "#664634",
        boxShadow: `0 2px 8px -2px ${$props.categoryColors[cat] ?? "#cbd5e1"}80`
      } : {}
    })}" data-v-d80f2acb>${ssrInterpolate(cat)}</a>`);
  });
  _push(`<!--]--></div></fieldset></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/blog/BlogFilters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Blogfilters = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d80f2acb"]]);

const $$Astro$1 = createAstro();
const $$BlogFiltersPanel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogFiltersPanel;
  const categories = [
    "Aventura",
    "Cultura",
    "Naturaleza",
    "Experiencia",
    "Gastronom\xEDa",
    "Relajaci\xF3n",
    "Romance",
    "Fotograf\xEDa",
    "Otro"
  ];
  const CATEGORY_COLORS = {
    Aventura: "#f59e0b",
    // amber
    Cultura: "#8b5cf6",
    // purple
    Naturaleza: "#22c55e",
    // green
    Experiencia: "#eab308",
    // yellow
    Gastronom\u00EDa: "#ef4444",
    // red
    Relajaci\u00F3n: "#0ea5e9",
    // light blue
    Romance: "#db2777",
    // pink
    Fotograf\u00EDa: "#64748b",
    // slate
    Otro: "#94a3b8"
  };
  const currentCategory = Astro2.url.searchParams.get("category") || "todas";
  return renderTemplate`${maybeRenderHead()}<div id="blog-filtros-wrapper"> ${renderComponent($$result, "Blogfilters", Blogfilters, { "client:load": true, "categories": categories, "categoryColors": CATEGORY_COLORS, "currentCategory": currentCategory, "client:component-hydration": "load", "client:component-path": "@/components/blog/BlogFilters.vue", "client:component-export": "default" })} </div> ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/blog/BlogFiltersPanel.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/blog/BlogFiltersPanel.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get("auth_token")?.value ?? "";
  const isLoggedIn = !!token;
  const page = Number(Astro2.url.searchParams.get("page") || 1);
  const currentCategory = Astro2.url.searchParams.get("category") || void 0;
  const search = Astro2.url.searchParams.get("search") || void 0;
  const [
    { blogIds: favBlogIds },
    { data: posts, meta, success, message = "" }
  ] = await Promise.all([
    getFavoriteIds(token),
    getBlogs({
      category: currentCategory,
      search,
      page,
      limit: 9
      // Show 9 blogs per page to fill the 3x3 grid perfectly
    })
  ]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog de Viajeros \u2014 DominicanGo", "description": "Descubre incre\xEDbles historias de viajeros explorando la Rep\xFAblica Dominicana y comparte la tuya." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16"> <div class="max-w-[1400px] mx-auto px-4 sm:px-6"> <!-- Hero / Header Section --> <section class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" aria-label="Introducción del Blog"> <div> <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">
Diarios de <span class="text-primary">Viaje</span> </h1> <p class="text-base-content/70 max-w-2xl text-lg">
Historias auténticas, guías detalladas y narrativas
                        visuales de exploradores descubriendo cada rincón de
                        República Dominicana.
</p> </div> ${isLoggedIn && renderTemplate`<a href="/blog/nuevo" class="btn btn-primary rounded-full shadow-lg shrink-0"${addAttribute(renderTransition($$result2, "zpsn25q5", "", "blog-title"), "data-astro-transition-scope")}> <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Comparte tu experiencia
</a>`} </section> <!-- Categories / Filter (Vue component handles its own trigger) --> <section class="flex items-center gap-4 mb-10" aria-label="Filtros del Blog"> <div class="relative z-50"> ${renderComponent($$result2, "BlogFiltersPanel", $$BlogFiltersPanel, {})} </div> </section> <!-- Blog Grid (Bento Style) --> ${posts && posts.length > 0 ? renderTemplate`<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-6" aria-label="Lista de Artículos"> ${posts.map((post) => {
    const isMainColor = !post.color?.startsWith("base-");
    const cardBgClass = post.color ? `bg-${post.color}` : "bg-base-100";
    const cardTextClass = isMainColor ? `text-${post.color}-content` : "text-base-content";
    const borderColor = isMainColor ? `border-${post.color}/20` : "border-base-200";
    return renderTemplate`<article${addAttribute(`card ${cardBgClass} ${cardTextClass} ${post.size || "col-span-1"} shadow-sm border ${borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group relative`, "class")}> <!-- Overlay link to make the entire article clickable without invalid nested links --> <a${addAttribute(`/blog/${post.slug}`, "href")}${addAttribute(`Leer art\xEDculo: ${post.title}`, "aria-label")} class="absolute inset-0 z-20 w-full h-full cursor-pointer"></a> <figure${addAttribute(`overflow-hidden relative bg-base-300 ${post.size?.includes("row-span-2") ? "h-full min-h-[300px]" : "aspect-video"}`, "class")}> ${renderComponent($$result2, "Image", $$Image, { "src": post.images[0], "alt": post.title, "width": 600, "height": 450, "format": "webp", "loading": posts.indexOf(post) < 3 ? "eager" : "lazy", "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", "data-astro-transition-scope": renderTransition($$result2, "4fvu3dbw", "", `img-blog-${post.slug}`) })} <div class="absolute top-4 left-4 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm z-30"> ${post.category} </div> </figure> <div${addAttribute(`card-body p-6 ${post.size?.includes("row-span-2") ? "absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 via-black/40 to-transparent text-white pt-20" : ""}`, "class")}> <h2${addAttribute(`card-title font-heading font-bold text-xl leading-tight mb-2 group-hover:text-primary transition-colors ${post.size?.includes("row-span-2") ? "text-white" : ""}`, "class")}${addAttribute(renderTransition($$result2, "wouwbcjo", "", `title-blog-${post.slug}`), "data-astro-transition-scope")}> ${post.title} </h2> <p${addAttribute(`text-sm line-clamp-3 italic ${post.size?.includes("row-span-2") ? "text-white/80" : "text-base-content/70"}`, "class")}> ${post.excerpt} </p> <div${addAttribute(`mt-4 pt-4 border-t flex items-center justify-between ${post.size?.includes("row-span-2") ? "border-white/20" : "border-base-200"}`, "class")}> <div class="flex items-center gap-2"> <div class="w-6 h-6 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center ring-1 ring-base-200"> ${post.author?.foto ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": post.author.foto, "alt": post.author.name, "width": 48, "height": 48, "format": "webp", "class": "w-full h-full object-cover" })}` : renderTemplate`<span class="text-[10px] font-bold text-primary"> ${post.author?.name?.charAt(
      0
    )} </span>`} </div> <span${addAttribute(`text-xs font-semibold ${post.size?.includes("row-span-2") ? "text-white/80" : "text-base-content/70"}`, "class")}> ${post.author?.name || "Viajero"} </span> </div> <div${addAttribute(`flex items-center gap-3 text-[10px] font-medium ${post.size?.includes("row-span-2") ? "text-white/40" : "text-base-content/40"}`, "class")}> <span> ${new Date(
      post.publishedAt || post.createdAt || /* @__PURE__ */ new Date()
    ).toLocaleDateString("es-DO", {
      day: "numeric",
      month: "short"
    })} </span> </div> </div> </div> </article>`;
  })} </section>` : renderTemplate`<div class="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#FCFBF9] rounded-3xl border border-base-200 mt-2 mb-8"${addAttribute(renderTransition($$result2, "hbqy5b2f", "", "blog-empty-state"), "data-astro-transition-scope")}> <div class="bg-primary/5 p-6 rounded-full inline-flex items-center justify-center mb-6"> <svg class="w-12 h-12 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path> </svg> </div> <h3 class="text-2xl font-heading font-extrabold text-base-content mb-2">Aún no hay historias aquí</h3> <p class="text-base-content/60 max-w-md mx-auto mb-6 text-lg">Parece que no encontramos ninguna publicación bajo esta categoría. ¡Anímate a ser el primero en compartir tu aventura!</p> ${isLoggedIn ? renderTemplate`<a href="/blog/nuevo" class="btn btn-primary rounded-full shadow-lg"${addAttribute(renderTransition($$result2, "wkz765ij", "", "blog-empty-state"), "data-astro-transition-scope")}>
Comparte tu historia
</a>` : renderTemplate`<a href="/login?redirect=/blog/nuevo" class="btn btn-primary rounded-full shadow-lg">
Inicia sesión para compartir
</a>`} </div>`} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": meta.page, "totalPages": meta.totalPages, "baseUrl": "/blog", "searchParams": Astro2.url.searchParams })} <div class="hidden" id="ssr-debug">
DEBUG -- Category: ${currentCategory} | Success: ${success ? "true" : "false"} | Posts length: ${posts?.length} | Message: ${message} | Page: ${meta.page} / ${meta.totalPages} </div> </div> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/index.astro", "self");

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
