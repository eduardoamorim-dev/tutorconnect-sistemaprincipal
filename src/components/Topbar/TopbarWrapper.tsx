"use client";

import Topbar from "@/components/Topbar/Topbar";
import { usePathname } from "next/navigation";

const TopbarWrapper = () => {
    const pathname = usePathname();
    const hideTopbarRoutes = ["/sign-in", "/sign-out", "/"];

    const isAdminRoute = pathname.includes('/admin');

    return !hideTopbarRoutes.includes(pathname) && !isAdminRoute ? <Topbar /> : null
};

export default TopbarWrapper;
