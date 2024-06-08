export default defineNuxtRouteMiddleware(() => {
    const apiUrl = getFromLocalStorage("apiurl");
    if(apiUrl)
        return navigateTo("/");
});
