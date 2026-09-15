"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const LANDING_PATH = [
    "/",
]

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const isDark = theme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <div className={`fixed ${LANDING_PATH.includes(pathname) ? "sm:right-5 sm:top-6 bottom-5 right-5": "right-5 top-6 "} z-50`}>
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Attiva tema chiaro" : "Attiva tema scuro"}
                title={isDark ? "Tema chiaro" : "Tema scuro"}
                className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all duration-200 hover:bg-surface-muted hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <span className={`transition-transform duration-500 ease-out group-hover:rotate-45`}>
                    {isDark ? (
                        <Moon size={19} strokeWidth={2} aria-hidden="true" />
                    ) : (
                        <Sun size={19} strokeWidth={2} aria-hidden="true" />
                    )}
                </span>
            </button>
        </div>
    );
}

