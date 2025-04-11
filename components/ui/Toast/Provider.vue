<template>
    <ToastProvider v-bind="props">
        <slot />
    </ToastProvider>
</template>

<script lang="ts" setup>
import type {ToastProviderProps} from "radix-vue";
import {ToastProvider} from "radix-vue";

const props = withDefaults(defineProps<ToastProviderProps>(), {
    label: "Notification",
    swipeDirection: "right",
});
</script>
