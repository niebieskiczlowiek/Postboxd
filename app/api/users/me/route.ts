import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const tokenData = await verifyToken(token!);
    if (!tokenData) return NextResponse.redirect(new URL('/sign-up', request.url));

    const { id, email } = tokenData;

    try {
        const userId = Number(id);
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            omit: { 
                password: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}