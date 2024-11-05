import {useApi} from "~/composable/api";

export default defineNuxtRouteMiddleware(async() => {
    const apiUrl = useCookie("apiUrl");
    if(!apiUrl.value){
        useState("toast").value = "not-present";
        return navigateTo("/apiurl");
    }
    const api = useApi();
    api.testConnection(apiUrl).then(result => {
        if (!result){
            apiUrl.value = null;
            useState("toast").value = "invalid";
            navigateTo("/apiurl");
        }
    });
});
