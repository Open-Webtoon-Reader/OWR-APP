<script setup lang="ts">

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import NavButton from "~/components/buttons/NavButton.vue";

function clearApiUrl(){
    console.log("clear");
    clearFromLocalStorage("apiurl");
    navigateTo("/apiurl");
}

</script>

<template>
    <Sheet>
        <SheetTrigger>
            <Icon name="iconoir:menu" class="w-8 h-8"/>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Open Webtoon Reader</SheetTitle>
                <SheetDescription class="flex flex-col gap-2">
                    <SheetClose as-child>
                        <NavButton path="/" icon="iconoir:home">
                            Home
                        </NavButton>
                    </SheetClose>
                    <SheetClose as-child>
                        <NavButton path="/settings" icon="iconoir:settings">
                            Settings
                        </NavButton>
                    </SheetClose>
                    <Button variant="destructive" @click="clearApiUrl">
                        API Url
                    </Button>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>

<style scoped>
</style>
