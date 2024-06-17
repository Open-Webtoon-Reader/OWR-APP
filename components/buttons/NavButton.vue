<script setup lang="ts">
import {useRoute} from "vue-router";

const {path, icon} = defineProps<{
    path: string,
    icon: string,
}>();

const route = useRoute();

function getButtonVariant(){
    return route.path === path ? "secondary" : "ghost";
}
</script>

<template>
    <Button :variant="getButtonVariant()" @click="navigateTo(path)">
        <Icon :name="icon" class="w-4 h-4 mr-2"/>
        <slot/>
    </Button>
</template>

<style scoped>

</style>
