"use client";

import React, { useState, useEffect } from "react";

import { tutors } from "@/types/tutor";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import TutorCard from "@/components/TutorCard/TutorCard";
import SchudeleModal from "@/components/SchudeleModal/SchudeleModal";

const SearchTutor = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courses, setCourses] = useState<string[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const uniqueCourses = Array.from(new Set(tutors.map(tutor => tutor.course)));
        setCourses(uniqueCourses);

        return () => clearTimeout(timer);
    }, []);

    const filteredTutors = tutors.filter(tutor => {
        const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesEducationLevel = educationLevel ? (educationLevel === "graduacao" ? tutor.level === "graduacao" : tutor.level === "ensino_medio") : true;

        const matchesCourse = selectedCourse ? tutor.course === selectedCourse : true;

        return matchesSearch && matchesEducationLevel && matchesCourse;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setEducationLevel("");
        setSelectedCourse("");
    };

    const isFilterApplied = searchTerm || educationLevel || selectedCourse;

    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-8 sm:mt-12 lg:mt-16 max-w-3xl mx-auto">
                            Conecte-se com tutores: aprendizado de estudante para estudante
                        </h1>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 pb-24 mt-10">
                <div className="container mx-auto py-5">
                    <h1 className="text-3xl font-bold py-4 text-left">Tutores Disponíveis</h1>

                    <div className="flex flex-col md:flex-row gap-4 mb-8 gap-x-4">
                        <Input
                            type="text"
                            placeholder="Buscar por nome da disciplina ou tutor"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-none w-80 md:w-96"
                        />

                        {/* Seleção de Graduação ou Ensino Médio */}
                        <div className="w-56">
                            <Select value={educationLevel} onValueChange={setEducationLevel}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecionar Nível de Ensino" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="graduacao">Graduação</SelectItem>
                                    <SelectItem value="ensino_medio">Ensino Médio</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Seleção de Curso */}
                        <div className="w-48">
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecionar Curso" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course, index) => (
                                        <SelectItem key={index} value={course}>
                                            {course}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {isFilterApplied && (
                            <div className="flex-none">
                                <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-500">
                                    Limpar Filtros
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredTutors.map((tutor) => (
                                <TutorCard
                                    key={tutor.id}
                                    name={tutor.name}
                                    course={tutor.course}
                                    subjects={tutor.subjects}
                                    avatarUrl={tutor.avatarUrl}
                                    onCheckSchedule={() => {
                                        setSelectedTutor(tutor);
                                        setIsModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Agendar Tutoria com {selectedTutor?.name}</h2>
                        <SchudeleModal />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchTutor;