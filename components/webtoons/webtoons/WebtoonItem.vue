<script setup lang="ts">

import {Button} from "~/components/ui/button";
import {sumToImageUrl} from "~/utils/api";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";
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
    <Collapsible>
        <div id="main" class="flex items-center">
            <NuxtImg :src="sumToImageUrl(webtoon.thumbnail)" loading="lazy" class="h-20"/>
            <div id="infos" class="flex items-center w-full justify-between px-2">
                <div id="text-infos" class="flex flex-col">
                    <h4>{{ webtoon.title }}</h4>
                    <p class="!m-0">{{ webtoon.author }}</p>
                    <!--<Badge variant="secondary" class="w-fit">{{ webtoon.language.toUpperCase() }}</Badge>-->
                </div>
                <CollapsibleTrigger>
                    <Button variant="ghost">
                        <Icon name="iconoir:arrow-down"/>
                    </Button>
                </CollapsibleTrigger>
            </div>
        </div>
        <CollapsibleContent class="pl-20">
            <div id="more" class="flex gap-2 p-2">
                <div v-for="genre in webtoon.genres" id="genre" :key="webtoon.genres.indexOf(genre)">
                    <Badge variant="default">{{ genre }}</Badge>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
</template>

<style scoped>

</style>
