<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {FormControl, FormItem, FormLabel, FormMessage, FormField} from "~/components/ui/form";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useToast} from "~/components/ui/toast";
import {useApi} from "~/composable/api";

const router = useRouter();
const api = useApi();
const {toast: toaster} = useToast();

const connectButtonState = ref(false);

const formSchema = toTypedSchema(z.object({
    apiurl: z.string().url("Please enter a valid URL.")
}));
const {handleSubmit} = useForm({
    validationSchema: formSchema,
});
const onSubmit = handleSubmit(async(values) => {
    connectButtonState.value = true;
    const apiUrl = values.apiurl;
    if(apiUrl.endsWith("/")) // Remove last "/" if present
        values.apiurl = apiUrl.slice(0, -1);
    if(await api.testConnection(values.apiurl)){
        useCookie("apiUrl").value = values.apiurl;
        await router.push("/");
    }else{
        toaster({
            title: "Connection Timeout!",
            description: "The API Url you entered took too long to respond. Please check the URL and try again.",
            variant: "destructive",
        });
        connectButtonState.value = false;
    }
});
</script>

<template>
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>Open Webtoon Reader</CardTitle>
            <CardDescription>Welcome to OWR, the open-source webtoon reader</CardDescription>
        </CardHeader>
        <CardContent>
            <form class="space-y-6" @submit="onSubmit">
                <FormField v-slot="{ componentField }" name="apiurl">
                    <FormItem>
                        <FormLabel>Server URL</FormLabel>
                        <FormControl>
                            <div class="relative w-full max-w-sm items-center">
                                <Input id="apiurl" placeholder="Enter the server URL" label="API Url" class="pl-10" autocomplete="off" v-bind="componentField" default-value="https://"/>
                                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                                    <Icon name="iconoir:wifi-signal-none" class="size-6 text-muted-foreground"/>
                                </span>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button v-if="!connectButtonState" class="w-full" type="submit">
                    Connect
                </Button>
                <Button v-else disabled class="w-full">
                    <Icon name="iconoir:refresh-double" class="w-4 h-4 mr-2 animate-spin"/>
                    Connecting...
                </Button>
            </form>
        </CardContent>
    </Card>
</template>

<style scoped>

</style>
