import type { Metadata } from "next";
import "./globals.css";

import TopbarWrapper from "@/components/Topbar/TopbarWrapper";
import FooterWrapper from "@/components/Footer/FooterWrapper";

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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <TopbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}

