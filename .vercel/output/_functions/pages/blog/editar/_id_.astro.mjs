import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../../chunks/Header_Y8jLrYi7.mjs';
import { F as FormularioBlog } from '../../../chunks/FormularioBlog_DrBSp_MX.mjs';
import { g as getUser } from '../../../chunks/api_BnOIfECD.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const token = Astro2.cookies.get("auth_token")?.value;
  const user = await getUser(token);
  if (!user) {
    return Astro2.redirect("/?error=auth_required");
  }
  const { id } = Astro2.params;
  let blog = null;
  try {
    const apiBase = "https://dominicango-api.onrender.com/api";
    const res = await fetch(`${apiBase}/blogs/${id}`);
    if (res.ok) {
      const json = await res.json();
      blog = json.data || json;
    }
  } catch (e) {
  }
  if (!blog) {
    return Astro2.redirect("/blog");
  }
  const isOwner = user.id === blog.authorId;
  const isAdmin = user.role === "ADMIN";
  const canAccess = isOwner || isAdmin;
  if (!canAccess) {
    return Astro2.redirect("/blog");
  }
  const oneHour = 60 * 60 * 1e3;
  const withinEditWindow = isAdmin || Date.now() - new Date(blog.createdAt).getTime() < oneHour;
  if (!withinEditWindow) {
    return Astro2.redirect(`/blog?error=edit_expired`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Editar: ${blog.title} — DominicanGo`, "description": "Edita los detalles de este blog.", "showWidgets": false }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"> <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> ', " ", '<main class="min-h-screen pt-24 pb-16 bg-[#FDFBF7]"> <div class="max-w-[800px] mx-auto px-4 sm:px-6"> <div class="text-center mb-10"> <h1 class="font-heading font-extrabold text-4xl md:text-5xl text-base-content mb-3">\nEditar <span class="text-secondary">Blog</span> </h1> <p class="text-base-content/70 max-w-xl text-lg mx-auto">\nActualiza tu historia de viaje.\n', " </p> </div> ", " </div> </main> "])), renderComponent($$result2, "Header", $$Header, {}), maybeRenderHead(), !isAdmin && renderTemplate`<span class="block text-sm text-warning mt-1">
⏱ Solo puedes editar en los primeros 60 minutos desde su creación.
</span>`, renderComponent($$result2, "FormularioBlog", FormularioBlog, { "client:load": true, "blogData": blog, "token": token, "isAdmin": isAdmin, "client:component-hydration": "load", "client:component-path": "@/components/blog/FormularioBlog.vue", "client:component-export": "default" })) })}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/editar/[id].astro", void 0);
const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/editar/[id].astro";
const $$url = "/blog/editar/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
