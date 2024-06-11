<script setup lang="ts">

import {Toaster} from "~/components/ui/toast";
</script>

<template>
    <div>
        <Toaster/>
        <div class="flex flex-col min-h-dvh">
            <TopMenu/>
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
