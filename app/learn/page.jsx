
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ShieldAlert,
} from "lucide-react";

import FadeComponent from "@/components/FadeComponent";
import { slides } from "@/utils/slides";







export default function LearnPage() {
    const [current, setCurrent] = useState(0);
    const slide = slides[current];
    const Icon = slide.icon;

    const next = () => {
        setCurrent((value) => Math.min(value + 1, slides.length - 1));
    };

    const previous = () => {
        setCurrent((value) => Math.max(value - 1, 0));
    };

    return (
        <FadeComponent>
            <main className="min-h-screen overflow-hidden bg-background text-foreground">
                <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-12">

                    {/* Header */}
                    <header className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                        >
                            <ArrowLeft
                                size={16}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            Home
                        </Link>

                        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                            Realei · Learn
                        </div>
                    </header>

                    {/* Progress */}
                    <div className="mt-8">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="font-mono text-xs uppercase tracking-wider text-muted">
                                Impara l'AI
                            </span>

                            <span className="font-mono text-xs text-muted">
                                {String(current + 1).padStart(2, "0")} /{" "}
                                {String(slides.length).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            {slides.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    aria-label={`Vai alla slide ${index + 1}`}
                                    onClick={() => setCurrent(index)}
                                    className="group h-1.5 flex-1 overflow-hidden rounded-full bg-border"
                                >
                                    <motion.div
                                        className="h-full rounded-full bg-primary"
                                        initial={false}
                                        animate={{
                                            width:
                                                index <= current
                                                    ? "100%"
                                                    : "0%",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main carousel */}
                    <div className="relative flex flex-1 items-center py-10 sm:py-14">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                                className="grid w-full items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
                            >
                                {/* Left */}
                                <div>
                                    <div className="mb-6 flex items-center gap-3">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${slide.lightColor}`}
                                        >
                                            <Icon
                                                size={23}
                                                className={
                                                    slide.color
                                                        .replace("bg-", "text-")
                                                }
                                            />
                                        </div>

                                        <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
                                            {slide.eyebrow}
                                        </span>
                                    </div>

                                    <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                        {slide.title}{" "}
                                        <span className="text-primary">
                                            {slide.highlight}
                                        </span>
                                    </h1>

                                    <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                                        {slide.description}
                                    </p>

                                    {slide.footer && (
                                        <div className="mt-8 border-l-2 border-primary pl-4 text-sm leading-6 text-text-secondary">
                                            {slide.footer}
                                        </div>
                                    )}
                                </div>

                                {/* Right card */}
                                <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
                                    {/* Examples */}
                                    {slide.examples && (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {slide.examples.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-2xl border border-border-subtle bg-surface-muted p-4 text-sm font-medium text-text-primary"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Comparison */}
                                    {slide.comparison && (
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {[slide.comparison.left, slide.comparison.right].map(
                                                (column) => (
                                                    <div
                                                        key={column.title}
                                                        className="rounded-2xl border border-border-subtle bg-surface-muted p-5"
                                                    >
                                                        <h2 className="font-medium text-text-primary">
                                                            {column.title}
                                                        </h2>

                                                        <div className="mt-5 space-y-3">
                                                            {column.items.map(
                                                                (item) => (
                                                                    <div
                                                                        key={item}
                                                                        className="flex items-start gap-2 text-sm text-text-secondary"
                                                                    >
                                                                        <Check
                                                                            size={16}
                                                                            className="mt-0.5 shrink-0 text-primary"
                                                                        />
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {/* Prompt */}
                                    {slide.promptExample && (
                                        <div className="space-y-4">
                                            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                                                <div className="font-mono text-[10px] uppercase tracking-wider text-red-500">
                                                    Prompt poco preciso
                                                </div>

                                                <p className="mt-3 text-sm leading-6 text-red-900">
                                                    {slide.promptExample.bad}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                                                <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-600">
                                                    Prompt più utile
                                                </div>

                                                <p className="mt-3 text-sm leading-6 text-emerald-950">
                                                    {slide.promptExample.good}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Model steps */}
                                    {slide.steps && (
                                        <div className="space-y-4">
                                            {slide.steps.map((step) => (
                                                <div
                                                    key={step.number}
                                                    className="flex gap-4 rounded-2xl border border-border-subtle bg-surface-muted p-5"
                                                >
                                                    <div className="font-mono text-xs font-semibold text-primary">
                                                        {step.number}
                                                    </div>

                                                    <div>
                                                        <h2 className="font-medium text-text-primary">
                                                            {step.title}
                                                        </h2>

                                                        <p className="mt-1 text-sm leading-6 text-text-secondary">
                                                            {step.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Warnings */}
                                    {slide.warnings && (
                                        <div className="space-y-3">
                                            {slide.warnings.map((warning) => (
                                                <div
                                                    key={warning}
                                                    className="flex gap-3 rounded-2xl border border-border-subtle bg-surface-muted p-4 text-sm leading-6 text-text-secondary"
                                                >
                                                    <ShieldAlert
                                                        size={17}
                                                        className="mt-0.5 shrink-0 text-red-500"
                                                    />
                                                    {warning}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Sources */}
                                    {slide.sources && (
                                        <div className="space-y-3">
                                            {slide.sources.map((source) => (
                                                <a
                                                    key={source.url}
                                                    href={source.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group block rounded-2xl border border-border-subtle bg-surface-muted p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-sm font-medium text-text-primary">
                                                            {source.name}
                                                        </span>

                                                        <ArrowRight
                                                            size={16}
                                                            className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                                                        />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <footer className="flex items-center justify-between border-t border-border pt-5">
                        <button
                            type="button"
                            onClick={previous}
                            disabled={current === 0}
                            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                        >
                            <ArrowLeft size={16} />
                            Indietro
                        </button>

                        {current < slides.length - 1 ? (
                            <button
                                type="button"
                                onClick={next}
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
                            >
                                Continua
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <Link
                                href="/play"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
                            >
                                Gioca con l'AI
                                <ArrowRight size={16} />
                            </Link>
                        )}
                    </footer>
                </div>
            </main>
        </FadeComponent>
    );
}