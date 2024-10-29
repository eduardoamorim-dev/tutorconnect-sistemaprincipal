"use client";

import React, { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import Topbar from "@/components/Topbar/Topbar";
import { tutors } from "@/types/tutor";
import TutorCard from "@/components/TutorCard/TutorCard";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (

        <><div>
          <Topbar />
        </div>
          <div className="flex justify-center">
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold  mt-8 sm:mt-12 lg:mt-16 max-w-3xl mx-auto">
                  Conecte-se com tutores: aprendizado de estudante para estudante
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 mt-10">
            <div className="container mx-auto py-8">
              <h1 className="text-3xl font-bold py-8 text-center md:text-left">Tutores Disponíveis</h1>


              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tutors.map((tutor) => (
                    <TutorCard
                      key={tutor.id}
                      name={tutor.name}
                      course={tutor.course}
                      subjects={tutor.subjects}
                      avatarUrl={tutor.avatarUrl}
                      onCheckSchedule={() => {
                        console.log(`Verificando agenda do tutor: ${tutor.name}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>


        </>
      )
      }
    </>
  );
}
