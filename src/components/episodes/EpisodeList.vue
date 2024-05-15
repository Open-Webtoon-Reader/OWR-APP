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
    <h1>{{webtoonInfos.title}}</h1>
    <img :src="webtoonInfos.backgroundBanner" alt="thumbnail"/>
    <img :src="webtoonInfos.topBanner" alt="thumbnail"/>
    <div v-for="episode in episodes" :key="episode.id">
        <EpisodeItem :episode="episode"/>
    </div>
</template>

<style scoped>

</style>
