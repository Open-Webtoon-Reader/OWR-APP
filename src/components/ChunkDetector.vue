<script setup>
import {ref, onMounted, onUnmounted} from "vue";

const emit = defineEmits(["on-display"]);

const myElement = ref(null);
let hasIntersected = false;  // Variable pour suivre l'état de l'intersection

function handleIntersect(entries){
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasIntersected){
            hasIntersected = true;  // Marquer comme intersecté
            emit("on-display");
            if (observer && myElement.value){
                observer.unobserve(myElement.value);  // Arrêter d'observer après la première intersection
            }
        }
    });
}

let observer;

onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.1, // Le pourcentage de l'élément visible pour déclencher la fonction
    });

    if (myElement.value){
        observer.observe(myElement.value);
    }
});

onUnmounted(() => {
    if (myElement.value){
        observer.unobserve(myElement.value);
    }
});
</script>

<template>
    <div ref="myElement">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>
