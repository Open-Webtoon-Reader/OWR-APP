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
    return `${axios.defaults.baseURL}/images/${sum}`;
}