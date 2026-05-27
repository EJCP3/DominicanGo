import { c as createComponent, b as createAstro } from '../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Callback = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callback;
  const token = Astro2.url.searchParams.get("token");
  if (!token) {
    return Astro2.redirect("/?error=auth_failed");
  }
  Astro2.cookies.set("auth_token", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
    // 1 día
    httpOnly: false,
    // false para que los componentes Vue puedan leerla con document.cookie
    sameSite: "lax",
    // lax funciona cuando el backend redirige al frontend (navegación top-level)
    secure: true
    // true porque Vercel sirve HTTPS
  });
  return Astro2.redirect("/", 302);
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/auth/callback.astro", void 0);

const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Callback,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
