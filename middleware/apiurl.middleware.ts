import {getFromLocalStorage, clearFromLocalStorage} from "~/utils/utils";
import {testApiConnection} from "~/utils/api";

export default defineNuxtRouteMiddleware(async() => {
    if(import.meta.server)
        return;
    const apiUrl = getFromLocalStorage("apiurl");
    if(!apiUrl){
        useState("toast").value = "not-present";
        return navigateTo("/apiurl");
    }
    testApiConnection(apiUrl).then(result => {
        if (!result){
            clearFromLocalStorage("apiurl");
            useState("toast").value = "invalid";
            navigateTo("/apiurl");
        }
    });
});
