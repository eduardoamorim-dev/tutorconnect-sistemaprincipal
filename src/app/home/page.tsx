"use client";

import React, { useEffect, useState } from "react";
import { Search, Book, Calendar, Star, User } from "lucide-react";
import SplashScreen from "@/components/splashScreen/splashScreen";

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
        <div className="bg-gray-100 min-h-screen p-8">
          <header className="bg-blue-600 text-white p-4 rounded-t-lg shadow-md">
            <h1 className="text-2xl font-bold">TutorConnect</h1>
          </header>

          <nav className="bg-white p-4 flex justify-between items-center shadow-md">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-blue-600">
                <Book size={20} />
                <span>Encontrar Tutor</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600">
                <Calendar size={20} />
                <span>Minhas Sessões</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Tornar-se Tutor
              </button>
              <User size={24} className="text-blue-600" />
            </div>
          </nav>

          <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Encontre seu Tutor</h2>
              <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Busque por disciplina ou tópico"
                  className="bg-transparent w-full outline-none"
                />
              </div>
              <div className="mt-6 space-y-4">
                {/* Lista de tutores aqui */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src="/api/placeholder/50/50"
                    alt="Tutor"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Ana Silva</h3>
                    <p className="text-sm text-gray-600">
                      Cálculo I, Física Básica
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <Star size={16} className="text-yellow-400" />
                    <span className="ml-1">4.8</span>
                  </div>
                </div>
              </div>
            </section>

            <aside className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4">Sessões Populares</h2>
              <ul className="space-y-2">
                <li className="text-blue-600">Introdução à Programação</li>
                <li className="text-blue-600">Estatística Aplicada</li>
                <li className="text-blue-600">Química Orgânica</li>
              </ul>
            </aside>
          </main>
        </div>
      )}
      ;
    </>
  );
}
