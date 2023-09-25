<template lang="pug">
.page-book-create
    .book__cover
        img(:src="img_src")
        .img__inputs
            va-button(icon="upload" @click="loadImage()")
            va-input(
                placeholder="Или URL"
                v-model="img_url_input"
                @blur="onBlurImgInput()")
            va-button(icon="save" @click="submit()" :disabled="!is_edit_img")
    .book__inputs
        .book__info
            h1 Книга
            va-input(label="Название" v-model="book_title")
            va-input(label="Описание" v-model="book_desc")
            va-input(label="Цена"
                mask="numeral"
                placeholder="0.00"
                v-model="book_price")
                template(#appendInner)
                    | ₽
            va-date-input(label="Дата выпуска"
                v-model="book_date")
            .book__buttons
                va-button(color="secondary" @click="cancel()") Назад
                va-button(@click="submit()"  :disabled="!is_edit_book") Сохранить
    .book__inputs
        .book__info
            h1 Автор
            va-input(label="Имя"
                v-model="author_first_name")
            va-input(label="Фамилия"
                v-model="author_last_name")
            va-input(label="Отчество"
                v-model="author_second_name")
            .book__buttons
                va-button(color="secondary" @click="cancel()") Назад
                va-button(@click="submit()" :disabled="!is_edit_author") Сохранить
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";
import {useBooksStore} from "@/store/books";
import {useRoute, useRouter} from "vue-router";

const store = useBooksStore()
const router = useRouter()
const route = useRoute()

const book_title = ref("")
const book_desc = ref("")
const book_price = ref("")
const book_date = ref(new Date())
const author_first_name = ref("")
const author_last_name = ref("")
const author_second_name = ref("")

const img_url = ref("");
const img_url_input = ref("");
const img_src = computed(()=>{
    if(img_url.value.length) return img_url.value
    else return "https://imgholder.ru/300x400/8493a8/adb9ca&text=3/4"
})

const book_id = computed(()=>{
    return Number(route.params.id ?? 0)
})
const book = computed(()=>{
    return store.books.get(book_id.value)
})
const book_author = computed(()=>{
    return store.authors.get(book_id.value)
})
const book_img = computed(()=>{
    return store.covers.get(book_id.value)
})

const is_edit_img = computed(()=>{
    return book_img.value?.src != img_url.value
})
const is_edit_book = computed(()=>{
    return book.value?.title != book_title.value
        || book.value?.description != book_desc.value
        || book.value?.price != Number(book_price.value)
        || book.value?.published_at.getTime() != book_date.value.getTime()
})
const is_edit_author = computed(()=>{
    return book_author.value?.first_name != author_first_name.value
        || book_author.value?.last_name != author_last_name.value
        || book_author.value?.second_name != author_second_name.value
})

function loadEditor(){
    book_title.value = book.value?.title ?? ""
    book_desc.value = book.value?.description ?? ""
    book_price.value = book.value?.price.toString() ?? ""
    if(book.value?.published_at)
        book_date.value = new Date(book.value.published_at)
    else book_date.value = new Date()

    author_first_name.value = book_author.value?.first_name ?? ""
    author_last_name.value = book_author.value?.last_name ?? ""
    author_second_name.value = book_author.value?.second_name ?? ""

    img_url.value = book_img.value?.src ?? ""
}

function onBlurImgInput(){
    if(img_url_input.value.length){
        img_url.value = img_url_input.value
    }
}
watch(img_url_input,(nv,lv)=>{
    if(nv.length==0 && lv.length>0){
        img_url.value = ""
    }
})

function blobToBase64(blob: Blob) {
    return new Promise<string>((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result?.toString() ?? "")
        };
        reader.readAsDataURL(blob);
    });
}
function loadImage(){
    const input_file = document.createElement("input")
    input_file.type = "file"
    input_file.accept = "image/*"
    input_file.click()
    input_file.addEventListener("change",(a)=>{
        if(input_file.files && input_file.files.length > 0){
            const file = input_file.files[0]
            blobToBase64(file).then(url=>{
                img_url.value = url
            })
        }
    })
}

function submit(){
    store.editBook(book_id.value,{
        book: (is_edit_book.value)?{
            title: book_title.value,
            description: book_desc.value,
            price: Number(book_price.value),
            published_at: book_date.value
        }:undefined,
        cover: (is_edit_book.value)?{
            src: img_url.value
        }:undefined,
        author: (is_edit_book.value)?{
            first_name: author_first_name.value,
            last_name: author_last_name.value,
            second_name: author_second_name.value
        }:undefined
    }).then(()=>router.push({name:"Home"}))
}
function cancel(){
    router.push({name:"Home"})
}

onMounted(()=>{
    loadEditor()
})
</script>

<style lang="scss" scoped>
.page-book-create{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 20px;
}
.book__cover{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    img {
        width: 300px;
    }
}
.img__inputs{
    display: flex;
    gap: 10px;
}
.book__inputs{
    max-width: 300px;
}
.book__info{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.book__author{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.book__buttons{
    display: flex;
    justify-content: space-between;
}
</style>