<script setup lang="ts">
import Image from "~/components/misc/Image.vue";

const id = useRoute().params.id;
const serverUrl = useLocalStorage("serverUrl", "");
const router = useRouter();

const displayCount = ref(10);
const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;

const {data: episode} = await useAsyncData<EpisodeWithProgression>(
    `episode-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}`), {server: false});

const {data: images} = await useAsyncData<string[]>(
    `episode-images-${id}`,
    () => $fetch(`${serverUrl.value}/webtoons/episodes/${id}/images`), {server: false});

const displayedImages = computed(() => {
    return images.value?.slice(0, displayCount.value) || [];
});

const hasMore = computed(() => {
    return images.value && displayCount.value < images.value.length;
});

onMounted(() => {
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
        <div class="flex w-full flex-col md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div v-for="(image, index) in (displayedImages || [])" :key="index" class="w-full">
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
