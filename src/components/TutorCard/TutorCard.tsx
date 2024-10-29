import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface TutorCardProps {
    name: string;
    course: string;
    subjects: string[];
    avatarUrl?: string;
    level?: string;
    onCheckSchedule: () => void;
}

const TutorCard = ({
    name = '',
    course,
    subjects = [],
    avatarUrl,
    onCheckSchedule
}: TutorCardProps) => {

    // Pega as iniciais do nome para o fallback do avatar
    const getInitials = (name: string) => {
        if (!name) return '';

        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Card className="w-full max-w-sm flex flex-col justify-between min-h-[23rem]">
            <CardContent className="pt-6 flex-grow">
                <div className="flex flex-col items-center space-y-4">

                    <Avatar className="w-24 h-24">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
                    </Avatar>

                    <h3 className="text-2xl font-semibold text-center">{name}</h3>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{course}</span>
                    </div>

                    <div className="w-full">
                        <p className="text-sm text-muted-foreground mb-2">Disciplinas:</p>
                        <div className="flex flex-wrap gap-2">
                            {subjects.map((subject, index) => (
                                <Badge key={index} variant="secondary">
                                    {subject}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-4">
                <Button onClick={onCheckSchedule} className="w-full bg-blue-700 hover:bg-blue-600 rounded-2xl">
                    Verificar Agenda
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TutorCard;