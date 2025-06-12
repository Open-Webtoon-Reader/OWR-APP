<script setup lang="ts">
const props = defineProps<{
    sum: string,
}>();

const serverUrl = useLocalStorage("serverUrl", "");
const fallback = ref(false);
const thumbnails = computed(() => {
    if(!props.sum)
        return [];
    return [
        `${serverUrl.value}/image/v2/${props.sum}`,
        `${serverUrl.value}/image/${props.sum}`,
    ];
});
</script>

<template>
    <NuxtImg v-if="!fallback" :src="thumbnails[0]" loading="lazy" format="webp" class="aspect-square h-full max-h-[5.7rem] sm:max-h-24 md:max-h-28 lg:max-h-32" @error="fallback = true"/>
    <NuxtImg v-else :src="thumbnails[1]" loading="lazy" format="webp" class="aspect-square h-full max-h-[5.7rem] sm:max-h-24 md:max-h-28 lg:max-h-32"/>
</template>

<style scoped>

</style>
