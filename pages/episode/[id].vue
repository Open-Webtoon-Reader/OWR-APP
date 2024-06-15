<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";

definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ],
    layout: "nav-layout"
});
</script>

<template>
    <div class="flex justify-center h-[calc(theme(height.dvh)-70px)]">
        <h1>Work in progress</h1>
    </div>
</template>

<style scoped>

</style>
