<template>
    <DropdownMenuTrigger v-bind="props">
        <slot />
    </DropdownMenuTrigger>
</template>

<script lang="ts" setup>
import type {DropdownMenuTriggerProps} from "radix-vue";
import {DropdownMenuTrigger} from "radix-vue";

const props = defineProps<DropdownMenuTriggerProps>();
</script>
