import { DataSet } from "./dataSet"

export interface Review {
    id: string,
    author: string,
    author_details: {
        name: string,
        username: string,
        avatar_path: string,
        rating: string
    }
    content: string,
    created_at: Date,
    updated_at: Date,
    iso_639_1: string,
    media_id: number,
    media_title: string,
    media_type: string,
    url: string
}

export type ReviewSet = DataSet & { 
    results: Array<Omit<Review, "iso_639_1" | "media_id" | "media_title" | "media_type">>,
}
