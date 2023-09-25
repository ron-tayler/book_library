import {
    blob,
    date,
    Input,
    number,
    object,
    Output,
    string,
    union,
    url
} from "valibot";

export const CreateBookScheme = object({
    book: object({
        title: string(),
        description: string(),
        price: number(),
        published_at: date(),
    }),
    author: object({
        first_name: string(),
        last_name: string(),
        second_name: string(),
    }),
    cover: object({
        src: string([url()])
    })
})

export type CreateBookSchemeInput = Input<typeof CreateBookScheme>
export type CreateBookSchemeOutput = Output<typeof CreateBookScheme>
