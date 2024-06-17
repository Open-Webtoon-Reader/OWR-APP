<script setup lang="ts">

import {Skeleton} from "~/components/ui/skeleton";
</script>

<template>
    <div id="main" class="flex items-center">
        <Skeleton class="aspect-square h-20 sm:h-24 md:h-28 xl:h-32"/>
        <div id="infos" class="flex items-center w-full justify-between pl-2 pr-4 h-20 sm:h-24 md:h-28 xl:h-32">
            <div id="text-infos" class="flex flex-col w-full h-full justify-center">
                <div class="flex flex-row justify-between items-center">
                    <div id="title" class="flex flex-row gap-2">
                        <Skeleton class="w-14 h-4"/>
                    </div>
                    <div id="number">
                        <Skeleton class="w-6 h-4"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
