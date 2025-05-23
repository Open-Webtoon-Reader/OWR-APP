<script setup lang="ts">
import Image from "~/components/misc/Image.vue";

const props = defineProps<{
    episode: EpisodeWithProgression
}>();
</script>

<template>
    <NuxtLink
        class="flex h-20 border border-t-0 transition-colors hover:cursor-pointer md:h-24 lg:h-28"
        :class="[
            (episode.progression || 0) > 0 ? 'bg-amber-100/30' : 'hover:bg-secondary',
        ]"
        :to="'/episode/' + episode.id"
    >
        <Image :sum="episode.thumbnail" />
        <div class="flex grow items-center justify-center p-2">
            <div class="flex grow items-center gap-2 md:w-[25rem] lg:w-[35rem]">
                <UiBadge
                    v-if="props.episode.isNew"
                    variant="default"
                    class="h-max"
                >
                    New
                </UiBadge>
                <h4 class="truncate">{{ episode.title }}</h4>
            </div>
            <div>
                <p class="opacity-50">#{{ episode.number }}</p>
            </div>
        </div>
    </NuxtLink>
</template>
