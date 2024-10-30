"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSidebar";

const SidebarWrapper = () => {
    const pathname = usePathname();
    const hideSidebarRoutes = ["/sign-in", "/sign-out", "/footer"];

    return !hideSidebarRoutes.includes(pathname) ? <AppSidebar /> : null;
};

export default SidebarWrapper;
