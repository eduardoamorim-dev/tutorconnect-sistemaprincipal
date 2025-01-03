import type { Metadata } from "next";
import "./globals.css";

import TopbarWrapper from "@/components/Topbar/TopbarWrapper";
import FooterWrapper from "@/components/Footer/FooterWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Tutor Connect",
    description: "Create by Eduardo Amorim",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <body className="min-h-screen flex flex-col">
                <TopbarWrapper />
                <main className="flex-1">{children}</main>
                <FooterWrapper />
                <Toaster richColors />
            </body>
        </html>
    );
}
