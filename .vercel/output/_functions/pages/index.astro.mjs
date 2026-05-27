import { c as createComponent, m as maybeRenderHead, f as renderScript, a as renderTemplate, b as createAstro, r as renderComponent, p as defineScriptVars } from '../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_Y8jLrYi7.mjs';
import 'clsx';
/* empty css                                 */
import { b as getProvincesWithDestinations } from '../chunks/api_BnOIfECD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$MapSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MapSection;
  return renderTemplate`${maybeRenderHead()}<section id="mapa" class="relative w-full h-screen pt-14 flex flex-col" style="background: linear-gradient(180deg, #e8f4f8 0%, #d4eef7 30%, #e2f0e8 60%, #eef6fa 100%);" data-astro-cid-xgb2rloa> <div class="flex-1 relative max-w-[1400px] w-full mx-auto px-4 sm:px-6 flex flex-col" data-astro-cid-xgb2rloa> <div class="flex-1 relative overflow-hidden" id="map-wrapper" data-astro-cid-xgb2rloa> <div class="map-container w-full h-full" id="map-container" data-astro-cid-xgb2rloa> <div id="province-tooltip" class="fixed pointer-events-none z-50 opacity-0 transition-opacity duration-200 px-4 py-2 rounded-xl bg-base-100/95 backdrop-blur-md border border-base-200 shadow-lg text-sm font-heading font-semibold text-base-content" data-astro-cid-xgb2rloa> <span id="tooltip-text" data-astro-cid-xgb2rloa></span> </div> <svg viewBox="0 0 960 500" class="w-full h-full" id="rd-map" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" data-astro-cid-xgb2rloa> <text id="map-loading" x="480" y="250" class="text-[14px] font-heading pointer-events-none" fill="#94a3b8" text-anchor="middle" data-astro-cid-xgb2rloa>Cargando mapa...</text> <text x="620" y="50" class="text-[11px] italic font-body pointer-events-none tracking-[0.3em] uppercase" fill="#a3c9d9" text-anchor="middle" data-astro-cid-xgb2rloa>Océano Atlántico</text> <text x="400" y="470" class="text-[11px] italic font-body pointer-events-none tracking-[0.3em] uppercase" fill="#a3c9d9" text-anchor="middle" data-astro-cid-xgb2rloa>Mar Caribe</text> <g id="provinces-group" data-astro-cid-xgb2rloa></g> <g id="labels-group" data-astro-cid-xgb2rloa></g> <g id="overlays-group" data-astro-cid-xgb2rloa></g> <g transform="translate(830, 400)" class="pointer-events-none" data-astro-cid-xgb2rloa> <g id="map-compass" data-astro-cid-xgb2rloa> <circle cx="0" cy="0" r="18" fill="none" stroke="#b8ccd6" stroke-width="1" data-astro-cid-xgb2rloa></circle> <circle cx="0" cy="0" r="2" fill="#b8ccd6" data-astro-cid-xgb2rloa></circle> <line x1="0" y1="-14" x2="0" y2="-6" stroke="#b8ccd6" stroke-width="1.5" data-astro-cid-xgb2rloa></line> <line x1="0" y1="6" x2="0" y2="14" stroke="#b8ccd6" stroke-width="1" data-astro-cid-xgb2rloa></line> <line x1="-14" y1="0" x2="-6" y2="0" stroke="#b8ccd6" stroke-width="1" data-astro-cid-xgb2rloa></line> <line x1="6" y1="0" x2="14" y2="0" stroke="#b8ccd6" stroke-width="1" data-astro-cid-xgb2rloa></line> <polygon points="0,-14 -3,-8 3,-8" fill="#b8ccd6" data-astro-cid-xgb2rloa></polygon> </g> </g> </svg> <!-- Airplane pulling banner across the top --> <div class="airplane-flyby pointer-events-none absolute top-[8%] left-0 w-full z-20 overflow-hidden" data-astro-cid-xgb2rloa> <div class="airplane-slider" data-astro-cid-xgb2rloa> <!-- Banner --> <div class="airplane-banner-box" data-astro-cid-xgb2rloa>
¡Haz clic en algunas provincias y explora!
</div> <!-- Rope --> <svg class="airplane-rope" width="50" height="20" viewBox="0 0 50 20" data-astro-cid-xgb2rloa> <line x1="0" y1="14" x2="48" y2="10" stroke="#4A7088" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.5" data-astro-cid-xgb2rloa></line> </svg> <!-- Airplane --> <svg class="airplane-plane" width="32" height="32" viewBox="0 0 24 24" fill="none" data-astro-cid-xgb2rloa> <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="#3D5E6E" data-astro-cid-xgb2rloa></path> </svg> </div> </div> </div> </div> <!-- Bottom hint bar --> <div id="hint-bar" class="flex items-center justify-center pb-28 md:pb-4 pt-2 relative z-10" data-astro-cid-xgb2rloa> <div class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-base-100/90 backdrop-blur-sm border border-base-200 shadow-sm text-sm text-base-content/70 transition-all" data-astro-cid-xgb2rloa> <span class="w-2 h-2 rounded-full bg-info animate-pulse" data-astro-cid-xgb2rloa></span> <span class="overflow-hidden h-5 inline-flex flex-col relative font-medium text-rotate animate-text-slide duration-15000" data-astro-cid-xgb2rloa> <span class="animate-text-slide flex flex-col items-start" data-astro-cid-xgb2rloa> <span class="h-5 flex items-center" data-astro-cid-xgb2rloa>Haz clic en una provincia</span> <span class="h-5 flex items-center" data-astro-cid-xgb2rloa>Descubre lugares únicos</span> <span class="h-5 flex items-center" data-astro-cid-xgb2rloa>Planifica tu aventura</span> <span class="h-5 flex items-center" data-astro-cid-xgb2rloa>Encuentra tu destino</span> <span class="h-5 flex items-center" data-astro-cid-xgb2rloa>Explora el paraíso</span> </span> </span> </div> </div> </div> </section>  ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/mapa/MapSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/mapa/MapSection.astro", void 0);

const $$ProvinceModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ProvinceModalVue", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "@/components/mapa/ProvinceModal.vue", "client:component-export": "default" })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/mapa/ProvinceModal.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { provinces } = await getProvincesWithDestinations();
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", "<main> ", " ", " ", " </main> <script>(function(){", "\n		window.__PROVINCES__ = provinces;\n	})();<\/script> ", " "])), renderComponent($$result2, "Header", $$Header, {}), maybeRenderHead(), renderComponent($$result2, "MapSection", $$MapSection, {}), renderComponent($$result2, "ProvinceModal", $$ProvinceModal, {}), error === "auth_required" && renderTemplate`<div id="auth-toast" class="toast toast-top toast-center mt-20 z-100"> <div class="alert alert-warning shadow-lg rounded-2xl flex gap-3 text-warning-content"> <svg class="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <div class="mr-4"> <h3 class="font-bold text-sm">Acción denegada</h3> <div class="text-xs">Debes iniciar sesión para acceder a esa página.</div> </div> <button class="btn btn-sm btn-ghost btn-circle" onclick="document.getElementById('auth-toast').remove()">✕</button> </div> </div>`, defineScriptVars({ provinces }), renderScript($$result2, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/index.astro?astro&type=script&index=0&lang.ts")) })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/index.astro", void 0);

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
