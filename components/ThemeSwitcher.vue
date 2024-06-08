<script setup lang="ts">
import {DropdownMenu} from "~/components/ui/dropdown-menu";

const colorMode = useColorMode();
const theme = computed(_ => {
    switch (colorMode.preference){
        case "system":
            return window?.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        default:
            return colorMode.preference;
    }
});
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <ClientOnly>
                <Icon v-if="theme === 'dark'" name="iconoir:sun-light" class="icon-style"/>
                <Icon v-else-if="theme === 'light'" name="iconoir:half-moon" class="icon-style"/>
            </ClientOnly>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuRadioGroup v-model="colorMode.preference">
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style scoped>
.icon-style{
    @apply w-8 h-8
}
</style>
