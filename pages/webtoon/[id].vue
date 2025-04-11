<script setup lang="ts">
import EpisodeItem from "~/components/items/EpisodeItem.vue";

definePageMeta({
    layout: "navigation",
    middleware: [
        "server-url-middleware",
    ],
});

const id = useRoute().params.id;
const serverUrl = useLocalStorage("serverUrl", "");
const {data: webtoon} = await useAsyncData<Webtoon>("webtoon", () => $fetch(`${serverUrl.value}/webtoons/${id}`), {
    server: false,
});
const {data: episodes} = await useAsyncData<Episode[]>("episodes", () => $fetch(`${serverUrl.value}/webtoons/${id}/episodes`), {
    server: false,
});

const displayCount = ref(50);
const displayedEpisodes = computed(() => {
    if(!episodes.value)
        return [];
    if(isIncreasing.value)
        return episodes.value.slice(-displayCount.value).reverse();
    return episodes.value.slice(0, displayCount.value);
});

const isIncreasing = ref<boolean>(false);

function toggleIncreasing(){
    isIncreasing.value = !isIncreasing.value;
}

function resume(){
    // TODO: Implement resume
}
</script>

<template>
    <UiScrollArea class="h-dvh">
        <div class="flex flex-col">
            <div class="w-full justify-center self-center md:w-[40rem] lg:w-[50rem]">
                <div class="sticky top-0 z-10 grid grid-cols-6 items-center border border-t-0 bg-background p-4">
                    <UiButton variant="outline" class="w-max" @click="toggleIncreasing">
                        <Icon v-if="isIncreasing" name="iconoir:filter-list" class="size-6 rotate-180"/>
                        <Icon v-else name="iconoir:filter-list" class="size-6"/>
                    </UiButton>
                    <h3 class="col-span-4 truncate p-2 text-center">{{webtoon?.title}}</h3>
                    <div class="flex w-full justify-end">
                        <UiButton class="w-max" @click="resume">
                            <Icon name="iconoir:play" class="size-6"/>
                        </UiButton>
                    </div>
                </div>
                <EpisodeItem v-for="(episode, i) in displayedEpisodes" :key="i" :episode="episode"/>
            </div>
        </div>
    </UiScrollArea>
</template>

<style scoped>

</style>
