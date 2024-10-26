import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
const Topbar: React.FC = () => {

    const handleLogout = () => {
        console.log('Logout');
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="text-xl font-semibold text-gray-900">
                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                        Logo
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/sign-in" className="text-gray-700 hover:text-gray-900">
                        Home
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-gray-900">
                        About
                    </Link>
                    <Link href="/services" className="text-gray-700 hover:text-gray-900">
                        Services
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                        Contact
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-0">
                                <Avatar className="w-8 h-8" />
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
        </nav>
    );
};

export default Topbar;
