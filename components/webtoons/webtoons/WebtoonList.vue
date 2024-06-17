<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import {getWebtoons} from "~/utils/api";
import WebtoonItem from "~/components/webtoons/webtoons/WebtoonItem.vue";
import WebtoonSkeleton from "~/components/webtoons/webtoons/WebtoonSkeleton.vue";

const search = ref("");
const webtoons = ref<any[]>([]);

function clearSearch(){
    search.value = "";
}

onMounted(async() => {
    const response = await getWebtoons();
    webtoons.value = response.data;
    // Sort webtoons by title
    webtoons.value.sort((a, b) => a.title.localeCompare(b.title));
    // Then by hasNewEpisodes
    webtoons.value.sort((a, b) => b.hasNewEpisodes - a.hasNewEpisodes);
    // Then by isNew
    webtoons.value.sort((a, b) => b.isNew - a.isNew);
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
    <div class="h-full w-full md:w-3/4 lg:w-1/2 2xl:w-1/3 border-x-[1px]">
        <div id="header" class="flex gap-4 py-4 px-10">
            <div id="input" class="relative w-full items-center">
                <Input v-model="search" placeholder="Search" class="pl-8"/>
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Icon name="iconoir:search"/>
                </span>
            </div>
            <Button variant="destructive" @click="clearSearch">
                <Icon name="iconoir:xmark"/>
            </Button>
        </div>
        <Separator/>
        <div id="content" class="h-full overflow-y-scroll">
            <div v-if="!webtoons.length">
                <div v-for="n in 4" :key="n">
                    <WebtoonSkeleton/>
                    <Separator/>
                </div>
            </div>
            <div v-for="webtoon in filteredWebtoons" :key="webtoon.id">
                <WebtoonItem :webtoon="webtoon"/>
                <Separator/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
