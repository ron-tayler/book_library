import {IDBPDatabase, openDB, DBSchema } from "idb"
import {Book} from "@/types/IndexDB/Book";
import {Author} from "@/types/IndexDB/Author";
import {Cover} from "@/types/IndexDB/Cover";

interface BookDB extends DBSchema{
    "books": { key: number, value: Book},
    "authors": { key: number, value: Author},
    "cover": { key: number, value: Cover},
}

const migrations:((db: IDBPDatabase<BookDB>)=>void)[] = [
    db => {
        db.createObjectStore("books", {
            autoIncrement: true
        })
        db.createObjectStore("authors",{
            keyPath: "book_id"
        })
        db.createObjectStore("cover",{
            keyPath: "book_id"
        })
    },
]

export const db = await openDB<BookDB>("BookLibrary",1,{
    upgrade(database, oldVersion, newVersion, transaction, event){
        newVersion = newVersion ?? 0
        let migrate_version = oldVersion
        while(migrate_version<newVersion){
            migrations[migrate_version](database)
            migrate_version++
        }
    }
})
