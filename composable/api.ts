export function useApi(){
    const apiUrl = useCookie("apiUrl");

    async function testConnection(apiUrl: string): Promise<boolean>{
        try{
            await $fetch(`${apiUrl}/api/v1/version`);
            return true;
        }catch (e){
            return false;
        }
    }

    function sumToImageUrl(sum: string): string{
        return `${apiUrl.value}/api/v1/image/${sum}`;
    }

    async function getRandomThumbnail(): Promise<any>{
        return await $fetch(`${apiUrl.value}/api/v1/webtoons/thumbnails/random`);
    }

    async function getWebtoons(): Promise<Ref<any>>{
        const webtoonsState: Ref<any[]> = useState("webtoons");
        if(webtoonsState.value && webtoonsState.value.length)
            return webtoonsState;
        const data: any[] = await $fetch(`${apiUrl.value}/api/v1/webtoons`);
        // Sort webtoons by title
        data.sort((a, b) => a.title.localeCompare(b.title));
        // Then by hasNewEpisodes
        data.sort((a, b) => b.hasNewEpisodes - a.hasNewEpisodes);
        // Then by isNew
        data.sort((a, b) => b.isNew - a.isNew);
        webtoonsState.value = data;
        return webtoonsState;
    }

    return {
        testConnection,
        getWebtoons,
        sumToImageUrl,
        getRandomThumbnail,
    };
}
