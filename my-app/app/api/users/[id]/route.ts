import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
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