import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, e as renderTransition, a as renderTemplate, b as createAstro } from '../../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { _ as _export_sfc, $ as $$Layout, a as $$Header } from '../../../chunks/Header_Y8jLrYi7.mjs';
import { b as getProvincesWithDestinations, d as getFavoriteIds, g as getUser, s as slugify } from '../../../chunks/api_BnOIfECD.mjs';
import { T as TYPE_LABELS, b as TYPE_COLORS, D as DEFAULT_HOURS } from '../../../chunks/poi-config_9NakrLaT.mjs';
import { $ as $$Image } from '../../../chunks/_astro_assets_DY3b9lXa.mjs';
/* empty css                                        */
/* empty css                                       */
import { S as SocialActions, C as Comments, D as DeleteContentModal } from '../../../chunks/DeleteContentModal_BREiaUsj.mjs';
import 'clsx';
import { useSSRContext, defineComponent, ref, onMounted, onUnmounted, nextTick, mergeProps } from 'vue';
import { gsap } from 'gsap';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
export { renderers } from '../../../renderers.mjs';

const $$Astro$4 = createAstro();
const $$PoiHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$PoiHero;
  const { name, image, images, slug, provinceSlug, poiSlug } = Astro2.props;
  const uniqueID = provinceSlug && poiSlug ? `${provinceSlug}-${poiSlug}` : null;
  return renderTemplate`${maybeRenderHead()}<header class="pt-24 pb-10 bg-base-100"> <div class="w-full max-w-6xl mx-auto px-4 md:px-8"> <a href="/destinos" class="inline-flex items-center gap-1.5 text-base-content/60 hover:text-primary text-sm font-medium mb-6 transition-colors no-underline"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
Volver a destinos
</a> <button class="w-full aspect-video md:aspect-21/9 rounded-3xl overflow-hidden shadow-xl mb-10 relative cursor-zoom-in group bg-base-300 appearance-none border-none p-0 inline-block text-left"${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify([image, ...images || []])}, currentIndex: 0, alt: '${name}' } }))`, "onclick")}${addAttribute(`Ampliar imagen de ${name}`, "aria-label")} tabindex="0"> <figure class="w-full h-full m-0 pointer-events-none"> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": name, "width": 1200, "height": 600, "widths": [400, 800, 1200], "sizes": "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px", "format": "webp", "loading": "eager", "class": "w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105", "data-astro-transition-scope": renderTransition($$result, "fhbvbabv", "", uniqueID ? `img-destino-${uniqueID}` : void 0) })} </figure> <div class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div> </button> <div class="max-w-4xl"> <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-base-content m-0 leading-tight"> ${name} </h1> </div> </div> </header>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/poi/PoiHero.astro", "self");

const $$Astro$3 = createAstro();
const $$PoiBentoGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PoiBentoGrid;
  const { images = [], name } = Astro2.props;
  return renderTemplate`${images.length > 0 ? renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-3 grid-rows-2 gap-2.5 h-[340px] rounded-3xl overflow-hidden shadow-sm bg-base-200" data-astro-cid-5dozmn5j><!-- Large: col-span-2, row-span-2 --><button type="button"${addAttribute(`block w-full h-full p-0 border-none appearance-none ${images.length === 1 ? "col-span-3" : "col-span-2"} row-span-2 relative overflow-hidden bento-item cursor-zoom-in group text-left`, "class")}${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify(images)}, currentIndex: 0, alt: '${name} - Vista 1' } }))`, "onclick")}${addAttribute(`Ampliar imagen: ${name} - Vista 1`, "aria-label")} data-astro-cid-5dozmn5j>${renderComponent($$result, "Image", $$Image, { "src": images[0], "alt": `${name} - vista 1`, "width": 800, "height": 600, "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", "data-astro-cid-5dozmn5j": true })}<div class="bento-hover absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-end p-4" data-astro-cid-5dozmn5j><span class="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full" data-astro-cid-5dozmn5j>Vista 1</span></div></button><!-- Small top-right (solo si hay > 1 imagen) -->${images.length > 1 && renderTemplate`<button type="button"${addAttribute(`block w-full h-full p-0 border-none appearance-none col-span-1 ${images.length === 2 ? "row-span-2" : "row-span-1"} relative overflow-hidden bento-item cursor-zoom-in group text-left`, "class")}${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify(images)}, currentIndex: 1, alt: '${name} - Vista 2' } }))`, "onclick")}${addAttribute(`Ampliar imagen: ${name} - Vista 2`, "aria-label")} data-astro-cid-5dozmn5j>${renderComponent($$result, "Image", $$Image, { "src": images[1], "alt": `${name} - vista 2`, "width": 400, "height": 300, "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", "data-astro-cid-5dozmn5j": true })}<div class="bento-hover absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-end p-3" data-astro-cid-5dozmn5j><span class="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full" data-astro-cid-5dozmn5j>Vista 2</span></div></button>`}<!-- Small bottom-right (solo si hay > 2 imágenes) -->${images.length > 2 && renderTemplate`<button type="button" class="block w-full h-full p-0 border-none appearance-none col-span-1 row-span-1 relative overflow-hidden bento-item cursor-zoom-in group text-left"${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify(images)}, currentIndex: 2, alt: '${name} - Vista 3' } }))`, "onclick")}${addAttribute(`Ampliar imagen: ${name} - Vista 3`, "aria-label")} data-astro-cid-5dozmn5j>${renderComponent($$result, "Image", $$Image, { "src": images[2], "alt": `${name} - vista 3`, "width": 400, "height": 300, "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", "data-astro-cid-5dozmn5j": true })}${images.length > 3 ? renderTemplate`<div class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-all group-hover:bg-black/50" data-astro-cid-5dozmn5j><span class="text-3xl font-black italic" data-astro-cid-5dozmn5j>+${images.length - 2}</span><span class="text-[10px] uppercase font-bold tracking-[0.2em] mt-1 opacity-80" data-astro-cid-5dozmn5j>Ver más</span></div>` : renderTemplate`<div class="bento-hover absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-end p-3" data-astro-cid-5dozmn5j><span class="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full" data-astro-cid-5dozmn5j>Vista 3</span></div>`}</button>`}</div>` : renderTemplate`<div class="flex items-center justify-center h-[340px] rounded-3xl bg-base-200 border-2 border-dashed border-base-300" data-astro-cid-5dozmn5j><span class="text-base-content/50 font-medium flex items-center gap-2" data-astro-cid-5dozmn5j><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5dozmn5j><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-5dozmn5j></path></svg>
Sin fotografías
</span></div>`}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/poi/PoiBentoGrid.astro", void 0);

const $$Astro$2 = createAstro();
const $$PoiSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PoiSidebar;
  const {
    poi,
    province,
    hours,
    website,
    mapLink,
    showHours,
    token,
    isLoggedIn,
    isFavorited,
    user,
    loginUrl
  } = Astro2.props;
  Astro2.url.href;
  const priceLabel = poi.price === "gratis" ? "Gratuito" : "Tiene costo";
  poi.id || poi.poiSlug || "";
  return renderTemplate`${maybeRenderHead()}<aside class="poi-sidebar" data-astro-cid-bvym2jsa> <!-- Main Info & Actions Card --> <div class="sidebar-card overflow-hidden p-0!" data-astro-cid-bvym2jsa> <div class="bg-primary/5 p-5 border-b border-primary/10" data-astro-cid-bvym2jsa> <h3 class="text-xs font-bold uppercase tracking-widest text-neutral mb-4" data-astro-cid-bvym2jsa>
Información del Destino
</h3> <ul class="flex flex-col gap-3.5" data-astro-cid-bvym2jsa> <li class="flex items-center gap-3 text-sm font-medium text-base-content/80" data-astro-cid-bvym2jsa> <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs border border-base-200 shrink-0" data-astro-cid-bvym2jsa> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bvym2jsa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-bvym2jsa></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-bvym2jsa></path></svg> </div> <div class="flex flex-col" data-astro-cid-bvym2jsa> <span class="text-[10px] uppercase tracking-tighter text-base-content/40" data-astro-cid-bvym2jsa>Provincia</span> ${province.name} </div> </li> <li class="flex items-center gap-3 text-sm font-medium text-base-content/80" data-astro-cid-bvym2jsa> <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs border border-base-200 shrink-0" data-astro-cid-bvym2jsa> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bvym2jsa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-astro-cid-bvym2jsa></path></svg> </div> <div class="flex flex-col" data-astro-cid-bvym2jsa> <span class="text-[10px] uppercase tracking-tighter text-base-content/40" data-astro-cid-bvym2jsa>Categoría</span> <span class="capitalize" data-astro-cid-bvym2jsa>${poi.type}</span> </div> </li> <li class="flex items-center gap-3 text-sm font-medium text-base-content/80" data-astro-cid-bvym2jsa> <div class="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-xs border border-base-200 shrink-0" data-astro-cid-bvym2jsa> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bvym2jsa><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-bvym2jsa></path></svg> </div> <div class="flex flex-col" data-astro-cid-bvym2jsa> <span class="text-[10px] uppercase tracking-tighter text-base-content/40" data-astro-cid-bvym2jsa>Entrada</span> ${priceLabel} </div> </li> </ul> </div> <div class="px-5 py-6 bg-white border-t border-base-200" data-astro-cid-bvym2jsa> ${renderComponent($$result, "SocialActions", SocialActions, { "client:load": true, "targetType": "DESTINATION", "targetId": poi.id, "token": token, "loginUrl": loginUrl, "initialFavorited": isFavorited, "title": "\xBFTe gusta?", "subtitle": "Reacciona o comp\xE1rtelo.", "client:component-hydration": "load", "client:component-path": "@/components/interactions/SocialActions.vue", "client:component-export": "default", "data-astro-cid-bvym2jsa": true })} </div> </div> <!-- Planning Card --> ${showHours && renderTemplate`<div class="sidebar-card" data-astro-cid-bvym2jsa> <h3 class="sc-title text-neutral" data-astro-cid-bvym2jsa>Planifica tu visita</h3> <div class="flex flex-col gap-3 mt-1" data-astro-cid-bvym2jsa> <div class="flex items-center gap-3" data-astro-cid-bvym2jsa> <div class="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center text-warning shrink-0" data-astro-cid-bvym2jsa> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bvym2jsa> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-bvym2jsa></path> </svg> </div> <div class="flex flex-col" data-astro-cid-bvym2jsa> <span class="text-[10px] uppercase tracking-tighter text-base-content/40" data-astro-cid-bvym2jsa>
Semana
</span> <span class="text-sm font-medium" data-astro-cid-bvym2jsa> ${hours.weekdays} </span> </div> </div> <div class="flex items-center gap-3" data-astro-cid-bvym2jsa> <div class="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center text-warning shrink-0" data-astro-cid-bvym2jsa> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bvym2jsa> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-bvym2jsa></path> </svg> </div> <div class="flex flex-col" data-astro-cid-bvym2jsa> <span class="text-[10px] uppercase tracking-tighter text-base-content/40" data-astro-cid-bvym2jsa>
Fin de semana
</span> <span class="text-sm font-medium" data-astro-cid-bvym2jsa> ${hours.weekend} </span> </div> </div> </div> </div>`} </aside> `;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/poi/PoiSidebar.astro", void 0);

const $$Astro$1 = createAstro();
const $$PoiRelated = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PoiRelated;
  const { related } = Astro2.props;
  return renderTemplate`${related.length > 0 && renderTemplate`${maybeRenderHead()}<div class="bg-base-300 border-t border-base-100 py-16" data-astro-cid-hnnapogv><div class="max-w-6xl mx-auto px-4 md:px-8" data-astro-cid-hnnapogv><div class="flex items-end justify-between mb-8" data-astro-cid-hnnapogv><div data-astro-cid-hnnapogv><p class="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-1" data-astro-cid-hnnapogv>
Te puede interesar
</p><h2 class="font-heading font-bold text-2xl md:text-3xl text-base-content" data-astro-cid-hnnapogv>
Lugares similares
</h2></div><a href="/destinos" class="text-sm font-semibold text-base-content/50 hover:text-primary transition hidden sm:block" data-astro-cid-hnnapogv>
Ver todos →
</a></div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" data-astro-cid-hnnapogv>${related.map((r) => renderTemplate`<a${addAttribute(r.href, "href")} class="group bg-base-100 rounded-2xl overflow-hidden border border-base-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300" data-astro-cid-hnnapogv><div class="relative h-44 overflow-hidden bg-base-200" data-astro-cid-hnnapogv><img${addAttribute(r.image, "src")}${addAttribute(r.name, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-astro-cid-hnnapogv><div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 50%)" data-astro-cid-hnnapogv></div><div class="absolute top-2.5 right-2.5" data-astro-cid-hnnapogv><span${addAttribute(`badge badge-sm font-bold shadow-sm ${r.price === "gratis" ? "badge-success" : "badge-warning"}`, "class")} data-astro-cid-hnnapogv>${r.price === "gratis" ? "GRATIS" : "PAGADO"}</span></div><div class="absolute bottom-2.5 left-2.5" data-astro-cid-hnnapogv><span class="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"${addAttribute(`background:${TYPE_COLORS[r.type] ?? "#64748b"}bb`, "style")} data-astro-cid-hnnapogv>${TYPE_LABELS[r.type]}</span></div></div><div class="p-4" data-astro-cid-hnnapogv><div class="flex items-center gap-2 mb-1.5" data-astro-cid-hnnapogv><span class="w-2 h-2 rounded-full shrink-0"${addAttribute(`background:${r.provinceColor}`, "style")} data-astro-cid-hnnapogv></span><span class="text-[10px] font-bold text-base-content/50 uppercase tracking-wider truncate" data-astro-cid-hnnapogv>${r.province}</span></div><h3 class="font-heading font-bold text-base-content text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1" data-astro-cid-hnnapogv>${r.name}</h3><p class="text-base-content/60 text-xs line-clamp-2" data-astro-cid-hnnapogv>${r.description}</p></div></a>`)}</div></div></div>`}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/poi/PoiRelated.astro", void 0);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DestinationOptionsDropdown",
  props: {
    mapLink: {},
    website: {},
    canManage: { type: Boolean },
    canEdit: { type: Boolean },
    poiId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const isOpen = ref(false);
    const isAnimating = ref(false);
    const menuRef = ref(null);
    const triggerRef = ref(null);
    function toggleMenu() {
      if (isAnimating.value) return;
      if (!isOpen.value) {
        isOpen.value = true;
        isAnimating.value = true;
        nextTick(() => {
          if (menuRef.value) {
            gsap.fromTo(
              menuRef.value,
              { scale: 0.9, opacity: 0, y: -10, transformOrigin: "top right" },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(1.5)",
                onComplete: () => {
                  isAnimating.value = false;
                }
              }
            );
          } else {
            isAnimating.value = false;
          }
        });
      } else {
        isAnimating.value = true;
        if (menuRef.value) {
          gsap.to(menuRef.value, {
            opacity: 0,
            scale: 0.9,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              isOpen.value = false;
              isAnimating.value = false;
              gsap.set(menuRef.value, { clearProps: "all" });
            }
          });
        }
      }
    }
    function closeMenuOnClickOutside(e) {
      if (isOpen.value && !isAnimating.value && menuRef.value && triggerRef.value) {
        if (!menuRef.value.contains(e.target) && !triggerRef.value.contains(e.target)) {
          toggleMenu();
        }
      }
    }
    onMounted(() => {
      document.addEventListener("click", closeMenuOnClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    });
    function handleDelete() {
      toggleMenu();
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent("open-delete-modal"));
      }, 100);
    }
    const __returned__ = { props, isOpen, isAnimating, menuRef, triggerRef, toggleMenu, closeMenuOnClickOutside, handleDelete };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "absolute right-0 -top-0" }, _attrs))}><button class="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button><div class="z-50 absolute right-0 top-0 mt-2 w-56 p-2 rounded-2xl bg-base-100 shadow-sm shadow-black/10 border border-base-200" style="${ssrRenderStyle([
    { "display": "none" },
    $setup.isOpen ? null : { display: "none" }
  ])}"><ul class="menu p-0 w-full relative"><li class="menu-title flex flex-row items-baseline justify-between px-2 py-2 min-h-0"><span class="text-[10px] font-bold uppercase tracking-widest text-base-content/50">Explorar más</span><button class="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></li><li><a${ssrRenderAttr("href", $props.mapLink)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50"><div class="w-6 h-6 rounded-md bg-error/10 flex items-center justify-center text-error"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.414a2 2 0 012.553-1.907L10 5l5-2 5.447 2.724A2 2 0 0121 7.515v10.071a2 2 0 01-2.553 1.907L13 17l-4 3z"></path></svg></div><span class="text-sm font-semibold text-base-content">Ver en Google Maps</span></a></li>`);
  if ($props.website) {
    _push(`<li><a${ssrRenderAttr("href", $props.website)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50"><div class="w-6 h-6 rounded-md bg-info/10 flex items-center justify-center text-info"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path></svg></div><span class="text-sm font-semibold text-base-content">Sitio Web Oficial</span></a></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.canManage && $props.poiId) {
    _push(`<!--[--><div class="divider my-1 before:bg-base-200 after:bg-base-200 h-px"></div><li class="menu-title px-3 py-1.5 min-h-0"><span class="text-[10px] font-bold uppercase tracking-widest text-base-content/50">Gestión del autor</span></li>`);
    if ($props.canEdit) {
      _push(`<li><a${ssrRenderAttr("href", `/destinos/editar/${$props.poiId}`)} class="flex items-center gap-2.5 py-2 px-3 rounded-xl hover:bg-base-200/50"><div class="w-6 h-6 rounded-md bg-base-200 flex items-center justify-center text-base-content/70"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></div><span class="text-sm font-semibold text-base-content">Editar destino</span></a></li>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<li><button type="button" class="flex items-center gap-2.5 py-2 px-3 hover:bg-error/10 text-error rounded-xl w-full text-left"><div class="w-6 h-6 rounded-md bg-error/10 flex items-center justify-center text-error"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></div><span class="text-sm font-semibold">Eliminar destino</span></button></li><!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</ul></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/poi/DestinationOptionsDropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DestinationOptionsDropdown = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const $$poi = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$poi;
  const token = Astro2.cookies.get("auth_token")?.value ?? "";
  const isLoggedIn = !!token;
  const API_BASE = "https://dominicango-api.onrender.com/api"?.replace("/api", "") || "http://localhost:3000";
  const loginUrl = `${API_BASE}/auth/google`;
  const [{ provinces }, { destinationIds: favDestinationIds }, user] = await Promise.all([
    getProvincesWithDestinations(),
    getFavoriteIds(token),
    getUser(token)
  ]);
  const { province: slugProvince, poi: slugPoi } = Astro2.params;
  const provinceSlug = slugProvince;
  const province = provinces[provinceSlug];
  if (!province) {
    return Astro2.redirect("/destinos");
  }
  const poi = province.pois.find(
    (p) => p.slug === slugPoi
  );
  if (!poi) {
    return Astro2.redirect("/destinos");
  }
  let related = Object.entries(provinces).flatMap(
    ([slug, prov]) => prov.pois.filter(
      (p) => p.name !== poi.name && (p.type?.toLowerCase() === poi.type?.toLowerCase() || slug === provinceSlug)
    ).map((p) => ({
      ...p,
      type: p.type?.toLowerCase(),
      province: prov.name,
      provinceSlug: slug,
      provinceColor: prov.color,
      region: prov.region,
      href: `/destinos/${slug}/${p.slug}`
    }))
  );
  if (related.length === 0) {
    related = Object.entries(provinces).flatMap(
      ([slug, prov]) => prov.pois.filter((p) => p.name !== poi.name).map((p) => ({
        ...p,
        type: p.type?.toLowerCase(),
        province: prov.name,
        provinceSlug: slug,
        provinceColor: prov.color,
        region: prov.region,
        href: `/destinos/${slug}/${p.slug}`
      }))
    );
  }
  related = related.slice(0, 6);
  const seed = slugify(poi.name);
  const bentoImages = poi.images?.length ? poi.images : [
    `https://picsum.photos/seed/${seed}-b/600/400`,
    `https://picsum.photos/seed/${seed}-c/600/400`,
    `https://picsum.photos/seed/${seed}-d/600/400`
  ];
  const hours = poi.hours ?? DEFAULT_HOURS[poi.type] ?? {
    weekdays: "Consultar disponibilidad",
    weekend: ""
  };
  const website = poi.website ?? null;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${poi.name}, ${province.name}, República Dominicana`)}`;
  const showHours = poi.type !== "playa";
  const isFavorited = poi.id ? favDestinationIds.has(poi.id) : false;
  const isOwner = user && poi.authorId && user.id === poi.authorId;
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const canManage = isOwner || isAdmin;
  const canEdit = isAdmin || isOwner && poi.createdAt && Date.now() - new Date(poi.createdAt).getTime() < 60 * 60 * 1e3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${poi.name} — DominicanGo`, "description": poi.description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> <article> ${renderComponent($$result2, "PoiHero", $$PoiHero, { "name": poi.name, "slug": `${provinceSlug}-${seed}`, "type": poi.type, "province": province.name, "description": poi.description, "price": poi.price, "hours": hours, "website": website, "image": poi.image || bentoImages[0], "images": bentoImages, "color": province.color, "provinceSlug": provinceSlug, "poiSlug": seed })} <div class="bg-base-300"> <div class="max-w-6xl mx-auto px-4 md:px-8 py-12"> <div class="grid md:grid-cols-[1fr_300px] gap-8 items-start"> <!-- Main column --> <div class="space-y-6"> <!-- About --> <section class="bg-base-100 rounded-3xl shadow-sm border border-base-200 p-8" aria-label="Sobre este lugar"> <div class="flex items-center justify-between mb-5 relative"> <h2 class="font-heading font-bold text-xl text-neutral flex items-center gap-3 mb-0"> <span class="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </span>
Sobre este lugar
</h2> ${renderComponent($$result2, "DestinationOptionsDropdown", DestinationOptionsDropdown, { "client:load": true, "mapLink": mapLink, "website": website, "canManage": canManage, "canEdit": canEdit, "poiId": poi.id, "client:component-hydration": "load", "client:component-path": "@/components/poi/DestinationOptionsDropdown.vue", "client:component-export": "default" })} </div> <p class="text-base-content/80 text-base leading-relaxed"> ${poi.description} </p> </section> <!-- Tags --> ${poi.tags?.length > 0 && renderTemplate`<section class="bg-base-100 rounded-3xl shadow-sm border border-base-200 p-8" aria-label="Etiquetas"> <h2 class="font-heading font-bold text-xl text-neutral mb-5 flex items-center gap-3"> <span class="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"></path> </svg> </span>
Qué encontrarás
</h2> <div class="flex flex-wrap gap-2.5"> ${poi.tags.map((tag) => renderTemplate`<span class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/5 text-base-content text-xs font-semibold border border-primary"> <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 8 8"> <circle cx="4" cy="4" r="3"></circle> </svg> ${tag} </span>`)} </div> </section>`} <!-- Province banner --> <div class="rounded-3xl overflow-hidden shadow-sm border p-10"${addAttribute(`background:linear-gradient(135deg,${province.color}18 0%,${province.color}08 100%);border-color:${province.color}30`, "style")}> <div class="flex items-start gap-4"> <span class="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center"${addAttribute(`background:${province.color}30`, "style")}> <span class="w-5 h-5 rounded-full"${addAttribute(`background:${province.color}`, "style")}></span> </span> <div> <p class="text-xs uppercase tracking-wider font-semibold mb-0.5"${addAttribute(`color:${province.color}`, "style")}>
Provincia
</p> <h3 class="font-heading font-bold text-xl text-neutral mb-1"> ${province.name} </h3> <p class="text-sm text-base-content/70 leading-relaxed"> ${poi.name} está ubicado en la región <strong class="text-base-content">${province.region}</strong> de la República Dominicana.
</p> </div> </div> </div> </div> <!-- Sidebar: mobile order-3, desktop order-2 --> <div class="order-3 md:order-2 w-full"> ${renderComponent($$result2, "PoiSidebar", $$PoiSidebar, { "poi": poi, "province": province, "hours": hours, "website": website, "mapLink": mapLink, "showHours": showHours, "token": token, "isLoggedIn": isLoggedIn, "isFavorited": isFavorited, "user": user, "loginUrl": loginUrl })} </div> <!-- Bento Grid: mobile order-2, desktop order-3, col-span-2 --> <div class="order-2 md:order-3 md:col-span-2 w-full mt-4 md:mt-0"> ${renderComponent($$result2, "PoiBentoGrid", $$PoiBentoGrid, { "images": bentoImages, "name": poi.name })} </div> <!-- Comments: mobile order-4, desktop order-4, col-span-2 --> <div class="order-4 md:order-4 md:col-span-2 w-full max-w-4xl mx-auto mt-4 md:mt-0"> ${renderComponent($$result2, "Comments", Comments, { "client:visible": true, "targetType": "DESTINATION", "targetId": poi.id, "token": token, "loginUrl": loginUrl, "client:component-hydration": "visible", "client:component-path": "@/components/interactions/Comments.vue", "client:component-export": "default" })} </div> </div> </div> </div> ${renderComponent($$result2, "PoiRelated", $$PoiRelated, { "related": related })} ${renderComponent($$result2, "DeleteContentModal", DeleteContentModal, { "client:load": true, "show": false, "resourceId": poi.id, "resourceType": "destination", "resourceTitle": poi.name, "token": token, "client:component-hydration": "load", "client:component-path": "@/components/ui/DeleteContentModal.vue", "client:component-export": "default" })} </article> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/[province]/[poi].astro", void 0);
const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/destinos/[province]/[poi].astro";
const $$url = "/destinos/[province]/[poi]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$poi,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
