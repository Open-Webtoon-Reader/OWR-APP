<script setup lang="ts">
import UserList from "~/components/admin/UserList.vue";

definePageMeta({
    layout: "navigation",
    middleware: [
        "login-middleware",
        "server-url-middleware",
    ],
});
</script>

<template>
    <UiTabs class="flex w-full grow flex-col" default-value="downloads">
        <UiTabsList class="grid w-[40rem] grid-cols-2 gap-2">
            <UiTabsTrigger value="downloads">Downloads</UiTabsTrigger>
            <UiTabsTrigger value="users">Users</UiTabsTrigger>
        </UiTabsList>
        <UiSeparator/>
        <UiTabsContent value="downloads">
            <h1>TODO : Downloads</h1>
            <p>
                This page is under construction. Please check back later.
            </p>
            <p>
                If you have any questions, please contact the support team.
            </p>
        </UiTabsContent>
        <UiTabsContent value="users">
            <UserList/>
        </UiTabsContent>
    </UiTabs>
</template>

<style scoped>

</style>
