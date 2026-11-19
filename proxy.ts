import { verifyToken } from "@/lib/auth";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/* 
Add paths which need to be affected by proxy to config.matcher.
Protected routes essentially.
*/ 
export const config = {
    matcher: [
        // '/api/:path*',
        '/api/users/me',
        '/api/auth/:path*',
        '/api/users:path*',
        '/sign-in',
        '/sign-up',
    ]
}

const protectedPages: string[] = [];
const protectedApiRoutes = ['/api/users', '/api/reviews'];

const authOnlyPages = ['/sign-in', '/sign-up'];
const authOnlyApiRoutes = ['/api/auth/logout', '/api/auth/login'];

/* 
proxy adds a layer of protection between the client and API.
Add path security (such as token validation) here
*/
export const proxy = async (request: NextRequest) => {
    let isAuthenticated = false;
    const token = request.cookies.get("auth-token")?.value;
    if (token) {
        const isTokenValid = await verifyToken(token);
        if (isTokenValid) isAuthenticated = true;
    }

    const { pathname } = request.nextUrl;
    
    /*
    Redirect already authenticated users away from auth pages
    */
    const isAuthOnlyPage = authOnlyPages.includes(pathname)
    if (isAuthenticated && isAuthOnlyPage) return NextResponse.redirect(new URL("/", request.url));

    /*
    Redirect unauthenticated users away from protected API routes

    Bug: when adding this, the redirecting away already authenticated users mechanic breaks. 
    When the user visits the page initially, he is not logged in and can access the auth pages.
    After logging in, he gets redirected away from auth pages, but after trying to access an auth page when authenticated once, it breaks.
    The user gets redirected back to home and is seemingly logged out: the user icon turns into the Sign In button, and if the user tries
    to write a review, they are told to log in. However, they are still redirected away from auth pages, and checking the dev tools, the
    auth-cookie is still there. Refresh doesn't fix.
    
    Proxy.ts sees cookie, but pages don't ?

    auth-provider essentially calls the /api/users/me API endpoint. We need to provide the auth-token to do that. 
    
    I've made the server-side layout.tsx retrieve the auth-cookie and pass it to the AuthProvider.
    I've modified the AuthService.getSession function to take a token parameter, and include the token in 
    the request as Bearer. Still doesn't work. Token is seemingly passed into the AuthService.getSession function
    but the bug still happens. Maybe pass it in the request differently? 
    */
    const isProtectedApiRoute = protectedApiRoutes.some((route) => pathname.startsWith(route));
    if (isProtectedApiRoute && !isAuthenticated) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    /*
    Redirect unauthenticated users away from protected pages
    */
    const isProtectedPage = protectedPages.some((route) => pathname.startsWith(route));
    if (isProtectedPage && !isAuthenticated) return NextResponse.redirect(new URL('/sign-in', request.url));

    /* 
    Redirect already authenticated users away from auth API routes.

    This includes logout (is that good?)
    */
   const isAuthOnlyApiRoute = authOnlyApiRoutes.includes(pathname)
   if (isAuthOnlyApiRoute && isAuthenticated) return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.next();
}