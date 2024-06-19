<script setup lang="ts">
import {ref, onMounted} from "vue";
import {getEpisodes, getWebtoon} from "~/utils/api";
import EpisodeItem from "~/components/webtoons/episodes/EpisodeItem.vue";
import {Skeleton} from "~/components/ui/skeleton";
import EpisodeSkeleton from "~/components/webtoons/episodes/EpisodeSkeleton.vue";
import VisibilityObserver from "~/components/utils/VisibilityObserver.vue";

const title = ref("");
const episodes = ref<any[]>([]);
const maxIndex = ref<number>(30);
const newFirst = ref<boolean>(true);

const id = useRoute().params.id as any as number;

function loadEpisodes(){
    const webtoonState: any = useState(`webtoon-${id}`);
    if (webtoonState.value){
        episodes.value = webtoonState.value;
        return;
    }
    getEpisodes(id).then(response => {
        episodes.value = response.data;
        webtoonState.value = response.data;
    });
}

function loadTitle(){
    getWebtoon(id).then(response => {
        title.value = response.data.title;
    });
}

function increaseMaxIndex(){
    maxIndex.value += 30;
}

function toggleOrder(){
    newFirst.value = !newFirst.value;
}

const orderedEpisodes = computed(() => {
    return newFirst.value ? episodes.value : [...episodes.value].reverse();
});

onMounted(() => {
    loadTitle();
    loadEpisodes();
});
</script>

<template>
    <div class="h-full w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 border-x-[1px]">
        <div id="header" class="relative flex gap-4 py-4 px-10 justify-center items-center">
            <Button variant="outline" class="absolute left-0 ml-4" @click="toggleOrder">
                <Icon v-if="newFirst" name="iconoir:arrow-up"/>
                <Icon v-else name="iconoir:arrow-down"/>
            </Button>
            <h4 v-if="title">{{ title }}</h4>
            <Skeleton v-else class="w-1/2 h-8"/>
        </div>
        <Separator/>
        <div id="content" class="h-full overflow-y-scroll">
            <div v-if="!episodes.length">
                <div v-for="n in 4" :key="n">
                    <EpisodeSkeleton/>
                    <Separator/>
                </div>
            </div>
            <div v-for="episode in orderedEpisodes.slice(0, maxIndex)" :key="episode.id">
                <EpisodeItem v-if="orderedEpisodes.indexOf(episode) < maxIndex - 1" :episode="episode"/>
                <VisibilityObserver v-else @on-display="increaseMaxIndex">
                    <EpisodeItem :episode="episode"/>
                </VisibilityObserver>
                <Separator/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
