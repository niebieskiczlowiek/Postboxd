import { Star } from "lucide-react"
import { cn } from "@/lib/utils/styles"

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: "sm" | "md" | "lg"
}

export const StarRating = ({ rating, maxStars = 5, size = "md" }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={`rating-star-${i}`}
          className={cn(
            size === "sm" && "h-3 w-3",
            size === "md" && "h-4 w-4",
            size === "lg" && "h-5 w-5",
            i < Math.floor(rating)
              ? "fill-primary text-primary"
              : i < rating
                ? "fill-primary/50 text-primary"
                : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}
