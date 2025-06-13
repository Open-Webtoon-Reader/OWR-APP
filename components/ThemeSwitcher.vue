<script setup lang="ts">
const colorMode = useColorMode();
const theme = computed(_ => {
    if(colorMode.preference === "system")
        return window?.matchMedia("[preferred-color-scheme: dark]") ? "dark" : "light";
    return colorMode.preference;
});

function toggleTheme(){
    colorMode.preference = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
    <ClientOnly>
        <Icon v-if="theme === 'dark'" name="iconoir:half-moon" class="size-8 cursor-pointer" @click="toggleTheme"/>
        <Icon v-else-if="theme === 'light'" name="iconoir:sun-light" class="size-8 cursor-pointer" @click="toggleTheme"/>
    </ClientOnly>
</template>

<style scoped>

</style>
