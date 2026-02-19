import { Review, ReviewSet } from "@/types/review";
import { reviewSchema, reviewSetSchema } from "@/lib/validations/review";
import { apiFetch } from "./client";

export const ReviewService = {
    getByFilm: (film_id: number, page: number = 1) => apiFetch<ReviewSet>(`/movie/${film_id}/reviews?page=${page}`, reviewSetSchema),
    getDetails: (id: string) => apiFetch<Review>(`/review/${id}`)
}