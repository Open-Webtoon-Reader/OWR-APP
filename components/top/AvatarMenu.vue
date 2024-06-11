<script setup lang="ts">

import {DropdownMenu} from "~/components/ui/dropdown-menu";
import {Avatar, AvatarImage, AvatarFallback} from "~/components/ui/avatar";

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger class="w-10 h-10">
            <Avatar class="w-10 h-10">
                <AvatarImage src="https://github.com/radix-vue.png"/>
                <AvatarFallback>G</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem @click="$router.push('/settings')">Settings</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<style scoped>

</style>
