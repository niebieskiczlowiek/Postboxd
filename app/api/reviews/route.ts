import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);

        const {
            film_id,
            user_id,
            content,
            rating
        } = body;

        const newReview = await prisma.review.create({
            data: {
                user_id: user_id,
                film_id: film_id,
                content: content,
                rating: rating
            }
        });

        return NextResponse.json(newReview, {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}