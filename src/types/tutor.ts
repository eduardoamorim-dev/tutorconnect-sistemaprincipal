export interface Tutor {
  id: string;
  name: string;
  course: string;
  subjects: string[];
  avatarUrl?: string;
}

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Eduardo Amorim",
    course: "Análise e Desenvolvimento de Sistemas",
    subjects: ["Cálculo I", "Algoritmos", "Estrutura de Dados"],
    avatarUrl: "https://github.com/eduardoamorim-dev.png",
  },
  {
    id: "2",
    name: "Natalia Salete",
    course: "Análise e Desenvolvimento de Sistemas",
    subjects: ["Banco de Dados", "Programação Web", "React Native"],
    avatarUrl: "https://github.com/natsalete.png",
  },
  {
    id: "3",
    name: "Carlos Roberto",
    course: "Sistemas de Informação",
    subjects: ["JavaScript", "TypeScript", "Node.js", "MongoDB"],
    avatarUrl: "https://github.com/carlosrobert0.png",
  },
  {
    id: "4",
    name: "Roberto Teixeira",
    course: "Sistemas de Informação",
    subjects: ["Python", "Machine Learning", "Inteligência Artificial"],
    avatarUrl: "https://github.com/robertoteixeira-dev.png",
  },
  {
    id: "5",
    name: "Thales Aguiar",
    course: "Engenharia da Computação",
    subjects: [
      "Arquitetura de Computadores",
      "Assembly",
      "Sistemas Embarcados",
    ],
    avatarUrl: "https://github.com/thalesaguiar.png",
  },
];
