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
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const schema = z.object({
    name: z.string().min(1, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(8, "Informe a senha, mínimo 8 dígitos"),
    escolaridade: z.enum(["ENSINOMEDIO", "GRADUACAO"], {
        errorMap: () => ({ message: "Selecione seu nível escolar" }),
    }),
    tipoconta: z.enum(["ALUNO", "TUTOR"], {
        errorMap: () => ({ message: "Selecione o tipo da sua conta" }),
    }),
    curso: z.string().min(1, "Selecione um curso"),
    scheduleUrl: z.string().refine((val) => {
        if (!val) return true;
        return val.trim().length > 0;
    }, "Username é obrigatório"),
    disciplines: z.tuple([
        z.string().min(1, "Informe a primeira disciplina"),
        z.string().min(1, "Informe a segunda disciplina"),
        z.string().min(1, "Informe a terceira disciplina"),
    ]),
});

const Form = FormProvider;
type FormData = z.infer<typeof schema>;

export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [showUsernameField, setShowUsernameField] = useState(false);

    const [cursoSelecionado, setCursoSelecionado] = useState<
        "ENSINOMEDIO" | "GRADUACAO" | ""
    >("");

    const [accountSelecionado, setAccount] = useState<"ALUNO" | "TUTOR" | "">(
        ""
    );
    const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            escolaridade: "GRADUACAO",
            tipoconta: "ALUNO",
            curso: "",
            scheduleUrl: "",
            disciplines: ["", "", ""],
        },
    });

    const handleSubmit = form.handleSubmit(async (formData) => {
        try {
            setIsLoading(true);

            await axios.post("/api/auth/sign-up", formData);

            router.push("/sign-in");
            toast("Cadastro realizado com sucesso!", {
                description: "Agora você já pode fazer login",
            });
        } catch {
            toast.error("Erro ao cadastrar, tente novamente!");
            setIsLoading(false);
        }
    });

    const handleUsernameConfirmation = () => {
        if (username.trim()) {
            const finalLink = `http://localhost:3000/schedule/${username}`;
            form.setValue("scheduleUrl", finalLink);
            setIsUsernameConfirmed(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate p-4">
            <p className="text-xl text-violet-700 mb-5">Tutor Connect</p>
            <h1 className="text-3xl font-bold mb-2">Crie sua conta</h1>
            <div className="text-center text-sm">
                Já possui uma conta?{" "}
                <Link
                    href="/sign-in"
                    className="text-violet-700 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white "
                >
                    Fazer login
                </Link>
            </div>

            <Form {...form}>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full max-w-md mt-10"
                >
                    <Separator className="mb-2" />

                    <p className="font-bold">Você está cursando</p>
                    <FormField
                        control={form.control}
                        name="escolaridade"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setCursoSelecionado(
                                                value as
                                                    | "ENSINOMEDIO"
                                                    | "GRADUACAO"
                                            );
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex items-center space-x-1">
                                                <RadioGroupItem
                                                    value="ENSINOMEDIO"
                                                    id="r1"
                                                />
                                                <label
                                                    htmlFor="r1"
                                                    className="ml-2"
                                                >
                                                    Ensino Médio
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-1 ml-10">
                                                <RadioGroupItem
                                                    value="GRADUACAO"
                                                    id="r2"
                                                />
                                                <label
                                                    htmlFor="r2"
                                                    className="ml-2"
                                                >
                                                    Graduação
                                                </label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="curso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">
                                        Escolha seu curso
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) =>
                                                field.onChange(value)
                                            }
                                        >
                                            <SelectTrigger className="w-full mt-2">
                                                <SelectValue placeholder="Selecione seu curso" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cursoSelecionado ===
                                                "ENSINOMEDIO" ? (
                                                    <>
                                                        <SelectItem value="tecadministracao">
                                                            Técnico em
                                                            Administração
                                                        </SelectItem>
                                                        <SelectItem value="teccontabilidade">
                                                            Técnico em
                                                            Contabilidade
                                                        </SelectItem>
                                                        <SelectItem value="teceletronica">
                                                            Técnico em
                                                            Eletrônica
                                                        </SelectItem>
                                                        <SelectItem value="tecinformatica">
                                                            Técnico em
                                                            Informática
                                                        </SelectItem>
                                                    </>
                                                ) : (
                                                    <>
                                                        <SelectItem value="analiseedesenvolvimentodesistemas">
                                                            Análise e
                                                            Desenvolvimento de
                                                            Sistemas
                                                        </SelectItem>
                                                        <SelectItem value="gestaocomercial">
                                                            Gestão Comercial
                                                        </SelectItem>
                                                        <SelectItem value="engenhariaEletrica">
                                                            Engenharia Elétrica
                                                        </SelectItem>
                                                    </>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator className="mb-2" />

                    <p className="font-bold">Tipo de conta</p>
                    <FormField
                        control={form.control}
                        name="tipoconta"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setAccount(
                                                value as "ALUNO" | "TUTOR"
                                            );
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex items-center space-x-1">
                                                <RadioGroupItem
                                                    value="ALUNO"
                                                    id="r1"
                                                />
                                                <label
                                                    htmlFor="r1"
                                                    className="ml-2"
                                                >
                                                    Aluno
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-1 ml-10">
                                                <RadioGroupItem
                                                    value="TUTOR"
                                                    id="r2"
                                                />
                                                <label
                                                    htmlFor="r2"
                                                    className="ml-2"
                                                >
                                                    Tutor
                                                </label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Separator className="mt-3" />

                    {accountSelecionado === "TUTOR" && (
                        <div>
x                            <FormField
                                control={form.control}
                                name="scheduleUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Definir usuário e disponibilidade
                                        </FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                {showUsernameField &&
                                                !isUsernameConfirmed ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-500 text-sm">
                                                                http://localhost:3000/schedule/
                                                            </span>
                                                            <Input
                                                                value={username}
                                                                onChange={(e) =>
                                                                    setUsername(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="username"
                                                                className="flex-1"
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="button"
                                                                onClick={
                                                                    handleUsernameConfirmation
                                                                }
                                                                className="bg-violet-700 text-white text-sm font-semibold py-3 rounded-2xl hover:bg-violet-500 transition duration-300"
                                                            >
                                                                Confirmar
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                onClick={() =>
                                                                    setShowUsernameField(
                                                                        false
                                                                    )
                                                                }
                                                                className="bg-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-2xl hover:bg-gray-400 transition duration-300"
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : isUsernameConfirmed ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-500 text-sm">
                                                                http://localhost:3000/schedule/
                                                            </span>
                                                            <Input
                                                                value={username}
                                                                disabled
                                                                className="flex-1"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            onClick={() => {
                                                                setIsUsernameConfirmed(
                                                                    false
                                                                );
                                                                setUsername("");
                                                                form.setValue(
                                                                    "scheduleUrl",
                                                                    ""
                                                                );
                                                            }}
                                                            className="bg-gray-300 text-gray-700 text-sm font-semibold py-3 rounded-2xl hover:bg-gray-400 transition duration-300"
                                                        >
                                                            Editar
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        onClick={() => {
                                                            setShowUsernameField(
                                                                true
                                                            );
                                                            window.open(
                                                                "http://localhost:3000",
                                                                "_blank"
                                                            );
                                                        }}
                                                        className="bg-violet-700 text-white text-sm font-semibold py-3 rounded-2xl hover:bg-violet-500 transition duration-300"
                                                    >
                                                        Definir usuário e
                                                        disponibilidade
                                                    </Button>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator className="mt-7" />
                        </div>
                    )}

                    <FormField
                        control={form.control}
                        name="disciplines"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Disciplinas que possui interesse (informe 3)
                                </FormLabel>
                                <FormControl>
                                    <div className="space-y-2">
                                        {[0, 1, 2].map((index) => (
                                            <Input
                                                key={index}
                                                placeholder={`Digite a ${
                                                    index + 1
                                                }ª disciplina`}
                                                value={field.value[index]}
                                                onChange={(e) => {
                                                    const newDisciplines = [
                                                        ...field.value,
                                                    ];
                                                    newDisciplines[index] =
                                                        e.target.value;
                                                    field.onChange(
                                                        newDisciplines
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Separator className="mt-5 mb-3" />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Nome Completo
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tuttor Connect Da Silva"
                                        {...field}
                                        autoComplete="name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="bg-violet-700 text-white text-lg font-semibold py-3 rounded-2xl hover:bg-violet-500 transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
