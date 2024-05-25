<script setup>

import {ref} from "vue";
import router from "@/router/index.js";

const props = defineProps({
    episode: Object
});
const episode = ref(props.episode);

function onClick(){
    router.push({name: "episode", params: {episodeId: episode.value.id}});
}

</script>

<template>
    <div class="episode-item" @click="onClick">
        <img :src="episode.thumbnail" alt="Episode thumbnail"/>
        <div class="webtoon-details">
            <h2>{{episode.title}}</h2>
            <p>#{{episode.number}}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.episode-item:hover {
    background-color: #202020;
}

.episode-item{
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;

    &>img{
        aspect-ratio: 1/1;
        width: 7.5rem;
    }
}

@media (max-width: 768px) {
    .episode-item > img {
        width: 6rem;
    }
}

@media (max-width: 576px) {
    .episode-item > img {
        width: 5rem;
    }
}

@media (max-width: 320px) {
    .episode-item > img {
        width: 4rem;
    }
}

.webtoon-details{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
