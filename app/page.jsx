"use client"

import { useState, useEffect } from "react";
import FadeComponent from "@/components/FadeComponent";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "motion/react";

const UMOR = ["Joy", "Angry", "Confusion", "Surprise"];
const UMOR_SENTENCES = [
	"Ciao! Sono felicissimo di aiutarti! 😄",
	"Ok... questa cosa mi fa un po' arrabbiare! 😤",
	"Hmm... interessante. Sto cercando di capire! 🤔",
	"Wow! Questa non me l'aspettavo! 😮",
]


export default function Home() {

	const [click, setClick] = useState(0);
	const [image, setImage] = useState(`/icons/agent/State=${UMOR[0]}.svg`);

	useEffect(() => {
		const newImage = click !== 0 && click % 20 === 0 ? "/icons/other/barba.jpg" : `/icons/agent/State=${UMOR[click % 4]}.svg`;
		if (newImage === image) return;
		setImage(newImage);
	}, [click]);


	return (
		<FadeComponent>
			<main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300 ease-in-out">
				<section className="relative flex min-h-screen items-center">
					<div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 py-8 lg:px-12">
						<div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">


							<div className="relative z-10 flex flex-col justify-center">

								{/* Eyebrow */}
								<div className="mb-6 flex items-center gap-3">
									<span className="h-2 w-2 rounded-full bg-primary" />

									<span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">
										Realei · AI & Real Estate
									</span>
								</div>

								{/* Main title */}
								<h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
									Cosa impariamo
									<span className="text-primary">?</span>
								</h1>

								{/* Introduction */}
								<p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary sm:text-xl">
									Scopriamo insieme cosa può fare
									l&apos;intelligenza artificiale quando
									incontra il mondo delle aste.
								</p>

								{/* Concept cards */}
								<div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
									<Link
										href="/learn"
										className="group relative rounded-xl border border-border bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:bg-surface-muted hover:shadow-lg focus-visible:-translate-y-1"
									>
										<div className="mb-3 flex items-center justify-between">
											<div className="font-mono text-xs uppercase tracking-wider text-primary transition-transform duration-300 group-hover:translate-x-1">
												01 · AI
											</div>

											<span
												aria-hidden="true"
												className="text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
											>
												→
											</span>
										</div>

										<h2 className="text-lg font-medium text-text-primary transition-colors duration-300 group-hover:text-primary">
											Capire l&apos;AI
										</h2>

										<p className="mt-2 text-sm leading-6 text-text-secondary">
											Come funziona e quali possibilità
											apre nella vita reale.
										</p>
									</Link>

									<Link
										href="/play"
										className="group relative rounded-xl border border-border bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:bg-surface-muted hover:shadow-lg focus-visible:-translate-y-1"
									>
										<div className="mb-3 flex items-center justify-between">
											<div className="font-mono text-xs uppercase tracking-wider text-primary transition-transform duration-300 group-hover:translate-x-1">
												02 · REAL ESTATE
											</div>

											<span aria-hidden="true" className="text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
												→
											</span>
										</div>

										<h2 className="text-lg font-medium text-text-primary transition-colors duration-300 group-hover:text-primary">
											Gioca e Impara
										</h2>

										<p className="mt-2 text-sm leading-6 text-text-secondary">
											Comprendi l&apos;uso dell&apos;IA generativa nel
											contesto delle aste con un approccio divertente!
										</p>
									</Link>
								</div>


								{/* CTA */}
								<div className="mt-10">
									<Link
										href="https://www.real-ei.it/welcome"
										type="button"
										className="group inline-flex items-center gap-4 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover">
										REAL-EI sito web
										<span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-200 group-hover:translate-x-1">
											→
										</span>
									</Link>
								</div>
							</div>


							<div className="relative flex h-full min-h-[520px] items-center justify-center lg:min-h-[680px]">

								{/* Decorative blue atmosphere */}
								<div
									aria-hidden="true"
									className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light/40 blur-3xl dark:bg-primary-dark/50"
								/>

								{/* Grid / presentation circle */}
								<div
									aria-hidden="true"
									className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle"
								/>

								<div
									aria-hidden="true"
									className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle"
								/>

								{/* Mascot */}
								<div className="relative z-10">
									<AnimatePresence mode="wait">
										{image && (
											<motion.div
												key={image}
												initial={{ opacity: 0, scale: 0.96, y: 10 }}
												animate={{ opacity: 1, scale: 1, y: 0 }}
												exit={{ opacity: 0, scale: 0.96, y: -10 }}
												transition={{
													duration: 0.35,
													ease: "easeInOut",
												}}
											>
												<Image
													onClick={() => setClick((prev) => prev + 1)}
													alt="Realei Agent"
													priority
													width={500}
													height={500}
													className="cursor-pointer h-auto w-[360px] sm:w-[430px] lg:w-[450px] transition-transform duration-500 hover:-translate-y-5 hover:scale-105 hover:rotate-2"
													src={image}
												/>
											</motion.div>
										)}
									</AnimatePresence>
								</div>


								{/* Floating AI label */}
								<div className="absolute right-0 top-[18%] z-20 rounded-xl border border-border bg-surface/60 backdrop-blur-xl p-5 shadow-lg">
									<div className="font-mono text-[10px] uppercase tracking-wider text-muted">
										AI Agent
									</div>

									<div className="mt-1 text-sm font-medium text-text-primary">
										<AnimatePresence mode="wait">
											{click !== 0 && click % 20 === 0 ? (
												<motion.span
													key="oops"
													initial={{ opacity: 0, x: 6 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -6 }}
													transition={{ duration: 0.25, ease: "easeOut" }}
													className="block"
												>
													OOPS 😳
												</motion.span>
											) : (
												<motion.span
													key={click % 4}
													initial={{ opacity: 0, x: 6 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -6 }}
													transition={{ duration: 0.25, ease: "easeOut" }}
													className="block"
												>
													{UMOR_SENTENCES[click % 4]}
												</motion.span>
											)}
										</AnimatePresence>
									</div>


								</div>

								{/* Floating real-estate label */}
								<div className="absolute bottom-[18%] left-0 z-20 rounded-xl border border-border bg-surface/80 backdrop-blur-xl px-4 py-3 shadow-lg">
									<div className="font-mono text-[10px] uppercase tracking-wider text-muted">
										REAL ESTATE
									</div>

									<div className="mt-1 text-sm font-medium text-text-primary">
										Dati · Documenti · Aste
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</FadeComponent>
	);


}