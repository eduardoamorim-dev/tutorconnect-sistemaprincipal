// types/user.ts
export enum AccountType {
    ALUNO = 'ALUNO',
    TUTOR = 'TUTOR'
}

export enum SchoolLevel {
    ENSINOMEDIO = 'ENSINOMEDIO',
    GRADUACAO = 'GRADUACAO'
}

export interface User {
    id: string;
    name: string;
    email: string;
    tipoconta: AccountType;
    escolaridade: SchoolLevel;
    curso: string;
    scheduleUrl?: string;
    disciplines: string[];
    createdAt: Date;
}