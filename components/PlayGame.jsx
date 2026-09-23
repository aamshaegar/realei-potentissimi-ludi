"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { CLUE_DEFINITIONS } from "@/utils/clue";

import TopBar from "./Play/TopBar";
import AIAssistant from "./Play/AIAssistant";
import AuctionHeader from "./Play/AuctionHeader";
import DocumentModal from "./Play/DocumentModal";
import MissionPanel from "./Play/MissionPanel";
import CompleteMission from "./Play/CompleteMission";
import AuctionSnapshot from "./Play/AuctionSnapshot";
import DocumentButton from "./Play/DocumentButton";
import AnimatedBackground from "./Play/AnimatedBackground";



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







export default function PlayGame({ auction, setSelectedAuction, onAskAI }) {
    const documents = useMemo(() => getDocuments(auction.id), [auction.id]);

    const [metadata, setMetadata] = useState(null);
    const [metadataLoading, setMetadataLoading] = useState(true);
    const [matchJson, setMatchJson] = useState(null);
    const [matchJsonLoading, setMatchJsonLoading] = useState(true);

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
        let cancelled = false;

        async function loadMatchJson() {
            setMatchJsonLoading(true);
            setMatchJson(null);

            try {
                const response = await fetch(`/auctions/${auction.id}/response.json`, {
                    cache: "no-store",
                });

                if (!response.ok) { throw new Error(`HTTP ${response.status}`); }
                const data = await response.json();
                if (!cancelled) { setMatchJson(data); }

            } catch (error) {
                console.error("Error loading match JSON:", error);
                if (!cancelled) {setMatchJson(null);}

            } finally {
                if (!cancelled) {
                    setMatchJsonLoading(false);
                }
            }
        }

        loadMatchJson();
        return () => {cancelled = true;};
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
        const correct = clue.check(userAnswer, matchJson);

        setClueResults((previous) => {
            const next = { ...previous, [clue.id]: correct };
            if (CLUE_DEFINITIONS.every((item) => next[item.id] === true)) {
                setCompleted(true);
            }

            return next;
        });
    };

    const score = useMemo(() => CLUE_DEFINITIONS.reduce((total, clue) => total + (clueResults[clue.id] === true ? clue.points : 0), 0), [clueResults]);
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
            discoveredClues: Object.entries(clueAnswers).filter(([, value]) => value?.trim()).map(([id, answer]) => ({
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
                            setSelectedAuction={setSelectedAuction}
                            completed={completed}
                            canComplete={canComplete}
                            score={score}
                            onComplete={() => setCompleted(true)}
                        />
                    </motion.div>
                </div>
            </div>

            <DocumentModal DOCUMENTS={documents} open={documentsOpen} activeDocument={activeDocument} setActiveDocument={setActiveDocument} onClose={() => setDocumentsOpen(false)} />
        </section>
    );
}
