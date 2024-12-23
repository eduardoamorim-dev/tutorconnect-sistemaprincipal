import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tutors = await prisma.user.findMany({
            where: {
                tipoconta: "TUTOR"
            }
        });
        
        return NextResponse.json(tutors);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch tutors" },
            { status: 500 }
        );
    }
}