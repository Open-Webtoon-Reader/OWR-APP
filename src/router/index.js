import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ApiUrlView from "@/views/ApiUrlView.vue";
import EpisodesView from "@/views/EpisodesView.vue";
import EpisodeView from "@/views/EpisodeView.vue";
import {apiUrlRequiredMiddleware, missingApiUrlRequired} from "@/middlewares/api-url.middleware.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            beforeEnter: apiUrlRequiredMiddleware
        },
        {
            path: "/apiurl",
            name: "apiurl",
            component: ApiUrlView,
            beforeEnter: missingApiUrlRequired
        },
        {
            path: "/episodes/:webtoonId",
            name: "episodes",
            component: EpisodesView,
            beforeEnter: apiUrlRequiredMiddleware
        },
        {
            path: "/episode/:episodeId",
            name: "episode",
            component: EpisodeView,
            beforeEnter: apiUrlRequiredMiddleware
        }
    ]
});

export default router;
