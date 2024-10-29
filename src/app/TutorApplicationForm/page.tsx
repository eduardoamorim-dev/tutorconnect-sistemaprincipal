"use client";

import Topbar from "@/components/Topbar/Topbar";
import { useForm } from "react-hook-form";

export default function TutorApplicationForm() {
  const { handleSubmit: hookFormHandleSubmit, register } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log("Formulário de candidatura enviado", data);
  });

  return (
    <>
      <Topbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-slate p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Seja um Tutor</h1>

        <p className="mb-6 text-gray-600">
          Candidate-se para fazer parte do nosso time de tutores
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-md p-8 "
        >
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-gray-700 mb-2 font-medium text-lg"
            >
              Telefone
            </label>
            <input
              id="phone"
              className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 bg-transparent"
              type="tel"
              {...register("phone", { required: true })}
              placeholder="(00) 00000-0000"
              aria-label="Campo de telefone"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="specialty"
              className="text-gray-700 mb-2 font-medium text-lg"
            >
              Área de interesse
            </label>
            <select
              id="specialty"
              className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 bg-transparent"
              {...register("specialty", { required: true })}
              aria-label="Campo de especialidade"
            >
              <option value="">Selecione uma área</option>
              <option value="matematica">Matemática</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="experience"
              className="text-gray-700 mb-2 font-medium text-lg"
            >
              Experiência
            </label>
            <textarea
              id="experience"
              className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 bg-transparent min-h-[120px] resize-y"
              {...register("experience", { required: true })}
              placeholder="Descreva sua experiência como professor ou tutor"
              aria-label="Campo de experiência"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="motivation"
              className="text-gray-700 mb-2 font-medium text-lg"
            >
              Por que quer ser tutor?
            </label>
            <textarea
              id="motivation"
              className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-gray-400 bg-transparent min-h-[120px] resize-y"
              {...register("motivation", { required: true })}
              placeholder="Conte-nos sua motivação para se tornar um tutor"
              aria-label="Campo de motivação"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
          >
            Enviar candidatura
          </button>
        </form>
      </div>
    </>

  );
}
