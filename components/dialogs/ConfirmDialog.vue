<script setup lang="ts">
defineEmits(["action", "cancel"]);
const open = defineModel<boolean>("open", {
    default: false,
    type: Boolean,
});
defineProps<{
    title?: string;
}>();
</script>

<template>
    <div class="flex justify-center">
        <UiAlertDialog v-model:open="open">
            <UiAlertDialogTrigger>
                <slot name="trigger"/>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent @escape-key-down="$emit('cancel')">
                <UiAlertDialogHeader>
                    <UiAlertDialogTitle>{{title}}</UiAlertDialogTitle>
                    <UiAlertDialogDescription>
                        <slot/>
                    </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                    <UiAlertDialogCancel @click="$emit('cancel')" />
                    <UiAlertDialogAction @click="$emit('action')" />
                </UiAlertDialogFooter>
            </UiAlertDialogContent>
        </UiAlertDialog>
    </div>
</template>

<style scoped>

</style>
