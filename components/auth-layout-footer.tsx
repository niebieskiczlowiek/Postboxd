"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayoutFooter = () => {
    const pathname = usePathname();
    const isSignUp = pathname === "/sign-up";

    return (
        <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "New to Postboxd?"}{" "}
            <Link
                href={isSignUp ? "/sign-in" : "/sign-up"}
                    className="font-semibold text-primary transition-colors hover:text-[hsl(145,100%,50%)]"
                >
                {isSignUp ? "Sign in" : "Create an account"}
            </Link>
        </p>
    )
}

export default AuthLayoutFooter;