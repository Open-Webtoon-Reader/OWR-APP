// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    devtools: {enabled: true},

    modules: [
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@nuxt/eslint",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "@nuxt/image",
        "@vite-pwa/nuxt"
    ],

    shadcn: {
        prefix: "",
        componentDir: "./components/ui"
    },

    colorMode: {
        preference: "system",
        fallback: "dark",
        classSuffix: ""
    },

    tailwindcss: {
        cssPath: [
            "~/assets/css/index.css",
            {injectPosition: 0}
        ],
        configPath: "tailwind.config.ts",
        exposeConfig: false,
        viewer: true,
    },

    app: {
        head: {
            link: [{rel: "icon", type: "image/svg+xml", href: "/logo.svg"}]
        }
    },

    pwa: {
        manifest: {
            name: "Open Webtoon Reader",
            short_name: "OWR",
            description: "An open-source webtoon reader",
            theme_color: "#020817",
            display: "fullscreen",
            lang: "en",
            orientation: "portrait",
            screenshots: [
                {
                    src: "/screenshot.png",
                    type: "image/png",
                    sizes: "1919x915",
                    form_factor: "wide"
                },
                {
                    src: "/screenshot.png",
                    type: "image/png",
                    sizes: "1919x915",
                    form_factor: "narrow"
                }
            ],
            icons: [
                {
                    src: "/logo-192.webp",
                    sizes: "192x192",
                    type: "image/webp"
                },
                {
                    src: "/logo-512.webp",
                    sizes: "512x512",
                    type: "image/webp"
                }
            ],
        },
        workbox: {
            navigateFallback: "/",
        },
        devOptions: {
            enabled: true,
            type: "module",
        }
    },

    compatibilityDate: "2024-10-12"
});
