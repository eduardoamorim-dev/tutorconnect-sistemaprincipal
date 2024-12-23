import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { AccountType, SchoolLevel } from "@prisma/client";
import { formatCourseName } from "@/utils/formatters";

interface TutorCardProps {
    name: string;
    curso: string;
    tipoconta: AccountType;
    disciplines: string[];
    scheduleUrl?: string;
    escolaridade: SchoolLevel;
    onCheckSchedule: (scheduleUrl: string) => void;
}

const TutorCard = ({
    name,
    curso,
    tipoconta,
    disciplines,
    scheduleUrl,
    escolaridade,
    onCheckSchedule,
}: TutorCardProps) => {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    const handleScheduleClick = () => {
        if (scheduleUrl) {
            window.open(scheduleUrl, "_blank");
        }
    };

    // Formata o nome do curso
    const formattedCourseName = formatCourseName(curso);

    // Formata o nível de escolaridade
    const formatSchoolLevel = (level: SchoolLevel) => {
        const levelMap = {
            [SchoolLevel.ENSINOMEDIO]: "Ensino Médio",
            [SchoolLevel.GRADUACAO]: "Graduação",
        };
        return levelMap[level];
    };

    return (
        <Card className="w-full max-w-sm flex flex-col justify-between min-h-[23rem] hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6 flex-grow">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarFallback className="text-lg bg-violet-100 text-violet-700">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-semibold text-center">
                        {name}
                    </h3>
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-center">
                                {formattedCourseName}
                            </span>
                        </div>
                        <Badge variant="outline" className="capitalize">
                            {formatSchoolLevel(escolaridade)}
                        </Badge>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-muted-foreground mb-2">
                            Disciplinas:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {disciplines.map((discipline, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                                >
                                    {discipline}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-4">
                <Button
                    onClick={handleScheduleClick}
                    className="w-full bg-violet-700 hover:bg-violet-600 rounded-2xl"
                    disabled={!scheduleUrl}
                >
                    {scheduleUrl ? "Verificar Agenda" : "Agenda Indisponível"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TutorCard;
