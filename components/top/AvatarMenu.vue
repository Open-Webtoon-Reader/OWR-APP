<script setup lang="ts">

import {DropdownMenu} from "~/components/ui/dropdown-menu";
import {Avatar, AvatarImage, AvatarFallback} from "~/components/ui/avatar";
import {getRandomThumbnail, sumToImageUrl} from "~/utils/api";

const randomAvatar = ref<string>()

onMounted(async() => {
    const res = await getRandomThumbnail();
    randomAvatar.value = sumToImageUrl(res.data.thumbnail)
})

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger class="w-10 h-10">
            <Avatar class="w-10 h-10">
                <AvatarImage :src="randomAvatar"/>
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
