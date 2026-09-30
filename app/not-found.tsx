import "./globals.css";
import Link from "next/link"
import { Film, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Film reel icon */}
      <div className="mb-6 flex items-center justify-center rounded-full border border-border bg-card p-6">
        <Film className="h-12 w-12 text-muted-foreground" />
      </div>

      {/* 404 text */}
      <h1 className="text-6xl font-bold tracking-tight text-[hsl(0,0%,95%)]">
        404
      </h1>
      <h2 className="mt-2 text-xl font-bold text-[hsl(0,0%,95%)]">
        Film Not Found
      </h2>
      <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. It may have been
        moved, deleted, or perhaps it was never filmed in the first place.
      </p>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-[hsl(145,100%,38%)]"
        >
          <Home className="h-4 w-4" />
          <span>Go Home</span>
        </Link>
        <Link
          href="/films"
          className="flex items-center gap-1.5 rounded border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-muted-foreground"
        >
          <Search className="h-4 w-4" />
          <span>Browse Films</span>
        </Link>
      </div>
    </div>
  )
}
