<script setup lang="ts">
import Default from "~/layouts/default.vue";
import Separator from "~/components/ui/Separator.vue";
import {DialogDescription, DialogTitle} from "radix-vue";

const isDrawerOpen = ref(false);
</script>

<template>
    <default>
        <div class="grid w-full grid-cols-3 p-4 md:hidden">
            <div class="flex justify-start self-center">
                <UiSheet v-model:open="isDrawerOpen">
                    <UiSheetTrigger as-child>
                        <UiButton variant="outline" size="icon">
                            <Icon name="iconoir:menu" class="size-6"/>
                        </UiButton>
                    </UiSheetTrigger>
                    <UiSheetContent
                        side="left"
                        title="Open Webtoon Reader"
                        description="Open Webtoon Reader"
                    >
                        <DialogTitle>
                            <div class="flex grow items-center justify-between">
                                <h3>Open Webtoon Reader</h3>
                                <UiButton variant="ghost" @click="isDrawerOpen = false">
                                    <Icon name="iconoir:xmark"/>
                                </UiButton>
                            </div>
                        </DialogTitle>
                        <DialogDescription/>
                        <div class="flex flex-col justify-center gap-2 p-2">
                            <UiButton variant="link" class="size-max" as-child @click="isDrawerOpen = false">
                                <NuxtLink to="/" class="flex gap-2">
                                    <Icon name="iconoir:home" class="size-5"/>
                                    Home
                                </NuxtLink>
                            </UiButton>
                        </div>
                    </UiSheetContent>
                </UiSheet>
            </div>
            <h1 class="flex justify-center">OWR</h1>
            <div class="flex justify-end self-center">
                <ThemeSwitcher/>
            </div>
        </div>
        <div class="hidden w-full grid-cols-2 items-center justify-between p-4 md:flex">
            <div class="flex flex-row gap-4">
                <h2 class="border-none pb-0">Open Webtoon Reader</h2>
                <div class="flex items-center justify-center gap-2">
                    <UiButton variant="outline" as-child>
                        <NuxtLink to="/" class="flex items-center gap-2">
                            <Icon name="iconoir:home" class="size-5"/>
                            Home
                        </NuxtLink>
                    </UiButton>
                </div>
            </div>
            <div class="flex justify-end self-center">
                <ThemeSwitcher/>
            </div>
        </div>
        <Separator/>
        <slot/>
    </default>
</template>
