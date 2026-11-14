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
        // '/api/users:path*', // to do: whenever i include /api/users into the matcher, the app starts bugging with logging in after a redirect
        '/sign-in',
        '/sign-up'
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
    */
    const isProtectedApiRoute = protectedApiRoutes.some((route) => pathname.startsWith(route));
    if (isProtectedApiRoute && !isAuthenticated) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    /*
    Redirect unauthenticated users away from protected pages
    */
    const isProtectedPage = protectedPages.some((route) => pathname.startsWith(route));
    if (isProtectedPage && !isAuthenticated) return NextResponse.redirect(new URL('/sign-in', request.url));

    /* 
    Unauthenicated user on auth api routes
    */
   const isAuthOnlyApiRoute = authOnlyApiRoutes.includes(pathname)
   if (isAuthOnlyApiRoute && isAuthenticated) return NextResponse.redirect(new URL("/", request.url));


    return NextResponse.next();
}