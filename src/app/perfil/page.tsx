"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { DeleteAccountDialog } from "@/components/DeleteAccountDialog/DeleteAccountDialog";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { formatCourseName } from "@/utils/formatters";

const profileSchema = z.object({
    name: z.string().min(1, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    escolaridade: z.enum(["ENSINOMEDIO", "GRADUACAO"], {
        errorMap: () => ({ message: "Selecione seu nível escolar" }),
    }),
    curso: z.string().min(1, "Selecione um curso"),
    bio: z
        .string()
        .max(500, "Biografia deve ter no máximo 500 caracteres")
        .optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const cursosGraduacao = [
    "analiseedesenvolvimentodesistemas",
    "cienciadacomputacao",
    "sistemadeinformacao",
    "engenhariadesoftware",
    "redesdecomputadores",
    "engenhariamecanica",
    "engenhariacivil",
    "medicinahumana",
    "administracao",
    "cienciascontabeis",
    "engenhariaeletrica",
];

const cursosEnsinoMedio = [
    "tecadministracao",
    "teccontabilidade",
    "teceletronica",
    "tecinformatica",
    "tecmecanica",
    "tecedificacoes",
];

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState<
        "ENSINOMEDIO" | "GRADUACAO"
    >("GRADUACAO");
    const userId = "seu-user-id"; // Substituir pelo ID do usuário logado

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}`);
                const userData = response.data;
                form.reset(userData);
                setCursoSelecionado(userData.escolaridade);
            } catch (error) {
                toast.error("Erro ao carregar dados do usuário");
            }
        };

        fetchUserData();
    }, [form]);

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            await axios.patch(`/api/user/${userId}`, data);
            toast.success("Perfil atualizado com sucesso!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Erro ao atualizar perfil");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/user/${userId}`);
            toast.success("Conta deletada com sucesso");
            // Redirecionar para página de login ou home
            window.location.href = "/";
        } catch (error) {
            toast.error("Erro ao deletar conta");
        } finally {
            setIsLoading(false);
            setShowDeleteDialog(false);
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            // Implementar upload de arquivo
            // Você precisará de um endpoint específico para isso
            toast.success("Foto de perfil atualizada!");
        }
    };

    const cursos =
        cursoSelecionado === "ENSINOMEDIO"
            ? cursosEnsinoMedio
            : cursosGraduacao;

    return (
        <>
            <Toaster richColors position="top-right" />
            <DeleteAccountDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDeleteAccount}
            />

            <div className="bg-slate flex items-center justify-center mt-16">
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-violet-700">
                            Perfil do Usuário
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group">
                                <Avatar className="w-32 h-32">
                                    <AvatarImage src="" alt="Foto de perfil" />
                                    <AvatarFallback className="bg-violet-100 text-violet-700 text-2xl">
                                        {form
                                            .getValues("name")
                                            ?.substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <div className="absolute -bottom-2 -right-2 transform translate-x-1/4 translate-y-1/4">
                                        <Label
                                            htmlFor="avatar"
                                            className="cursor-pointer bg-violet-700 text-white p-2 rounded-full hover:bg-violet-600 shadow-lg flex items-center justify-center w-8 h-8"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </Label>
                                        <Input
                                            id="avatar"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
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
                                                    {...field}
                                                    disabled={!isEditing}
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
                                                    {...field}
                                                    disabled={!isEditing}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="escolaridade"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Nível Escolar
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        setCursoSelecionado(
                                                            value as
                                                                | "ENSINOMEDIO"
                                                                | "GRADUACAO"
                                                        );
                                                        form.setValue(
                                                            "curso",
                                                            ""
                                                        );
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={!isEditing}
                                                    className="flex space-x-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="ENSINOMEDIO"
                                                            id="r1"
                                                        />
                                                        <label htmlFor="r1">
                                                            Ensino Médio
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="GRADUACAO"
                                                            id="r2"
                                                        />
                                                        <label htmlFor="r2">
                                                            Graduação
                                                        </label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="curso"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Curso
                                            </FormLabel>
                                            <Select
                                                disabled={!isEditing}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione seu curso" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cursos.map((curso) => (
                                                        <SelectItem
                                                            key={curso}
                                                            value={curso}
                                                        >
                                                            {formatCourseName(
                                                                curso
                                                            )}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">
                                                Biografia
                                            </FormLabel>
                                            <FormControl>
                                                <textarea
                                                    {...field}
                                                    disabled={!isEditing}
                                                    className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                    placeholder="Conte um pouco sobre você..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                    <div>
                                        {isEditing ? (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() =>
                                                    setShowDeleteDialog(true)
                                                }
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                Deletar Conta
                                            </Button>
                                        ) : null}
                                    </div>
                                    <div className="flex space-x-4">
                                        {isEditing ? (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        form.reset();
                                                    }}
                                                    disabled={isLoading}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="bg-violet-700 text-white hover:bg-violet-600"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Salvando...
                                                        </>
                                                    ) : (
                                                        "Salvar"
                                                    )}
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="bg-violet-700 text-white hover:bg-violet-600"
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                            >
                                                Editar Perfil
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
