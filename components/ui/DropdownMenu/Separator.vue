<template>
    <DropdownMenuSeparator :class="styles({ class: props.class })" v-bind="forwarded" />
</template>

<script lang="ts" setup>
import type {DropdownMenuSeparatorProps} from "radix-vue";
import {DropdownMenuSeparator} from "radix-vue";

const props = defineProps<
    DropdownMenuSeparatorProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
    }
>();
const forwarded = reactiveOmit(props, "class");
const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
});
</script>
