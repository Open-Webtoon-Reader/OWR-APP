function saveCookie(key, value){
    document.cookie = `${key}=${value}; path=/`;
}

function getCookie(key){
    const cookie = document.cookie
        .split(";")
        .find(cookie => cookie.includes(key));
    return cookie ? cookie.split("=")[1] : null;
}

function removeCookie(key){
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function saveToLocalStorage(key, value){
    localStorage
        .setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export {saveCookie, getCookie, removeCookie, saveToLocalStorage, getFromLocalStorage};
