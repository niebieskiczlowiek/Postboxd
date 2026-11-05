"use client";

import { usePathname } from "next/navigation";

const AuthLayoutHeader = () => {
  const pathname = usePathname();
  const isSignUp = pathname === "/sign-up";

  return (
    <div className="mb-6 text-center">
      <div className="mb-3 flex items-center justify-center gap-0.5">
        <span className="inline-block h-6 w-3 rounded-sm bg-primary" />
        <span className="inline-block h-6 w-3 rounded-sm bg-[hsl(195,80%,50%)]" />
        <span className="inline-block h-6 w-3 rounded-sm bg-accent" />
      </div>
      <h1 className="text-xl font-bold text-[hsl(0,0%,95%)]">
        {isSignUp ? "Create your account" : "Sign in to Postboxd"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {isSignUp ? "Join the film community" : "Welcome back, film lover"}
      </p>
    </div>
  );
}

export default AuthLayoutHeader;
