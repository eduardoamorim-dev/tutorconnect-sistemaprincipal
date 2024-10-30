"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Edit } from "lucide-react";

interface TutorApplication {
  id: string;
  name: string;
  email: string;
  level: string;
  course: string;
  phone: string;
  area: string;
  experience: string;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  editable: boolean;
}

const mockApplications: TutorApplication[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    level: "Ensino médio",
    course: "Contabilidade",
    phone: "(11) 98765-4321",
    area: "Matemática",
    experience: "5 anos de experiência em ensino particular",
    motivation: "Desejo ajudar estudantes a superarem suas dificuldades em matemática.",
    status: "pending",
    createdAt: "2024-10-25T14:30:00Z",
    editable: false,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    level: "Graduação",
    course: "Engenharia Elétrica",
    phone: "(21) 98765-4321",
    area: "Física",
    experience: "3 anos como professora do ensino médio",
    motivation: "Quero compartilhar meu conhecimento e auxiliar no aprendizado dos alunos.",
    status: "pending",
    createdAt: "2024-10-26T10:15:00Z",
    editable: false,
  },
];

// Função para salvar no localStorage
const saveToLocalStorage = (applications: TutorApplication[]) => {
  localStorage.setItem("tutorApplications", JSON.stringify(applications));
};

// Função para carregar do localStorage
const loadFromLocalStorage = (): TutorApplication[] => {
  const storedApplications = localStorage.getItem("tutorApplications");
  return storedApplications ? JSON.parse(storedApplications) : mockApplications;
};

const TutorApplicationsAdmin = () => {
  const [applications, setApplications] = React.useState<TutorApplication[]>(loadFromLocalStorage);

  useEffect(() => {
    // Salva sempre que o estado de `applications` muda
    saveToLocalStorage(applications);
  }, [applications]);

  const handleStatusUpdate = (id: string, newStatus: "approved" | "rejected") => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id ? { ...app, status: newStatus, editable: true } : app
      )
    );
  };

  const handleEditDecision = (id: string) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id ? { ...app, status: "pending", editable: false } : app
      )
    );
  };

  const getStatusBadge = (status: TutorApplication["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", className: "bg-yellow-500 hover:bg-yellow-600" },
      approved: { label: "Aprovado", className: "bg-green-500 hover:bg-green-600" },
      rejected: { label: "Rejeitado", className: "bg-red-500 hover:bg-red-600" },
    };

    return (
      <Badge className={statusConfig[status].className}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solicitações de Tutores</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nível de Ensino</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Disciplinas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>{application.level}</TableCell>
                <TableCell>{application.course}</TableCell>
                <TableCell>{application.area}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detalhes da Solicitação</DialogTitle>
                          <DialogDescription>
                            <div className="mt-4 space-y-4">
                              <div>
                                <h3 className="font-semibold">Telefone</h3>
                                <p>{application.phone}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Experiência</h3>
                                <p>{application.experience}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold">Motivação</h3>
                                <p>{application.motivation}</p>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    {application.status === "pending" ? (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleStatusUpdate(application.id, "approved")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleStatusUpdate(application.id, "rejected")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      application.editable && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={() => handleEditDecision(application.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TutorApplicationsAdmin;
