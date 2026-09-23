
import { CalendarDays, Euro, Home, Ruler } from "lucide-react";


function normalizeText(value) {
    return String(value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function normalizeNumber(value) {
    if (value === null || value === undefined) return null;
    const normalized = String(value).replace(/[€\s]/g, "").replace(/\./g, "").replace(",", ".");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
}


export const CLUE_DEFINITIONS = [
    {
        id: "superficie",
        icon: Ruler,
        label: "Superficie",
        question: "Qual è la superficie commerciale dell'immobile?",
        placeholder: "Es. 45,00 m²",
        color: "blue",
        points: 100,

        check: (userValue, matchJson) => {
            const user = normalizeNumber(userValue);
            const expected = normalizeNumber(matchJson.superficie);
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

        check: (userValue, matchJson) => {
            const user = normalizeNumber(userValue);
            const expected = normalizeNumber(matchJson.prezzoBase);
            return user !== null && expected !== null && user === expected;
        },
    },

    {
        id: "dataAsta",
        icon: CalendarDays,
        label: "Data dell'asta",
        question: "Quando si svolge l'asta?",
        placeholder: "Es. 19/05/2026",
        color: "violet",
        points: 200,

        check: (userValue, matchJson) => {
            const user = normalizeText(userValue);
            const expected = normalizeText(matchJson.dataAsta);
            return user === expected;
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

        check: (userValue, matchJson) => {
            const user = normalizeText(userValue);
            const expected = normalizeText(matchJson.occupazione);
            return user === expected;
        },
    },
];

