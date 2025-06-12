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

const {data: episode} = await useAsyncData<EpisodeData>(
    `episode-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}`), {server: false});

const {data: images} = await useAsyncData<string[]>(
    `episode-images-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}/images`), {server: false});

const token = useCookie("token").value;
const {data: currentProgression} = await useAsyncData<number>(`progression-${id}`, async() => {
    if(!token) return 0;
    try{
        const progression = await $fetch<Progression>(`${serverUrl.value}/user/progression/episode/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        if(!progression)
            return 0;
        displayCount.value += progression.progression;
        return progression.progression - 3 >= 0 ? progression.progression - 3 : 0; // -2 because we want to start from the first image
    }catch{
        return 0;
    }
}, {server: false});

const displayedImages = computed(() => {
    return images.value?.slice(0, displayCount.value) || [];
});

const hasMore = computed(() => {
    return images.value && displayCount.value < images.value.length;
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

const debouncedSetProgression = debounce((progress: number) => {
    saveProgressionAPI(progress);
}, 250);

let triggeredScroll = false;
function tryTriggerScroll(){
    if(!triggeredScroll
        && currentProgression.value
        && currentProgression.value !== 0
        && imageRefs.value[currentProgression.value]
    ){
        triggerScroll(currentProgression.value);
        triggeredScroll = true;
    }
}
function triggerScroll(value: number){
    setTimeout(() => {
        imageRefs.value[value]?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}

// Scroll to the current progression if it exists
watch([currentProgression, imageRefs], ([newCurrentProgression]) => {
    if(newCurrentProgression === 1)
        triggeredScroll = true;
    tryTriggerScroll();
}, {immediate: true});

onMounted(() => {
    // Trigger scroll after 500ms to current progression if it exists
    setTimeout(() => {
        tryTriggerScroll();
    }, 100);
    // Progression observers
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const index = imageRefs.value.indexOf(entry.target as HTMLElement);
                if(index > (currentProgression.value || 0)){
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

    // Sentinel observer
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
        <div class="flex w-full flex-col md:w-2/3 lg:w-1/2 xl:w-5/12">
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
                    not-square
                />
            </div>
            <div
                v-show="hasMore"
                ref="sentinel"
                class="h-2 w-full opacity-0"
            />
            <div class="flex justify-between p-4">
                <UiButton :disabled="!episode?.previousEpisodeId">
                    <NuxtLink :to="`/episode/${episode?.previousEpisodeId}`" class="flex items-center gap-2">
                        <Icon name="iconoir:arrow-left" class="size-5" />
                    </NuxtLink>
                </UiButton>
                <UiButton :disabled="!episode?.nextEpisodeId">
                    <NuxtLink :to="`/episode/${episode?.nextEpisodeId}`" class="flex items-center gap-2">
                        <Icon name="iconoir:arrow-right" class="size-5" />
                    </NuxtLink>
                </UiButton>
            </div>
        </div>
    </div>
</template>
