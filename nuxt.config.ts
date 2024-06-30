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
        "@nuxt/image"
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
    }
});
