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
        console.group("API URL invalid");
        console.log("Clear cookie");
        console.log("Error:", e);
        console.groupEnd();
        apiUrl.value = null;
        useState("toast").value = "invalid";
        return navigateTo("/apiurl");
    }
});
