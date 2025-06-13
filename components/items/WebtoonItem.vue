<script setup lang="ts">
import Image from "~/components/misc/Image.vue";

const props = defineProps<{
    webtoon: Webtoon,
    liked: boolean,
}>();

const likedState = ref(props.liked);
const cookieToken = useCookie("token");
const emits = defineEmits(["update:liked"]);

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

async function toggleLike(){
    likedState.value = !likedState.value;
    await $fetch(`${useLocalStorage("serverUrl", "").value}/user/likes/webtoon/${props.webtoon.id}`, {
        method: likedState.value ? "POST" : "DELETE",
        headers: {
            Authorization: `Bearer ${cookieToken.value}`,
        },
    });
    emits("update:liked", props.webtoon.id, likedState.value);
}
</script>

<template>
    <NuxtLink class="flex w-full border border-t-0 hover:cursor-pointer hover:bg-secondary" :to="`/webtoon/${webtoon.id}`">
        <Image :sum="webtoon.thumbnail"/>
        <div class="flex w-full min-w-0 flex-1 flex-col items-start justify-between p-2">
            <div class="flex w-full flex-col">
                <div class="flex w-full min-w-0 items-center gap-2">
                    <UiBadge v-if="props.webtoon.isNew" variant="default" class="h-max shrink-0">New</UiBadge>
                    <UiBadge v-if="props.webtoon.hasNewEpisodes && !webtoon.isNew" variant="secondary" class="h-max shrink-0">Updated</UiBadge>
                    <h3 class="min-w-0 flex-1 truncate">{{webtoon.title}}</h3>
                </div>
                <p class="truncate">{{webtoon.author}}</p>
            </div>
            <div class="flex w-full gap-2 overflow-x-hidden">
                <UiBadge variant="secondary" class="shrink-0">{{webtoon.language.toUpperCase()}}</UiBadge>
                <div class="flex flex-nowrap gap-2 overflow-x-hidden">
                    <UiBadge v-for="(genre, i) in genres" :key="i" variant="outline" class="shrink-0 whitespace-nowrap">
                        {{genre}}
                    </UiBadge>
                </div>
            </div>
        </div>
        <div v-if="cookieToken" class="flex items-center p-2">
            <UiButton variant="outline" @click.stop.prevent="toggleLike">
                <Icon v-if="likedState" class="size-4 lg:size-5" name="iconoir:heart-solid"/>
                <Icon v-else class="size-4 lg:size-5" name="iconoir:heart"/>
            </UiButton>
        </div>
    </NuxtLink>
</template>
