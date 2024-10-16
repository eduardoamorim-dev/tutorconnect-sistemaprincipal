import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tutor Connect",
  description: "Create by Eduardo Amorim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
