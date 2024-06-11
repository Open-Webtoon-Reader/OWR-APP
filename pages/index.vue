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
    <div class="flex flex-1 justify-center items-center text-center">
        <h1>Home</h1>
    </div>
</template>

<style scoped>

</style>
