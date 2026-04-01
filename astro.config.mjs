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
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
            { protocol: 'http', hostname: 'vps23897.cubepath.net' },
            { protocol: 'https', hostname: 'vps23897.cubepath.net' },
            { protocol: 'http', hostname: 'voo5p8djop0273tcxmv6v821.45.90.237.199.sslip.io' },
            { protocol: 'https', hostname: 'voo5p8djop0273tcxmv6v821.45.90.237.199.sslip.io' },
            { protocol: 'http', hostname: '45.90.237.199.sslip.io' },
            { protocol: 'https', hostname: '45.90.237.199.sslip.io' }
        ],
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
