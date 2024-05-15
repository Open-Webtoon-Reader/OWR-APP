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
        <h2>{{episode.title}}</h2>
        <p>{{episode.number}}</p>
    </div>
</template>

<style scoped>
.episode-item:hover {
    background-color: #202020;
}
</style>
