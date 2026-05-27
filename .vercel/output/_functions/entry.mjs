import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CrKCSq4E.mjs';
import { manifest } from './manifest_CEdK65Tt.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/feedback.astro.mjs');
const _page3 = () => import('./pages/api/search.astro.mjs');
const _page4 = () => import('./pages/auth/callback.astro.mjs');
const _page5 = () => import('./pages/blog/editar/_id_.astro.mjs');
const _page6 = () => import('./pages/blog/nuevo.astro.mjs');
const _page7 = () => import('./pages/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/blog.astro.mjs');
const _page9 = () => import('./pages/destinos/editar/_id_.astro.mjs');
const _page10 = () => import('./pages/destinos/nuevo.astro.mjs');
const _page11 = () => import('./pages/destinos/_province_/_poi_.astro.mjs');
const _page12 = () => import('./pages/destinos.astro.mjs');
const _page13 = () => import('./pages/favoritos.astro.mjs');
const _page14 = () => import('./pages/logout.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.1_@vercel+functi_6c629c168703b0977f33b0fd560f9bbe/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/feedback.astro", _page2],
    ["src/pages/api/search.ts", _page3],
    ["src/pages/auth/callback.astro", _page4],
    ["src/pages/blog/editar/[id].astro", _page5],
    ["src/pages/blog/nuevo.astro", _page6],
    ["src/pages/blog/[slug].astro", _page7],
    ["src/pages/blog/index.astro", _page8],
    ["src/pages/destinos/editar/[id].astro", _page9],
    ["src/pages/destinos/nuevo.astro", _page10],
    ["src/pages/destinos/[province]/[poi].astro", _page11],
    ["src/pages/destinos/index.astro", _page12],
    ["src/pages/favoritos.astro", _page13],
    ["src/pages/logout.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "04f4b9c7-0da2-4cb9-a211-3ef7691717eb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
