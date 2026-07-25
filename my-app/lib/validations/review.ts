import { Review, TMDBReview, TMDBReviewSet } from "@/types/review";
import * as z from "zod";

// TMDB schemas

export const TMDBReviewSchemaParse = z.unknown().transform((data) => {
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

export type TMDBReviewValues = z.infer<typeof TMDBReviewSchemaParse>;

export const TMDBReviewSetSchemaParse = z.unknown().transform((data) => {
    const raw = data as TMDBReviewSet;

    return {
        ...raw,
        results: z.array(TMDBReviewSchemaParse).parse(raw.results)
    } as TMDBReviewSet;
});

// local API schemas

// Schema for Review Form
export const ReviewFormSchema = z.object({
    content: z.string().trim().optional(),
    rating: z.number().refine((value) => value >= 0 && value <= 5),
});

export type ReviewFormValues = z.infer<typeof ReviewFormSchema>;


export const ReviewSchema = ReviewFormSchema.extend({
    film_id: z.number(),
});

export type ReviewValues = z.infer<typeof ReviewSchema>;

export const ReviewSchemaParse = z.unknown().transform((data) => {
    const raw = data as Review

    return {
        ...raw,
        created_at: new Date(raw.created_at)
    }
});
