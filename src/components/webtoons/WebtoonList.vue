<script setup>

import WebtoonItem from "@/components/webtoons/WebtoonItem.vue";
import {onMounted, ref} from "vue";
import {getWebtoons} from "@/utils/request-utils.js";

const webtoons = ref([]);

onMounted(async() => {
    webtoons.value = await getWebtoons();
});
</script>

<template>
    <div v-for="webtoon in webtoons" :key="webtoon.id">
        <WebtoonItem :webtoon="webtoon"/>
    </div>
</template>

<style scoped>

</style>
