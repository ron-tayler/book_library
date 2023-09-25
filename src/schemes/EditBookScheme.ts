import {
    blob,
    date,
    Input,
    number,
    object, optional,
    Output,
    string,
    union,
    url
} from "valibot";

export const EditBookScheme = object({
    book: optional(object({
        title: string(),
        description: string(),
        price: number(),
        published_at: date(),
    })),
    author: optional(object({
        first_name: string(),
        last_name: string(),
        second_name: string(),
    })),
    cover: optional(object({
        src: string([url()])
    }))
})

export type EditBookSchemeInput = Input<typeof EditBookScheme>
export type EditBookSchemeOutput = Output<typeof EditBookScheme>
