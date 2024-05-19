import axios from "axios";

async function testApiUrl(apiUrl){
    try{
        axios.defaults.baseURL = "";
        const response = await axios.get(apiUrl + "/api/v1/version");
        if(response.status === 200){
            axios.defaults.baseURL = apiUrl + "/api/v1";
            return true;
        }else{
            return false;
        }
    }catch (e){
        alert(e);
        return false;
    }
}

async function getWebtoons(){
    try{
        const response = await axios.get("/webtoons");
        return response.data;
    }catch (e){
        return [];
    }
}

async function getWebtoon(webtoonId){
    try{
        const response = await axios.get(`/webtoons/${webtoonId}`);
        return response.data;
    }catch (e){
        return null;
    }
}

async function getEpisodes(webtoonId, chunkNumber){
    try{
        const response = await axios.get(`/webtoons/${webtoonId}/episodes?chunk=${chunkNumber}`);
        return response.data;
    }catch (e){
        return [];
    }
}

async function getEpisode(episodeId){
    try{
        const response = await axios.get(`/webtoons/episodes/${episodeId}`);
        return response.data;
    }catch (e){
        return null;
    }
}

async function getEpisodeImages(episodeId, chunkNumber){
    try{
        const response = await axios.get(`/webtoons/episodes/${episodeId}/images?chunk=${chunkNumber}`);
        return response.data;
    }catch (e){
        return null;
    }
}

export {
    testApiUrl,
    getWebtoons,
    getWebtoon,
    getEpisodes,
    getEpisode,
    getEpisodeImages
};

export class getEpisodeImage{
}
