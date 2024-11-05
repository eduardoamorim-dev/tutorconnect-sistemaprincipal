"use client";

import { useState } from "react";
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
import { Camera } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(1, "Informe seu nome completo"),
    email: z.string().email("Informe um e-mail válido"),
    escolaridade: z.enum(["ensinomedio", "graduacao"], {
        errorMap: () => ({ message: "Selecione seu nível escolar" }),
    }),
    curso: z.string().min(1, "Selecione um curso"),
    bio: z.string().max(500, "Biografia deve ter no máximo 500 caracteres").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const mockUser = {
    name: "João da Silva",
    email: "joao@email.com",
    escolaridade: "graduacao" as const,
    curso: "analiseedesenvolvimentodesistemas",
    bio: "Estudante de ADS apaixonado por tecnologia e desenvolvimento web.",
    avatarUrl: "",
};

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState<"ensinomedio" | "graduacao">(
        mockUser.escolaridade
    );

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: mockUser,
    });

    const onSubmit = async (data: ProfileFormData) => {
        console.log("Dados atualizados:", data);
        setIsEditing(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Arquivo selecionado:", file);
        }
    };

    return (
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
                                <AvatarImage src={mockUser.avatarUrl} alt="Foto de perfil" />
                                <AvatarFallback className="bg-violet-100 text-violet-700 text-2xl">
                                    {mockUser.name.substring(0, 2).toUpperCase()}
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={!isEditing} />
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
                                        <FormLabel className="font-bold">E-mail</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={!isEditing} />
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
                                        <FormLabel className="font-bold">Nível Escolar</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setCursoSelecionado(value as "ensinomedio" | "graduacao");
                                                }}
                                                defaultValue={field.value}
                                                disabled={!isEditing}
                                                className="flex space-x-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="ensinomedio" id="r1" />
                                                    <label htmlFor="r1">Ensino Médio</label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="graduacao" id="r2" />
                                                    <label htmlFor="r2">Graduação</label>
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
                                        <FormLabel className="font-bold">Curso</FormLabel>
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
                                                {cursoSelecionado === "ensinomedio" ? (
                                                    <>
                                                        <SelectItem value="tecadministracao">
                                                            Técnico em Administração
                                                        </SelectItem>
                                                        <SelectItem value="teccontabilidade">
                                                            Técnico em Contabilidade
                                                        </SelectItem>
                                                        <SelectItem value="teceletronica">
                                                            Técnico em Eletrônica
                                                        </SelectItem>
                                                        <SelectItem value="tecinformatica">
                                                            Técnico em Informática
                                                        </SelectItem>
                                                    </>
                                                ) : (
                                                    <>
                                                        <SelectItem value="analiseedesenvolvimentodesistemas">
                                                            Análise e Desenvolvimento de Sistemas
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end space-x-4 mt-6">
                                {isEditing ? (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button type="submit" className="bg-violet-700 text-white hover:bg-violet-600">
                                            Salvar
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        type="button"
                                        className="bg-violet-700 text-white hover:bg-violet-600"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Editar Perfil
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}