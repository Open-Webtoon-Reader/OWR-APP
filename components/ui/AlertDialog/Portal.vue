<template>
    <AlertDialogPortal v-bind="props">
        <slot />
    </AlertDialogPortal>
</template>

<script lang="ts" setup>
import type {AlertDialogPortalProps} from "radix-vue";
import {AlertDialogPortal} from "radix-vue";

const props = defineProps<AlertDialogPortalProps>();
</script>
