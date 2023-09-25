<template lang="pug">
.page-book
    .page__body
        .page__nav-bar
            template(v-if="is_edit")
                va-button(color="secondary" @click="cancel()") Отмена
                va-button(@click="save()") Сохранить
            template(v-else)
                va-button(@click="cancel()") Назад
                va-button(icon="edit" @click="startEdit()")
        .book
            .book__main
                .book__cover
                    img(:src="img_url" @error="onImgError()")
                .book__info-box
                    .book__info
                        .book__title {{title}}
                        .book__author {{author}}
                    .book__date
                        .date__title Год издания
                        .date__value {{book_date}}
            .book__description
                h2 Описание
                p {{desc}}
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useBooksStore} from "@/store/books";
import {type Book} from "@/types/Store/Book";

const store = useBooksStore()
const route = useRoute()
const router = useRouter()
const props = defineProps<{
    is_edit: boolean
}>()

const is_img = ref(true)

const is_edit = computed(()=>props.is_edit)
const img_url = computed(()=>{
    const src = store.covers.get(book.value.id)
    if(is_img.value && src && src.src.length){
        return src.src
    }else
        return "https://imgholder.ru/300x400/8493a8/adb9ca&text="
            + encodeURIComponent(book.value.title)
})
const book = computed(()=>{
    return store.books.get(Number(route.params.id)) as Book
})
const title = computed(()=>book.value.title)
const author = computed(()=>{
    const author = store.authors.get(book.value.id)
    return author?.first_name
        + " " + author?.last_name
        + " " + author?.second_name
})
const book_date = computed(()=>{
    const date = book.value.published_at
    return date.getFullYear()
})
const desc = computed(()=>book.value.description)

function onImgError(){
    is_img.value = false
}
function startEdit(){
    router.push({
        name: "EditBook",
        params:{
            id: route.params.id
        }
    })
}
function cancel(){
    if(is_edit.value){
        router.push({
            name:'Book',
            params:{
                id: route.params.id
            }
        })
    }else{
        router.push({name:'Home'})
    }
}
function save(){}

</script>

<style lang="scss" scoped>
.page-book{
    display: flex;
    justify-content: center;
    padding: 10px;
}
.page__nav-bar{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.book{
    max-width: 700px;
    display: flex;
    flex-direction: column;

    &__main{
        display: grid;
        grid-template-columns: 2fr 3fr;
        margin-bottom: 50px;
        justify-items: center;

        @media (min-width: 756px) and (max-width: 1279.998px) {
            grid-template-columns: 1fr 2fr;
        }

        @media (min-width: 320px) and (max-width: 755.998px) {
            grid-template-columns: 1fr;
            max-width: 80%;
        }
    }
    &__cover{
        aspect-ratio: 3/4;

        img{
            width: 100%;
        }
    }
    &__info-box{
        display: grid;
        grid-template-rows: 1fr 1fr;
        padding: 40px;
    }
    &__info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    &__title{
        font-size: 24px;
        font-weight: bold;
    }
    &__author{
        color: #24bcff;
        font-weight: bold;
    }
    &__date{
        display: flex;
        justify-content: space-between;
    }
    &__description{
        h2{
            margin-bottom: 20px;
            font-size: 24px;
        }
    }
}
.book__input-box{
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px 10px #0002;
}
</style>