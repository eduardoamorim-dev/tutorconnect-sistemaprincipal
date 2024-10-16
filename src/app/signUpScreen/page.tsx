"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function SignUpScreen() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Formulário submetido");
  });

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate p-4">
        <p className="text-xl text-blue-700  mb-20">Tutor Connect</p>
        <h1 className="text-3xl font-bold mb-2">Crie sua conta</h1>
        <p className="mb-10">
          Já possui uma conta?{" "}
          <a
            href="#"
            className="text-blue-700 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white "
          >
            Fazer login
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <Separator className="my-4" />

          <p className="font-bold">Você esta cursando</p>

          <RadioGroup defaultValue="comfortable">
            <div className="flex  items-center">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="ensinomedio" id="r1" />
                <label htmlFor="r1" className="ml-2">
                  Ensino médio
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

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione seu curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ads">
                Analise e Desenvolvimento de Sistemas
              </SelectItem>
              <SelectItem value="gc">Gestão Comercial</SelectItem>
              <SelectItem value="ee">Engenharia Elétrica</SelectItem>
            </SelectContent>
          </Select>

          <Separator className="my-4" />

          <div className="flex flex-col">
            <label htmlFor="nome" className=" mb-1 font-bold">
              Nome Completo
            </label>
            <input
              id="nome"
              className="text-lg p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-lg placeholder-gray-400"
              type="nome"
              {...register("nome", {})}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className=" mb-1 font-bold">
              E-mail
            </label>
            <input
              id="email"
              className="text-lg p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-lg placeholder-gray-400"
              type="email"
              {...register("email", {})}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className=" mb-1 font-bold">
              Senha
            </label>
            <input
              id="password"
              className="text-lg p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-lg placeholder-gray-400"
              type="password"
              {...register("password", {})}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex justify-end mb-5">
            <a
              href="#"
              className=" text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white text-lg font-semibold py-3 rounded-2xl hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
