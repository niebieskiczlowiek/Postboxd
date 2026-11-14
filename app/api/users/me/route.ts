import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const token = await getSession();

    if (!token) return NextResponse.redirect(new URL('/sign-up', request.url));
    
    const { id } = token;

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