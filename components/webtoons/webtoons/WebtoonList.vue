<script setup lang="ts">
import {ref, computed} from "vue";
import WebtoonItem from "~/components/webtoons/webtoons/WebtoonItem.vue";
import WebtoonSkeleton from "~/components/webtoons/webtoons/WebtoonSkeleton.vue";
import VisibilityObserver from "~/components/utils/VisibilityObserver.vue";

const search = ref("");
const apiUrl = useCookie("apiUrl");
const {data: webtoons, status: webtoonsStatus} = await useFetch<any[]>(`${apiUrl.value}/api/v1/webtoons`);
const maxIndex = ref<number>(30);

function clearSearch(){
    search.value = "";
}

function increaseMaxIndex(){
    maxIndex.value += 30;
}

// Computed property for filtered webtoons
const filteredWebtoons = computed(() => {
    if(webtoonsStatus.value !== "success")
        return [];
    const searchValue = search.value.toLowerCase();
    return webtoons.value?.filter(webtoon =>
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
            <div v-if="webtoonsStatus !== 'success'">
                <div v-for="n in 4" :key="n">
                    <WebtoonSkeleton/>
                    <Separator/>
                </div>
            </div>
            <div v-for="webtoon in filteredWebtoons?.slice(0, maxIndex)" id="card" :key="webtoon.id">
                <WebtoonItem v-if="filteredWebtoons.indexOf(webtoon) < maxIndex - 1" :webtoon="webtoon"/>
                <VisibilityObserver v-else @on-display="increaseMaxIndex">
                    <WebtoonItem :webtoon="webtoon"/>
                </VisibilityObserver>
                <Separator/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
