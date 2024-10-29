import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const linkedin = { href: 'https://www.linkedin.com/in/eduardoamorim-dev/' }

    const socialLinks = [
        {
            name: 'Instagram',
            icon: <Instagram className="w-5 h-5" />,
            href: 'https://instagram.com/seuuser',
        },
        // {
        //     name: 'Discord',
        //     icon: <Discord className="w-5 h-5" />,
        //     href: 'https://discord.gg/seuserver',
        // },
    ];

    const containerAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer
            initial="hidden"
            animate="visible"
            variants={containerAnimation}
            className="bg-gray-100 text-gray-900 py-2 mt-auto"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.div variants={itemAnimation}>
                        <h3 className="text-xl font-semibold mt-2">Conecte-se conosco</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.name}
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-gray-800 transition-colors"
                                    asChild
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.name}
                                    >
                                        {link.icon}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemAnimation}
                        className="flex flex-col items-center md:items-end gap-2"
                    >
                        <p className="text-sm text-gray-900">
                            © {currentYear} Tutor Connect. Todos os direitos reservados.
                        </p>
                        <motion.div
                            className="flex items-center gap-1 text-sm text-gray-900"
                            whileHover={{ scale: 1.05 }}
                        >
                            Feito com <Heart className="w-4 h-4 text-red-500" /> por
                            <a
                                href={linkedin.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-500 hover:underline"
                            >
                                Eduardo Amorim
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;