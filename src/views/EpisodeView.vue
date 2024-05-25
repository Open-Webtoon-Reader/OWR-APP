<script setup>
import {onMounted, ref} from "vue";
import {getEpisode, getEpisodeImages} from "@/utils/request-utils.js";
import {useRoute} from "vue-router";
import ChunkDetector from "@/components/ChunkDetector.vue";

const route = useRoute();
const episodeId = route.params.episodeId;
const episode = ref({});
const images = ref([]);
const currentChunk = ref(0);

onMounted(async() => {
    episode.value = await getEpisode(episodeId);
    await loadMore();
});

async function loadMore(){
    currentChunk.value++;
    const newImages = await getEpisodeImages(episodeId, currentChunk.value);
    images.value = images.value.concat(newImages.images);
    console.log(images);
}
</script>

<template>
    <div class="episode-content">
        <h1 class="episode-title">{{episode.title}}</h1>
        <div v-for="image in images" :key="image.id" class="episode-images">
            <img :src="image" alt="episode image" v-if="images.indexOf(image) !== images.length - 1"/>
            <ChunkDetector @on-display="loadMore" v-else>
                <img :src="image" alt="episode image"/>
            </ChunkDetector>
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
