<template>
    <Primitive :class="styles({ class: props.class })" v-bind="forwarded">
        <slot />
    </Primitive>
</template>

<script lang="ts" setup>
import type {PrimitiveProps} from "radix-vue";
import {Primitive} from "radix-vue";

const props = withDefaults(
    defineProps<
        PrimitiveProps & {
            /** Custom class(es) to add to the element */
            class?: any;
        }
    >(),
    {
        as: "div",
        class: undefined,
    }
);

const forwarded = reactiveOmit(props, "class");
const styles = tv({
    base: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
});
</script>
