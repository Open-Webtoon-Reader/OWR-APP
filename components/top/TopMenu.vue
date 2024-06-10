<script setup lang="ts">

import BurgerMenu from "~/components/top/BurgerMenu.vue";
import AvatarMenu from "~/components/top/AvatarMenu.vue";
</script>

<template>
    <div>
        <div class="items-center flex p-2 md:flex-row-reverse">
            <BurgerMenu class="md:hidden"/>
            <div class="max-md:hidden h-10">
                <AvatarMenu/>
            </div>
            <div class="w-full">
                <h1 class="text-center">OWR</h1>
            </div>
            <ThemeSwitcher/>
        </div>
        <Separator />
    </div>
</template>

<style scoped>

</style>
