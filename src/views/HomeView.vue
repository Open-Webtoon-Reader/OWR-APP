<script setup>

import WebtoonList from "@/components/webtoons/WebtoonList.vue";
</script>

<template>
    <header>
        <h1>Open Webtoon Reader</h1>
    </header>
    <main>
        <WebtoonList/>
    </main>
</template>

<style scoped lang="scss">

header{
    align-items: center;
    padding: 1rem 0;
    position: fixed;
    top: 0;
    height: 5rem;
    width: 100%;

    background-color: #070707;

    &>h1{
        text-align: center;
    }
}

main{
    margin-top: 5rem;
}

</style>
