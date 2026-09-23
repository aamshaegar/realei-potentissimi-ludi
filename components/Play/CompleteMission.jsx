"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronRight } from "lucide-react";



function CompleteMission({ completed, canComplete, onComplete, score, setSelectedAuction }) {
    return (
        <AnimatePresence mode="wait">
            {!completed ? (
                <motion.button
                    key="complete"
                    type="button"
                    disabled={!canComplete}
                    onClick={onComplete}
                    whileHover={canComplete ? { y: -2 } : undefined}
                    whileTap={canComplete ? { scale: 0.98 } : undefined}
                    className={["group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-white shadow-lg transition", canComplete ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20" : "cursor-not-allowed bg-slate-300"].join(" ")}>
                    <div>
                        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white/70">Missione</p>
                        <p className="mt-1 font-bold">{canComplete ? "Completa la missione" : "Trova tutti gli indizi"}</p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                        <ChevronRight className="h-5 w-5" />
                    </div>
                </motion.button>
            ) : (
                <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
                >
                    <div className="flex items-center gap-4 group justify-between">

                        <div className="flex items-center justify-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <Check size={21} strokeWidth={3} />
                            </div>

                            <div>
                                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                                    Missione completata
                                </p>
                                <p className="mt-1 font-bold text-emerald-950">Ottimo lavoro! +{score} XP</p>
                            </div>
                        </div>

                        <button onClick={() => setSelectedAuction(null)} className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 transition-transform group-hover:translate-x-1">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CompleteMission