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
    <div class="webtoon-list">
        <div class="webtoons-container">
            <div v-for="webtoon in webtoons" :key="webtoon.id">
                <WebtoonItem :webtoon="webtoon"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.webtoon-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    background-color: #0F0F0F;
}

.webtoons-container {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 1rem;

    width: 100%;
    max-width: 50rem;

    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;

    background-color: #171717;
}
</style>
