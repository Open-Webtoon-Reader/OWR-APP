<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
import {getEpisodeImages} from "~/utils/api";
import VisibilityObserver from "~/components/utils/VisibilityObserver.vue";

definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ],
    layout: "free-nav-layout"
});

const id = useRoute().params.id as any as number;

const episodeImages = ref<string[]>([]);
const maxIndex = ref<number>(10);

function increaseMaxIndex(){
    maxIndex.value += 10;
}

onMounted(async() => {
    const episodeState: any = useState(`episode-${id}`);
    if (episodeState.value && episodeState.value.length){
        episodeImages.value = episodeState.value;
        return;
    }
    const response = await getEpisodeImages(id);
    episodeImages.value = response.data;
    episodeState.value = episodeImages.value;
});
</script>

<template>
    <div class="flex flex-col">
        <div v-for="image of episodeImages.slice(0, maxIndex)" :key="episodeImages.indexOf(image)" class="flex justify-center">
            <NuxtImg v-if="episodeImages.indexOf(image) < maxIndex - 1" :src="sumToImageUrl(image)" alt="Episode Image" class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3"/>
            <VisibilityObserver v-else @on-display="increaseMaxIndex">
                <NuxtImg :src="sumToImageUrl(image)" alt="Episode Image" class="w-full md:w-2/3 lg:w-1/2 xl:w-1/3"/>
            </VisibilityObserver>
        </div>
    </div>
</template>

<style scoped>

</style>
