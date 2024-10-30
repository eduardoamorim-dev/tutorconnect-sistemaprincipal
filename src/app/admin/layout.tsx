import type { Metadata } from "next";
import "./admin.css";
import { AppSidebar } from "@/components/SideBar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


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
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}


