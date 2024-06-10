<script setup lang="ts">
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {useRoute} from "vue-router";

const route = useRoute();

function getButtonVariant(path: string){
    return route.path === path ? "default" : "outline";
}
</script>

<template>
    <div>
        <Sheet>
            <SheetTrigger>
                <Icon name="iconoir:menu" class="w-8 h-8"/>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Open Webtoon Reader</SheetTitle>
                    <SheetDescription class="flex flex-col gap-2">
                        <Button :variant="getButtonVariant('/')" class="w-full" @click="$router.push('/')">Home</Button>
                        <Button :variant="getButtonVariant('/settings')" class="w-full" @click="$router.push('/settings')">Settings</Button>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>
</template>

<style scoped>
</style>
