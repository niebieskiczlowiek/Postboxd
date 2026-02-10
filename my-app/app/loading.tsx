export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      {/* Animated film strip loader */}
      <div className="flex items-center gap-1">
        <div
          className="h-8 w-3 animate-pulse rounded-sm bg-primary"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="h-8 w-3 animate-pulse rounded-sm bg-[hsl(195,80%,50%)]"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-8 w-3 animate-pulse rounded-sm bg-accent"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Loading...</p>

      {/* Skeleton content */}
      <div className="mx-auto mt-10 w-full max-w-6xl px-4">
        {/* Skeleton poster grid */}
        <div className="mb-4 h-3 w-32 animate-pulse rounded bg-secondary" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-poster-${i}`}
              className="aspect-2/3 animate-pulse rounded-sm bg-secondary"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Skeleton review cards */}
        <div className="mt-8 mb-4 h-3 w-40 animate-pulse rounded bg-secondary" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`skeleton-review-${i}`}
              className="flex gap-3 rounded border border-border bg-card p-4"
            >
              <div className="hidden h-20 w-14 animate-pulse rounded-sm bg-secondary sm:block" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-48 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-full animate-pulse rounded bg-secondary" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
