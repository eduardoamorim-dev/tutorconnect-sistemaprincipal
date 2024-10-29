import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { User, Menu, X } from 'lucide-react';
import { Separator } from '../ui/separator';

const Topbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        console.log('Logout');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-md">
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl text-blue-700 font-semibold">
                        Tutor Connect
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
                        <Link href="/" className="text-black hover:text-blue-600 font-semibold">
                            Inicio
                        </Link>
                        <Link href="/searchTutor" className="text-black hover:text-blue-600 font-semibold">
                            Encontrar tutores
                        </Link>
                        <Link href="/TutorApplicationForm" className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-500 transition duration-300 font-semibold">
                            Tornar-se Tutor
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0">
                                    <User className="h-8 w-8 text-blue-700" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href="/profile" passHref>
                                    <DropdownMenuItem>Acessar Perfil</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
                    <Separator className="mb-5" />
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="text-black hover:text-blue-600 font-semibold">
                            Inicio
                        </Link>
                        <Link href="/searchTutor" className="text-black hover:text-blue-600 font-semibold">
                            Encontrar tutores
                        </Link>

                        <Link href="/profile" className="text-black hover:text-blue-600 font-semibold">
                            Acessar Perfil
                        </Link>

                        <Link href="/TutorApplicationForm" className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-500 transition duration-300 text-center font-semibold">
                            Tornar-se Tutor
                        </Link>

                        <Separator className="mb-5" />

                        <Button onClick={handleLogout} className="text-black bg-white hover:bg-white hover:text-blue-600 font-semibold text-left">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;