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
        <div class="episode-details">
            <h2>{{episode.title}}</h2>
            <p>#{{episode.number}}</p>
        </div>
    </div>
</template>

<style scoped>
.episode-item:hover {
    background-color: #202020;
}

.episode-item{
    display: flex;
    flex-direction: row;
    align-items: center;

    &>img{
        aspect-ratio: 1/1;
        width: 7.5rem;
    }
}

.episode-details{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
