export default defineNuxtRouteMiddleware(async() => {
    const apiUrl = useCookie("apiUrl");
    if(!apiUrl.value){
        useState("toast").value = "not-present";
        return navigateTo("/apiurl");
    }
    try{
        await $fetch(`${apiUrl.value}/api/v1/version`);
        return;
    }catch (e){
        apiUrl.value = null;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        useState("toast").value = "invalid";
        return navigateTo("/apiurl");
    }
});
