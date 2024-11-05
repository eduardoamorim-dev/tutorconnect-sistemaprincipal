"use client"

import React from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { CheckCircleIcon, LightbulbIcon, ClockIcon, UsersIcon } from 'lucide-react';

const Home: NextPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="flex flex-col min-h-screen">
            <motion.div
                className="flex-1"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <section className="bg-complex-gradient text-white flex flex-col justify-center items-center p-28 relative">
                    <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        Transforme seu aprendizado com nosso Sistema de Tutoria Universitária
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-base md:text-lg mb-8 text-center">
                        Conecte-se com tutores e aproveite a conveniência de aulas presenciais ou virtuais.
                    </motion.p>
                    <motion.a
                        variants={itemVariants}
                        href="/tutor/lista"
                        className="bg-white text-violet-700 font-medium py-3 px-6 rounded hover:bg-gray-200"
                    >
                        Encontrar Tutor
                    </motion.a>
                </section>

                <section className="flex flex-col justify-center items-center p-8 mb-16">
                    <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-8 mt-20 text-center">
                        Principais Benefícios
                    </motion.h2>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center space-y-2">
                            <CheckCircleIcon className="text-green-500" size={32} />
                            <div className="text-center">
                                <h3 className="font-medium text-lg">Processo Estruturado</h3>
                                <p className="text-gray-600">
                                    Plataforma dedicada com fluxo claro desde o cadastro até a avaliação pós-tutoria.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <UsersIcon className="text-violet-500" size={32} />
                            <div className="text-center">
                                <h3 className="font-medium text-lg">Ampla Rede de Tutores</h3>
                                <p className="text-gray-600">
                                    Acesso a uma vasta base de tutores além do seu círculo social.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
                        <div className="flex flex-col items-center space-y-2">
                            <LightbulbIcon className="text-yellow-500" size={32} />
                            <div className="text-center">
                                <h3 className="font-medium text-lg">Tutores Selecionados</h3>
                                <p className="text-gray-600">
                                    Tutores avaliados por professores, garantindo a qualidade e competência no suporte aos alunos.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <ClockIcon className="text-gray-500" size={32} />
                            <div className="text-center">
                                <h3 className="font-medium text-lg">Conveniência e Flexibilidade</h3>
                                <p className="text-gray-600">
                                    Agende sessões presenciais ou virtuais conforme sua necessidade.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </motion.div>
        </div>
    );
};

export default Home;