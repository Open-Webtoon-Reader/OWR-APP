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
        <div class="webtoon-details">
            <div class="webtoon-infos">
                <h2>{{webtoon.title}}</h2>
                <p>{{webtoon.author}}</p>
                <p class="webtoon-language">{{webtoon.language.toUpperCase()}}</p>
            </div>
            <div class="webtoon-extended-infos">
                <div v-for="genre in webtoon.genres" :key="webtoon.genres.indexOf(genre)" class="genre-item">
                    <p>{{genre}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.webtoon-item:hover {
    background-color: #202020;
}

.webtoon-item{
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
    .webtoon-item > img {
        width: 6rem;
    }
}

@media (max-width: 576px) {
    .webtoon-item > img {
        width: 5rem;
    }
}

@media (max-width: 320px) {
    .webtoon-item > img {
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

    &>.webtoon-infos{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &>.webtoon-language{
            font-size: 0.9rem;
        }
    }
}

.webtoon-extended-infos{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: right;
    gap: 1rem;

    &>.genre-item{
        text-align: right;
        font-style: italic;
    }
}

</style>
