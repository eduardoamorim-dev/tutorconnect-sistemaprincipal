import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
        const response = new NextResponse(null, {status: 204})

        response.cookies.delete('acessToken',);

        return response;
    }

