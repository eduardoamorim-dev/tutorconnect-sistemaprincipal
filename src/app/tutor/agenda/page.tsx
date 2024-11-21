"use client"

import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, Calendar as CalendarIcon } from "lucide-react";



const AgendaManager = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleSubmit = (data) => {
        if (isEditing && editingIndex !== null) {
            const updatedSchedules = [...schedules];
            updatedSchedules[editingIndex] = { ...data, date: selectedDate };
            setSchedules(updatedSchedules);
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            setSchedules((prev) => [...prev, { ...data, date: selectedDate }]);
        }
    };

    const handleEdit = (index) => {
        const schedule = schedules[index];
        setSelectedDate(new Date(schedule.date));
        setIsEditing(true);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        setSchedules((prev) => prev.filter((_, i) => i !== index));
        setIsEditing(false);
        setEditingIndex(null);
    };

    return (
        <Card className="w-full max-w-6xl mx-auto my-8 border-violet-200 bg-violet-50/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-violet-700 text-center w-full">
                    Gerenciador de Agenda
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-violet-100 h-[700px] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-violet-700">Calendário</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Calendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                className="w-full"
                                tileClassName={({ date }) => {
                                    const dateStr = format(date, "yyyy-MM-dd");
                                    const selectedStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
                                    const hasSchedule = schedules.some(
                                        (schedule) =>
                                            format(new Date(schedule.date), "yyyy-MM-dd") === dateStr
                                    );

                                    if (dateStr === selectedStr) {
                                        return "bg-violet-700 text-white hover:bg-violet-800";
                                    }
                                    if (hasSchedule) {
                                        return "bg-violet-100 text-violet-700 hover:bg-violet-200";
                                    }
                                    return "hover:bg-violet-50";
                                }}
                            />

                            {selectedDate && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-violet-700 mb-4">
                                        {isEditing ? "Editar Horário" : "Adicionar Horário"}
                                    </h3>
                                    <ScheduleForm
                                        onSubmit={handleSubmit}
                                        defaultValues={{
                                            startTime: "",
                                            endTime: "",
                                        }}
                                        isEditing={isEditing}
                                        selectedDate={selectedDate}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-violet-100 h-[700px] bg-white shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-violet-700">Horários Agendados</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full">
                            <ScheduleList
                                schedules={schedules}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

const ScheduleForm = ({
    onSubmit,
    defaultValues,
    isEditing,
    selectedDate
}) => {
    const form = useForm({
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="bg-violet-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-violet-700 font-medium">
                        Data selecionada: {format(selectedDate, "dd/MM/yyyy")}
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Horário de Início</FormLabel>
                            <FormControl>
                                <Input
                                    type="time"
                                    className="w-full border border-violet-200 focus:border-violet-700"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Horário de Término</FormLabel>
                            <FormControl>
                                <Input
                                    type="time"
                                    className="w-full border border-violet-200 focus:border-violet-700"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-violet-700 hover:bg-violet-800 text-white"
                >
                    {isEditing ? (
                        <>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Salvar Alterações
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Disponibilidade
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
};

const ScheduleList = ({ schedules, onEdit, onDelete }) => {
    if (schedules.length === 0) {
        return (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
                <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">Nenhum horário disponível.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-3 max-h-[550px] overflow-y-auto pr-2">
            {schedules.map((schedule, index) => (
                <Card key={index} className="border border-violet-100 shrink-0">
                    <CardContent className="flex justify-between items-center p-4">
                        <div className="space-y-1">
                            <p className="font-medium text-violet-700">
                                {format(new Date(schedule.date), "dd/MM/yyyy")}
                            </p>
                            <p className="text-sm text-gray-600">
                                {schedule.startTime} - {schedule.endTime}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(index)}
                                className="border-violet-200 hover:bg-violet-50"
                            >
                                <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(index)}
                                className="border-red-200 hover:bg-red-50 text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AgendaManager;