import { Review, TMDBReview, TMDBReviewSet } from "@/types/review";
import * as z from "zod";

// TMDB schemas

export const TMDBReviewSchemaTransform = z.unknown().transform((data) => {
    const raw = data as TMDBReview;

    const scaledRating = raw.author_details.rating
        ? Number((Number(raw.author_details.rating))/2).toFixed(1)
        : 0;

    return {
        ...raw,
        author_details: {
            ...raw.author_details,
            rating: scaledRating
        },
        created_at: new Date(raw.created_at),
        updated_at: new Date(raw.updated_at)
    } as TMDBReview;
});

export type TMDBReviewValues = z.infer<typeof TMDBReviewSchemaTransform>;

export const TMDBReviewSetSchema = z.unknown().transform((data) => {
    const raw = data as TMDBReviewSet;

    return {
        ...raw,
        results: z.array(TMDBReviewSchemaTransform).parse(raw.results)
    } as TMDBReviewSet;
});

// local API schemas

export const PostReviewSchema = z.object({
    // user_id: z.number(),
    film_id: z.number(),
    content: z.string().trim().optional(),
    rating: z.number().refine((value) => value >= 0 && value <= 5),
    // created_at: z.date()
})

export const ReviewSchema = z.unknown().transform((data) => {
    const raw = data as Review

    return {
        ...raw,
        // user_id: 1,
        created_at: new Date(raw.created_at)
    }
});

export type postReviewValues = z.infer<typeof PostReviewSchema>;