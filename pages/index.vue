<script setup lang="ts">
import * as apiurlMiddleware from "~/middleware/apiurl.middleware";
definePageMeta({
    middleware: [
        apiurlMiddleware.default
    ]
});
</script>

<template>
    <div>
        <ThemeSwitcher/>
        <h1>Home</h1>
    </div>
</template>

<style scoped>

</style>
