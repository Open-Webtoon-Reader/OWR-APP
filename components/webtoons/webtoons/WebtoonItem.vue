<script setup lang="ts">

import {Badge} from "~/components/ui/badge";
import {useApi} from "~/composable/api";

const {webtoon} = defineProps<{
    webtoon: any,
}>();

const localWebtoon = ref(webtoon);

const sumToImageUrl = useApi().sumToImageUrl;

onMounted(() => {
    localWebtoon.value.genres.sort();
    localWebtoon.value.genres = localWebtoon.value.genres.map((genre: string) => {
        if (genre.length > 2){
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
        } else {
            genre = genre.toUpperCase();
        }

        if (genre.includes("_")){
            const parts = genre.split("_");
            genre = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
        }
        return genre;
    });
});

</script>

<template>
    <div id="main" class="flex items-center cursor-pointer h-20 sm:h-24 md:h-28 xl:h-32" @click="navigateTo(`/webtoon/${localWebtoon.id}`)">
        <NuxtImg :src="sumToImageUrl(localWebtoon.thumbnail)" loading="lazy" format="webp" class="aspect-square h-full"/>
        <div id="infos" class="flex items-center w-full justify-between pl-2 h-full">
            <div id="text-infos" class="flex flex-col justify-between gap-auto h-full py-1 sm:py-2">
                <div class="flex flex-col gap-0 md:gap-1 lg:gap-2">
                    <div id="title" class="flex flex-row gap-2">
                        <div v-if="localWebtoon.isNew || localWebtoon.hasNewEpisodes" class="flex items-center">
                            <Badge v-if="localWebtoon.hasNewEpisodes && !localWebtoon.isNew" variant="default">New</Badge>
                            <Badge v-if="localWebtoon.isNew" variant="destructive">New</Badge>
                        </div>
                        <h4 class="whitespace-nowrap truncate max-w-64">{{ localWebtoon.title }}</h4>
                    </div>
                    <p class="!m-0 leading-4 xl:leading-6">{{ localWebtoon.author }}</p>
                </div>
                <div id="badges" class="flex flex-row overflow-x-hidden gap-2">
                    <Badge variant="secondary" class="w-fit">{{ localWebtoon.language.toUpperCase() }}</Badge>
                    <div v-for="genre in localWebtoon.genres" id="genre" :key="localWebtoon.genres.indexOf(genre)" class="flex justify-center">
                        <Badge variant="outline" class="whitespace-nowrap">{{ genre }}</Badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
