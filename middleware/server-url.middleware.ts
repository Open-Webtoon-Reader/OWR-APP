export default defineNuxtRouteMiddleware(async() => {
    const serverUrl = useLocalStorage("serverUrl", "");
    if(!serverUrl || serverUrl.value === "")
        return navigateTo("/server");
    try{
        await $fetch(serverUrl.value + "/version");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e: any){
        return navigateTo("/server");
    }
});
