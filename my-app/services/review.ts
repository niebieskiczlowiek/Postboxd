import { Review, TMDBReview, TMDBReviewSet } from "@/types/review";
import { PostReviewSchema, ReviewSchema, postReviewValues, TMDBReviewSchemaTransform, TMDBReviewSetSchema } from "@/lib/validations/review";
import { localApi, tmdbApi } from "./client";
import { getServerOrigin } from "@/lib/get-server-origin";

const serverOrigin = getServerOrigin();

export const ReviewService = {
    getByFilm: (film_id: number, page: number = 1) => tmdbApi<TMDBReviewSet>(`/movie/${film_id}/reviews?page=${page}`, TMDBReviewSetSchema),
    getDetails: (id: string) => tmdbApi<TMDBReview>(`/review/${id}`),
    postReview: (data: postReviewValues) => {
        return localApi<Review>(`${serverOrigin.url}/api/reviews`, ReviewSchema, { 
            method: "POST",
            body: JSON.stringify(data)
        });
    }, // todo
}