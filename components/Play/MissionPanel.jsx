"use client";


import { motion } from "motion/react";
import { ScanSearch } from "lucide-react";
import ClueCard from "./ClueCard";
import { CLUE_DEFINITIONS } from "@/utils/clue";


function MissionPanel({ clueAnswers, clueResults, onChange, onCheck, metadataLoaded }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-900/5 backdrop-blur"
        >
            <div className="border-b border-slate-100 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                                <ScanSearch className="h-4 w-4 text-blue-600" />
                            </div>

                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-600">
                                Missione
                            </p>
                        </div>

                        <h2 className="mt-3 text-xl font-bold text-slate-900">Ricostruisci la scheda</h2>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Esamina i documenti e raccogli tutte le informazioni dell&apos;immobile.
                        </p>
                    </div>

                    {!metadataLoaded && (
                        <span className="rounded-full bg-amber-50 px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wider text-amber-600">
                            Caricamento...
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-3 p-6 sm:grid-cols-2">
                {CLUE_DEFINITIONS.map((clue, index) => (
                    <ClueCard
                        key={clue.id}
                        clue={clue}
                        index={index}
                        value={clueAnswers[clue.id]}
                        result={clueResults[clue.id]}
                        onChange={onChange}
                        onCheck={onCheck}
                        disabled={!metadataLoaded}
                    />
                ))}
            </div>


        </motion.div>
    );
}

export default MissionPanel