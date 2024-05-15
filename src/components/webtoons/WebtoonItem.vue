<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

const props = defineProps({
    webtoon: Object
});

const webtoon = ref(props.webtoon);

function onClick(){
    router.push(`/episodes/${webtoon.value.id}`);
}
</script>

<template>
    <div class="webtoon-item" @click="onClick">
        <img :src="webtoon.thumbnail" alt="Webtoon thumbnail"/>
        <h2>{{webtoon.title}}</h2>
        <p>{{webtoon.author}}</p>
        <p>{{webtoon.language.toUpperCase()}}</p>
    </div>
</template>

<style scoped>
.webtoon-item:hover {
    background-color: #202020;
}
</style>
