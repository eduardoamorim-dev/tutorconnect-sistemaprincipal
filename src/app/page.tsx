"use client";

import React, { useState, useEffect } from "react";
import SplashScreen from "../components/splashScreen/splashScreen";
import TutorApplicationForm from "@/components/formTutor/TutorApplicationForm";

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
        <div>
          <TutorApplicationForm />
        </div>
      )}
    </>
  );
}
