<script setup lang="ts">
import Default from "~/layouts/default.vue";
import Separator from "~/components/ui/Separator.vue";
import {DialogTitle} from "radix-vue";

const isDrawerOpen = ref(false);

const serverUrl = useLocalStorage("serverUrl", "");
const authToken = useCookie("token");
const {data: user, refresh: refreshUser} = await useAsyncData<any>("user", () => $fetch(`${serverUrl.value}/user/me`, {
    headers: {
        "Authorization": `Bearer ${authToken.value}`,
    }
}), {
    server: false,
});
const avatarUrl = computed(() => {
    if(!user.value)
        return null;
    return `${serverUrl.value}/image/v2/${user.value.avatar}`;
});

// Refresh user data when authToken changes
watch(authToken, async() => {
    if (authToken.value){
        await refreshUser();
    } else {
        user.value = null;
    }
});

function logout(){
    authToken.value = "";
    useToast().toast({
        title: "Logged out",
        description: "You have been logged out",
        variant: "default",
        icon: "iconoir:check",
    });
    setTimeout(async() => {
        await navigateTo("/");
    }, 100);
}
</script>

<template>
    <default>
        <div class="grid w-full grid-cols-3 p-4 md:hidden">
            <div class="flex justify-start self-center">
                <UiSheet v-model:open="isDrawerOpen">
                    <UiSheetTrigger as-child>
                        <UiButton variant="outline" size="icon">
                            <Icon name="iconoir:menu" class="size-6"/>
                        </UiButton>
                    </UiSheetTrigger>
                    <UiSheetContent
                        side="left"
                        title="Open Webtoon Reader"
                        description="Open Webtoon Reader"
                        class="flex flex-col gap-2"
                    >
                        <DialogTitle>
                            <div class="flex grow items-center justify-between">
                                <h3>Open Webtoon Reader</h3>
                                <UiButton variant="ghost" @click="isDrawerOpen = false">
                                    <Icon name="iconoir:xmark"/>
                                </UiButton>
                            </div>
                        </DialogTitle>
                        <div class="flex grow flex-col gap-2 p-2">
                            <UiButton variant="link" class="size-max" as-child @click="isDrawerOpen = false">
                                <NuxtLink to="/" class="flex gap-2">
                                    <Icon name="iconoir:home" class="size-5"/>
                                    Home
                                </NuxtLink>
                            </UiButton>
                        </div>
                        <UiSeparator/>
                        <div class="flex flex-col gap-2">
                            <div class="flex w-full items-center gap-3 pb-2 pl-2">
                                <UiAvatar
                                    :src="avatarUrl"
                                    alt="Guest"
                                    fallback="G"
                                />
                                <p class="font-bold">{{user?.user?.username || 'Guest'}}</p>
                            </div>
                            <UiButton v-if="!user" variant="link" class="size-max" as-child @click="isDrawerOpen = false">
                                <NuxtLink to="/account/login" class="flex gap-2">
                                    <Icon name="iconoir:log-in" class="size-5"/>
                                    Login
                                </NuxtLink>
                            </UiButton>
                            <UiButton v-if="user?.admin" variant="link" class="size-max" as-child @click="isDrawerOpen = false">
                                <NuxtLink to="/admin" class="flex gap-2">
                                    <Icon name="iconoir:apple-shortcuts" class="size-5"/>
                                    Administration
                                </NuxtLink>
                            </UiButton>
                            <UiButton v-if="user" variant="link" class="size-max" as-child @click="isDrawerOpen = false">
                                <NuxtLink to="/account" class="flex gap-2">
                                    <Icon name="iconoir:user" class="size-5"/>
                                    Account
                                </NuxtLink>
                            </UiButton>
                            <UiButton v-if="user" variant="link" class="size-max" as-child @click="isDrawerOpen = false;logout()">
                                <Icon name="iconoir:log-out" class="size-5"/>
                                Logout
                            </UiButton>
                        </div>
                    </UiSheetContent>
                </UiSheet>
            </div>
            <h1 class="flex justify-center">OWR</h1>
            <div class="flex justify-end self-center">
                <ThemeSwitcher/>
            </div>
        </div>
        <div class="hidden w-full grid-cols-2 items-center justify-between p-4 md:flex">
            <div class="flex flex-row gap-4">
                <h2 class="border-none pb-0">Open Webtoon Reader</h2>
                <div class="flex items-center justify-center gap-2">
                    <UiButton variant="outline" as-child>
                        <NuxtLink to="/" class="flex items-center gap-2">
                            <Icon name="iconoir:home" class="size-5"/>
                            Home
                        </NuxtLink>
                    </UiButton>
                </div>
            </div>
            <div class="flex items-center justify-end gap-4 self-center">
                <ThemeSwitcher/>
                <UiSeparator orientation="vertical" class="h-10"/>
                <UiDropdownMenu>
                    <UiDropdownMenuTrigger>
                        <UiAvatar
                            :src="avatarUrl"
                            alt="Guest"
                            fallback="G"
                        />
                    </UiDropdownMenuTrigger>
                    <UiDropdownMenuContent>
                        <UiDropdownMenuLabel :label="user?.username || 'Guest'"/>
                        <UiDropdownMenuSeparator/>
                        <UiDropdownMenuItem v-if="!user" icon="iconoir:log-in" title="Login" @click="$router.push('/account/login')"/>
                        <UiDropdownMenuItem v-if="user?.admin" icon="iconoir:apple-shortcuts" title="Administration" @click="$router.push('/admin')"/>
                        <UiDropdownMenuItem v-if="user" icon="iconoir:user" title="Account" @click="$router.push('/account')"/>
                        <UiDropdownMenuItem v-if="user" icon="iconoir:log-out" title="Logout" @click="logout"/>
                    </UiDropdownMenuContent>
                </UiDropdownMenu>
            </div>
        </div>
        <Separator/>
        <slot/>
    </default>
</template>
