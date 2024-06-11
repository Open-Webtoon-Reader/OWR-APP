<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getWebtoons } from "~/utils/api";
import WebtoonItem from "~/components/webtoons/webtoons/WebtoonItem.vue";

const search = ref("");
const webtoons = ref<any[]>([]);

function clearSearch(){
    search.value = "";
}

onMounted(async () => {
    const response = await getWebtoons();
    webtoons.value = response.data;
    console.log(webtoons.value);
});

// Computed property for filtered webtoons
const filteredWebtoons = computed(() => {
    const searchValue = search.value.toLowerCase();
    return webtoons.value.filter(webtoon =>
        webtoon.title.toLowerCase().includes(searchValue)
    );
});
</script>

<template>
    <div>
        <div id="header" class="flex gap-4 py-4 px-10">
            <div id="input" class="relative w-full max-w-sm items-center">
                <Input v-model="search" placeholder="Search" class="pl-8"/>
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Icon name="iconoir:search"/>
                </span>
            </div>
            <Button variant="destructive" @click="clearSearch">
                <Icon name="iconoir:xmark"/>
            </Button>
        </div>
        <div id="content">
            <Separator/>
            <div v-for="webtoon in filteredWebtoons" :key="webtoon.id">
                <WebtoonItem :webtoon="webtoon"/>
                <Separator/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
