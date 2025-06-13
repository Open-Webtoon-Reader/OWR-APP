<template>
    <DialogRoot v-bind="forwarded">
        <slot />
    </DialogRoot>
</template>

<script lang="ts" setup>
import type {DialogRootEmits, DialogRootProps} from "radix-vue";
import {DialogRoot, useForwardPropsEmits} from "radix-vue";

const props = defineProps<DialogRootProps>();
const emit = defineEmits<DialogRootEmits>();
const forwarded = useForwardPropsEmits(props, emit);
</script>
