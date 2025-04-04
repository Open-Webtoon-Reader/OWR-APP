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

const sortedWebtoons = computed(() => {
    if(!webtoons.value)
        return [];
    const sortedList = [...webtoons.value];
    sortedList.sort((a, b) => a.title.localeCompare(b.title));
    sortedList.sort((a, b) => (+ b.hasNewEpisodes) - (+ a.hasNewEpisodes));
    sortedList.sort((a, b) => (+ b.isNew) - (+ a.isNew));
    return sortedList;
});
</script>

<template>
    <UiScrollArea class="h-dvh">
        <div class="flex flex-col">
            <div class="w-full justify-center self-center md:w-[40rem] lg:w-[50rem]">
                <WebtoonItem v-for="(webtoon, i) in sortedWebtoons" :key="i" :webtoon="webtoon"/>
            </div>
        </div>
    </UiScrollArea>
</template>

<style scoped>

</style>
