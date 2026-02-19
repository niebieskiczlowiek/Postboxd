import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/styles";

interface FilmCardProps {
  title: string
  posterPath: string
  rating?: number
  film_id: number
  size?: "sm" | "md" | "lg"
}

export const FilmCard = ({
  title,
  posterPath,
  rating,
  film_id,
  size = "md",
}: FilmCardProps) => {
  return (
    <Link
      href={`/films/${film_id}`}
      className="group flex flex-col gap-1"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm border border-border/50 transition-all group-hover:border-primary/50 group-hover:shadow-lg",
          size === "sm" && "aspect-2/3 w-full",
          size === "md" && "aspect-2/3 w-full",
          size === "lg" && "aspect-2/3 w-full"
        )}
      >
        <div
          className="flex h-full w-full items-end p-2"
        >
          <Image 
            src={posterPath}
            alt={title}
            fill
            className="object-cover z-10"
            priority
          />
          <span className="text-xs font-bold text-[hsl(0,0%,100%)] opacity-0 transition-opacity group-hover:opacity-100 drop-shadow-md">
            {title}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[hsl(0,0%,0%)]/0 transition-all group-hover:bg-[hsl(0,0%,0%)]/30" />
      </div>
      {size !== "sm" && (
        <div className="flex flex-col">
          {rating && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`star-${title}-${i}`}
                  className={cn(
                    "h-3 w-3",
                    i < rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Link>
  )
}
