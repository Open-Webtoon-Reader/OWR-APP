

export function saveOrder(webtoonId: number, order: boolean){
    if(import.meta.server)
        return;
    localStorage.setItem("order", JSON.stringify({webtoonId, order}));
}

export function getOrder(webtoonId: number){
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
