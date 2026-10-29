import { verifyToken } from "@/lib/auth";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/* 
add paths, which need to be affected by proxy, to config.matcher
*/ 
export const config = {
    matcher: [
        '/api/users/me',
        '/api/auth/logout',
        '/u/me',
        '/sign-in',
        '/sign-up',
    ]
}

/* 
proxy adds a layer of protection between the client and API.
Add path security (such as token validation) here
*/
export const proxy = async (request: NextRequest) => {
    const token = request.cookies.get("auth-token")?.value;
    const { pathname } = request.nextUrl;

    const isApiRoute = pathname.startsWith("/api");
    const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

    if (token && isAuthPage) {
        const isValid = await verifyToken(token);
        if (isValid) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (!isAuthPage && (!token || !(await verifyToken(token)))) {
        if (isApiRoute) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        } else {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}