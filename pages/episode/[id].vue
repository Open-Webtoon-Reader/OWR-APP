<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
import {getEpisodeImages, getEpisodeInfos} from "~/utils/api";
import VisibilityObserver from "~/components/utils/VisibilityObserver.vue";

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

const episodeImages = ref<string[]>([]);
const episodeInfos = ref<any>({});
const maxIndex = ref<number>(10);

function increaseMaxIndex(){
    maxIndex.value += 10;
}

async function loadEpisodeImages(){
    const episodeState: any = useState(`episode-${id}`);
    if (episodeState.value && episodeState.value.length){
        episodeImages.value = episodeState.value;
        return;
    }
    const response = await getEpisodeImages(id);
    episodeImages.value = response.data;
    episodeState.value = episodeImages.value;
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

function removeLoadingClass(event: Event){
    const target = event.target as HTMLImageElement;
    target.classList.remove("loading-episode");
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
            <NuxtImg
                v-if="index < maxIndex - 1"
                :src="sumToImageUrl(image)"
                format="webp"
                alt="Episode Image"
                class="w-full loading-episode"
                @load="removeLoadingClass"
            />
            <VisibilityObserver v-else @on-display="increaseMaxIndex">
                <NuxtImg
                    :src="sumToImageUrl(image)"
                    alt="Episode Image"
                    class="w-full loading-episode"
                    @load="removeLoadingClass"
                />
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
.loading-episode{
    @apply h-96;
}
</style>
