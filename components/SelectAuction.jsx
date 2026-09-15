"use client";

import React from "react";
import { Check, MapPin } from "lucide-react";
import { AUCTIONS } from "@/utils/auctions";

const SelectAuction = ({ selectedAuction, onSelect }) => {
    return (
        <section>
            <header className="max-w-3xl">
                <div className="mb-5 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">02 · AI GAME</span>
                </div>

                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Trova le informazioni<span className="text-primary">.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                    Leggi la documentazione dell&apos;asta, usa un LLM per cercare le informazioni mancanti e completa la scheda dell&apos;immobile.
                </p>
            </header>

            <div className="mb-8 mt-14 flex items-end justify-between">
                <div>
                    <h2 className="mt-3 flex items-center gap-3 text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
                        <span className="h-3 w-3 rounded-full bg-primary" />
                        Scegli un&apos;asta
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                        Seleziona un immobile per iniziare l&apos;analisi della documentazione.
                    </p>
                </div>

                <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
                    {String(AUCTIONS.length).padStart(2, "0")} AUCTIONS
                </span>
            </div>

            <div className="mx-auto overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="grid min-h-[420px] md:grid-cols-2">
                    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-primary">
                        <div className="absolute h-[320px] w-[320px] rounded-full border border-primary-foreground/10" />
                        <div className="absolute h-[220px] w-[220px] rounded-full border border-primary-foreground/10" />

                        <MapPin strokeWidth={1.2} className="relative z-10 h-52 w-52 text-primary-foreground transition-transform duration-500 hover:scale-105" />

                        <div className="absolute bottom-6 left-6">
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary-foreground/60">REAL-EI</p>
                        </div>
                    </div>

                    <div className="flex flex-col p-6 sm:p-8">
                        <div className="mb-5">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">SELECT PROPERTY</p>
                            <p className="mt-1 text-sm text-text-secondary">Quale asta vuoi analizzare?</p>
                        </div>

                        <div className="space-y-1.5">
                            {AUCTIONS.map((auction, index) => {
                                const selected = selectedAuction?.id === auction.id;

                                return (
                                    <button
                                        key={auction.id}
                                        type="button"
                                        onClick={() => onSelect(auction)}
                                        className={`group flex w-full items-center gap-4 rounded-lg border p-5 text-left transition-all duration-200 ${selected ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"}`}
                                    >
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted group-hover:border-primary/50"}`}>
                                            {selected ? (
                                                <Check className="h-3 w-3" />
                                            ) : (
                                                <span className="font-mono text-[9px]">{String(index + 1).padStart(2, "0")}</span>
                                            )}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-text-primary">{auction.title}</p>

                                            <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                                                <MapPin className="h-2.5 w-2.5 shrink-0 text-primary" />
                                                <span className="truncate">{auction.location}</span>
                                            </div>
                                        </div>

                                        <span className="hidden shrink-0 rounded-md border border-border-subtle px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-muted sm:block">
                                            {auction.type}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 animate-bounce text-center font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Seleziona un&apos;asta per continuare →
            </div>
        </section>
    );


};

export default SelectAuction;