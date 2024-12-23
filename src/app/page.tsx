"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AccountType, SchoolLevel, User } from "@prisma/client";
import TutorCard from "@/components/TutorCard/TutorCard";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { formatCourseName } from "@/utils/formatters";

const SearchTutor = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courses, setCourses] = useState<string[]>([]);
    const [tutors, setTutors] = useState<User[]>([]);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.get<User[]>("/api/tutors");
                const tutorsData = response.data;

                setTutors(tutorsData);

                // Corrigindo a tipagem do array de cursos e removendo duplicatas
                const uniqueCourses = Array.from(
                    new Set(tutorsData.map((tutor: User) => tutor.curso))
                )
                    .filter((curso): curso is string => curso !== null)
                    .sort((a, b) =>
                        formatCourseName(a).localeCompare(formatCourseName(b))
                    ); // Ordenando alfabeticamente

                setCourses(uniqueCourses);
            } catch (error) {
                console.error("Error fetching tutors:", error);
                toast.error(
                    "Não foi possível carregar os tutores. Tente novamente mais tarde."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const filteredTutors = tutors.filter((tutor) => {
        if (tutor.tipoconta !== AccountType.TUTOR) return false;

        const matchesSearch =
            tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.disciplines.some((discipline) =>
                discipline.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesLevel = selectedLevel
            ? tutor.escolaridade === selectedLevel
            : true;

        const matchesCourse = selectedCourse
            ? tutor.curso === selectedCourse
            : true;

        return matchesSearch && matchesLevel && matchesCourse;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedLevel("");
        setSelectedCourse("");
    };

    const isFilterApplied = searchTerm || selectedLevel || selectedCourse;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-700" />
            </div>
        );
    }

    const formatSchoolLevel = (level: SchoolLevel) => {
        const levelMap = {
            [SchoolLevel.ENSINOMEDIO]: "Ensino Médio",
            [SchoolLevel.GRADUACAO]: "Graduação",
        };
        return levelMap[level];
    };

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="flex justify-center">
                <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-8 sm:mt-12 lg:mt-16 max-w-3xl mx-auto">
                            Conecte-se com tutores: aprendizado de estudante
                            para estudante
                        </h1>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 pb-24 mt-10">
                <div className="container mx-auto py-5">
                    <h1 className="text-3xl font-bold py-4 text-left">
                        Tutores Disponíveis
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <Input
                            type="text"
                            placeholder="Buscar por nome do tutor ou disciplina"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-none w-80 md:w-96"
                        />

                        <div className="w-56">
                            <Select
                                value={selectedLevel}
                                onValueChange={setSelectedLevel}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Nível de Ensino" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={SchoolLevel.GRADUACAO}>
                                        Graduação
                                    </SelectItem>
                                    <SelectItem value={SchoolLevel.ENSINOMEDIO}>
                                        Ensino Médio
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-72">
                            <Select
                                value={selectedCourse}
                                onValueChange={setSelectedCourse}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Curso" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course, index) => (
                                        <SelectItem key={index} value={course}>
                                            {formatCourseName(course)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {isFilterApplied && (
                            <Button
                                onClick={clearFilters}
                                variant="destructive"
                                className="flex-none"
                            >
                                Limpar Filtros
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTutors.length > 0 ? (
                            filteredTutors.map((tutor) => (
                                <TutorCard
                                    key={tutor.id}
                                    name={tutor.name}
                                    curso={tutor.curso}
                                    tipoconta={tutor.tipoconta}
                                    disciplines={tutor.disciplines}
                                    scheduleUrl={tutor.scheduleUrl || undefined}
                                    escolaridade={tutor.escolaridade}
                                    onCheckSchedule={(url) =>
                                        window.open(url, "_blank")
                                    }
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-500">
                                <p className="text-lg">
                                    Nenhum tutor encontrado com os filtros
                                    selecionados.
                                </p>
                                {isFilterApplied && (
                                    <Button
                                        onClick={clearFilters}
                                        variant="link"
                                        className="mt-2 text-violet-600"
                                    >
                                        Limpar filtros e tentar novamente
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchTutor;
