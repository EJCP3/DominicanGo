import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../chunks/Header_Y8jLrYi7.mjs';
import { g as getUser } from '../chunks/api_BnOIfECD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Favoritos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Favoritos;
  const token = Astro2.cookies.get("auth_token")?.value ?? "";
  const user = await getUser(token);
  if (!user) {
    return Astro2.redirect("/?error=auth_required");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mis Viajes Guardados \u2014 DominicanGo", "description": "Tus destinos y diarios de viaje favoritos guardados para explorar m\xE1s tarde." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 bg-[#FDFBF7]"> <div class="max-w-[1400px] mx-auto px-4 sm:px-6"> ${renderComponent($$result2, "GuardadosDashboard", null, { "client:only": "vue", "token": token, "client:component-hydration": "only", "client:component-path": "@/components/usuario/GuardadosDashboard.vue", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/favoritos.astro", void 0);

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/favoritos.astro";
const $$url = "/favoritos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Favoritos,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
