import {testApiUrl} from "@/utils/request-utils.js";
import {getCookie} from "@/utils/data-utils.js";

export async function apiUrlRequiredMiddleware(to, from, next){
    const apiUrl = getCookie("apiurl");
    if(apiUrl){
        const response = await testApiUrl(apiUrl);
        if(response)
            next();
        else
            next({name: "apiurl"});
    }else
        next({name: "apiurl"});
}

export async function missingApiUrlRequired(to, from, next){
    const apiUrl = getCookie("apiurl");
    if(apiUrl){
        const response = await testApiUrl(apiUrl);
        if(response)
            next({name: "home"});
        else
            next();
    }else
        next();
}
