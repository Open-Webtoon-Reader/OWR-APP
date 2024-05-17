<script setup>

import {onMounted, ref} from "vue";
import {getEpisodes} from "@/utils/request-utils.js";
import {useRoute} from "vue-router";
import EpisodeItem from "@/components/episodes/EpisodeItem.vue";

const route = useRoute();
const webtoonId = route.params.webtoonId;
const webtoonInfos = ref({});
const episodes = ref([]);

onMounted(async() => {
    webtoonInfos.value = await getEpisodes(webtoonId);
    episodes.value = webtoonInfos.value.episodes;
});
</script>

<template>
    <div class="episode-list" v-if="webtoonInfos.title">
        <header class="episodes-header">
            <h1 class="banner-title">{{webtoonInfos.title}}</h1>
            <img :src="webtoonInfos.backgroundBanner" alt="thumbnail" class="banner-background"/>
            <img :src="webtoonInfos.topBanner" alt="thumbnail" class="banner-top"/>
        </header>
        <div class="episodes-container">
            <div v-for="episode in episodes" :key="episode.id">
                <EpisodeItem :episode="episode"/>
            </div>
        </div>
    </div>
</template>

<style>

.episode-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: #0F0F0F;
}

.episodes-header {
    position: relative;
    text-align: center;
}

.banner-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: black;
}

.banner-background {
    width: 100%;
    height: auto;
    display: block;
}

.banner-top {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 0;
}

.episodes-container{
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 1rem;

    width: 100%;
    max-width: 50rem;

    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;

    background-color: #171717;
}
</style>
