<script setup lang="ts">

import BurgerMenu from "~/components/top/BurgerMenu.vue";
import AvatarMenu from "~/components/top/AvatarMenu.vue";
import {Separator} from "~/components/ui/separator";
import NavButton from "~/components/buttons/NavButton.vue";

</script>

<template>
    <div id="mobile" class="md:hidden items-center flex py-2 px-4 justify-between">
        <BurgerMenu/>
        <div class="">
            <h2 class="h2-reset text-center p-2 sm:hidden">OWR</h2>
            <h2 class="h2-reset text-center p-2 max-sm:hidden">Open Webtoon Reader</h2>
        </div>
        <ThemeSwitcher/>
    </div>
    <div id="pc" class="max-md:hidden items-center flex p-2 px-4 justify-between">
        <div class="flex items-center gap-8">
            <h2 class="h2-reset text-center p-2">Open Webtoon Reader</h2>
            <div id="nav" class="flex gap-4">
                <NavButton path="/" icon="iconoir:home">
                    Home
                </NavButton>
            </div>
        </div>
        <div id="right" class="flex gap-5 items-center">
            <ThemeSwitcher/>
            <Separator orientation="vertical" class="h-10"/>
            <div class="h-10">
                <AvatarMenu/>
            </div>
        </div>
    </div>
    <Separator />
</template>

<style scoped>
h2.h2-reset{
    @apply border-none;
}
</style>
