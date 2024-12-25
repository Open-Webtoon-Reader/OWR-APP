<script setup lang="ts">
definePageMeta({
    layout: "navigation",
});

const tags = Array.from({length: 50}).map((_, i, a) => `${a.length - i}`);
</script>

<template>
    <UiScrollArea class="h-dvh">
        <div class="flex flex-col">
            <div class="w-full justify-center self-center sm:w-[30rem] md:w-[40rem] lg:w-[50rem]">
                <template v-for="(tag, i) in tags" :key="i">
                    <p class="!mt-0 border border-t-0 p-2 text-center">{{tag}}</p>
                </template>
            </div>
        </div>
    </UiScrollArea>
</template>

<style scoped>

</style>
