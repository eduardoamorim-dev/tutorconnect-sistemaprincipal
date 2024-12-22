import { prismaClient } from "@/lib/prismaClient";
import { compare } from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { env } from "@/config/env";

const schema = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(8, "Informe a senha, mínimo 8 dígitos"),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    const { success, error, data } = schema.safeParse(body);

    if (!success) {
        return NextResponse.json(
            { errors: error.issues },
            { status: 400 }
        );
    }

    const { email, password } = data;

    const user = await prismaClient.user.findUnique({
        where: { email },
        select: { id: true, email: true, password: true },
    });

    if (!user) {
        return NextResponse.json(
            { error: "Credenciais Inválidas" },
            { status: 401 }
        )
    }

    const isPasswordValid = await compare(password, user.password);

    if(!isPasswordValid) {
        return NextResponse.json(
            { error: "Credenciais Inválidas" },
            { status: 401 }
        )
    }

    const acessToken = sign(
        {sub: user.id },
        env.jwtSecret,
        { expiresIn: '7d' }
    );


        const response = new NextResponse(null, {status: 204})

        response.cookies.set(
            'acessToken',
            acessToken,
{
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        }
    );

        return response;
    }

