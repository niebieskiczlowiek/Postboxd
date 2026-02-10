import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const users = [
        { id: 1, name: "user_1" },
        { id: 2, name: "user_2" }
    ]

    return NextResponse.json(users, {
        status: 200
    });
}