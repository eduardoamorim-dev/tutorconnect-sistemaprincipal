// import React, { useState } from "react";
// import { Calendar, Clock, Check } from "lucide-react";

// const SchudeleModal = () => {
//     const [selectedDate, setSelectedDate] = useState(String);
//     const [selectedTime, setSelectedTime] = useState(String);

//     // Simulação de slots disponíveis
//     const availableSlots = [
//         { date: "2024-10-06", times: ["10:00", "14:00", "16:00"] },
//         { date: "2024-10-07", times: ["09:00", "13:00", "15:00"] },
//         { date: "2024-10-08", times: ["11:00", "14:00", "17:00"] },
//     ];

//     const handleDateSelect = (date: string) => {
//         setSelectedDate(date);
//         setSelectedTime("");
//     };

//     const handleTimeSelect = (time: string) => {
//         setSelectedTime(time);
//     };

//     const handleSchedule = () => {
//         console.log(`Agendado para ${selectedDate} às ${selectedTime}`);
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 <Calendar className="mr-2" /> Agendar Tutoria
//             </h2>

//             <div className="grid grid-cols-2 gap-4">
//                 <div>
//                     <h3 className="font-medium mb-2">Selecione uma data:</h3>
//                     <div className="space-y-2">
//                         {availableSlots.map((slot) => (
//                             <button
//                                 key={slot.date}
//                                 onClick={() => handleDateSelect(slot.date)}
//                                 className={`w-full p-2 text-left rounded ${
//                                     selectedDate === slot.date
//                                         ? "bg-violet-100 text-violet-700"
//                                         : "bg-gray-100"
//                                 }`}
//                             >
//                                 {slot.date}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 <div>
//                     <h3 className="font-medium mb-2">Horários disponíveis:</h3>
//                     <div className="space-y-2">
//                         {selectedDate &&
//                             availableSlots
//                                 .find((slot) => slot.date === selectedDate)
//                                 ?.times.map((time) => (
//                                     <button
//                                         key={time}
//                                         onClick={() => handleTimeSelect(time)}
//                                         className={`w-full p-2 text-left rounded flex items-center ${
//                                             selectedTime === time
//                                                 ? "bg-violet-100 text-violet-700"
//                                                 : "bg-gray-100"
//                                         }`}
//                                     >
//                                         <Clock size={16} className="mr-2" />{" "}
//                                         {time}
//                                     </button>
//                                 ))}
//                     </div>
//                 </div>
//             </div>

//             {selectedDate && selectedTime && (
//                 <button
//                     onClick={handleSchedule}
//                     className="mt-4 bg-violet-600 text-white px-4 py-2 rounded-full flex items-center justify-center w-full"
//                 >
//                     <Check size={16} className="mr-2" /> Confirmar Agendamento
//                 </button>
//             )}
//         </div>
//     );
// };

// export default SchudeleModal;
