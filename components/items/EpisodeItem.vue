<script setup lang="ts">
const props = defineProps<{
    episode: Episode
}>();

const serverUrl = useLocalStorage("serverUrl", "");
const thumbnailUrl = computed(() => {
    if(!props.episode.thumbnail)
        return "";
    return `${serverUrl.value}/image/${props.episode.thumbnail}`;
});
</script>

<template>
    <NuxtLink class="flex h-20 border border-t-0 hover:cursor-pointer hover:bg-secondary md:h-24 lg:h-28">
        <NuxtImg :src="thumbnailUrl" loading="lazy" format="webp" class="aspect-square h-full"/>
        <div class="flex grow items-center justify-center p-2">
            <div class="flex grow items-center gap-2 md:w-[25rem] lg:w-[35rem]">
                <UiBadge v-if="props.episode.isNew" variant="default" class="h-max">New</UiBadge>
                <h4 class="truncate">{{episode.title}}</h4>
            </div>
            <div>
                <p class="opacity-50">#{{episode.number}}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>

</style>
