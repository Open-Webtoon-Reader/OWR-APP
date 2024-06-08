// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: true},
    modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/eslint", "@nuxtjs/color-mode", "nuxt-icon"],
    shadcn: {
        prefix: "",
        componentDir: "./components/ui"
    },
    colorMode: {
        preference: "system",
        fallback: "light",
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
});
