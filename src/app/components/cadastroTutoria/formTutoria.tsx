// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";

// const cursos = [
//   { id: "engenharia", label: "Engenharia" },
//   { id: "medicina", label: "Medicina" },
//   { id: "direito", label: "Direito" },
//   { id: "administracao", label: "Administração" },
//   { id: "computacao", label: "Ciência da Computação" },
//   { id: "outro", label: "Outro" },
// ];

// const areasPorCurso = {
//   engenharia: [
//     { id: "calculo", label: "Cálculo" },
//     { id: "fisica", label: "Física" },
//     { id: "quimica", label: "Química" },
//     { id: "desenhoTecnico", label: "Desenho Técnico" },
//     { id: "resistenciaMateriais", label: "Resistência dos Materiais" },
//   ],
//   medicina: [
//     { id: "anatomia", label: "Anatomia" },
//     { id: "fisiologia", label: "Fisiologia" },
//     { id: "bioquimica", label: "Bioquímica" },
//     { id: "farmacologia", label: "Farmacologia" },
//     { id: "patologia", label: "Patologia" },
//   ],
//   direito: [
//     { id: "direitoConstitucional", label: "Direito Constitucional" },
//     { id: "direitoCivil", label: "Direito Civil" },
//     { id: "direitoPenal", label: "Direito Penal" },
//     { id: "direitoProcessual", label: "Direito Processual" },
//     { id: "filosofiaDireito", label: "Filosofia do Direito" },
//   ],
//   administracao: [
//     { id: "contabilidade", label: "Contabilidade" },
//     { id: "economia", label: "Economia" },
//     { id: "marketing", label: "Marketing" },
//     { id: "recursosHumanos", label: "Recursos Humanos" },
//     { id: "gestaoEstrategica", label: "Gestão Estratégica" },
//   ],
//   computacao: [
//     { id: "programacao", label: "Programação" },
//     { id: "estruturaDados", label: "Estrutura de Dados" },
//     { id: "bancoDados", label: "Banco de Dados" },
//     { id: "redesComputadores", label: "Redes de Computadores" },
//     { id: "inteligenciaArtificial", label: "Inteligência Artificial" },
//   ],
//   outro: [
//     { id: "matematica", label: "Matemática" },
//     { id: "portugues", label: "Português" },
//     { id: "ingles", label: "Inglês" },
//     { id: "historia", label: "História" },
//     { id: "geografia", label: "Geografia" },
//   ],
// };

// const FormularioTutor = () => {
//   const [formData, setFormData] = useState({
//     nome: "",
//     email: "",
//     telefone: "",
//     curso: "",
//     periodo: "",
//     faculdade: "",
//     areasTutoria: [],
//     experiencia: "",
//     disponibilidade: "",
//     motivacao: "",
//   });

//   const [areasDisponiveis, setAreasDisponiveis] = useState([]);

//   useEffect(() => {
//     if (formData.curso) {
//       setAreasDisponiveis(areasPorCurso[formData.curso] || []);
//       setFormData((prev) => ({ ...prev, areasTutoria: [] }));
//     }
//   }, [formData.curso]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAreaChange = (areaId) => {
//     setFormData((prevState) => {
//       const updatedAreas = prevState.areasTutoria.includes(areaId)
//         ? prevState.areasTutoria.filter((id) => id !== areaId)
//         : [...prevState.areasTutoria, areaId];
//       return { ...prevState, areasTutoria: updatedAreas };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Dados do formulário:", formData);
//     // Aqui você adicionaria a lógica para enviar os dados do formulário
//   };

//   return (
//     <Card className="w-full max-w-3xl mx-auto">
//       <CardHeader className="space-y-1 p-6">
//         <CardTitle className="text-2xl font-bold text-center">
//           Pedido para ser Tutor Universitário
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="nome" className="text-lg">
//               Nome Completo
//             </Label>
//             <Input
//               id="nome"
//               name="nome"
//               value={formData.nome}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-lg">
//               E-mail
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="telefone" className="text-lg">
//               Telefone
//             </Label>
//             <Input
//               id="telefone"
//               name="telefone"
//               type="tel"
//               value={formData.telefone}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="faculdade" className="text-lg">
//               Faculdade
//             </Label>
//             <Input
//               id="faculdade"
//               name="faculdade"
//               value={formData.faculdade}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="curso" className="text-lg">
//               Curso
//             </Label>
//             <Select
//               onValueChange={(value) => handleSelectChange("curso", value)}
//             >
//               <SelectTrigger className="p-3 text-lg">
//                 <SelectValue placeholder="Selecione seu curso" />
//               </SelectTrigger>
//               <SelectContent>
//                 {cursos.map((curso) => (
//                   <SelectItem key={curso.id} value={curso.id}>
//                     {curso.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="periodo" className="text-lg">
//               Período
//             </Label>
//             <Select
//               onValueChange={(value) => handleSelectChange("periodo", value)}
//             >
//               <SelectTrigger className="p-3 text-lg">
//                 <SelectValue placeholder="Selecione seu período" />
//               </SelectTrigger>
//               <SelectContent>
//                 {[...Array(10)].map((_, i) => (
//                   <SelectItem key={i} value={`${i + 1}`}>{`${
//                     i + 1
//                   }º Período`}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {formData.curso && (
//             <div className="space-y-2">
//               <Label className="text-lg">
//                 Áreas de Tutoria (selecione uma ou mais)
//               </Label>
//               <div className="grid grid-cols-2 gap-4">
//                 {areasDisponiveis.map((area) => (
//                   <div key={area.id} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={area.id}
//                       checked={formData.areasTutoria.includes(area.id)}
//                       onCheckedChange={() => handleAreaChange(area.id)}
//                     />
//                     <label
//                       htmlFor={area.id}
//                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                     >
//                       {area.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="experiencia" className="text-lg">
//               Experiência Prévia
//             </Label>
//             <Textarea
//               id="experiencia"
//               name="experiencia"
//               value={formData.experiencia}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg min-h-[100px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="disponibilidade" className="text-lg">
//               Disponibilidade
//             </Label>
//             <Input
//               id="disponibilidade"
//               name="disponibilidade"
//               value={formData.disponibilidade}
//               onChange={handleChange}
//               required
//               placeholder="Ex: Segundas e Quartas, 18h-20h"
//               className="p-3 text-lg"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="motivacao" className="text-lg">
//               Motivação para ser Tutor
//             </Label>
//             <Textarea
//               id="motivacao"
//               name="motivacao"
//               value={formData.motivacao}
//               onChange={handleChange}
//               required
//               className="p-3 text-lg min-h-[150px]"
//             />
//           </div>

//           <Button type="submit" className="w-full p-6 text-lg font-semibold">
//             Enviar Pedido
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default FormularioTutor;
