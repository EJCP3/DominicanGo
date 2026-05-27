import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, e as renderTransition, a as renderTemplate, b as createAstro, u as unescapeHTML, f as renderScript } from '../../chunks/astro/server_BPHVUzso.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Header_Y8jLrYi7.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_DY3b9lXa.mjs';
/* empty css                                     */
import { c as getBlogs, d as getFavoriteIds, g as getUser } from '../../chunks/api_BnOIfECD.mjs';
import { S as SocialActions, C as Comments, D as DeleteContentModal } from '../../chunks/DeleteContentModal_BREiaUsj.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$BlogPostHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BlogPostHero;
  const { title, image, images = [], slug } = Astro2.props;
  const lightboxImages = images.length > 0 ? images : [image];
  return renderTemplate`${maybeRenderHead()}<button class="w-full aspect-video md:aspect-21/9 rounded-3xl overflow-hidden shadow-xl mb-10 relative cursor-zoom-in group bg-base-300 appearance-none border-none p-0 inline-block text-left"${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify(lightboxImages)}, currentIndex: 0, alt: '${title}' } }))`, "onclick")}${addAttribute(`Ampliar imagen del blog: ${title}`, "aria-label")} tabindex="0"> <figure class="w-full h-full m-0 pointer-events-none"> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": title, "width": 1200, "height": 600, "format": "webp", "loading": "eager", "class": "w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105", "data-astro-transition-scope": renderTransition($$result, "5xnnpzrt", "", `img-blog-${slug}`) })} </figure> <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div> </button>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/blog/BlogPostHero.astro", "self");

const $$Astro$2 = createAstro();
const $$BlogPostContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BlogPostContent;
  const {
    title,
    author,
    date,
    content,
    destinationName,
    destinationSlug,
    provinceId,
    slug,
    authorFoto
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-3xl mx-auto"> <div class="flex items-center gap-3 text-sm text-base-content/60 font-medium mb-4 uppercase tracking-wider"> <span class="text-primary">Destino vinculado</span> <span>•</span> <a${addAttribute(`/destinos/${provinceId}/${destinationSlug}`, "href")} class="hover:text-primary transition-colors hover:underline inline-flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> ${destinationName} </a> </div> <h1 class="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-base-content leading-tight mb-8"${addAttribute(renderTransition($$result, "5xtje5a7", "", `title-blog-${slug}`), "data-astro-transition-scope")}> ${title} </h1> <div class="flex items-center gap-4 mb-12 border-b border-base-200 pb-8"> <div class="w-12 h-12 rounded-full ring-2 ring-primary/20 ring-offset-2 overflow-hidden bg-primary/10 flex items-center justify-center"> ${authorFoto ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": authorFoto, "alt": author, "width": 96, "height": 96, "format": "webp", "class": "w-full h-full object-cover" })}` : renderTemplate`<span class="font-bold text-lg text-primary">${author.charAt(0)}</span>`} </div> <div> <div class="font-bold text-base-content">${author}</div> <div class="text-sm text-base-content/50"> ${date} </div> </div> </div> <div class="prose prose-lg prose-base-content max-w-none text-base-content/80 font-serif leading-relaxed">${unescapeHTML(content)}</div> </div>`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/blog/BlogPostContent.astro", "self");

const $$Astro$1 = createAstro();
const $$BlogBentoGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogBentoGallery;
  const { images, title } = Astro2.props;
  const galleryImages = images.slice(1);
  return renderTemplate`${galleryImages.length > 0 && renderTemplate`${maybeRenderHead()}<section class="mt-12 max-w-3xl mx-auto" aria-labelledby="gallery-title"><h3 id="gallery-title" class="font-heading font-bold text-2xl text-base-content mb-6">
Galería
</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">${galleryImages.map((img, index) => {
    const spanClass = index % 5 === 0 ? "col-span-2 row-span-2" : index % 5 === 1 || index % 5 === 2 ? "col-span-2 md:col-span-1 row-span-1" : "col-span-1 row-span-1";
    return renderTemplate`<button type="button"${addAttribute(`block w-full h-full p-0 border-none appearance-none group overflow-hidden rounded-2xl md:rounded-3xl shadow-sm cursor-zoom-in relative ${spanClass} text-left`, "class")}${addAttribute(`window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { images: ${JSON.stringify(images)}, currentIndex: ${index + 1}, alt: '${title} - Galer\xEDa' } }))`, "onclick")} aria-label="Ampliar imagen de la galería">${renderComponent($$result, "Image", $$Image, { "src": img, "alt": `${title} - Galer\xEDa`, "width": index % 5 === 0 ? 800 : 400, "height": index % 5 === 0 ? 600 : 400, "format": "webp", "loading": "lazy", "class": "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" })}<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center"><svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg></div></button>`;
  })}</div></section>`}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/blog/BlogBentoGallery.astro", void 0);

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const token = Astro2.cookies.get("auth_token")?.value ?? "";
  const API_BASE = "https://dominicango-api.onrender.com/api"?.replace("/api", "") || "http://localhost:3000";
  const loginUrl = `${API_BASE}/auth/google`;
  const { slug } = Astro2.params;
  const [
    { data },
    { blogIds: favBlogIds },
    user
  ] = await Promise.all([
    getBlogs({ slug }),
    getFavoriteIds(token),
    getUser(token)
  ]);
  const post = data && data.length > 0 ? data[0] : null;
  if (!post) {
    return Astro2.redirect("/blog");
  }
  const dateToFormat = post.publishedAt || post.createdAt || /* @__PURE__ */ new Date();
  const formattedDate = new Date(dateToFormat).toLocaleDateString("es-DO", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const authorName = post.author?.name || "Viajero DominicanGo";
  const destinationName = post.destination?.name || null;
  const provinceId = post.provinceId || null;
  const destinationSlug = post.destination?.slug || null;
  const isFavorited = favBlogIds.has(post.id);
  const isOwner = user && post.author && user.id === post.author.id;
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const canManage = isOwner || isAdmin;
  const canEdit = isAdmin || isOwner && Date.now() - new Date(post.createdAt).getTime() < 60 * 60 * 1e3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.title} — Blog DominicanGo` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-24"> <article class="max-w-4xl mx-auto px-4 sm:px-6"> ${renderComponent($$result2, "BlogPostHero", $$BlogPostHero, { "title": post.title, "image": post.images[0], "images": post.images, "slug": slug })} ${renderComponent($$result2, "BlogPostContent", $$BlogPostContent, { "title": post.title, "author": authorName, "date": formattedDate, "content": post.content, "destinationName": destinationName, "destinationSlug": destinationSlug, "provinceId": provinceId, "slug": slug, "authorFoto": post.author?.foto })} ${renderComponent($$result2, "BlogBentoGallery", $$BlogBentoGallery, { "images": post.images, "title": post.title })}  <div class="mt-12"> ${renderComponent($$result2, "SocialActions", SocialActions, { "client:visible": true, "targetType": "BLOG", "targetId": post.id, "token": token, "loginUrl": loginUrl, "initialFavorited": isFavorited, "title": "¿Te gustó este artículo?", "subtitle": "Dale amor con tu reacción, guárdalo o compártelo.", "client:component-hydration": "visible", "client:component-path": "@/components/interactions/SocialActions.vue", "client:component-export": "default" })} </div> <footer class="max-w-3xl mx-auto mt-16 pt-8 border-t border-base-200"> <a href="/blog" class="btn btn-ghost text-base-content/60 hover:text-base-content mb-8">
← Volver al blog
</a> </footer> ${renderComponent($$result2, "Comments", Comments, { "client:visible": true, "targetType": "BLOG", "targetId": post.id, "token": token, "loginUrl": loginUrl, "client:component-hydration": "visible", "client:component-path": "@/components/interactions/Comments.vue", "client:component-export": "default" })} <!-- Author/Admin actions --> ${canManage && renderTemplate`<section class="mt-8 bg-base-100 rounded-3xl border border-base-200 shadow-sm overflow-hidden"> <div class="px-6 py-4 border-b border-base-200 flex items-center gap-2.5"> <div class="w-7 h-7 rounded-xl bg-neutral/8 flex items-center justify-center"> <svg class="w-3.5 h-3.5 text-neutral/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> </div> <span class="text-xs font-bold uppercase tracking-widest text-base-content/40">Gestión del autor</span> </div> <div class="p-5 flex flex-wrap gap-3"> ${canEdit && renderTemplate`<a${addAttribute(`/blog/editar/${post.id}`, "href")} class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-base-200 hover:bg-base-300 text-base-content/80 hover:text-base-content transition-all"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg>
Editar
</a>`} <button id="btn-delete-blog" type="button" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-error bg-error/8 hover:bg-error/15 border border-error/20 hover:border-error/40 transition-all"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg>
Eliminar
</button> ${renderComponent($$result2, "DeleteContentModal", DeleteContentModal, { "client:load": true, "show": false, "resourceId": post.id, "resourceType": "blog", "resourceTitle": post.title, "token": token, "client:component-hydration": "load", "client:component-path": "@/components/ui/DeleteContentModal.vue", "client:component-export": "default" })} </div> </section>`} </article> </main> ` })} ${renderScript($$result, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/[slug].astro", void 0);
const $$file = "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
