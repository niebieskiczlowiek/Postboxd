import { verifyToken } from "@/lib/auth";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
    matcher: [
        '/api/users/me',
        '/api/auth/logout',
        '/api/users/:path*',

        '/u/me'
    ]
}

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("auth-token")?.value;
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");

    if (!token || !(await verifyToken(token))) {
        if (isApiRoute) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        } else {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}