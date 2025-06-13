<script setup lang="ts">
import EpisodeItem from "~/components/items/EpisodeItem.vue";
import type {EpisodeWithProgression} from "~/utils/types";

definePageMeta({
    layout: "navigation",
    middleware: [
        "server-url-middleware",
    ],
});

const id = useRoute().params.id;
const serverUrl = useLocalStorage("serverUrl", "");
const sortOrderStorage = useLocalStorage<Record<string, boolean>>("webtoonSortOrder", {});

const {data: webtoon} = await useAsyncData<Webtoon>(`webtoon-${id}`, () => $fetch(`${serverUrl.value}/webtoons/${id}`), {
    server: false,
});
const {data: episodes} = await useAsyncData<EpisodeWithProgression[]>(`episodes-${id}`, () => $fetch(`${serverUrl.value}/webtoons/${id}/episodes`), {
    server: false,
});
const token = useCookie("token").value;
const {data: progressions} = await useAsyncData<Progression[]>(`progressions-${id}`, async() => {
    if(!token) return [];
    try{
        return await $fetch(`${serverUrl.value}/user/progression/webtoon/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
    }catch{
        return [];
    }
}, {server: false});

const displayCount = ref(15);
const displayedEpisodes = computed(() => {
    if(!episodes.value)
        return [];
    episodes.value.forEach((episode) => {
        episode.progression = progressions.value?.find((progression) => progression.episodeId === episode.id)?.progression ?? 0;
    });
    if(isIncreasing.value)
        return episodes.value.slice(-displayCount.value).reverse();
    return episodes.value.slice(0, displayCount.value);
});

const isIncreasing = computed({
    get(){
        return sortOrderStorage.value[id] ?? false;
    },
    set(value: boolean){
        sortOrderStorage.value = {
            ...sortOrderStorage.value,
            [id]: value
        };
    }
});

function toggleIncreasing(){
    isIncreasing.value = !isIncreasing.value;
}

function resume(){
    // TODO: Implement resume
}

const hasMore = computed(() => {
    return episodes.value && displayCount.value < episodes.value.length;
});

const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && hasMore.value)
            displayCount.value += 15;
    }, {
        root: document.querySelector(".h-dvh"),
        rootMargin: "0px 0px 100px 0px"
    });

    watchEffect(() => {
        if(sentinel.value && hasMore.value)
            observer.observe(sentinel.value);
        else if (sentinel.value)
            observer.unobserve(sentinel.value);
    });

    onBeforeUnmount(() => {
        observer.disconnect();
    });
});
</script>

<template>
    <UiScrollArea class="h-dvh">
        <div class="flex flex-col">
            <div class="w-full justify-center self-center md:w-[40rem] lg:w-[50rem]">
                <div class="sticky top-0 z-10 grid grid-cols-6 items-center border border-t-0 bg-background p-4">
                    <ClientOnly>
                        <UiButton variant="outline" class="w-max" @click="toggleIncreasing">
                            <Icon v-if="isIncreasing" name="iconoir:filter-list" class="size-6 rotate-180"/>
                            <Icon v-else name="iconoir:filter-list" class="size-6"/>
                        </UiButton>
                    </ClientOnly>
                    <h3 class="col-span-4 truncate p-2 text-center">{{webtoon?.title}}</h3>
                    <div class="flex w-full justify-end">
                        <UiButton class="w-max" @click="resume">
                            <Icon name="iconoir:play" class="size-6"/>
                        </UiButton>
                    </div>
                </div>
                <EpisodeItem v-for="(episode, i) in displayedEpisodes" :key="i" :episode="episode"/>
                <div v-if="hasMore" ref="sentinel" class="h-1 w-full"/>
            </div>
        </div>
    </UiScrollArea>
</template>

<style scoped>

</style>
