"use client";

import { useForm } from "react-hook-form";

export default function SignUpScreen() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Formulário submetido");
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-700 p-4">
      <h1 className="text-3xl font-bold text-white mb-5">Tutor Connect</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 mb-1 font-medium">
            E-mail
          </label>
          <input
            id="email"
            className="text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="email"
            {...register("email", {})}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 mb-1 font-medium">
            Senha
          </label>
          <input
            id="password"
            className="text-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="password"
            {...register("password", {})}
            placeholder="Digite sua senha"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-white text-lg font-semibold py-2 rounded-md border-2 border-sky-500 hover:bg-white hover:text-sky-500 transition duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
