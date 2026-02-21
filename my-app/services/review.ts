import { Review, ReviewSet } from "@/types/review";
import { reviewSchema, reviewSetSchema } from "@/lib/validations/review";
import { tmdbApi } from "./client";

export const ReviewService = {
    getByFilm: (film_id: number, page: number = 1) => tmdbApi<ReviewSet>(`/movie/${film_id}/reviews?page=${page}`, reviewSetSchema),
    getDetails: (id: string) => tmdbApi<Review>(`/review/${id}`)
}