<script setup lang="ts">
import {UseFocusTrap} from "@vueuse/integrations/useFocusTrap/component";

definePageMeta({
    middleware: ["logout-middleware"],
});

const router = useRouter();
const usernameOrEmail = ref("");
const password = ref("");
const performingLogin = ref(false);

async function loginWithPassword(){
    performingLogin.value = true;
    const serverUrl = useLocalStorage("serverUrl", "");
    try{
        const data: any = await $fetch(`${serverUrl.value}/user/login`, {
            method: "POST",
            body: {
                usernameOrEmail: usernameOrEmail.value,
                password: password.value,
            },
        });
        const cookie = useCookie("token", {maxAge: 60 * 5});
        cookie.value = data.token;
        await router.push("/");
    }catch(e: any){
        useToast().toast({
            title: "Error when logging in",
            description: e.data.message,
            variant: "destructive",
            icon: "iconoir:xmark",
        });
    }
    performingLogin.value = false;
}

onKeyStroke("Enter", () => {
    loginWithPassword();
}, {dedupe: true});
</script>

<template>
    <UseFocusTrap class="custom-background flex w-full grow flex-col items-center justify-center p-4">
        <UiCard
            class="w-[360px] max-w-sm"
            title="Login"
            description="Enter your credentials to login"
        >
            <template #content>
                <UiCardContent class="flex flex-col gap-2">
                    <div class="flex flex-col space-y-1.5">
                        <UiLabel for="usernameOrEmail">Username / Email</UiLabel>
                        <UiInput id="usernameOrEmail" v-model="usernameOrEmail" placeholder="Enter your username / email"/>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <UiLabel for="password">Password</UiLabel>
                        <UiInput id="password" v-model="password" type="password" placeholder="Enter your password"/>
                    </div>
                </UiCardContent>
            </template>
            <template #footer>
                <UiCardFooter class="flex flex-col gap-2">
                    <UiButton class="w-full" :disabled="performingLogin" type="submit" variant="default" @click="loginWithPassword">Login</UiButton>
                    <UiButton type="button" variant="link" as-child>
                        <NuxtLink>Or sign up (WIP)</NuxtLink>
                    </UiButton>
                </UiCardFooter>
            </template>
        </UiCard>
    </UseFocusTrap>
</template>

<style scoped>

</style>
