import { ReviewSet } from "@/types/review";
import Link from "next/link";
import { StarRating } from "./star-rating";
import { Heart, MessageSquare } from "lucide-react";

interface ReviewsBlockProps {
    title: string,
    reviews: ReviewSet,
    film_id: string
}

const ReviewsBlock = ({
    title,
    reviews,
    film_id
}: ReviewsBlockProps) => {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {title}
                </h2>
                <Link
                  href={`/films/${film_id}/reviews`}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  More
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {reviews.results.slice(0, 4).map((review) => (
                  <article
                    key={review.author}
                    className="@container group rounded border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-secondary" />
                      <span className="text-sm font-bold text-[hsl(0,0%,95%)]">
                        {review.author}
                      </span>
                      {/* ! ! ! */}
                      <StarRating rating={Number(review.author_details.rating)/2} size="sm" /> 
                      <span className="text-xs text-muted-foreground">
                        {/* ! ! ! */}
                        {review.created_at.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      {review.content}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      {/* <button type="button" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                        <Heart className="h-3 w-3" />
                        <span>{review.likes} likes</span>
                      </button> */}
                      <button type="button" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                        <MessageSquare className="h-3 w-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </article>
                ))}
            </div>
        </div>
    );
};

export default ReviewsBlock;