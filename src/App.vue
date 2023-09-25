<template lang="pug">
.app
    router-view
</template>

<script lang="ts" setup>
import {useBooksStore} from "@/store/books";
import {onMounted} from "vue";

const store = useBooksStore()

onMounted(()=>{
    store.load_data()
})
</script>

<style lang="scss">
.app{
    font-family: Arial, serif;
}
html,body,#app,.app{
    width: 100%;
    height: 100%;
}
</style>