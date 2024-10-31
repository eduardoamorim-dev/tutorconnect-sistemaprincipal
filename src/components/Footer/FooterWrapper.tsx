"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const FooterWrapper = () => {
    const pathname = usePathname();
    const hideFooterRoutes = ["/sign-in", "/sign-up", "/footer"];

    return !hideFooterRoutes.includes(pathname) ? <Footer /> : null;
};

export default FooterWrapper;