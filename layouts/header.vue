<script setup lang="ts">
import Default from "~/layouts/default.vue";
</script>

<template>
    <default>
        <div class="grid w-full grid-cols-3 p-2">
            <div/>
            <h1 class="flex justify-center">OWR</h1>
            <div class="flex justify-end self-center">
                <ThemeSwitcher/>
            </div>
        </div>
        <slot/>
    </default>
</template>

<style scoped>

</style>
