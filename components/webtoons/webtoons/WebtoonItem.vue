<script setup lang="ts">

import {Button} from "~/components/ui/button";
import {sumToImageUrl} from "~/utils/api";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";
import {Badge} from "~/components/ui/badge";

const {webtoon} = defineProps<{
    webtoon: any,
}>();

const isOpen = ref(false);

function toggleCollapsible(){
    isOpen.value = !isOpen.value;
    console.log(isOpen.value);
}

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
    <Collapsible v-model:open="isOpen">
        <div id="main" class="flex items-center cursor-pointer" @click="navigateTo(`/webtoon/${webtoon.id}`)">
            <NuxtImg :src="sumToImageUrl(webtoon.thumbnail)" loading="lazy" class="aspect-square h-20 sm:h-24 md:h-28 xl:h-32"/>
            <div id="infos" class="flex items-center w-full justify-between px-2  h-20 sm:h-24 md:h-28 xl:h-32">
                <div id="text-infos" class="flex flex-col justify-between gap-auto h-full py-1 sm:py-2">
                    <div class="flex flex-col gap-0 md:gap-1 lg:gap-2">
                        <div id="title" class="flex flex-row gap-2">
                            <div v-if="webtoon.hasNew || webtoon.hasNewEpisodes" class="flex items-center">
                                <Badge v-if="webtoon.hasNewEpisodes && !webtoon.isNew" variant="default">New</Badge>
                                <Badge v-if="webtoon.isNew" variant="destructive">New</Badge>
                            </div>
                            <h4 class="whitespace-nowrap truncate max-w-64">{{ webtoon.title }}</h4>
                        </div>
                        <p class="!m-0 leading-4 xl:leading-6">{{ webtoon.author }}</p>
                    </div>
                    <Badge variant="secondary" class="w-fit">{{ webtoon.language.toUpperCase() }}</Badge>
                </div>
                <Button variant="ghost" @click="(event) => { event.stopPropagation(); toggleCollapsible()}">
                    <Icon name="iconoir:arrow-down"/>
                </Button>
            </div>
        </div>
        <CollapsibleContent class="pl-2">
            <div id="more" class="flex gap-2 py-2">
                <div v-for="genre in webtoon.genres" id="genre" :key="webtoon.genres.indexOf(genre)" class="flex justify-center">
                    <Badge variant="outline">{{ genre }}</Badge>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>

<style scoped>

</style>
