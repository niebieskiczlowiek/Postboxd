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
    created_at: string,
    updated_at: string,
    iso_639_1: string,
    media_id: number,
    media_title: string,
    media_type: string,
    url: string
}

export interface ReviewSet {
    id: number,
    page: number,
    results: Array<Omit<Review, "iso_639_1" | "media_id" | "media_title" | "media_type">>,
    total_pages: number,
    total_results: number
}