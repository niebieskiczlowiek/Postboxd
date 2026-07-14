import { Star } from "lucide-react"
import { cn } from "@/lib/utils/styles"
import { useState } from "react"

interface StarRatingInputProps {
  maxStars?: number,
  callback: (rating: number) => void,
  size?: "sm" | "md" | "lg"
}

export const StarRatingInput = ({ maxStars = 5, callback, size = "md" }: StarRatingInputProps) => {
    const [rating, setRating] = useState<number>(0);
  
    return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
            onClick={() => {
                setRating(i+1);
                callback(i+1);
            }}
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
