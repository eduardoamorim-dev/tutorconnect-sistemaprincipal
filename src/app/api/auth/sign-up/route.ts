import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from 'bcryptjs';

const schema = z.object({
    name: z.string().min(1, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(8, "Informe a senha, mínimo 8 dígitos"),
    tipoconta: z.enum(["ALUNO", "TUTOR"]),
    escolaridade: z.enum(["ENSINOMEDIO", "GRADUACAO"]),
    curso: z.string(),
    scheduleUrl: z.string().nullable().optional(),
    disciplines: z.array(z.string()),
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

    const { name, email, password, tipoconta, escolaridade, curso, scheduleUrl, disciplines } = data;

    const emailAlreadyInUse = await prismaClient.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (emailAlreadyInUse) {
        return NextResponse.json(
            { error: "E-mail já cadastrado" },
            { status: 409 }
        )
    }

    const hashedPassword = await hash(password, 12);


        await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                tipoconta,
                escolaridade,
                curso,
                scheduleUrl,
                disciplines,
            },
        });

        return new NextResponse(null, { status: 204 });

    }

