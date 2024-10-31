"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./AppSideBar";

const SidebarWrapper = () => {
    const pathname = usePathname();
    const hideSidebarRoutes = ["/sign-in", "/sign-up", "/footer"];

    return !hideSidebarRoutes.includes(pathname) ? <AppSidebar /> : null;
};

export default SidebarWrapper;