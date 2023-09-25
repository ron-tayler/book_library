import {createRouter,createWebHistory} from "vue-router"
import PageHome from "@/pages/PageHome.vue";
import PageBookCreate from "@/pages/PageBookCreate.vue";
import PageBook from "@/pages/PageBook.vue";
import PageBookEdit from "@/pages/PageBookEdit.vue";
import Page404 from "@/pages/Page404.vue";
import {useBooksStore} from "@/store/books";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Home",
            path: "/",
            component: PageHome,
        },{
            name: "CreateBook",
            path: "/book/create",
            component: PageBookCreate,
        },{
            name: "Book",
            path: "/book/:id",
            component: PageBook,
            async beforeEnter(to, from, next){
                const id = Number(to.params.id)
                const store = useBooksStore()
                await store.load_data()
                const book = store.books.get(id)
                if(!book) return next("/not_found")
                return next()
            },
            props:{
                is_edit: false
            }
        },{
            name: "EditBook",
            path: "/book/:id/edit",
            component: PageBookEdit,
            async beforeEnter(to, from, next){
                const id = Number(to.params.id)
                const store = useBooksStore()
                await store.load_data()
                const book = store.books.get(id)
                if(!book) return next("/not_found")
                return next()
            },
            props:{
                is_edit: true
            }
        },{
            name: "NotFound",
            path: "/not_found",
            component: Page404,
        },{
            path: "/:path(.*)", redirect: "/not_found"
        }
    ]
})