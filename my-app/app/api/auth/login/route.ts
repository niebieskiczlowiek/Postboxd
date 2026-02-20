import { prisma } from '@/lib/prisma';
import { compareHash, createToken } from '@/lib/auth';

import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const user = await prisma.user.findUnique({
            where: { username: username },
            select: {
                password: true,
                id: true,
                email: true,
            }
        })

        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { password: hashPwd, id, email } = user;
        const passwordsMatch = await compareHash(password, hashPwd);

        if (!passwordsMatch) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        
        const token = await createToken({ 
            id: id,
            email: email
        });

        const cookieStore = await cookies();
        cookieStore.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 2,
            path: "/",
        });
        
        return NextResponse.json({ message: "Logged in successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
