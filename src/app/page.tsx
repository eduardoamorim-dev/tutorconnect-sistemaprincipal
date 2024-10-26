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
        <div>
          <Topbar />
        </div>
      )}
    </>
  );
}
