<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
import WebtoonList from "~/components/webtoons/webtoons/WebtoonList.vue";
definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ],
    layout: "nav-layout"
});
</script>

<template>
    <div class="flex justify-center h-[calc(theme(height.dvh)-142px)]">
        <WebtoonList/>
    </div>
</template>

<style scoped>

</style>
