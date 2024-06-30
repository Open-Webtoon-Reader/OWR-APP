<script setup lang="ts">

import {Toaster} from "~/components/ui/toast";
import NavBar from "~/components/top/NavBar.vue";
</script>

<template>
    <div>
        <Toaster/>
        <div class="flex flex-col items-center min-h-dvh min-w-vw max-h-dvh max-w-vw">
            <NavBar class="w-full bg-background z-10"/>
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
