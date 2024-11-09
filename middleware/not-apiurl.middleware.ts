export default defineNuxtRouteMiddleware(async() => {
    const apiUrl = useCookie("apiUrl");
    if(apiUrl.value){
        try{
            await $fetch(`${apiUrl.value}/api/v1/version`);
            return navigateTo("/");
        }catch (e){
            console.group("Not API URL invalid");
            console.log("Clear cookie");
            console.log("Error:", e);
            console.groupEnd();
            apiUrl.value = null;
            useState("toast").value = "invalid";
            return;
        }
    }
    return;
});
