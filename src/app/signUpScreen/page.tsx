"use client";

import { useForm } from "react-hook-form";

export default function SignUpScreen() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Formulário submetido");
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate p-4">
      <p className="text-xl text-blue-700  mb-7">Tutor Connect</p>
      <h1 className="text-3xl font-bold mb-2">Acesse sua conta</h1>
      <p className="mb-5">
        Novo por aqui?{" "}
        <a
          href="#"
          className="text-blue-700 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white "
        >
          Crie uma conta
        </a>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className=" mb-1 font-medium">
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
          <label htmlFor="password" className=" mb-1 font-medium">
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
  );
}
