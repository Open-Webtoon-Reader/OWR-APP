<script setup lang="ts">
import notApiurlMiddleware from "~/middleware/not-apiurl.middleware";
import {useToast} from "@/components/ui/toast/use-toast";
import ApiUrlCard from "~/components/cards/ApiUrlCard.vue";
definePageMeta({
    middleware: [
        notApiurlMiddleware
    ]
});

onMounted(() => {
    const {toast: toaster} = useToast();
    const toast = useState("toast").value;
    if(toast === "not-present"){
        toaster({
            title: "API Url is not present!",
            description: "Please enter an API Url in the input field above.",
            variant: "destructive",
        });
    }else if(toast === "timeout"){
        toaster({
            title: "Connection Timeout!",
            description: "The API Url you entered took too long to respond. Please check the URL and try again.",
            variant: "destructive",
        });
    }
    useState("toast").value = null;
});

</script>

<template>
    <div>
        <div class="h-screen grid place-items-center">
            <div class="fixed top-5 left-5 z-10">
                <ThemeSwitcher/>
            </div>
            <ApiUrlCard/>
        </div>
    </div>
</template>

<style scoped>

</style>
