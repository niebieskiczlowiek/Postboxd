import { Review, ReviewSet } from "@/types/review";
import { apiFetch } from "./client";

export const ReviewService = {
    getByFilm: (film_id: string) => apiFetch<ReviewSet>(`/movie/${film_id}/reviews`),
    getDetails: (id: string) => apiFetch<Review>(`/review/${id}`)
}