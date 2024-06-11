<script setup lang="ts">

import {Toaster} from "~/components/ui/toast";
</script>

<template>
    <div>
        <Toaster/>
        <div class="flex flex-col min-h-dvh min-w-dvh">
            <TopMenu class="sticky top-0 w-full bg-background z-10"/>
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
