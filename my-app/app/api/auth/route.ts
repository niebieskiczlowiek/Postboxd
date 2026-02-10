import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            first_name,
            last_name,
            username,
            password, 
            email
        } = body;

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                username,
                password,
                email        
            }
        });
        
        return NextResponse.json(newUser, {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
    } catch (error: any) {
        console.error("❌ PRISMA ERROR TYPE:", error.constructor.name);
        console.error("❌ ERROR MESSAGE:", error.message);

        if (error.code == 'P2002') {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}