<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";

const emit = defineEmits(["on-display"]);

const element = ref(null);
let hasIntersected = false;

function handleIntersect(entries: any[]){
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasIntersected){
            hasIntersected = true;
            emit("on-display");
            if (observer && element.value){
                observer.unobserve(element.value);
            }
        }
    });
}

let observer: any;

onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
        threshold: 0,
    });

    if (element.value)
        observer.observe(element.value);
});

onUnmounted(() => {
    if (element.value)
        observer.unobserve(element.value);
});
</script>

<template>
    <div ref="element">
        <slot/>
    </div>
</template>

<style scoped>

</style>
