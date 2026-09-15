import Swal from "sweetalert2";
import React, { useState } from "react";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function AIAssistant({ llmPayload, onAskAI }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleOpen = () => {
        setOpen(true);
        onAskAI?.();
    };

    const handleClose = () => setOpen(false);

    const handleSend = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();
        setMessage("");

        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage },
        ]);

        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    metadata: llmPayload.metadata,
                    auction: llmPayload.auction,
                    documents: llmPayload.documents,
                    history: messages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "AI request failed");
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.message,
                },
            ]);
        } catch (error) {
            // console.error("AI ERROR:", error);

            Swal.fire({
                icon: "error",
                title: "Oops 😳",
                text: error.message || "Realei non riesce a rispondere in questo momento.",
                confirmButtonText: "Riprova",
                confirmButtonColor: "#2563eb",
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Ops! Non riesco a rispondere in questo momento. Riprova tra poco.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* AI ASSISTANT CARD */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                            <Sparkles className="h-5 w-5 text-blue-400" />
                        </div>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
                            AI Assistant
                        </span>
                    </div>

                    <h3 className="mt-5 text-xl font-black">
                        Hai trovato tutti gli indizi?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Chiedi all&apos;AI di analizzare i documenti e aiutarti a capire meglio l&apos;asta.
                    </p>

                    <motion.button
                        type="button"
                        onClick={handleOpen}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-blue-50"
                    >
                        <span>Chiedi all&apos;AI</span>
                        <ArrowUpRight className="h-4 w-4" />
                    </motion.button>
                </div>
            </div>

            {/* CHAT MODAL */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-[90] bg-slate-950/40"
                        />

                        {/* CHAT */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0.8 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-x-0 bottom-0 z-[100] mx-auto w-full max-w-2xl overflow-hidden rounded-t-[2rem] border border-slate-200 bg-white shadow-2xl"
                        >
                            {/* HANDLE */}
                            <div className="flex justify-center pt-3">
                                <div className="h-1.5 w-12 rounded-full bg-slate-200" />
                            </div>

                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                                        <Sparkles className="h-5 w-5 text-blue-600" />
                                    </div>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            Assistente AI
                                        </p>

                                        <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-emerald-500">
                                            Online · Analisi asta
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={handleClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                                    aria-label="Chiudi assistente"
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            </div>

                            {/* MESSAGES */}
                            <div className="h-[55vh] max-h-[520px] overflow-y-auto bg-slate-50/70 px-5 py-6">
                                <div className="space-y-4">
                                    <div className="space-y-4">
                                        {messages.length === 0 && (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                                    <Sparkles className="h-4 w-4" />
                                                </div>

                                                <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                                                    Ciao! 👋 Sono Realei. Posso aiutarti a leggere e capire i documenti di questa asta.
                                                </div>
                                            </div>
                                        )}

                                        {messages.map((item, index) => {
                                            const isUser = item.role === "user";

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`flex ${isUser ? "justify-end" : "items-start gap-3"}`}
                                                >
                                                    {!isUser && (
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                                            <Sparkles className="h-4 w-4" />
                                                        </div>
                                                    )}

                                                    <div
                                                        className={
                                                            isUser
                                                                ? "max-w-[80%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm text-white"
                                                                : "max-w-[80%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                                                        }
                                                    >
                                                        {item.content}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {loading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                                                <Sparkles className="h-4 w-4" />
                                            </div>

                                            <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                                                <div className="flex gap-1">
                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* INPUT */}
                            <div className="border-t border-slate-100 bg-white p-4">
                                <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-colors focus-within:border-blue-400 focus-within:bg-white">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSend();
                                            }
                                        }}
                                        placeholder="Chiedi qualcosa sull'asta..."
                                        rows={1}
                                        className="max-h-28 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                    />

                                    <motion.button
                                        type="button"
                                        onClick={handleSend}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={!message.trim() || loading}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all disabled:cursor-not-allowed disabled:opacity-40"
                                        aria-label="Invia messaggio"
                                    >
                                        <Send className="h-4 w-4" />
                                    </motion.button>
                                </div>

                                <p className="mt-2 text-center font-mono text-[8px] text-slate-400">
                                    Invio per mandare · Shift + Invio per andare a capo
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* FLOATING BUTTON */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        type="button"
                        onClick={() => setOpen(true)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-[80] flex h-20 w-20 items-center justify-center rounded-full border border-blue-700/40 bg-blue-600 shadow-xl shadow-blue-600/25 transition-colors hover:bg-blue-700 sm:bottom-8 sm:right-8"
                        aria-label="Apri assistente AI"
                    >
                        <span className="absolute inset-1 rounded-full border border-blue-400/30 bg-blue-500/20" />

                        <img
                            src="/icons/agent/State=Joy.svg"
                            alt="Assistente AI"
                            className="relative h-16 w-16 object-contain"
                        />

                        <span className="absolute right-1 top-1 h-4 w-4 rounded-full border-2 border-blue-600 bg-emerald-400" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}

export default AIAssistant;
