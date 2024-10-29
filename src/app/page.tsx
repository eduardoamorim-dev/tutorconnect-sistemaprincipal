"use client";

import React, { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen/splashScreen";
import Topbar from "@/components/Topbar/Topbar";

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
        </>
      )}
    </>
  );
}
