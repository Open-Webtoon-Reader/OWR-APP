<script setup lang="ts">
const emits = defineEmits(["createUser"]);
const open = defineModel<boolean>("open", {
    default: false,
    type: Boolean,
});

const username = ref("");
const email = ref("");
const password = ref("");

function createUser(){
    emits("createUser", {username: username.value, email: email.value, password: password.value});
    open.value = false;
    username.value = "";
    email.value = "";
    password.value = "";
}
</script>

<template>
    <UiDialog v-model:open="open">
        <UiDialogContent title="Create user" description="Create a new user account">
            <template #content>
                <div class="flex w-full flex-col">
                    <UiLabel for="username">Username</UiLabel>
                    <UiInput id="username" v-model="username" class="w-full"/>
                </div>
                <div class="flex w-full flex-col">
                    <UiLabel for="email">Email</UiLabel>
                    <UiInput id="email" v-model="email" class="w-full"/>
                </div>
                <div class="flex w-full flex-col">
                    <UiLabel for="password">Password</UiLabel>
                    <UiInput id="password" v-model="password" type="password" class="w-full"/>
                </div>
            </template>
            <template #footer>
                <UiDialogFooter>
                    <UiButton variant="outline" type="button" @click="open = false">Cancel</UiButton>
                    <UiButton type="submit" @click="createUser">Create</UiButton>
                </UiDialogFooter>
            </template>
        </UiDialogContent>
    </UiDialog>
</template>

<style scoped>

</style>
