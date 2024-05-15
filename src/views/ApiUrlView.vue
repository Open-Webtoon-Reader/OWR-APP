<script setup>
import router from "@/router/index.js";
import {ref} from "vue";
import {saveCookie} from "@/utils/data-utils.js";
import {testApiUrl} from "@/utils/request-utils.js";

const apiUrlRef = ref("http://localhost:3000");
const loadingRef = ref(false);

async function submitNewApiUrl(){
    loadingRef.value = true;
    if(await testApiUrl(apiUrlRef.value)){
        saveCookie("apiurl", apiUrlRef.value);
        await router.push({name: "home"});
    }else{
        alert("Invalid API URL");
    }
    loadingRef.value = false;
}
</script>

<template>
    <main>
        <div id="card">
            <header>
                <h1>Open Webtoon Reader</h1>
                <h2>Open source reader for webtoons</h2>
            </header>
            <section>
                <input type="text" v-model="apiUrlRef" :disabled="loadingRef"/>
                <button @click="submitNewApiUrl" :disabled="loadingRef">Submit</button>
            </section>
        </div>
    </main>
</template>

<style scoped lang="scss">
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    background-color: #0F0F0F;
}



#card{
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 20rem 2rem;
    gap: 12rem;
    min-width: 25rem;
    align-items: center;

    background-color: #050505;
    border-radius: 1rem;

    &>header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
    }

    &>section{
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
}

input{

}

button{
    background-color: #00A6FB;
    border-radius: .5rem;
    padding: .5rem 1rem;

    width: 16rem;
}
</style>
