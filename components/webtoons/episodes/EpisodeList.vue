<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getEpisodes, getWebtoon} from "~/utils/api";
import EpisodeItem from "~/components/webtoons/episodes/EpisodeItem.vue";

const title = ref("");
const episodes = ref<any[]>([]);

const id = useRoute().params.id as any as number;

function loadEpisodes(){
    getEpisodes(id).then(response => {
        episodes.value = response.data;
    });
}

function loadTitle(){
    getWebtoon(id).then(response => {
        title.value = response.data.title;
    });
}

onMounted(() => {
    loadTitle();
    loadEpisodes();
});
</script>

<template>
    <div class="h-full w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 border-x-[1px]">
        <div id="header" class="flex gap-4 py-4 px-10 justify-center">
            <h4>{{ title }}</h4>
        </div>
        <div id="content" class="h-full overflow-y-scroll">
            <div v-for="episode in episodes" :key="episode.id">
                <Separator/>
                <EpisodeItem :episode="episode"/>
            </div>
            <Separator/>
        </div>
    </div>
</template>

<style scoped>

</style>
