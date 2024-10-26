<script setup lang="ts">
import {ref} from "vue";
import {useWebsocketDownload} from "~/composable/websocket-download";

definePageMeta({
    middleware: "apiurl-middleware",
    layout: "nav-layout"
});
useSeoMeta({
    title: "OWR | Admin",
    description: "Admin page",
});

const websocketDownload = useWebsocketDownload();

const adminKey = ref<string>("");
const webtoonTitle = ref<string>("");
const language = ref<string>("fr");
const languages = ref<string[]>(["fr", "en", "es", "zh-hant", "th", "de", "id"]);

</script>

<template>
    <div class="flex flex-1 justify-center items-center text-center">
        <Card class="w-[450px]">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Manage your settings here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Input
                    v-model="adminKey"
                    placeholder="Clé Admin"
                    class="mb-4"
                />

                <Input
                    v-model="webtoonTitle"
                    placeholder="Titre du Webtoon"
                    class="mb-4"
                />

                <Select v-model="language">
                    <SelectTrigger>
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            <SelectItem v-for="_language in languages" :key="_language" :value="_language">
                                {{ _language }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div class="flex flex-col gap-2">
                    <div class="flex gap-4">
                        <Button class="w-full" @click="addDownload(adminKey, webtoonTitle, language)">
                            Start download
                        </Button>
                        <Button class="w-full" @click="updateAll(adminKey)">
                            Update webtoons
                        </Button>
                    </div>
                    <div class="flex gap-4">
                        <Button class="w-full" variant="destructive" @click="clearDownload(adminKey)">
                            Skip download
                        </Button>
                        <Button class="w-full" variant="destructive" @click="clearDownloadQueue(adminKey)">
                            Clear download queue
                        </Button>
                    </div>
                </div>

                <div v-if="websocketDownload.currentDownload.value">
                    <p class="mt-4 font-semibold">Téléchargement en cours de: {{websocketDownload.currentDownload.value?.title}} ({{websocketDownload.currentDownload.value?.language}})</p>
                    <Progress v-model="websocketDownload.progress.value" class="mt-2" label="Progression du téléchargement" />
                    <Progress v-model="websocketDownload.episodeProgress.value" class="mt-2" label="Progression de la mise à jour" />
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>

</style>
