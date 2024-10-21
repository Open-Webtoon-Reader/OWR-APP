import {useLocalStorage} from "@vueuse/core";

export function useOrder(){
    const orders = useLocalStorage<Record<number, boolean>>("order", {});

    function saveOrder(webtoonId: number, order: boolean): void{
        orders.value[webtoonId] = order;
    }

    function getOrder(webtoonId: number): boolean{
        return orders.value[webtoonId] ?? true;
    }

    return {saveOrder, getOrder};
}

export function useEpisode(){
    const episodes = useLocalStorage<number[]>("episode", []);
    const progressions = useLocalStorage<Record<number, number>>("progression", {});

    function startEpisode(episodeId: number): void{
        if (!episodes.value.includes(episodeId)){
            episodes.value.push(episodeId);
        }
    }

    function isEpisodeStarted(episodeId: number): boolean{
        return episodes.value.includes(episodeId.toString());
    }

    function setEpisodeProgression(episodeId: number, progression: number): void{
        progressions.value[episodeId] = progression;
    }

    function getEpisodeProgression(episodeId: number): number{
        return progressions.value[episodeId] || 0;
    }

    return {
        startEpisode,
        isEpisodeStarted,
        setEpisodeProgression,
        getEpisodeProgression,
    };
}
