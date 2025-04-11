import type {CookieRef} from "#app";

export default defineNuxtRouteMiddleware(() => {
    const token: CookieRef<string> = useCookie("token");
    if(token.value)
        return navigateTo("/");
});
