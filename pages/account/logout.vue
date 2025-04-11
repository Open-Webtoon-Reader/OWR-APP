<script setup lang="ts">
const authToken = useCookie("token");
const router = useRouter();
authToken.value = "";
useToast().toast({
    title: "Logged out",
    description: "You have been logged out",
    variant: "default",
    icon: "iconoir:check",
});
setTimeout(async() => {
    await router.push("/");
}, 100);
</script>

<template>
    <div class="flex w-full grow items-center justify-center">
        <h3>Logout in progress...</h3>
    </div>
</template>

<style scoped>

</style>
