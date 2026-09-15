"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, ChevronRight, Euro, FileSearch, FileText, Home, Ruler, ScanSearch, Sparkles, X } from "lucide-react";

import AnimatedBackground from "./Play/AnimatedBackground";
import AIAssistant from "./Play/AIAssistant";
import AuctionHeader from "./Play/AuctionHeader";
import DocumentModal from "./Play/DocumentModal";
import TopBar from "./Play/TopBar";


const COLOR_MAP = {
    blue: { soft: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600" },
    emerald: { soft: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600" },
    violet: { soft: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-600" },
    amber: { soft: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-600" },
};

function getDocuments(auctionId) {
    return [
        {
            id: "avviso",
            label: "Avviso",
            description: "Avviso di vendita",
            file: `/auctions/${auctionId}/avviso.pdf`,
            color: "bg-blue-500",
            light: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            id: "ordinanza",
            label: "Ordinanza",
            description: "Ordinanza di vendita",
            file: `/auctions/${auctionId}/ordinanza.pdf`,
            color: "bg-violet-500",
            light: "bg-violet-50",
            text: "text-violet-600",
        },
        {
            id: "perizia",
            label: "Perizia",
            description: "Perizia dell'immobile",
            file: `/auctions/${auctionId}/perizia.pdf`,
            color: "bg-amber-500",
            light: "bg-amber-50",
            text: "text-amber-600",
        },
    ];
}

function normalizeText(value) {
    return String(value ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function normalizeNumber(value) {
    if (value === null || value === undefined) return null;

    const normalized = String(value)
        .replace(/[€\s]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
}

function getSurfaceAnswer(metadata) {
    const description = metadata?.beni?.[0]?.descrizione ?? "";
    const match = description.match(/superficie commerciale di\s+([\d.,]+)\s*mq/i);
    return match?.[1] ?? null;
}

function getPriceAnswer(metadata) {
    return metadata?.prezzoBaseAsta ?? null;
}

function getDateAnswer(metadata) {
    return metadata?.dataOraVendita ?? null;
}

function getOccupationAnswer(metadata) {
    return metadata?.beni?.[0]?.disponibilitaDesc ?? null;
}

const CLUE_DEFINITIONS = [
    {
        id: "superficie",
        icon: Ruler,
        label: "Superficie",
        question: "Qual è la superficie commerciale dell'immobile?",
        placeholder: "Es. 45,00 m²",
        color: "blue",
        points: 100,
        getAnswer: getSurfaceAnswer,
        check: (userValue, metadata) => {
            const user = normalizeNumber(userValue);
            const expected = normalizeNumber(getSurfaceAnswer(metadata));
            return user !== null && expected !== null && user === expected;
        },
    },
    {
        id: "prezzoBase",
        icon: Euro,
        label: "Prezzo base",
        question: "Qual è il prezzo base d'asta?",
        placeholder: "Es. € 100.000",
        color: "emerald",
        points: 150,
        getAnswer: getPriceAnswer,
        check: (userValue, metadata) => {
            const user = normalizeNumber(userValue);
            const expected = normalizeNumber(getPriceAnswer(metadata));
            return user !== null && expected !== null && user === expected;
        },
    },
    {
        id: "dataAsta",
        icon: CalendarDays,
        label: "Data dell'asta",
        question: "Quando si svolge l'asta?",
        placeholder: "Es. 01/08/2026 11:00",
        color: "violet",
        points: 200,
        getAnswer: getDateAnswer,
        check: (userValue, metadata) => {
            const expected = getDateAnswer(metadata);
            if (!expected || !userValue?.trim()) return false;

            const date = new Date(expected);
            if (Number.isNaN(date.getTime())) return false;

            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = String(date.getFullYear());
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const normalized = normalizeText(userValue);
            const dateCorrect = normalized.includes(`${day}/${month}/${year}`) || normalized.includes(`${day}-${month}-${year}`);
            const timeCorrect = normalized.includes(`${hours}:${minutes}`);
            return dateCorrect && timeCorrect;
        },
    },
    {
        id: "occupazione",
        icon: Home,
        label: "Occupazione",
        question: "Qual è lo stato di occupazione dell'immobile?",
        placeholder: "Es. occupato dal debitore",
        color: "amber",
        points: 150,
        getAnswer: getOccupationAnswer,
        check: (userValue, metadata) => {
            const expected = normalizeText(getOccupationAnswer(metadata));
            const user = normalizeText(userValue);
            if (!expected || !user) return false;
            const keywords = ["occupato", "occupata", "debitore"];
            const matches = keywords.filter((keyword) => user.includes(keyword));
            return expected.includes("occupat") && expected.includes("debitore") && matches.length >= 2;
        },
    },
];



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

function ClueCard({ clue, index, value, result, onChange, onCheck, disabled }) {
    const Icon = clue.icon;
    const colors = COLOR_MAP[clue.color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.08 }}
            className={`relative overflow-hidden rounded-2xl border ${colors.border} bg-white p-5 shadow-sm`}
        >
            <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full ${colors.soft}`} />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.soft}`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-[8px] font-bold text-slate-400">
                        +{clue.points} XP
                    </span>
                </div>

                <p className="mt-4 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    {clue.label}
                </p>

                <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">{clue.question}</p>

                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        value={value}
                        disabled={disabled || result === true}
                        onChange={(event) => onChange(clue.id, event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") onCheck(clue);
                        }}
                        placeholder={clue.placeholder}
                        className={[
                            "min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none transition",
                            "placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500/20",
                            result === true
                                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                : result === false
                                    ? "border-red-300 bg-red-50 text-red-800"
                                    : "border-slate-200 bg-slate-50 text-slate-900",
                        ].join(" ")}
                    />

                    <button
                        type="button"
                        onClick={() => onCheck(clue)}
                        disabled={disabled || !value?.trim() || result === true}
                        className={[
                            "rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40",
                            result === true
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-900 text-white hover:bg-slate-800",
                        ].join(" ")}
                    >
                        {result === true ? <Check className="h-4 w-4" strokeWidth={3} /> : "Check"}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {result === true && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-600"
                        >
                            <Check className="h-4 w-4" strokeWidth={3} />
                            Risposta corretta! +{clue.points} XP
                        </motion.div>
                    )}

                    {result === false && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 flex items-center gap-2 text-sm font-medium text-red-500"
                        >
                            <X className="h-4 w-4" />
                            Non ancora. Continua a investigare.
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function MissionPanel({ auction, clueAnswers, clueResults, onChange, onCheck, metadataLoaded }) {
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
                                Missione 01
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

function CompleteMission({ completed, canComplete, onComplete, score }) {
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
                    className={[
                        "group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-white shadow-lg transition",
                        canComplete
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20"
                            : "cursor-not-allowed bg-slate-300",
                    ].join(" ")}
                >
                    <div>
                        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-white/70">Missione</p>
                        <p className="mt-1 font-bold">
                            {canComplete ? "Completa la missione" : "Trova tutti gli indizi"}
                        </p>
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
                    <div className="flex items-center gap-4">
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
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function PlayGame({ auction = selectedAuction, setSelectedAuction, onAskAI }) {
    const documents = useMemo(() => getDocuments(auction.id), [auction.id]);

    const [metadata, setMetadata] = useState(null);
    const [metadataLoading, setMetadataLoading] = useState(true);
    const [clueAnswers, setClueAnswers] = useState({
        superficie: "",
        prezzoBase: "",
        dataAsta: "",
        occupazione: "",
    });
    const [clueResults, setClueResults] = useState({
        superficie: null,
        prezzoBase: null,
        dataAsta: null,
        occupazione: null,
    });
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [activeDocument, setActiveDocument] = useState(documents[0]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadMetadata() {
            setMetadataLoading(true);
            setMetadata(null);

            try {
                const response = await fetch(`/auctions/${auction.id}/metadata.json`, {
                    cache: "no-store",
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                if (!cancelled) setMetadata(data);
            } catch (error) {
                console.error("Error loading auction metadata:", error);
                if (!cancelled) setMetadata(null);
            } finally {
                if (!cancelled) setMetadataLoading(false);
            }
        }

        loadMetadata();

        return () => {
            cancelled = true;
        };
    }, [auction.id]);

    useEffect(() => {
        setClueAnswers({
            superficie: "",
            prezzoBase: "",
            dataAsta: "",
            occupazione: "",
        });

        setClueResults({
            superficie: null,
            prezzoBase: null,
            dataAsta: null,
            occupazione: null,
        });

        setCompleted(false);
    }, [auction.id]);

    useEffect(() => {
        setActiveDocument(documents[0]);
    }, [documents]);

    const handleClueChange = (id, value) => {
        setClueAnswers((previous) => ({ ...previous, [id]: value }));
        setClueResults((previous) => ({ ...previous, [id]: null }));
    };

    const handleCheckClue = (clue) => {
        if (!metadata) return;

        const userAnswer = clueAnswers[clue.id];
        if (!userAnswer?.trim()) return;

        const correct = clue.check(userAnswer, metadata);

        setClueResults((previous) => {
            const next = { ...previous, [clue.id]: correct };

            if (CLUE_DEFINITIONS.every((item) => next[item.id] === true)) {
                setCompleted(true);
            }

            return next;
        });
    };

    const score = useMemo(
        () =>
            CLUE_DEFINITIONS.reduce(
                (total, clue) => total + (clueResults[clue.id] === true ? clue.points : 0),
                0
            ),
        [clueResults]
    );

    const correctClues = CLUE_DEFINITIONS.filter((clue) => clueResults[clue.id] === true).length;
    const progress = completed ? 100 : Math.round((correctClues / CLUE_DEFINITIONS.length) * 100);
    const canComplete = correctClues === CLUE_DEFINITIONS.length;

    const llmPayload = useMemo(
        () => ({
            auctionId: auction.id,
            auction,
            metadata,
            documents: documents.map((document) => ({
                name: document.label,
                description: document.description,
                url: document.file,
            })),
            discoveredClues: Object.entries(clueAnswers)
                .filter(([, value]) => value?.trim())
                .map(([id, answer]) => ({
                    id,
                    answer,
                    correct: clueResults[id] === true,
                })),
        }),
        [auction, metadata, documents, clueAnswers, clueResults]
    );

    const handleAskAI = () => onAskAI?.(llmPayload);

    return (
        <section className="relative min-h-screen overflow-hidden pb-24">
            <AnimatedBackground />

            <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-12">
                <TopBar setSelectedAuction={setSelectedAuction} />

                <AuctionHeader auction={auction} progress={progress} />

                <DocumentButton onClick={() => setDocumentsOpen(true)} />

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <MissionPanel
                        auction={auction}
                        clueAnswers={clueAnswers}
                        clueResults={clueResults}
                        onChange={handleClueChange}
                        onCheck={handleCheckClue}
                        metadataLoaded={!metadataLoading && !!metadata}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-col gap-6"
                    >
                        <AuctionSnapshot auction={auction} />
                        <AIAssistant llmPayload={llmPayload} onAskAI={handleAskAI} />
                        <CompleteMission
                            completed={completed}
                            canComplete={canComplete}
                            score={score}
                            onComplete={() => setCompleted(true)}
                        />
                    </motion.div>
                </div>
            </div>

            <DocumentModal DOCUMENTS={documents} open={documentsOpen} activeDocument={activeDocument} setActiveDocument={setActiveDocument} onClose={() => setDocumentsOpen(false)}/>
        </section>
    );
}
