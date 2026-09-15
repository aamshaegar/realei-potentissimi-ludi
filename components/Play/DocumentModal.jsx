import React from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronRight, Euro, FileSearch, FileText, Home, MapPin, Ruler, ScanSearch, Scale, Sparkles, Trophy, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";




function DocumentModal({ DOCUMENTS, open, activeDocument, setActiveDocument, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed inset-x-4 bottom-4 top-4 z-50 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:inset-x-8 sm:bottom-8 sm:top-8"
                    >
                        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10"><FileSearch className="h-5 w-5 text-blue-600" /></div>
                                <div>
                                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-blue-600">Intelligence Room</p>
                                    <h2 className="font-bold text-slate-900">Documenti dell&apos;asta</h2>
                                </div>
                            </div>

                            <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900" aria-label="Chiudi">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]">
                            <div className="overflow-y-auto border-b border-slate-100 p-4 lg:border-b-0 lg:border-r">
                                <p className="mb-3 px-2 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">Documenti disponibili</p>

                                <div className="space-y-2">
                                    {DOCUMENTS.map((document) => {
                                        const isActive = activeDocument.id === document.id;

                                        return (
                                            <motion.button
                                                key={document.id}
                                                type="button"
                                                onClick={() => setActiveDocument(document)}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${isActive ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"}`}
                                            >
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${document.light}`}>
                                                    <FileText className={`h-5 w-5 ${document.text}`} />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-900">{document.label}</p>
                                                    <p className="mt-0.5 truncate text-xs text-slate-400">{document.description}</p>
                                                </div>

                                                {isActive && <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-blue-500" />}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative min-h-0 bg-slate-100">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDocument.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex flex-col"
                                    >
                                        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{activeDocument.description}</p>
                                                <p className="font-mono text-[8px] uppercase tracking-wider text-slate-400">PDF · DOCUMENTO UFFICIALE</p>
                                            </div>

                                            <a
                                                href={activeDocument.file}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600"
                                            >
                                                Apri
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </a>
                                        </div>

                                        <iframe title={activeDocument.description} src={activeDocument.file} className="min-h-0 w-full flex-1" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default DocumentModal