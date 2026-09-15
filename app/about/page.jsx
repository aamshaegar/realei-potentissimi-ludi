"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";
import { ArrowUpRight, Check, Code2, Heart, Lightbulb, LinkIcon, Mail, ShieldCheck, Users, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FadeComponent from "@/components/FadeComponent";
import Footer from "@/components/Footer";


const emailSchema = z.string().email({ message: "Indirizzo email non valido" });

const team = [
    { name: "Valentina Cipriani", role: "CEO & Founder", img: "/about/valentina.jpg", linkedin: "https://www.linkedin.com/in/valentina-cipriani/", description: "Guida e fondatrice del progetto, con esperienza nel settore dell'innovazione sociale." },
    { name: "Monica Puglisi", role: "Co-Founder & Business Development", img: "/about/monica.jpg", linkedin: "https://www.linkedin.com/in/monicapuglisi/", description: "Sviluppa relazioni strategiche e partnership per il progetto." },
    { name: "Fabio Ciravegna", role: "Advisor Scientifico", img: "/about/fabio.jpg", linkedin: "https://www.linkedin.com/in/fabio-ciravegna-a3b9a81/", description: "Supporto scientifico e accademico per lo sviluppo delle metodologie del progetto." },
    { name: "Michele Colombino", role: "Full-stack Developer", img: "/about/michele.jpg", linkedin: "https://www.linkedin.com/in/michele-colombino-06164b361/", description: "Sviluppo dell'infrastruttura tecnica del sito." },
    { name: "Matteo Miceli", role: "Full-stack Developer", img: "/about/miciox.jpg", linkedin: "https://www.linkedin.com/in/matteomiceli5/", description: "Responsabile del design funzionale e sviluppo frontend." },
    { name: "Laurentiu Jr Marius Zaharia", role: "Full-stack Developer", img: "/about/lorenzo.jpg", linkedin: "https://www.linkedin.com/in/zaharia-marius/", description: "Supporta l'implementazione backend e testing." },
];

const values = [
    { name: "Fiducia", icon: ShieldCheck, description: "La fiducia è il cuore pulsante della nostra filosofia aziendale. Mettiamo al centro clienti e team, creando un ecosistema trasparente, sicuro e affidabile." },
    { name: "Rispetto", icon: Users, description: "Valorizziamo persone, idee e diversità, costruendo relazioni solide e durature." },
    { name: "Inclusione", icon: Heart, description: "Crediamo in un ambiente dove ogni voce può essere ascoltata e ogni prospettiva può portare un contributo unico e prezioso." },
    { name: "Iniziativa", icon: Lightbulb, description: "Trasformiamo le idee in azioni concrete, anticipando i cambiamenti e creando nuove opportunità." },
    { name: "Coraggio", icon: Zap, description: "Affrontiamo sfide e cambiamenti con una mentalità pionieristica, abbracciando l'ignoto con spirito di esplorazione." },
    { name: "Passione", icon: Heart, description: "Amiamo profondamente ciò che facciamo e trasformiamo questo entusiasmo in energia per costruire qualcosa di significativo." },
];

export default function Contacts() {
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);

    const annulla = () => {
        setEmail("");
        setComment("");
    };

    const leaveComment = async () => {
        if (!email || !comment) {
            Swal.fire({ title: "Campi vuoti", text: "Compila correttamente il modulo.", icon: "warning", confirmButtonText: "Continua" });
            return;
        }

        try {
            emailSchema.parse(email);
        } catch {
            Swal.fire({ title: "Email", text: "Inserisci un indirizzo email valido.", icon: "warning", confirmButtonText: "Continua" });
            return;
        }

        Swal.fire({ title: "Commento inviato", text: "Grazie per i tuoi suggerimenti!", icon: "success", showConfirmButton: false, timer: 2000 });
        annulla();
    };

    const goToElement = (id) => {
        const element = document.getElementById(id);
        if (!element) return;
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <FadeComponent>
            <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
                <section className="relative border-b border-border">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

                    <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-12">
                        <div className="max-w-4xl">
                            <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                <span>01 / About</span>
                            </div>

                            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-8xl">
                                Costruiamo il futuro
                                <br />
                                <span className="text-primary">delle aste.</span>
                            </h1>

                            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                                REAL-EI nasce dall'incontro tra intelligenza artificiale, tecnologia e real estate. Il nostro obiettivo è rendere le aste immobiliari più semplici, trasparenti e accessibili.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-3">
                                <a href="mailto:info@real-ei.it?subject=Informazioni" className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover">
                                    <Mail size={17} />
                                    Contattaci
                                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>

                                <a href="https://www.linkedin.com/company/real-ei-realestate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary">
                                    <LinkIcon size={17} />
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 / Manifesto</div>
                                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Perché REAL-EI?</h2>
                            </div>

                            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                                {[
                                    { icon: Code2, title: "La storia", text: "La storia di REAL-EI nasce da un'idea semplice: usare la tecnologia per semplificare un mercato ancora complesso. Quattro amici hanno trasformato una intuizione in un progetto dedicato all'innovazione delle aste immobiliari." },
                                    { icon: Zap, title: "La mission", text: "Offrire strumenti digitali e intelligenti per analizzare i fascicoli d'asta, valutare rischi e opportunità e prendere decisioni in modo più rapido, sicuro e consapevole." },
                                    { icon: ArrowUpRight, title: "La vision", text: "Trasformare le aste immobiliari in opportunità accessibili, trasparenti e sicure, costruendo un ecosistema digitale completo per la gestione immobiliare." },
                                    { icon: Lightbulb, title: "Tecnologia", text: "Combiniamo AI, automazione e dati per trasformare informazioni complesse in strumenti comprensibili e realmente utili per le persone." },
                                ].map(({ icon: Icon, title, text }) => (
                                    <article key={title} className="bg-surface p-7 sm:p-8">
                                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-muted text-primary">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
                                        <p className="mt-4 text-sm leading-7 text-text-secondary">{text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border bg-surface-muted">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">03 / Values</div>
                                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">I nostri valori</h2>
                            </div>
                            <p className="max-w-md text-sm leading-6 text-text-secondary">I principi che guidano il modo in cui costruiamo prodotti, collaboriamo e prendiamo decisioni.</p>
                        </div>

                        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                            {values.map(({ name, icon: Icon, description }) => (
                                <article key={name} className="group bg-surface p-7 transition-colors duration-200 hover:bg-surface-muted">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-muted text-primary transition-transform duration-300 group-hover:scale-110">
                                            <Icon size={19} />
                                        </div>
                                    </div>
                                    <h3 className="mt-8 text-lg font-semibold text-text-primary">{name}</h3>
                                    <p className="mt-3 text-sm leading-6 text-text-secondary">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="sectionImages" className="border-b border-border">
                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">04 / Team</div>
                                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    Le persone
                                    <br />
                                    dietro il progetto.
                                </h2>
                            </div>

                            <button type="button" onClick={() => goToElement("contact")} className="group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-primary">
                                Collabora con noi
                                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {team.map((member, index) => (
                                <motion.article key={member.name} className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-lg)]">
                                    <button type="button" onClick={() => setSelectedMember(member)} className="block w-full cursor-pointer text-left">
                                        <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                                            {member.img ? (
                                                <Image src={member.img} alt={member.name} fill className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center">
                                                    <Users size={48} className="text-muted" />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                                            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-wider text-white/80">
                                                TEAM / {String(index + 1).padStart(2, "0")}
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-text-primary">{member.name}</h3>
                                            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">{member.role}</p>
                                        </div>
                                    </button>

                                    <div className="border-t border-border px-5 py-4">
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-primary">
                                            <LinkIcon size={14} />
                                            LinkedIn
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence>
                        {selectedMember && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm" onClick={() => setSelectedMember(null)}>
                                <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-lg)]" onClick={(event) => event.stopPropagation()}>
                                    <button type="button" onClick={() => setSelectedMember(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/90 text-muted transition-colors hover:text-text-primary" aria-label="Chiudi">
                                        <X size={18} />
                                    </button>

                                    <div className="relative aspect-[4/3] bg-surface-muted">
                                        {selectedMember.img && <Image src={selectedMember.img} alt={selectedMember.name} fill className="object-cover" />}
                                    </div>

                                    <div className="p-7">
                                        <div className="font-mono text-[10px] uppercase tracking-wider text-primary">Team member</div>
                                        <h3 className="mt-2 text-2xl font-semibold text-text-primary">{selectedMember.name}</h3>
                                        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{selectedMember.role}</p>
                                        <p className="mt-6 text-sm leading-7 text-text-secondary">{selectedMember.description}</p>

                                        <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover">
                                            <LinkIcon size={16} />
                                            Profilo LinkedIn
                                            <ArrowUpRight size={15} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <section id="contact" className="relative overflow-hidden bg-primary/70 py-24">
                    <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(var(--primary-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--primary-foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                    <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
                        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60">05 / Contact</div>
                                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
                                    Hai qualcosa
                                    <br />
                                    da dirci?
                                </h2>
                                <p className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/75">Suggerimenti, domande, collaborazioni o semplicemente vuoi conoscerci? Scrivici.</p>

                                <a href="mailto:info@real-ei.it?subject=Informazioni" className="mt-8 inline-flex items-center gap-3 font-mono text-sm text-primary-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
                                    <Mail size={16} />
                                    info@real-ei.it
                                </a>
                            </div>

                            <div className="rounded-2xl border-2 border-primary-foreground/50 bg-primary-foreground/10 p-6 backdrop-blur-xl sm:p-8">
                                <form onSubmit={(event) => { event.preventDefault(); leaveComment(); }} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-primary-foreground/70">Email</label>
                                        <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition-colors focus:border-primary-foreground/50" />
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="mb-2 block font-mono text-xs uppercase tracking-wider text-primary-foreground/70">Messaggio</label>
                                        <textarea id="comment" rows={6} placeholder="Scrivi qui il tuo messaggio..." value={comment} onChange={(event) => setComment(event.target.value)} className="w-full resize-none rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition-colors focus:border-primary-foreground/50" />
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <button type="button" onClick={annulla} className="rounded-full border border-primary-foreground/20 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10">Annulla</button>

                                        <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:gap-3">
                                            Invia messaggio
                                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </FadeComponent>
    );
}
