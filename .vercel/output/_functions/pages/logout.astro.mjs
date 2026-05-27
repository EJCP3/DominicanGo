import { c as createComponent, b as createAstro } from '../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete("auth_token", {
    path: "/"
  });
  return Astro2.redirect("/", 302);
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/logout.astro", void 0);

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Logout,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
