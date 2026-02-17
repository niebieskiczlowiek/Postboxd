import Link from "next/link"
import { StarRating } from "@/components/star-rating"
import { Eye, Heart, List, MessageSquare } from "lucide-react"
import { FilmService } from "@/services/film"
import FilmCarousel from "@/components/film-carousel"
import ActivityItem from "@/components/activity-item"


const recentReviews = [
  {
    user: "filmfan42",
    film: "Dune: Part Two",
    rating: 4.5,
    text: "An absolutely breathtaking sequel that expands on the first film in every way. The sound design alone is worth the ticket price.",
    date: "2 hours ago",
    posterColor: "hsl(30,40%,30%)",
  },
  {
    user: "cinemascope",
    film: "Past Lives",
    rating: 5,
    text: "One of the most moving films I've ever seen. Celine Song captures the ache of connection and distance with such tenderness.",
    date: "5 hours ago",
    posterColor: "hsl(210,30%,35%)",
  },
  {
    user: "reel_talk",
    film: "The Holdovers",
    rating: 4,
    text: "Paul Giamatti delivers a career-best performance. A warm, funny, deeply human film about finding connection in unexpected places.",
    date: "1 day ago",
    posterColor: "hsl(20,35%,28%)",
  },
]

const recentActivity = [
  { user: "alex_m", action: "watched", film: "Oppenheimer", rating: 4 },
  { user: "sarah_k", action: "added to watchlist", film: "Poor Things", rating: undefined },
  { user: "mike_j", action: "liked review of", film: "Past Lives", rating: undefined },
  { user: "cinema_dan", action: "watched", film: "Killers of the Flower Moon", rating: 3 },
]

const HomePage = async () => {
    const [popularFilms] = await Promise.all([
        FilmService.getPopular()
    ])

    console.log(popularFilms)

    return (
      <div>
        <section className="relative overflow-hidden border-b border-border bg-[hsl(200,18%,8%)]">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:py-24">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-[hsl(0,0%,95%)] md:text-5xl">
              Track films you&apos;ve watched.
            </h1>
            <p className="mt-3 max-w-md text-pretty text-base text-muted-foreground md:text-lg">
              Save those you want to see. Tell your friends what&apos;s good.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/sign-up"
                className="rounded bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-[hsl(145,100%,38%)]"
              >
                Get Started — It&apos;s Free
              </Link>
              <Link
                href="/films"
                className="rounded border border-border px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-muted-foreground"
              >
                Browse Films
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>1.2M films logged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                <span>890K likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <List className="h-4 w-4" />
                <span>45K lists</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10">
          <FilmCarousel
            title={"Popular this week"}
            films={popularFilms.results}
          />
        </section>

        {/* Recent Reviews + Activity */}
        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Reviews */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  New From Friends
                </h2>
                <Link
                  href="/activity"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  More
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {recentReviews.map((review) => (
                  <article
                    key={review.film}
                    className="flex gap-3 rounded border border-border bg-card p-4 transition-colors hover:border-muted-foreground/30"
                  >
                    <div
                      className="hidden h-24 w-16 shrink-0 rounded-sm sm:block"
                      style={{ backgroundColor: review.posterColor }}
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-secondary" />
                        <span className="text-sm font-bold text-[hsl(0,0%,95%)]">
                          {review.user}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <Link
                        href="/films/1"
                        className="text-base font-bold text-[hsl(0,0%,95%)] transition-colors hover:text-primary"
                      >
                        {review.film}
                      </Link>
                      <StarRating rating={review.rating} size="sm" />
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {review.text}
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <button type="button" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                          <Heart className="h-3 w-3" />
                          <span>Like</span>
                        </button>
                        <button type="button" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                          <MessageSquare className="h-3 w-3" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Activity sidebar */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Friend Activity
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {recentActivity.map((item, index) => (
                    <ActivityItem
                      key={`${item.user}-${index}`}
                      user={item.user}
                      action={item.action}
                      film={item.film}
                      rating={item.rating}
                    />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}

export default HomePage;