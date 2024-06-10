<script setup lang="ts">

import BurgerMenu from "~/components/top/BurgerMenu.vue";
import AvatarMenu from "~/components/top/AvatarMenu.vue";
import {Separator} from "~/components/ui/separator";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {useRoute} from "vue-router";

const route = useRoute();

function getButtonVariant(path: string){
    return route.path === path;
}
</script>

<template>
    <div>
        <div id="mobile" class="md:hidden items-center flex p-2 px-4">
            <BurgerMenu/>
            <div class="w-full">
                <h1 class="text-center p-2 sm:hidden">OWR</h1>
                <h1 class="text-center p-2 max-sm:hidden">Open Webtoon Reader</h1>
            </div>
            <ThemeSwitcher/>
        </div>
        <div id="pc" class="max-md:hidden items-center flex p-2 px-4 justify-between">
            <div class="flex items-center gap-8">
                <h1 class="text-center p-2">Open Webtoon Reader</h1>
                <NavigationMenu class="h-10">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()" :active="getButtonVariant('/')">
                                Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div id="right" class="flex gap-5">
                <ThemeSwitcher/>
                <Separator orientation="vertical" class="h-10"/>
                <div class="h-10">
                    <AvatarMenu/>
                </div>
            </div>
        </div>
        <Separator />
    </div>
</template>

<style scoped>

</style>
