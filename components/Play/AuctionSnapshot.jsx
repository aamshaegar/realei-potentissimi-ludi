"use client";

import { Sparkles } from "lucide-react";


function AuctionSnapshot({ auction }) {
    const items = [
        ["ID asta", auction.id, "font-bold text-slate-900"],
        ["Località", auction.location, "font-bold text-slate-900"],
        ["Categoria", auction.category ?? auction.type, "text-right text-sm font-bold text-slate-900"],
    ];

    return (
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                </div>

                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-violet-600">
                    Auction Snapshot
                </p>
            </div>

            <div className="mt-5 space-y-4">
                {items.map(([label, value, valueClass], index) => (
                    <div
                        key={label}
                        className={`flex items-center justify-between ${index < items.length - 1 ? "border-b border-slate-100 pb-4" : ""}`}
                    >
                        <span className="text-sm text-slate-500">{label}</span>
                        <span className={valueClass}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default AuctionSnapshot