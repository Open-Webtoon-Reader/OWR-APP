<script setup lang="ts">
import * as z from "zod";

definePageMeta({
    layout: "header",
});
useHead({
    title: "Server",
    meta: [
        {
            name: "description",
            content: "Server connection page",
        },
    ],
});

const {handleSubmit} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            serverUrl: z.string().url("Please enter a valid URL."),
        })
    ),
    initialValues: {
        serverUrl: "https://",
    },
});

const onSubmit = handleSubmit(async(values) => {
    let serverUrl = values.serverUrl;
    if(!serverUrl)
        return useToast().toast({
            title: "Server URL is required.",
            icon: "iconoir:wifi-off",
            description: "Please enter the server URL to continue.",
            variant: "destructive"
        });
    if(serverUrl.endsWith("/"))
        serverUrl = serverUrl.slice(0, -1);
    try{
        await $fetch(`${serverUrl}/version`);
        const value = useLocalStorage("serverUrl", "");
        value.value = serverUrl;
        await useRouter().push("/");
    }catch(e: any){
        if(e.data)
            useToast().toast({
                title: "Server URL is invalid.",
                icon: "iconoir:wifi-off",
                description: `${e.data.error}\n${e.data.message}`,
                variant: "destructive"
            });
        else
            useToast().toast({
                title: "Server URL is invalid.",
                icon: "iconoir:wifi-off",
                description: `${e}`,
                variant: "destructive"
            });
    }
});

onMounted(() => {
    const value = useLocalStorage("serverUrl", "");
    if(value.value)
        useRouter().push("/");
});
</script>

<template>
    <div class="flex grow items-center justify-center">
        <UiCard
            class="w-[360px] max-w-sm"
            title="Server URL"
            description="Please enter the server URL to continue."
        >
            <template #content>
                <UiCardContent as="form" class="grid w-full items-center gap-4" @submit="onSubmit">
                    <Field v-slot="{componentField}" name="serverUrl" class="flex flex-col space-y-1.5">
                        <UiFormItem label="Server URL">
                            <UiInput v-bind="componentField" placeholder="Server URL"/>
                        </UiFormItem>
                    </Field>
                    <UiButton type="submit" class="w-full">Connect</UiButton>
                </UiCardContent>
            </template>
        </UiCard>
    </div>
</template>

<style scoped>

</style>
