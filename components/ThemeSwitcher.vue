<script setup lang="ts">
const colorMode = useColorMode();
const theme = computed(_ => {
    switch (colorMode.preference){
        case "system":
            return window?.matchMedia("[preferred-color-scheme: dark]") ? "dark" : "light";
        default:
            return colorMode.preference;
    }
});

function toggleTheme(){
    colorMode.preference = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
    <ClientOnly>
        <Icon v-if="theme === 'dark'" name="iconoir:half-moon" class="w-8 h-8" @click="toggleTheme"/>
        <Icon v-else-if="theme === 'light'" name="iconoir:sun-light" class="w-8 h-8" @click="toggleTheme"/>
    </ClientOnly>
</template>

<style scoped>
.icon-style{
    @apply w-8 h-8
}
</style>
