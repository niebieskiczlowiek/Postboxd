import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

import { NextResponse } from "next/server";

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

        const pwdHash = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                username,
                password: pwdHash, // name must match !!
                email        
            }
        });
        
        return NextResponse.json(newUser, {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
    } catch (error: any) {
        if (error.code == 'P2002') {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}


export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany({
            omit: {
                password: true
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}