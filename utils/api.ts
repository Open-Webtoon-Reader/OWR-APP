import axios from "axios";

export function setAxiosBaseUrl(apiUrl: string){
    axios.defaults.baseURL = `${apiUrl}/api/v1`;
}

export async function testApiConnection(apiUrl: string): Promise<boolean>{
    try {
        setAxiosBaseUrl(apiUrl);
        await axios.get("/version");
        return true;
    }catch(error){
        return false;
    }
}

export function sumToImageUrl(sum: string): string{
    return `${axios.defaults.baseURL}/image/${sum}`;
}

export function getWebtoons(): Promise<any>{
    return axios.get("/webtoons");
}

export function getEpisodes(episodeId: number): Promise<any>{
    return axios.get(`/webtoons/${episodeId}/episodes`);
}

export function getRandomThumbnail(): Promise<any>{
    return axios.get("/webtoons/thumbnails/random");
}

export function getWebtoon(webtoonId: number): Promise<any>{
    return axios.get(`/webtoons/${webtoonId}`);
}

export function getEpisodeInfos(episodeId: number): Promise<any>{
    return axios.get(`/webtoons/episodes/${episodeId}`);
}

export function getEpisodeImages(episodeId: number): Promise<any>{
    return axios.get(`/webtoons/episodes/${episodeId}/images`);
}
