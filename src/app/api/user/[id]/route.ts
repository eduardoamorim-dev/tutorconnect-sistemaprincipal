import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Buscar usuário
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Usuário não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar usuário" },
            { status: 500 }
        );
    }
}

// Atualizar usuário
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const user = await prisma.user.update({
            where: {
                id: params.id,
            },
            data,
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar usuário" },
            { status: 500 }
        );
    }
}

// Deletar usuário
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.user.delete({
            where: {
                id: params.id,
            },
        });

        return NextResponse.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao deletar usuário" },
            { status: 500 }
        );
    }
}