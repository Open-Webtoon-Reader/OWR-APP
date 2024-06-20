<script setup lang="ts">
const colorMode = useColorMode();
const theme = computed(_ => {
    switch (colorMode.preference){
        case "system":
            return window?.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        default:
            return colorMode.preference;
    }
});

function toggleTheme(){
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}
</script>

<template>
    <Button variant="ghost" @click="toggleTheme">
        <ClientOnly>
            <Icon v-if="theme === 'dark'" name="iconoir:half-moon" class="icon-style"/>
            <Icon v-else-if="theme === 'light'" name="iconoir:sun-light" class="icon-style"/>
        </ClientOnly>
    </Button>
</template>

<style scoped>
.icon-style{
    @apply w-8 h-8
}
</style>
