<script setup>
import EpisodeList from "@/components/episodes/EpisodeList.vue";
import {onMounted, ref} from "vue";
import {getWebtoon} from "@/utils/request-utils.js";
import {useRoute} from "vue-router";

const route = useRoute();
const webtoonId = route.params.webtoonId;
const webtoonInfos = ref({});

onMounted(async() => {
    webtoonInfos.value = await getWebtoon(webtoonId);
});
</script>

<template>
    <div v-if="webtoonInfos.title">
        <header class="episodes-header">
            <h1 class="banner-title">{{webtoonInfos.title}}</h1>
            <img :src="webtoonInfos.backgroundBanner" alt="thumbnail" class="banner-background"/>
            <img :src="webtoonInfos.topBanner" alt="thumbnail" class="banner-top"/>
        </header>
        <EpisodeList :webtoonId="webtoonId"/>
    </div>
</template>

<style scoped>
.episodes-header {
    position: relative;
    text-align: center;
}

.banner-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: black;
}

.banner-background {
    width: 100%;
    height: auto;
    display: block;
}

.banner-top {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 0;
}
</style>
