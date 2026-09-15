import React from "react";

const Footer = () => {
    return (
        <footer className="border-t border-border/40 bg-background transition-colors duration-300">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted lg:px-12">
                <span>REAL-EI</span>

                <div className="hidden items-center gap-3 sm:flex">
                    <span className="h-px w-8 bg-border" />
                    <span>Notte dei Ricercatori</span>
                    <span className="h-px w-8 bg-border" />
                </div>

                <span>26/09/2026</span>
            </div>
        </footer>
    );
};

export default Footer;
