export default defineNuxtRouteMiddleware(() => {
    const apiUrl = useCookie("apiUrl");
    if(apiUrl.value)
        return navigateTo("/");
});
