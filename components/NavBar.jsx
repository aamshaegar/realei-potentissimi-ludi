"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    {
        href: "/learn",
        label: "Impara",
        number: "01",
    },
    {
        href: "/play",
        label: "Gioca",
        number: "02",
    },
    {
        href: "/about",
        label: "About",
        number: "",
    },
];

const NavBar = () => {
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-background/50 backdrop-blur-lg">
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-12">

                <Link
                    href="/"
                    className="group flex items-center gap-3"
                    aria-label="Realei home"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                            REALEI
                        </span>

                        <span className="font-mono text-sm text-primary">
                            /
                        </span>
                    </div>

                    <span className="hidden border-l border-border pl-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
                        AI × Real Estate
                    </span>
                </Link>


                <nav aria-label="Main navigation">
                    <ul className="flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`
											group relative flex items-center gap-2
											px-3 py-2
											font-mono text-xs
											transition-colors duration-200
											sm:px-4
											${isActive
                                                ? "text-primary"
                                                : "text-muted hover:text-foreground"
                                            }
										`}
                                    >
                                        {/* Number */}
                                        <span
                                            className={`
												hidden text-[9px] transition-colors duration-200 sm:inline
												${isActive
                                                    ? "text-primary"
                                                    : "text-muted/60 group-hover:text-primary"
                                                }
											`}
                                        >
                                            {item.number}
                                        </span>

                                        {/* Path */}
                                        <span>
                                            /{item.label}
                                        </span>

                                        {/* Active / hover indicator */}
                                        <span
                                            className={`
												absolute bottom-0 left-3 right-3 h-px
												origin-left bg-primary
												transition-transform duration-300 ease-out
												sm:left-4 sm:right-4
												${isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                                }
											`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="h-px w-full bg-border/30" />
        </header>
    );
};

export default NavBar;
