
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronRight, Euro, FileSearch, FileText, Home, MapPin, Ruler, ScanSearch, Scale, Sparkles, Trophy, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";


function AuctionHeader({ auction, progress }) {
    return (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-600">LIVE CASE · LOTTO {auction.lotto}</span>
                </div>

                <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                    {auction.title}<span className="text-blue-600">.</span>
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-blue-500" />{auction.address}</span>
                    <span className="flex items-center gap-1.5"><Scale className="h-4 w-4 text-violet-500" />{auction.tribunal}</span>
                </div>
            </div>
        </div>
    );
}

export default AuctionHeader