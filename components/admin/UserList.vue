<script setup lang="ts">

import type {User} from "~/utils/types";

const serverUrl = useLocalStorage("serverUrl", "");
const {data: users} = await useAsyncData<User[]>(
    "users",
    () => $fetch(`${serverUrl.value}/admin/users`, {
        headers: {Authorization: `Bearer ${useCookie("token").value}`}
    }), {server: false}
);
const {data: user} = await useAsyncData<any>("user", () => $fetch(`${serverUrl.value}/user/me`, {
    headers: {
        Authorization: `Bearer ${useCookie("token").value}`,
    }
}), {
    server: false,
});

async function addUser(){
    // TODO
}

async function deleteUser(userId: string){
    // TODO
}

async function editUserPassword(userId: string){
    // TODO
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-between p-2">
            <h2 class="border-b-0">User list</h2>
            <UiButton>
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
                        <td class="">{{ remoteUser.id }}</td>
                        <td class="">{{ remoteUser.username }}</td>
                        <td class="">{{ remoteUser.email }}</td>
                        <td class="">{{ remoteUser.admin ? "Admin" : "User" }}</td>
                        <td class="flex items-center justify-center gap-2 !p-2">
                            <UiButton :disabled="user.id === remoteUser.id" variant="secondary">
                                <Icon name="iconoir:edit" class="size-4" />
                            </UiButton>
                            <UiButton variant="destructive" :disabled="user.id === remoteUser.id">
                                <Icon name="iconoir:trash" class="size-4" />
                            </UiButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>
