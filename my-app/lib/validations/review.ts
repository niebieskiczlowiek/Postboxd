import { Review, ReviewSet } from "@/types/review";
import * as z from "zod";

export const reviewSchema = z.unknown().transform((data) => {
    const raw = data as Review;

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
    } as Review;
})

export const reviewSetSchema = z.unknown().transform((data) => {
    const raw = data as ReviewSet;

    return {
        ...raw,
        results: z.array(reviewSchema).parse(raw.results)
    } as ReviewSet;
});