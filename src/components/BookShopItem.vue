<template lang="pug">
.book(@click="openBook()")
    .book__cover
        img(:src="img_url" @error="onImgError()")
        .img__chips
            .img__chip(v-for="i in 3")
                va-icon(name="local_fire_department")
    .boor__price
        .price-box
            .last_price 1100 ₽
            .new_price  {{price}} ₽
        .book__percent 70%
    .book__info
        .book__title {{title}}
        .book__author {{author_full_name}}
</template>

<script lang="ts" setup>
import {type Book} from "@/types/Store/Book";
import {computed, ref, nextTick} from "vue";
import {useBooksStore} from "@/store/books";
import {useRouter} from "vue-router";

const props = defineProps<{
    book: Book
}>()

const store = useBooksStore()
const router = useRouter()

const is_img = ref(true)

const price = computed(()=>props.book.price)
const title = computed(()=>props.book.title)
const author = computed(()=>store.authors.get(props.book.id))
const author_full_name = computed(()=>{
    return (author.value?.first_name??"") + "" + (author.value?.last_name??"")
})
const img_url = computed(()=>{
    const src = store.covers.get(props.book.id)
    if(is_img.value && src && src.src.length){
        return src.src
    }else
        return "https://imgholder.ru/300x400/8493a8/adb9ca&text="
            + encodeURIComponent(title.value)
})

function onImgError(){
    is_img.value = false
}

function openBook(){
    router.push("/book/"+props.book.id)
}

</script>

<style lang="scss" scoped>
.book{
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        box-shadow: 0 0 10px 10px #0002;
    }
}
.book__cover{
    width: 100%;
    position: relative;
    aspect-ratio: 3/4;

    img {
        width: 100%;
    }
}
.img__chips{
    position: absolute;
    bottom: 0;
    left: -5px;
    display: flex;
    gap: 5px;
}
.img__chip{
    background: red;
    color: white;
    padding: 2px;
    border-radius: 50px;
}
.boor__price{
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.price-box{
    display: flex;
    flex-direction: column;
    gap: 5px
}
.last_price{
    text-decoration: line-through;
    font-size: 12px;
}
.new_price{
    color: red;
    font-weight: bold;
}
.book__percent{
    background: red;
    color: white;
    padding: 2px 7px;
    border-radius: 200px;
    font-size: 12px;
}
.book__info{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.book__author{
    font-size: 14px;
    color: grey;
}
</style>