<script setup lang="ts">

import {sumToImageUrl} from "~/utils/api";
import {Badge} from "~/components/ui/badge";
import {isEpisodeStarted} from "~/utils/storage";

const {episode} = defineProps<{
    episode: any,
}>();

const isStarted = ref<boolean>(isEpisodeStarted(episode.id));

</script>

<template>
    <div id="main" class="flex items-center cursor-pointer hover:!bg-inherit" :class="{started: isStarted}" @click="navigateTo(`/episode/${episode.id}`)">
        <NuxtImg :src="sumToImageUrl(episode.thumbnail)" loading="lazy" format="webp" class="aspect-square h-20 sm:h-24 md:h-28 xl:h-32"/>
        <div id="infos" class="flex items-center w-full justify-between pl-2 pr-4 h-20 sm:h-24 md:h-28 xl:h-32">
            <div id="text-infos" class="flex flex-col w-full h-full justify-center">
                <div class="flex flex-row justify-between items-center">
                    <div id="title" class="flex flex-row gap-2">
                        <div v-if="episode.isNew" class="flex items-center">
                            <Badge v-if="episode.isNew" variant="default">New</Badge>
                        </div>
                        <h4 class="whitespace-nowrap truncate max-w-64">{{ episode.title }}</h4>
                    </div>
                    <div id="number">
                        <p class="opacity-30">#{{ episode.number }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.started{
    @apply bg-secondary-disabled;
}
</style>
