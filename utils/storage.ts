export function saveOrder(webtoonId: number, order: boolean): void{
    if(import.meta.server)
        return;
    let orders = localStorage.getItem("order");
    if(orders){
        orders = JSON.parse(orders);
        orders[webtoonId] = order;
        localStorage.setItem("order", JSON.stringify(orders));
    } else {
        localStorage.setItem("order", JSON.stringify({[webtoonId]: order}));
    }
}

export function getOrder(webtoonId: number): boolean{
    if(import.meta.server)
        return;
    let orders = localStorage.getItem("order");
    if(orders){
        orders = JSON.parse(orders);
        if(orders[webtoonId] === undefined)
            return true;
        return orders[webtoonId];
    }
    return true;
}

export function startEpisode(episodeId: number): void{
    if(import.meta.server)
        return;
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
    if(import.meta.server)
        return;
    let episodes = localStorage.getItem("episode");
    if(episodes){
        episodes = JSON.parse(episodes);
        return episodes.includes(episodeId.toString());
    }
    return false;
}

export function setEpisodeProgression(episodeId: number, progression: number): void{
    if(import.meta.server)
        return;
    let progressions = localStorage.getItem("progression");
    if(progressions){
        progressions = JSON.parse(progressions);
        progressions[episodeId] = progression;
        localStorage.setItem("progression", JSON.stringify(progressions));
    } else {
        localStorage.setItem("progression", JSON.stringify({[episodeId]: progression}));
    }
}

export function getEpisodeProgression(episodeId: number): number{
    if(import.meta.server)
        return;
    let progressions = localStorage.getItem("progression");
    if(progressions){
        progressions = JSON.parse(progressions);
        return progressions[episodeId] || 0;
    }
    return 0;
}
