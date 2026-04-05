"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EXCLUDED_PREFIXES = ["/blog", "/publications"];

export default function RouteAtmosphere() {
    const pathname = usePathname();

    useEffect(() => {
        const isExcluded = EXCLUDED_PREFIXES.some((prefix) =>
            pathname.startsWith(prefix)
        );

        document.body.classList.toggle("site-atmosphere", !isExcluded);

        return () => {
            document.body.classList.remove("site-atmosphere");
        };
    }, [pathname]);

    return null;
}