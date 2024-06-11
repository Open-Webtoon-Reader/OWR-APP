export default defineNuxtRouteMiddleware(() => {
    if(import.meta.server)
        return;
    const apiUrl = getFromLocalStorage("apiurl");
    if(apiUrl)
        return navigateTo("/");
});
