"use client";

import { motion } from "motion/react";
import { ChevronRight, FileSearch } from "lucide-react";

function DocumentButton({ onClick }) {
    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8">
            <motion.button
                type="button"
                onClick={onClick}
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                className="group flex w-full items-center justify-between overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-5 text-left text-white shadow-xl shadow-blue-500/15"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <FileSearch className="h-6 w-6" />
                    </div>

                    <div>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-100">
                            Intelligence Room
                        </p>
                        <h2 className="mt-1 text-lg font-bold">Leggi i documenti dell&apos;asta</h2>
                        <p className="mt-0.5 text-sm text-blue-100">3 documenti disponibili · trova gli indizi</p>
                    </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                    <ChevronRight className="h-5 w-5" />
                </div>
            </motion.button>
        </motion.div>
    );
}


export default DocumentButton