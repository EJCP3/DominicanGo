import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, d as addAttribute, e as renderTransition, m as maybeRenderHead } from '../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_Y8jLrYi7.mjs';
import { F as FormularioBlog } from '../../chunks/FormularioBlog_DrBSp_MX.mjs';
import { g as getUser, b as getProvincesWithDestinations } from '../../chunks/api_BnOIfECD.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Nuevo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nuevo;
  const token = Astro2.cookies.get("auth_token")?.value;
  const [user, { provinces }] = await Promise.all([
    getUser(token),
    getProvincesWithDestinations()
  ]);
  if (!user) {
    return Astro2.redirect("/?error=auth_required");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Publicar experiencia \u2014 Blog DominicanGo" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"> <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"><\/script> ', " ", '<main class="min-h-screen pt-24 pb-24 bg-base-200/30"> <div class="max-w-3xl mx-auto px-4 sm:px-6"> <div class="mb-10 text-center"> <h1 class="font-heading font-extrabold text-3xl md:text-4xl text-base-content mb-3"', '>\nComparte tu <span class="text-primary">experiencia</span> </h1> <p class="text-base-content/70">\nInspira a otros viajeros contando tu experiencia en nuestros\n                    destinos.\n</p> </div> <!-- Success Alert (Hidden by default) --> <div id="success-alert" class="alert alert-success shadow-lg mb-8 hidden"> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div> <h3 class="font-bold">\xA1Publicaci\xF3n enviada!</h3> <div class="text-xs">\nTu historia est\xE1 siendo procesada y se publicar\xE1 pronto.\n</div> </div> </div> <div class="card bg-base-100 shadow-xl border border-base-200"> <div class="card-body p-6 md:p-10"> ', ' </div> </div> <div class="text-center mt-8"> <a href="/blog" class="text-base-content/50 hover:text-primary transition-colors hover:underline text-sm font-medium">Cancelar y volver al blog</a> </div> </div> </main>  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"> <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"><\/script> '])), renderComponent($$result2, "Header", $$Header, {}), maybeRenderHead(), addAttribute(renderTransition($$result2, "ty4nad7n", "", "blog-title"), "data-astro-transition-scope"), renderComponent($$result2, "FormularioBlog", FormularioBlog, { "client:load": true, "provinces": provinces, "token": token, "isAdmin": user.role === "ADMIN", "client:component-hydration": "load", "client:component-path": "@/components/blog/FormularioBlog.vue", "client:component-export": "default" })) })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/nuevo.astro", "self");

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/nuevo.astro";
const $$url = "/blog/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Nuevo,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
