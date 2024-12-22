"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const schema = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(8, "Informe a senha, mínimo 8 dígitos"),
});

const Form = FormProvider;
type FormData = z.infer<typeof schema>;

export default function SignIn() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = form.handleSubmit(async (formData) => {
        try {
            setIsLoading(true);

            await axios.post("/api/auth/sign-in", formData);

            router.push("/");
            toast("Login efetuado com sucesso", {
                description: "Agora você já pode utilizar o Tutor Connect",
            });
        } catch {
            toast.error("Credenciais Inválidas!");
            setIsLoading(false);
        }
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate p-4">
            <p className="text-xl text-violet-700 mb-5">Tutor Connect</p>
            <h1 className="text-3xl font-bold mb-10">Acesse sua conta</h1>

            <Form {...form}>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full max-w-md"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    E-mail
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="tutorconnect@gmail.com"
                                        {...field}
                                        autoComplete="email"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Senha
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...field}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <div className="flex justify-end mb-5">
                        <Link
                            href="#"
                            className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Esqueci minha senha
                        </Link>
                    </div> */}

                    <Button
                        type="submit"
                        className="bg-violet-700 text-white text-lg font-semibold py-3 rounded-2xl hover:bg-violet-500 transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </Form>

            <div className="mt-4 text-center text-sm">
                Novo por aqui?{" "}
                <Link
                    href="/sign-up"
                    className="text-violet-700 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Crie uma conta
                </Link>
            </div>
        </div>
    );
}
