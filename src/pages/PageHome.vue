<template lang="pug">
LayoutHome
    template(#inputs)
        va-button(@click="add()") Добавить книгу
    BookShopItem(v-for="book in books" :book="book")
</template>

<script lang="ts" setup>
import {useBooksStore} from "@/store/books";
import LayoutHome from "@/layouts/LayoutHome.vue";
import BookShopItem from "@/components/BookShopItem.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";

const store = useBooksStore()
const router = useRouter()

const books = computed(()=>store.books.values())

function add(){
    router.push({name:"CreateBook"})
}

</script>

<style lang="scss" scoped>

</style>