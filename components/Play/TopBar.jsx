import React from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronRight, Euro, FileSearch, FileText, Home, MapPin, Ruler, ScanSearch, Scale, Sparkles, Trophy, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";


function TopBar({setSelectedAuction }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <motion.button
                type="button"
                onClick={() => setSelectedAuction(null)}
                whileHover={{ scale: 1.06, x: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                aria-label="Torna indietro"
            >
                <ArrowLeft size={19} strokeWidth={2.5} />
            </motion.button>

            <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">Missione · Analizza l&apos;asta</span>
            </div>

        </div>
    );
}


export default TopBar