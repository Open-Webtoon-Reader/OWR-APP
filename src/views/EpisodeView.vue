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
    <h1>{{episode.title}}</h1>
    <div v-for="image in images" :key="image.id">
        <img :src="image" alt="episode image"/>
    </div>
</template>

<style scoped>

</style>
