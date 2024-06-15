<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getEpisodes} from "~/utils/api";
import EpisodeItem from "~/components/webtoons/episodes/EpisodeItem.vue";

const episodes = ref<any[]>([]);

const id = useRoute().params.id as any as number;

onMounted(async() => {
    const response = await getEpisodes(id);
    episodes.value = response.data;
});
</script>

<template>
    <div class="h-full w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 border-x-[1px]">
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
