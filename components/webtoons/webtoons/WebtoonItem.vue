<script setup lang="ts">

import {sumToImageUrl} from "~/utils/api";

const {webtoon} = defineProps<{
    webtoon: any,
}>();

</script>

<template>
    <div class="flex items-center gap-2">
        <NuxtImg :src="sumToImageUrl(webtoon.thumbnail)" loading="lazy" class="h-20"/>
        <div id="infos" class="flex flex-col">
            <h4>{{ webtoon.title }}</h4>
            <p class="!m-0">{{ webtoon.author }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
