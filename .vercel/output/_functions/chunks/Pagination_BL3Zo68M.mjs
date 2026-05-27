import { c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, F as Fragment, a as renderTemplate, b as createAstro } from './astro/server_BPHVUzso.mjs';
import 'piccolore';

let navigateOnServerWarned = false;
async function navigate(href, options) {
  {
    if (!navigateOnServerWarned) {
      const warning = new Error(
        "The view transitions client API was called during a server side render. This may be unintentional as the navigate() function is expected to be called in response to user interactions. Please make sure that your usage is correct."
      );
      warning.name = "Warning";
      console.warn(warning);
      navigateOnServerWarned = true;
    }
    return;
  }
}

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, baseUrl, searchParams = new URLSearchParams() } = Astro2.props;
  const getPageUrl = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead()}<div class="flex justify-center mt-12 mb-8"><nav class="join bg-white/50 backdrop-blur-sm border border-base-200 p-1 shadow-sm rounded-2xl" aria-label="Navegación de páginas"><!-- Previous Button --><a${addAttribute(currentPage > 1 ? getPageUrl(currentPage - 1) : "#", "href")}${addAttribute(`join-item btn btn-ghost btn-sm md:btn-md px-3 md:px-4 ${currentPage === 1 ? "btn-disabled opacity-30" : "hover:bg-primary/10 hover:text-primary transition-all pointer-events-auto"}`, "class")} aria-label="Página anterior"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg></a><!-- Page Numbers -->${startPage > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<a${addAttribute(getPageUrl(1), "href")} class="join-item btn btn-ghost btn-sm md:btn-md px-3 md:px-4 hover:bg-primary/10 hover:text-primary transition-all">1</a>${startPage > 2 && renderTemplate`<button class="join-item btn btn-ghost btn-disabled btn-sm md:btn-md px-1 opacity-50">...</button>`}` })}`}${pages.map((page) => renderTemplate`<a${addAttribute(getPageUrl(page), "href")}${addAttribute(`join-item btn btn-sm md:btn-md px-3 md:px-4 transition-all duration-300 ${page === currentPage ? "btn-primary shadow-lg shadow-primary/25 pointer-events-none" : "btn-ghost hover:bg-primary/10 hover:text-primary"}`, "class")}${addAttribute(page === currentPage ? "page" : void 0, "aria-current")}>${page}</a>`)}${endPage < totalPages && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${endPage < totalPages - 1 && renderTemplate`<button class="join-item btn btn-ghost btn-disabled btn-sm md:btn-md px-1 opacity-50">...</button>`}<a${addAttribute(getPageUrl(totalPages), "href")} class="join-item btn btn-ghost btn-sm md:btn-md px-3 md:px-4 hover:bg-primary/10 hover:text-primary transition-all">${totalPages}</a>` })}`}<!-- Next Button --><a${addAttribute(currentPage < totalPages ? getPageUrl(currentPage + 1) : "#", "href")}${addAttribute(`join-item btn btn-ghost btn-sm md:btn-md px-3 md:px-4 ${currentPage === totalPages ? "btn-disabled opacity-30" : "hover:bg-primary/10 hover:text-primary transition-all pointer-events-auto"}`, "class")} aria-label="Página siguiente"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg></a></nav></div>`}`;
}, "C:/Users/euddy/Desktop/Pagina web/DominicanGo/App/src/components/ui/Pagination.astro", void 0);

export { $$Pagination as $, navigate as n };
