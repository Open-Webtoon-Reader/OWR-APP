export function saveToLocalStorage(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string): any{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export function clearFromLocalStorage(key: string): void{
    localStorage.removeItem(key);
}
