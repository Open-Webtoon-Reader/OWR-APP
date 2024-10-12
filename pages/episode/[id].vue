<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
import {getEpisodeImages, getEpisodeInfos} from "~/utils/api";
import VisibilityObserver from "~/components/utils/VisibilityObserver.vue";
import {getEpisodeProgression, startEpisode} from "~/utils/storage";

definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ],
    layout: "free-nav-layout"
});

useSeoMeta({
    title: "OWR",
    description: "Episode page",
});

const id = useRoute().params.id as any as number;

const isCancelled = ref(false);
new Promise((resolve) => {
    setTimeout(() => {
        if (isCancelled.value) return;
        startEpisode(id);
        resolve();
    }, 2500);
});
onBeforeRouteLeave(() => {
    isCancelled.value = true;
});

const episodeProgression = getEpisodeProgression(id);

const episodeImages = ref<string[]>([]);
const episodeInfos = ref<any>({});
const maxIndex = ref<number>(episodeProgression < 10 ? 10 : episodeProgression + 10);

function increaseMaxIndex(){
    maxIndex.value += 10;
}

async function loadEpisodeImages(){
    const episodeState: any = useState(`episode-${id}`);
    if (episodeState.value && episodeState.value.length){
        episodeImages.value = episodeState.value;
        setTimeout(() => {
            scrollToImage();
        }, 100);
        return;
    }
    const response = await getEpisodeImages(id);
    episodeImages.value = response.data;
    episodeState.value = episodeImages.value;

    setTimeout(() => {
        scrollToImage();
    }, 100);
}

function scrollToImage(){
    const imageId = episodeImages.value[episodeProgression];
    if(episodeProgression < 5) return;
    const nuxtImg = document.getElementById(imageId);
    if (nuxtImg)
        nuxtImg.scrollIntoView({behavior: "smooth"});
}

async function loadEpisodeInfos(){
    const episodeState: any = useState(`episode-infos-${id}`);
    if (episodeState.value && episodeState.value.length){
        episodeInfos.value = episodeState.value;
        return;
    }
    const response = await getEpisodeInfos(id);
    episodeInfos.value = response.data;
    episodeState.value = episodeInfos.value;
    useSeoMeta({
        title: `OWR | ${episodeInfos.value.title}`,
        description: "Episode page",
    });
}

function updateProgression(index: number){
    if(index > 5 && index > episodeProgression)
        setEpisodeProgression(id, index - 1);
}

onMounted(async() => {
    loadEpisodeImages();
    loadEpisodeInfos();
});
</script>

<template>
    <div class="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div id="header" class="flex border-[1px] border-t-0 w-full justify-center">
            <h3 class="m-2">{{ episodeInfos.title }}</h3>
        </div>
        <div v-for="(image, index) of episodeImages.slice(0, maxIndex)" :key="index" class="w-full">
            <VisibilityObserver @on-display="updateProgression(index)">
                <NuxtImg
                    v-if="index < maxIndex - 1"
                    :id="image"
                    :src="sumToImageUrl(image)"
                    format="webp"
                    alt="Episode Image"
                    class="w-full"
                    width="800"
                    height="1280"
                />
                <VisibilityObserver v-else @on-display="increaseMaxIndex">
                    <NuxtImg
                        :id="image"
                        :src="sumToImageUrl(image)"
                        format="webp"
                        alt="Episode Image"
                        class="w-full"
                        width="800"
                        height="1280"
                    />
                </VisibilityObserver>
            </VisibilityObserver>
        </div>
        <div id="footer" class="w-full flex flex-row justify-between py-4 px-8 border-[1px]">
            <Button variant="secondary" :disabled="!episodeInfos.previousEpisodeId" @click="navigateTo(`/episode/${episodeInfos.previousEpisodeId}`, {replace: true})">
                <Icon name="iconoir:arrow-left"/>
            </Button>
            <Button variant="secondary" :disabled="!episodeInfos.nextEpisodeId" @click="navigateTo(`/episode/${episodeInfos.nextEpisodeId}`, {replace: true})">
                <Icon name="iconoir:arrow-right"/>
            </Button>
        </div>
    </div>
</template>

<style scoped>

</style>
