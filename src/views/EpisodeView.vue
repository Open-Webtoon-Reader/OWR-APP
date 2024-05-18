<script setup>

import {onMounted, ref} from "vue";
import {getEpisode, getEpisodeImages} from "@/utils/request-utils.js";
import {useRoute} from "vue-router";

const route = useRoute();
const episodeId = route.params.episodeId;
const episode = ref({});
const images = ref([]);

onMounted(async() => {
    episode.value = await getEpisode(episodeId);
    images.value = await getEpisodeImages(episodeId);
});
</script>

<template>
    <div class="episode-content">
        <h1 class="episode-title">{{episode.title}}</h1>
        <div v-for="image in images" :key="image.id" class="episode-images">
            <img :src="image" alt="episode image"/>
        </div>
    </div>
</template>

<style scoped>
.episode-content{
    display: flex;
    flex-direction: column;
    align-items: center;

    &>.episode-title{
        padding: 1rem 0;
        text-align: center;
    }
}
.episode-images{
    max-width: 40rem;
}
</style>
