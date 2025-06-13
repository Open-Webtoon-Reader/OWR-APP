<template>
    <AlertDialogTrigger v-bind="props">
        <slot />
    </AlertDialogTrigger>
</template>

<script lang="ts" setup>
import type {AlertDialogTriggerProps} from "radix-vue";
import {AlertDialogTrigger} from "radix-vue";

const props = defineProps<AlertDialogTriggerProps>();
</script>
