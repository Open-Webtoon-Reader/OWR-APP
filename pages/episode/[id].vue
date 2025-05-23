<script setup lang="ts">
import Image from "~/components/misc/Image.vue";
import debounce from "debounce";
import type {Progression} from "~/utils/types";

definePageMeta({
    layout: "navigation",
    middleware: [
        "server-url-middleware",
    ],
});

const id = useRoute().params.id;
const serverUrl = useLocalStorage("serverUrl", "");
const router = useRouter();

const displayCount = ref(10);
const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;
const imageRefs = ref<HTMLElement[]>([]);
const isFirstSave = ref(true);

const {data: episode} = await useAsyncData<EpisodeWithProgression>(
    `episode-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}`), {server: false});

const {data: images} = await useAsyncData<string[]>(
    `episode-images-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}/images`), {server: false});

const token = useCookie("token").value;
const {data: currentProgression} = await useAsyncData<number>(`progression-${id}`, async() => {
    // TODO: Implement local storage saving
    if(!token) return 0;
    try{
        const progression = await $fetch<Progression>(`${serverUrl.value}/user/progression/episode/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        if(!progression)
            return 0;
        displayCount.value += progression.progression;
        return progression.progression;
    }catch{
        firstTimeScroll.value = true;
        return 0;
    }
}, {server: false});

const displayedImages = computed(() => {
    return images.value?.slice(0, displayCount.value) || [];
});

const hasMore = computed(() => {
    return images.value && displayCount.value < images.value.length;
});

onMounted(() => {
    setTimeout(() => {
        if(!currentProgression.value && currentProgression.value <= 0)
            return;
        triggerScroll(currentProgression.value);
    }, 100);
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore.value){
            displayCount.value += 10;
        }
    }, {
        root: document.querySelector(".flex-1"),
        rootMargin: "100px 0px"
    });

    watchEffect(() => {
        if (sentinel.value && hasMore.value){
            observer.observe(sentinel.value);
        } else if (sentinel.value){
            observer.unobserve(sentinel.value);
        }
    });

    onBeforeUnmount(() => {
        observer.disconnect();
    });
});

async function saveProgressionAPI(progress: number){
    if(progress <= 0)
        return;
    if(!token)
        // TODO: Implement local storage saving
        return;
    await $fetch(`${serverUrl.value}/user/progression/episode/${id}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: {
            progression: progress
        }
    });
}


// Configuration initiale du debounce
const debouncedSetProgression = debounce((progress: number) => {
    if(isFirstSave.value)
        return;
    saveProgressionAPI(progress);
}, 250);

const firstTimeScroll = ref(false);
function triggerScroll(value: number){
    setTimeout(() => {
        firstTimeScroll.value = true;
        imageRefs.value[value]?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}
watch([currentProgression, images], ([newValue]) => {
    if(!firstTimeScroll.value && imageRefs.value[newValue])
        triggerScroll(Math.max(newValue - 2, 0));
});

onMounted(() => {
    setTimeout(() => {
        saveProgressionAPI(currentProgression.value || 0);
        isFirstSave.value = false;
    }, 2000);

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                const index = imageRefs.value.indexOf(entry.target as HTMLElement);
                if (index > currentProgression.value){
                    currentProgression.value = index;
                    debouncedSetProgression(index);
                }
            }
        });
    }, {root: document.querySelector(".flex-1"), threshold: 0.1});

    imageRefs.value.forEach(el => el && imageObserver.observe(el));
    watch(imageRefs, (newRefs) => {
        newRefs.forEach(el => el && imageObserver.observe(el));
    }, {deep: true});

    onBeforeUnmount(() => {
        imageObserver.disconnect();
    });
});
</script>

<template>
    <div class="flex w-full grow flex-col items-center">
        <div class="flex w-full items-center justify-between p-4 shadow-md">
            <NuxtLink class="flex items-center gap-2" @click="router.back">
                <UiButton variant="ghost" size="icon">
                    <Icon name="iconoir:arrow-left" />
                </UiButton>
                <h1 class="text-xl font-semibold">{{ episode?.title }}</h1>
            </NuxtLink>
        </div>
        <div class="flex w-full flex-col md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div
                v-for="(image, index) in displayedImages"
                :key="index"
                :ref="el => imageRefs[index] = el as HTMLElement"
                class="w-full"
            >
                <Image
                    :sum="image"
                    format="webp"
                    alt="Episode Image"
                    class="w-full"
                    :width="800"
                    :height="1280"
                />
            </div>
            <div
                v-show="hasMore"
                ref="sentinel"
                class="h-2 w-full opacity-0"
            />
        </div>
    </div>
</template>
