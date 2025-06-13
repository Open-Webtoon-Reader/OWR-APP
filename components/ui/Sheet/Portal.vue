<template>
    <DialogPortal v-bind="props">
        <slot />
    </DialogPortal>
</template>

<script lang="ts" setup>
import type {DialogPortalProps} from "radix-vue";
import {DialogPortal} from "radix-vue";

const props = defineProps<DialogPortalProps>();
</script>
