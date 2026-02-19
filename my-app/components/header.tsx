"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils/styles"
import SignInDialog from "./sign-in-dialog"

const navLinks = [
    { label: "Films", href: "/films" },
    { label: "Lists", href: "/lists" },
    { label: "Members", href: "/members" },
    { label: "Journal", href: "/journal" },
]

export const Header = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen]= useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-[hsl(200,20%,7%)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                <span className="inline-block h-5 w-2.5 rounded-sm bg-primary" />
                <span className="inline-block h-5 w-2.5 rounded-sm bg-[hsl(195,80%,50%)]" />
                <span className="inline-block h-5 w-2.5 rounded-sm bg-accent" />
                </div>
                <span className="text-lg font-bold tracking-tight text-[hsl(0,0%,95%)]">
                Postboxd
                </span>
            </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "rounded px-3 py-1.5 text-sm font-semibold uppercase tracking-wider transition-colors",
                    pathname.startsWith(link.href)
                    ? "text-[hsl(0,0%,100%)]"
                    : "text-muted-foreground hover:text-[hsl(0,0%,95%)]"
                )}
                >
                {link.label}
                </Link>
            ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
            <button
                type="button"
                className="rounded p-1.5 text-muted-foreground transition-colors hover:text-[hsl(0,0%,95%)]"
                aria-label="Search films"
            >
                <Search className="h-4 w-4" />
            </button>
            <button
                type="button"
                className="hidden rounded p-1.5 text-muted-foreground transition-colors hover:text-[hsl(0,0%,95%)] md:block"
                aria-label="Notifications"
            >
                <Bell className="h-4 w-4" />
            </button>
            <Link
                href="/profile"
                className="hidden items-center gap-2 md:flex"
            >
                <div className="h-7 w-7 overflow-hidden rounded-full bg-secondary">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-muted-foreground">
                    U
                </div>
                </div>
            </Link>
            <SignInDialog />

            {/* Mobile menu button */}
            <button
                type="button"
                className="rounded p-1.5 text-muted-foreground transition-colors hover:text-[hsl(0,0%,95%)] md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
            >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
            <nav className="border-t border-border bg-[hsl(200,20%,7%)] px-4 py-3 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                    "rounded px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",
                    pathname.startsWith(link.href)
                        ? "bg-secondary text-[hsl(0,0%,100%)]"
                        : "text-muted-foreground hover:bg-secondary hover:text-[hsl(0,0%,95%)]"
                    )}
                >
                    {link.label}
                </Link>
                ))}
                <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="rounded px-3 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary hover:text-[hsl(0,0%,95%)]"
                    >
                    Profile
                </Link>
                <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-[hsl(145,100%,38%)]"
                    >
                    Sign In
                </Link>
            </div>
            </nav>
        )}
        </header>
    )
}