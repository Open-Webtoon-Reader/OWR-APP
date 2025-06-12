<template>
    <TabsRoot v-bind="forwarded">
        <slot />
    </TabsRoot>
</template>

<script lang="ts" setup>
import type {TabsRootEmits, TabsRootProps} from "radix-vue";
import {TabsRoot, useForwardPropsEmits} from "radix-vue";

const props = withDefaults(defineProps<TabsRootProps>(), {
    orientation: "horizontal",
    activationMode: "automatic",
});
const emits = defineEmits<TabsRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>
