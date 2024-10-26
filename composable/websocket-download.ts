import {io} from "socket.io-client";
import axios from "axios";

export function useWebsocketDownload(){
    const currentDownload = useState<any>("current-download", () => null);
    const progress = useState<number>("progress", () => 0);
    const episodeProgress = useState<number>("episode-progress", () => 0);

    const client = io(axios.defaults.baseURL?.replace("/api/v1", "/download"));

    client.on("start", (payload) => {
        currentDownload.value = payload;
        progress.value = 0;
        episodeProgress.value = 0;
    });
    client.on("progress", (payload) => {
        progress.value = payload;
    });
    client.on("episode/progress", (payload) => {
        episodeProgress.value = payload;
    });

    return {
        currentDownload,
        progress,
        episodeProgress,
    };
}
