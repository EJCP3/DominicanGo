// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({ mode: 'standalone' }),
    integrations: [vue()],
    image: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'https', hostname: 'picsum.photos' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
        ],
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
