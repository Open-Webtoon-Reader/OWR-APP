<script setup lang="ts">

import {Skeleton} from "~/components/ui/skeleton";
</script>

<template>
    <div id="main" class="flex items-center">
        <Skeleton class="aspect-square h-20 sm:h-24 md:h-28 xl:h-32 rounded-none"/>
        <div id="infos" class="flex items-center w-full justify-between px-2  h-20 sm:h-24 md:h-28 xl:h-32">
            <div id="text-infos" class="flex flex-col justify-between gap-auto h-full py-1 sm:py-2">
                <div class="flex flex-col gap-0 md:gap-1 lg:gap-2">
                    <div id="title" class="flex flex-row gap-2">
                        <Skeleton class="w-64 h-6"/>
                    </div>
                    <Skeleton class="w-16 h-4"/>
                </div>
                <Skeleton class="w-8 h-4"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
