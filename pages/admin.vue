<script setup lang="ts">
definePageMeta({
    layout: "navigation",
    middleware: [
        "login-middleware",
        "server-url-middleware",
    ],
});
</script>

<template>
    <UiCard>
        Temp
    </UiCard>
</template>

<style scoped>

</style>
