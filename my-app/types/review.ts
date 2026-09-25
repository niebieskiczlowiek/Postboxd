import { DataSet } from "./dataSet"

export interface TMDBReview {
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

export type TMDBReviewSet = DataSet & { 
    results: Array<Omit<TMDBReview, "iso_639_1" | "media_id" | "media_title" | "media_type">>,
}

export type Rating = {
    rating: number,
    count: number
}

export interface Review {
    id: number
    user_id: number
    film_id: number,
    content: string,
    rating: number,
    created_at: Date
}