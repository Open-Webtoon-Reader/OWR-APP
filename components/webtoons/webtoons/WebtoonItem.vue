<script setup lang="ts">

import {sumToImageUrl} from "~/utils/api";
import {Badge} from "~/components/ui/badge";

const {webtoon} = defineProps<{
    webtoon: any,
}>();

onMounted(() => {
    webtoon.genres.sort();
    webtoon.genres = webtoon.genres.map((genre: string) => {
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
    <div id="main" class="flex items-center cursor-pointer h-20 sm:h-24 md:h-28 xl:h-32" @click="navigateTo(`/webtoon/${webtoon.id}`)">
        <NuxtImg :src="sumToImageUrl(webtoon.thumbnail)" loading="lazy" format="webp" class="aspect-square h-full"/>
        <div id="infos" class="flex items-center w-full justify-between pl-2 h-full">
            <div id="text-infos" class="flex flex-col justify-between gap-auto h-full py-1 sm:py-2">
                <div class="flex flex-col gap-0 md:gap-1 lg:gap-2">
                    <div id="title" class="flex flex-row gap-2">
                        <div v-if="webtoon.isNew || webtoon.hasNewEpisodes" class="flex items-center">
                            <Badge v-if="webtoon.hasNewEpisodes && !webtoon.isNew" variant="default">New</Badge>
                            <Badge v-if="webtoon.isNew" variant="destructive">New</Badge>
                        </div>
                        <h4 class="whitespace-nowrap truncate max-w-64">{{ webtoon.title }}</h4>
                    </div>
                    <p class="!m-0 leading-4 xl:leading-6">{{ webtoon.author }}</p>
                </div>
                <div id="badges" class="flex flex-row overflow-x-hidden gap-2 overflow-x-hidden">
                    <Badge variant="secondary" class="w-fit">{{ webtoon.language.toUpperCase() }}</Badge>
                    <div v-for="genre in webtoon.genres" id="genre" :key="webtoon.genres.indexOf(genre)" class="flex justify-center">
                        <Badge variant="outline" class="whitespace-nowrap">{{ genre }}</Badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
