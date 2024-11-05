"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const FooterWrapper = () => {
    const pathname = usePathname();
    const hideFooterRoutes = ["/sign-in", "/sign-up", "/perfil"];

    const shouldHideFooter = hideFooterRoutes.includes(pathname) || pathname.startsWith("/admin");

    return !shouldHideFooter ? <Footer /> : null;
};

export default FooterWrapper;