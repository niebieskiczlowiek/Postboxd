import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-[hsl(200,20%,7%)]">
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                About
                </h3>
                <ul className="flex flex-col gap-2">
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    About Postboxd
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    News
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Apps
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Year in Review
                    </Link>
                </li>
                </ul>
            </div>
            <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Explore
                </h3>
                <ul className="flex flex-col gap-2">
                <li>
                    <Link href="/films" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Films
                    </Link>
                </li>
                <li>
                    <Link href="/lists" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Lists
                    </Link>
                </li>
                <li>
                    <Link href="/members" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Members
                    </Link>
                </li>
                <li>
                    <Link href="/journal" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Journal
                    </Link>
                </li>
                </ul>
            </div>
            <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Account
                </h3>
                <ul className="flex flex-col gap-2">
                <li>
                    <Link href="/sign-in" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Sign In
                    </Link>
                </li>
                <li>
                    <Link href="/sign-up" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Create Account
                    </Link>
                </li>
                <li>
                    <Link href="/profile" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Profile
                    </Link>
                </li>
                <li>
                    <Link href="/profile/watchlist" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Watchlist
                    </Link>
                </li>
                </ul>
            </div>
            <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Community
                </h3>
                <ul className="flex flex-col gap-2">
                <li>
                    <Link href="/activity" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Activity
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Help
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    Contact
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-sm text-foreground transition-colors hover:text-[hsl(0,0%,95%)]">
                    API
                    </Link>
                </li>
                </ul>
            </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
            <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                <span className="inline-block h-4 w-2 rounded-sm bg-primary" />
                <span className="inline-block h-4 w-2 rounded-sm bg-[hsl(195,80%,50%)]" />
                <span className="inline-block h-4 w-2 rounded-sm bg-accent" />
                </div>
                <span className="text-sm font-bold tracking-tight text-[hsl(0,0%,95%)]">
                Postboxd
                </span>
            </div>
            <p className="text-xs text-muted-foreground">
                Film data from TMDb. Postboxd is not endorsed or certified by TMDb.
            </p>
            </div>
        </div>
        </footer>
    )
}