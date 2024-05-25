<script setup>
import {onMounted, ref} from "vue";
import {getEpisodes} from "@/utils/request-utils.js";
import EpisodeItem from "@/components/episodes/EpisodeItem.vue";
import ChunkDetector from "@/components/ChunkDetector.vue";

const props = defineProps({
    webtoonId: {
        type: String,
        required: true
    }
});

const episodes = ref([]);
const currentChunk = ref(0);

onMounted(async() => {
    await loadMore();
});

async function loadMore(){
    currentChunk.value++;
    episodes.value = episodes.value.concat((await getEpisodes(props.webtoonId, currentChunk.value)).episodes);
}
</script>

<template>
    <div class="episode-list">
        <div class="episodes-container">
            <div v-for="episode in episodes" :key="episode.id">
                <EpisodeItem :episode="episode" v-if="episodes.indexOf(episode) !== episodes.length - 8"/>
                <ChunkDetector v-else @on-display="loadMore">
                    <EpisodeItem :episode="episode"/>
                </ChunkDetector>
            </div>
        </div>
    </div>
</template>

<style scoped>
.episode-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    background-color: #0F0F0F;
}

.episodes-container {
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
