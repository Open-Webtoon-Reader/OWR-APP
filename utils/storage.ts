

export function saveOrder(webtoonId: number, order: boolean): void{
    if(import.meta.server)
        return;
    localStorage.setItem("order", JSON.stringify({webtoonId, order}));
}

export function getOrder(webtoonId: number): boolean{
    if(import.meta.server)
        return;
    const order = localStorage.getItem("order");
    if(order){
        const parsedOrder = JSON.parse(order);
        if(parsedOrder.webtoonId === webtoonId)
            return parsedOrder.order;
    }
    return true;
}

export function startEpisode(episodeId: number): void{
    let episodes = localStorage.getItem("episode");
    if(episodes){
        episodes = JSON.parse(episodes);
        if(!episodes.includes(episodeId)){
            episodes.push(episodeId);
            localStorage.setItem("episode", JSON.stringify(episodes));
        }
    } else {
        localStorage.setItem("episode", JSON.stringify([episodeId]));
    }
}

export function isEpisodeStarted(episodeId: number): boolean{
    let episodes = localStorage.getItem("episode");
    if(episodes){
        episodes = JSON.parse(episodes);
        return episodes.includes(episodeId.toString());
    }
    return false;
}
