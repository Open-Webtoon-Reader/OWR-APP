<script setup lang="ts">

import type {User} from "~/utils/types";
import CreateUserDialog from "~/components/dialogs/CreateUserDialog.vue";
import ConfirmDialog from "~/components/dialogs/ConfirmDialog.vue";

const serverUrl = useLocalStorage("serverUrl", "");
const authToken = useCookie("token");
const {data: users, refresh: refreshUsers} = await useAsyncData<User[]>(
    "users",
    () => $fetch(`${serverUrl.value}/admin/users`, {
        headers: {Authorization: `Bearer ${authToken.value}`}
    }), {server: false}
);
const {data: user} = await useAsyncData<any>("user", () => $fetch(`${serverUrl.value}/user/me`, {
    headers: {
        "Authorization": `Bearer ${authToken.value}`,
    }
}), {
    server: false,
});

const isCreateUserDialogOpen = ref(false);

async function createUser(userData: {username: string, email: string, password: string}){
    try{
        await $fetch(`${serverUrl.value}/admin/users/new`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken.value}`,
            },
            body: userData,
        });
        await refreshUsers();
    }catch(e: any){
        useToast().toast({
            title: "Error",
            description: e.data.message,
            variant: "destructive",
        });
    }
}

async function deleteUser(userId: string){
    try{
        await $fetch(`${serverUrl.value}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authToken.value}`,
            },
        });
        await refreshUsers();
    }catch(e: any){
        useToast().toast({
            title: "Error",
            description: e.data.message,
            variant: "destructive",
        });
    }
}

async function editUserPassword(userId: string){
    // TODO
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex items-center justify-between p-2">
            <h2 class="border-b-0">User list</h2>
            <UiButton @click="isCreateUserDialogOpen = true">
                <Icon name="iconoir:plus" class="size-4" />
                Add User
            </UiButton>
        </div>
        <div v-if="users" class="w-full">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="">Id</th>
                        <th class="">Username</th>
                        <th class="">Email</th>
                        <th class="">Role</th>
                        <th class="">Action</th>
                    </tr>
                </thead>
                <tbody class="">
                    <tr v-for="remoteUser in users" :key="remoteUser.id">
                        <td class=""><p>{{ remoteUser.id }}</p></td>
                        <td class=""><p>{{ remoteUser.username }}</p></td>
                        <td class=""><p>{{ remoteUser.email }}</p></td>
                        <td class=""><p>{{ remoteUser.admin ? "Admin" : "User" }}</p></td>
                        <td>
                            <div class="flex items-center justify-center gap-2 !p-2">
                                <UiButton :disabled="user.id === remoteUser.id || true" variant="secondary">
                                    <Icon name="iconoir:edit" class="size-4" />
                                </UiButton>
                                <ConfirmDialog :title="`Do you really want to delete user ${remoteUser.username} ?`" @action="deleteUser(remoteUser.id)">
                                    <template #trigger>
                                        <UiButton variant="destructive" :disabled="user.id === remoteUser.id">
                                            <Icon name="iconoir:trash" class="size-4" />
                                        </UiButton>
                                    </template>
                                </ConfirmDialog>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <CreateUserDialog v-model:open="isCreateUserDialogOpen" @create-user="createUser"/>
</template>

<style scoped>

</style>
