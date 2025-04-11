<script setup lang="ts">
const props = defineProps<{
    webtoon: Webtoon
}>();

const serverUrl = useLocalStorage("serverUrl", "");
const fallback = ref(false);
const thumbnails = computed(() => {
    if(!props.webtoon.thumbnail)
        return [];
    return [
        `${serverUrl.value}/image/v2/${props.webtoon.thumbnail}`,
        `${serverUrl.value}/image/${props.webtoon.thumbnail}`,
    ];
});

const genres = computed(()=>{
    return props.webtoon.genres.map((genre: string) => {
        if (genre.length > 2)
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
        else
            genre = genre.toUpperCase();
        if (genre.includes("_"))
            genre = genre.split("_").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
        return genre;
    });
});
</script>

<template>
    <NuxtLink class="flex border border-t-0 hover:cursor-pointer hover:bg-secondary" :to="`/webtoon/${webtoon.id}`">
        <NuxtImg v-if="!fallback" :src="thumbnails[0]" loading="lazy" format="webp" class="aspect-square h-full" @error="fallback = true"/>
        <NuxtImg v-else :src="thumbnails[1]" loading="lazy" format="webp" class="aspect-square h-full"/>
        <div class="flex w-full flex-col items-start justify-between p-2">
            <div class="flex flex-col">
                <div class="flex w-full items-center gap-2 md:w-[30rem] lg:w-[40rem]">
                    <UiBadge v-if="props.webtoon.isNew" variant="default" class="h-max">New</UiBadge>
                    <UiBadge v-if="props.webtoon.hasNewEpisodes && !webtoon.isNew" variant="secondary" class="h-max">Updated</UiBadge>
                    <h3 class="truncate">{{webtoon.title}}</h3>
                </div>
                <p>{{webtoon.author}}</p>
            </div>
            <div class="flex gap-2">
                <UiBadge variant="secondary">{{webtoon.language.toUpperCase()}}</UiBadge>
                <UiBadge v-for="(genre, i) in genres" :key="i" variant="outline">{{genre}}</UiBadge>
            </div>
        </div>
    </NuxtLink>
</template>
