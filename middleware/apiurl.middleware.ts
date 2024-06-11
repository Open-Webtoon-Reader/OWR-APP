import {getFromLocalStorage, clearFromLocalStorage} from "~/utils/utils";
import {testApiConnection} from "~/utils/api";

export default defineNuxtRouteMiddleware(async() => {
    const apiUrl = getFromLocalStorage("apiurl");
    if(!apiUrl){
        useState("toast").value = "not-present";
        return navigateTo("/apiurl");
    }
    if(!await testApiConnection(apiUrl)){
        clearFromLocalStorage("apiurl");
        useState("toast").value = "timeout";
        return navigateTo("/apiurl");
    }
});
