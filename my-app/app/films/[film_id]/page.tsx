// "use client";


import Link from "next/link"
import { notFound } from "next/navigation"
import { StarRating } from "@/components/star-rating"
import { Heart, Eye, Clock, List, MessageSquare, Share2 } from "lucide-react"
import FilmCarousel from "@/components/film-carousel"
import { FilmService } from "@/services/film"
import { Film, FilmSet } from "@/types/film";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import ToolTipBtn from "@/components/tool-tip-btn"
import RatingChart from "@/components/rating-chart"
import { ReviewService } from "@/services/review"
import ReviewsBlock from "@/components/reviews-block"

const reviews = [
  {
    user: "filmfan42",
    rating: 4.5,
    text: "An absolutely breathtaking sequel that expands on the first film in every way. The sound design alone is worth the ticket price. Villeneuve has cemented himself as one of the great visual storytellers of our time.",
    date: "Feb 8, 2026",
    likes: 234,
  },
  {
    user: "cinemascope",
    rating: 5,
    text: "A masterpiece of modern science fiction. The way it balances spectacle with intimate character work is remarkable. Chalamet has truly come into his own.",
    date: "Feb 6, 2026",
    likes: 189,
  },
  {
    user: "reel_talk",
    rating: 4,
    text: "Visually stunning but I wish we got more time with some of the supporting characters. Still one of the best blockbusters in recent memory.",
    date: "Feb 5, 2026",
    likes: 98,
  },
]

const FilmPage = async ({
  params,
}: { params: Promise<{ film_id: string }> }) => {
  const { film_id } = await params;

  const [ filmDetails, similiarFilms, filmReviews ] = await Promise.all([
    FilmService.getDetails(Number(film_id)).catch(() => null),
    FilmService.getSimilar(Number(film_id)).catch(() => null),
    ReviewService.getByFilm(Number(film_id)).catch(() => null)
  ]);

  if (!filmDetails || !similiarFilms || !filmReviews) {
    notFound();
  }

  console.log(filmReviews)  

  return (
    <div>
      {/* Film backdrop */}
      <div className="relative h-56 w-full overflow-hidden md:h-120">
        <Image
          src={`${process.env.TMDB_IMG_BASE_URL}${filmDetails.backdrop_path}`}
          alt={filmDetails.title}
          fill
          className="object-cover object-top -z-10"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Film info */}
      <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-4 md:-mt-40">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Poster */}
          <div className="animate-fade-in shrink-0">
            <div
              className="relative overflow-hidden h-56 w-36 rounded border border-border/50 shadow-lg md:h-72 md:w-48"
            >
              <Image
                src={`${process.env.TMDB_IMG_BASE_URL}${filmDetails.poster_path}`}
                alt={filmDetails.title}
                fill
                className="object-cover z-10"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <h1 className="animate-fade-in text-2xl font-bold text-[hsl(0,0%,95%)] md:text-4xl">
                {filmDetails.title}
              </h1>
              <p className="text-muted-foreground">{filmDetails.tagline}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span >{filmDetails.release_date.getFullYear()}</span>
                <span className="text-border">|</span>
                {/* <span>Directed by</span>
                <Link
                  href="/films"
                  className="font-semibold text-[hsl(0,0%,95%)] transition-colors hover:text-primary"
                >
                  
                </Link>
                <span className="text-border">|</span> */}
                <span>{filmDetails.runtime} mins</span>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-foreground">
                  {filmDetails.overview}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {["Science Fiction", "Adventure", "Drama"].map((genre) => (
                <span
                  key={genre}
                  className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <ToolTipBtn content="Log or Review">
                <button
                  type="button"
                  className="group flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-[hsl(145,100%,38%)]"
                >
                  <Eye className="h-4 w-4" />
                  <span>Log or Review</span>
                </button>
              </ToolTipBtn>
              <ToolTipBtn content="Like">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-muted-foreground"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Like</span>
                  </button>
              </ToolTipBtn>
              <ToolTipBtn content="Add to watchlist">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-muted-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span>Watchlist</span>
                </button>
              </ToolTipBtn>
              <ToolTipBtn content="Add to List">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-muted-foreground"
                >
                  <List className="h-4 w-4" />
                  <span>Add to List</span>
                </button>
              </ToolTipBtn>
              <ToolTipBtn content="Share">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-muted-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </ToolTipBtn>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <RatingChart rating={filmDetails.vote_average} />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4 text-sm">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">145K</span>
            <span className="text-xs text-muted-foreground">Watches</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">45K</span>
            <span className="text-xs text-muted-foreground">Lists</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">89K</span>
            <span className="text-xs text-muted-foreground">Likes</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">12K</span>
            <span className="text-xs text-muted-foreground">Reviews</span>
          </div>
        </div>

        {/* Cast */}
        <section className="mt-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Cast
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Timothee Chalamet",
              "Zendaya",
              "Rebecca Ferguson",
              "Josh Brolin",
              "Austin Butler",
              "Florence Pugh",
              "Dave Bautista",
              "Christopher Walken",
              "Javier Bardem",
              "Stellan Skarsgard",
            ].map((name) => (
              <Link
                key={name}
                href="/members"
                className="group rounded-sm bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted hover:text-[hsl(0,0%,95%)]"
              >
                {name}
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-10">
          <ReviewsBlock 
            title="Popular reviews"
            reviews={filmReviews}
            film_id={film_id}
          />
        </section>

        {/* Similar films */}
        <section className="mt-10 pb-10">
          <FilmCarousel 
            title="Similiar films"
            films={similiarFilms.results}
          />
        </section>
      </div>
    </div>
  )
}

export default FilmPage;