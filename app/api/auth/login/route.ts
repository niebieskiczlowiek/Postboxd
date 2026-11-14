import { prisma } from '@/lib/prisma';
import { compareHash, setSession } from '@/lib/auth';

import { NextResponse } from "next/server";

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
        
        await setSession(id, email);
        
        return NextResponse.json({ message: "Logged in successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
