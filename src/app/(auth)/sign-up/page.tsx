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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(8, "Informe a senha, mínimo 8 dígitos"),
  escolaridade: z.enum(["ensinomedio", "graduacao"], {
    errorMap: () => ({ message: "Selecione seu nível escolar" }),
  }),
  curso: z.string().min(1, "Selecione um curso"),
});

const Form = FormProvider;
type FormData = z.infer<typeof schema>;

export default function SignUpRefactor() {
  const [cursoSelecionado, setCursoSelecionado] = useState<"ensinomedio" | "graduacao" | "">("");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      escolaridade: "graduacao",
      curso: "",
    },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

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
                      setCursoSelecionado(value as "ensinomedio" | "graduacao");
                    }}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="ensinomedio" id="r1" />
                        <label htmlFor="r1" className="ml-2">
                          Ensino Médio
                        </label>
                      </div>
                      <div className="flex items-center space-x-1 ml-10">
                        <RadioGroupItem value="graduacao" id="r2" />
                        <label htmlFor="r2" className="ml-2">
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

          <div className="mt-4">
            <FormField
              control={form.control}
              name="curso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Escolha seu curso</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue
                          placeholder="Selecione seu curso"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cursoSelecionado === "ensinomedio" ? (
                          <>
                            <SelectItem value="tecadministracao">Técnico em Administração</SelectItem>
                            <SelectItem value="teccontabilidade">Técnico em Contabilidade</SelectItem>
                            <SelectItem value="teceletronica">Técnico em Eletrônica</SelectItem>
                            <SelectItem value="tecinformatica">Técnico em Informática</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="analiseedesenvolvimentodesistemas">Análise e Desenvolvimento de Sistemas</SelectItem>
                            <SelectItem value="gestaocomercial">Gestão Comercial</SelectItem>
                            <SelectItem value="engenhariaEletrica">Engenharia Elétrica</SelectItem>
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

          <Separator className="mt-5 mb-3" />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Nome Completo</FormLabel>
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
                <FormLabel className="font-bold">E-mail</FormLabel>
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
                <FormLabel className="font-bold">Senha</FormLabel>
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
          >
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
