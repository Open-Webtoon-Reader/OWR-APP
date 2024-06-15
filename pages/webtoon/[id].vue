<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
import EpisodeList from "~/components/webtoons/episodes/EpisodeList.vue";

definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ],
    layout: "nav-layout"
});
</script>

<template>
    <div class="flex justify-center h-[calc(theme(height.dvh)-70px)]">
        <EpisodeList/>
    </div>
</template>

<style scoped>

</style>
