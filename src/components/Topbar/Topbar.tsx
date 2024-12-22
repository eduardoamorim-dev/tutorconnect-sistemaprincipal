"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, Menu, X, LogOut, GraduationCap } from "lucide-react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";

const Topbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/sign-out");
            router.push("/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-md">
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center text-xl text-violet-700 font-semibold space-x-1"
                    >
                        <GraduationCap className="w-6 h-6" />
                        <span>Tutor Connect</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            className="p-2"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            href="https://tutorconnect-br.vercel.app"
                            className="text-black hover:text-violet-600 font-semibold"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/"
                            className="text-black hover:text-violet-600 font-semibold"
                        >
                            Encontrar tutores
                        </Link>

                        {/* <Link href="/tutor/candidatura" className="bg-violet-700 text-white px-6 py-3 rounded-2xl hover:bg-violet-600 transition duration-300 font-semibold">
                            Tornar-se Tutor
                        </Link> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0">
                                    <User className="h-8 w-8 text-violet-700" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href="/perfil" passHref>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User /> Acessar Perfil
                                    </DropdownMenuItem>
                                </Link>
                                {/* <Link href="/tutor/agenda" passHref >
                                    <DropdownMenuItem className="cursor-pointer"><CalendarIcon />{" "}Gerenciar Agenda</DropdownMenuItem>
                                </Link> */}
                                {/* <Link href="/admin" passHref >
                                    <DropdownMenuItem className="cursor-pointer"><Settings />{" "}Acessar Administração</DropdownMenuItem>
                                </Link> */}
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer"
                                >
                                    <LogOut /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden ${
                        isMenuOpen ? "block" : "hidden"
                    } pt-4`}
                >
                    <Separator className="mb-5" />
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="https://tutorconnect-br.vercel.app/"
                            passHref
                            className="text-black hover:text-violet-600 font-semibold"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/"
                            passHref
                            className="text-black hover:text-violet-600 font-semibold cursor-pointer"
                        >
                            Encontrar tutores
                        </Link>

                        <Link
                            href="/perfil"
                            passHref
                            className="text-black hover:text-violet-600 font-semibold cursor-pointer"
                        >
                            Acessar Perfil
                        </Link>

                        {/* <Link href="/tutor/agenda" passHref className="text-black hover:text-violet-600 font-semibold cursor-pointer" >
                            Gerenciar Agenda
                        </Link>

                        <Link href="/tutor/candidatura" passHref className="bg-violet-700 text-white px-6 py-3 rounded-2xl hover:text-violet-600 transition duration-300 text-center font-semibold cursor-pointer">
                            Tornar-se Tutor
                        </Link> */}

                        <Separator className="mb-5" />

                        <Button
                            onClick={handleLogout}
                            className="text-black bg-white hover:bg-white hover:text-violet-600 font-semibold text-left"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
