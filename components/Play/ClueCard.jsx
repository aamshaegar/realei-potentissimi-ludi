"use client";


import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";


const COLOR_MAP = {
    blue: { soft: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-600" },
    emerald: { soft: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600" },
    violet: { soft: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-600" },
    amber: { soft: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-600" },
};


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

export default ClueCard