<script setup lang="ts">
import WebtoonItem from "~/components/items/WebtoonItem.vue";

definePageMeta({
    layout: "navigation",
    middleware: [
        "server-url-middleware",
    ],
});
useHead({
    title: "OWR",
    meta: [
        {
            name: "OWR Home page",
            content: "Home page",
        },
    ],
});

const serverUrl = useLocalStorage("serverUrl", "");
const {data: webtoons} = await useAsyncData<Webtoon[]>("webtoons", () => $fetch(`${serverUrl.value}/webtoons`), {
    server: false,
});
const token = useCookie("token").value;
const {data: likes} = await useAsyncData<number[]>("likes", async() => {
    if(!token) return [];
    try{
        return await $fetch(`${serverUrl.value}/user/likes/webtoons`, {
            headers: {Authorization: `Bearer ${token}`}
        });
    }catch{
        return [];
    }
}, {server: false});

const sortedWebtoons = computed(() => {
    if(!webtoons.value)
        return [];
    const sortedList = [...webtoons.value];
    sortedList.sort((a, b) => {
        const aLiked = likes.value?.includes(a.id) ?? false;
        const bLiked = likes.value?.includes(b.id) ?? false;
        return (bLiked ? 1 : 0) - (aLiked ? 1 : 0);
    });
    sortedList.sort((a, b) => {
        const aLiked = likes.value?.includes(a.id) ?? false;
        const bLiked = likes.value?.includes(b.id) ?? false;
        if (aLiked === bLiked){
            if (a.isNew !== b.isNew)
                return (+ b.isNew) - (+ a.isNew);
            if (a.hasNewEpisodes !== b.hasNewEpisodes)
                return (+ b.hasNewEpisodes) - (+ a.hasNewEpisodes);
            return a.title.localeCompare(b.title);
        }
        return 0;
    });
    return sortedList;
});

const isWebtoonLiked = computed(() => {
    if (!likes.value || !webtoons.value) return {};
    const likedWebtoons = {};
    for (const id of likes.value)
        likedWebtoons[id] = true;
    for (const webtoon of webtoons.value)
        if (!likedWebtoons[webtoon.id])
            likedWebtoons[webtoon.id] = false;
    return likedWebtoons;
});

function likedStateChange(webtoonId: number, newState: boolean){
    if (!likes.value) return;
    const currentLikes = [...likes.value];
    const index = currentLikes.indexOf(webtoonId);

    if(newState){
        if (index === -1)
            likes.value = [...currentLikes, webtoonId];
    }else
        if (index !== -1)
            likes.value = currentLikes.filter(id => id !== webtoonId);
}
</script>

<template>
    <UiScrollArea class="h-dvh">
        <div class="flex flex-col">
            <div v-if="likes !== null" class="w-full justify-center self-center md:w-[40rem] lg:w-[50rem]">
                <WebtoonItem
                    v-for="webtoon in sortedWebtoons"
                    :key="webtoon.id"
                    :webtoon="webtoon"
                    :liked="isWebtoonLiked[webtoon.id]"
                    @update:liked="likedStateChange"
                />
            </div>
        </div>
    </UiScrollArea>
</template>

<style scoped>

</style>
