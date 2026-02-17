import { Film } from "@/types/film"
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious 
} from "./ui/carousel"
import { FilmCard } from "./film-card"
import Link from "next/link";

interface FilmCarouselProps {
    title: string,
    films: Film[],
    basis?: 5
}

const FilmCarousel = ({
    title,
    films,
    basis
}: FilmCarouselProps) => {
    return (
        <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {title}
              </h2>
              <Link
                href="/films"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                More
              </Link>
            </div>
            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                className="w-full"
            >
                <CarouselContent>
                    {films.map((film, index) => (
                        <CarouselItem key={index} className={`basis-1/5 lg:basis-1/${basis}`}>
                            <FilmCard
                                key={film.title}
                                title={film.title}
                                posterPath={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                                rating={film.vote_average/2}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}

export default FilmCarousel;