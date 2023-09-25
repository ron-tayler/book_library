import {defineStore} from "pinia";
import {Book} from "@/types/Store/Book";
import {Author} from "@/types/Store/Author";
import {Cover} from "@/types/Store/Cover";
import {CreateBookScheme,CreateBookSchemeInput} from "@/schemes/CreateBookScheme";
import {EditBookSchemeInput} from "@/schemes/EditBookScheme";
import {db} from "@/lib/IndexDB";
import {parse} from "valibot";

export const useBooksStore = defineStore("Books",{
    state:()=>({
        books: new Map() as Map<number,Book>,
        authors: new Map() as Map<number,Author>,
        covers: new Map() as Map<number,Cover>,
    }),
    getters:{},
    actions:{
        async load_data(){
            const keys = await db.getAllKeys("books")
            const p_arr = keys.map(key=>{
                const p1 = db.get("books", key).then(book=>{
                    if(!book) return;
                    this.books.set(key, Object.assign({id: key}, book))
                })
                const p2 = db.get("authors",key).then(author=>{
                    if(!author) return;
                    this.authors.set(key,author)
                })
                const p3 = db.get("cover",key).then(cover=>{
                    if(!cover) return;
                    this.covers.set(key,cover)
                })
                return Promise.all([p1,p2,p3])
            })
            return Promise.all(p_arr)
        },
        addBook(options: CreateBookSchemeInput){
            const res = parse(CreateBookScheme,options)
            return db.add("books",res.book)
                .then(book_id=>{
                    const p1 = db.add(
                        "authors",
                        Object.assign({book_id},res.author)
                    )
                    const p2 = db.add(
                        "cover",
                        Object.assign({book_id},res.cover)
                    )
                    return Promise.all([p1,p2])
                })
                .then(()=>this.load_data())
        },
        editBook(id: number, options: EditBookSchemeInput){
            const p_arr: Promise<unknown>[] = []
            if(options.book) p_arr.push(db.put("books",options.book,id))
            if(options.author) p_arr.push(db.put(
                "authors", Object.assign({book_id:id},options.author)
            ))
            if(options.cover) p_arr.push(db.put(
                "cover", Object.assign({book_id:id},options.cover)
            ))
            return Promise.all(p_arr).then(()=>this.load_data())
        },
        deleteBook(id: number){
            const p1 = db.delete("books",id)
            const p2 = db.delete("authors",id)
            const p3 = db.delete("cover",id)

            return Promise.all([p1,p2,p3])
        }
    }
})