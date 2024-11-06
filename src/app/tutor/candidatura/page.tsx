"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";

export default function TutorApplicationForm() {
    const { handleSubmit: hookFormHandleSubmit, register } = useForm();

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log("Formulário de candidatura enviado", data);
    });

    return (
        <>
            <div className="bg-slate flex items-center justify-center mt-16">
                <Card className="w-full max-w-3xl ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-violet-700">
                            Seja um Tutor
                        </CardTitle>
                    </CardHeader>

                    <p className="text-center mb-6 text-gray-600">
                        Candidate-se para fazer parte do nosso time de tutores
                    </p>
                    <CardContent className="flex justify-center">
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
                                    className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 bg-transparent"
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
                                    className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 bg-transparent"
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
                                    className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder-gray-400 bg-transparent min-h-[120px] resize-y"
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
                                    className="text-lg p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder-gray-400 bg-transparent min-h-[120px] resize-y"
                                    {...register("motivation", { required: true })}
                                    placeholder="Conte-nos sua motivação para se tornar um tutor"
                                    aria-label="Campo de motivação"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-violet-700 text-white text-lg font-semibold py-3 rounded-2xl hover:bg-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 "
                            >
                                Enviar candidatura
                            </button>
                        </form>
                    </CardContent>
                </Card >
            </div>
        </>

    );
}
