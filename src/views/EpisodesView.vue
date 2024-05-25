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
        <header>
            <h1>{{ webtoonInfos.title }}</h1>
            <img :src="webtoonInfos.backgroundBanner" alt="thumbnail" class="banner-background" />
            <img :src="webtoonInfos.topBanner" alt="thumbnail" class="banner-top" />
        </header>
        <EpisodeList :webtoonId="webtoonId" />
    </div>
</template>

<style scoped>
header {
    position: relative;
    text-align: center;
    height: 15rem; /* Ajout de la hauteur fixe */
    min-height: 15rem;
}

h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: black;
}

.banner-background,
.banner-top {
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.banner-top {
    z-index: 0;
}
</style>
