import {
    Brain,
    FileText,
    Image as ImageIcon,
    FolderSearch,
    Search,
    MessageSquare,
    ShieldAlert,
    Sparkles,
    ShieldCheck,
    WandSparkles,
} from "lucide-react";


export const slides = [
    {
        id: "what",
        eyebrow: "01 · BASICS",
        title: "Che cos'è la",
        highlight: "Gen AI?",
        description:
            "L'AI generativa è un tipo di intelligenza artificiale capace di creare nuovi contenuti a partire da una richiesta dell'utente.",
        icon: Sparkles,
        color: "bg-blue-500",
        lightColor: "bg-blue-50",
        examples: [
            "Testi",
            "Immagini",
            "Audio",
            "Video",
            "Codice",
        ],
        footer:
            "In pratica: tu dai un'istruzione, il modello genera una risposta.",
    },
    {
        id: "traditional",
        eyebrow: "02 · DIFFERENZA",
        title: "AI tradizionale vs",
        highlight: "AI generativa",
        description:
            "Non tutta l'intelligenza artificiale fa la stessa cosa. Alcuni sistemi classificano o prevedono; la Gen AI può anche generare nuovi contenuti.",
        icon: Brain,
        color: "bg-violet-500",
        lightColor: "bg-violet-50",
        comparison: {
            left: {
                title: "AI tradizionale",
                items: [
                    "Riconosce pattern",
                    "Classifica dati",
                    "Fa previsioni",
                ],
            },
            right: {
                title: "AI generativa",
                items: [
                    "Genera contenuti",
                    "Risponde a richieste",
                    "Crea nuove varianti",
                ],
            },
        },
    },
    {
        id: "prompt",
        eyebrow: "03 · PROMPT",
        title: "Tutto parte da un",
        highlight: "prompt",
        description:
            "Il prompt è l'istruzione che dai al modello. Più il tuo obiettivo è chiaro, più puoi guidare il tipo di risposta che vuoi ottenere.",
        icon: MessageSquare,
        color: "bg-emerald-500",
        lightColor: "bg-emerald-50",
        promptExample: {
            bad: "Parlami di una casa.",
            good:
                "Spiega in 5 punti semplici cosa controllare prima di comprare una casa all'asta.",
        },
        footer:
            "Un buon prompt specifica obiettivo, contesto, formato e, quando serve, limiti.",
    },
    {
        id: "models",
        eyebrow: "04 · MODELLI",
        title: "Cosa c'è dietro",
        highlight: "la risposta?",
        description:
            "I modelli generativi imparano pattern e relazioni presenti in grandi quantità di dati durante la fase di addestramento. Quando ricevono un prompt, usano ciò che hanno appreso per generare un nuovo output.",
        icon: WandSparkles,
        color: "bg-amber-500",
        lightColor: "bg-amber-50",
        steps: [
            {
                number: "01",
                title: "Dati",
                text: "Il modello viene addestrato su grandi quantità di informazioni.",
            },
            {
                number: "02",
                title: "Apprendimento",
                text: "Impara pattern e relazioni presenti nei dati.",
            },
            {
                number: "03",
                title: "Generazione",
                text: "Riceve il tuo prompt e produce un nuovo contenuto.",
            },
        ],
    },
    {
        id: "multimodal",
        eyebrow: "05 · POSSIBILITÀ",
        title: "Non genera solo",
        highlight: "testo",
        description:
            "La Gen AI può lavorare con diversi tipi di contenuto. Alcuni modelli sono multimodali e possono gestire più modalità, come testo e immagini.",
        icon: ImageIcon,
        color: "bg-pink-500",
        lightColor: "bg-pink-50",
        examples: [
            "✍️ Scrivere",
            "🎨 Creare immagini",
            "🎙️ Generare audio",
            "🎬 Creare video",
            "💻 Generare codice",
        ],
        footer:
            "La stessa idea può quindi essere trasformata in diversi formati.",
    },
    {
        id: "hallucination",
        eyebrow: "06 · ATTENZIONE",
        title: "L'AI può anche",
        highlight: "sbagliare",
        description:
            "Una risposta generata può sembrare convincente senza essere corretta. Per questo è importante verificare le informazioni, soprattutto quando riguardano decisioni importanti.",
        icon: ShieldAlert,
        color: "bg-red-500",
        lightColor: "bg-red-50",
        warnings: [
            "Controlla i fatti importanti.",
            "Verifica date, numeri e nomi.",
            "Chiedi le fonti quando servono.",
            "Non considerare automaticamente vera una risposta solo perché è scritta bene.",
        ],
    },
    {
        id: "realestate",
        eyebrow: "07 · REAL ESTATE",
        title: "E nel mondo delle",
        highlight: "aste?",
        description:
            "Nel real estate, l'AI generativa può trasformare grandi quantità di documenti e informazioni in contenuti più semplici da consultare. È particolarmente utile nelle aste immobiliari, dove un singolo immobile può essere accompagnato da perizie, ordinanze, avvisi di vendita, planimetrie e altri documenti.",
        icon: FileText,
        color: "bg-cyan-500",
        lightColor: "bg-cyan-50",
        examples: [
            "📄 Riassumere una perizia",
            "🔎 Cercare informazioni",
            "📊 Estrarre dati",
            "💬 Spiegare termini tecnici",
            "🧩 Confrontare informazioni",
        ],
        footer:
            "L'AI può aiutare a orientarsi nella documentazione, ma le informazioni importanti devono essere verificate nelle fonti originali.",
    },

    {
        id: "auction-files",
        eyebrow: "08 · DOCUMENTI",
        title: "Un'asta può avere",
        highlight: "molti documenti",
        description:
            "Capire un immobile all'asta significa spesso leggere e collegare informazioni provenienti da documenti diversi. L'AI può aiutare a individuare rapidamente le informazioni più rilevanti e a trasformare il contenuto tecnico in una sintesi più accessibile.",
        icon: FolderSearch,
        color: "bg-indigo-500",
        lightColor: "bg-indigo-50",
        steps: [
            {
                number: "01",
                title: "📄 Avviso di vendita",
                text: "Contiene informazioni essenziali sulla vendita, sulle modalità e sulle condizioni dell'asta.",
            },
            {
                number: "02",
                title: "⚖️ Ordinanza",
                text: "Descrive gli aspetti procedurali e le regole della vendita giudiziaria.",
            },
            {
                number: "03",
                title: "🏠 Perizia",
                text: "Può contenere descrizione dell'immobile, caratteristiche, stato, valutazioni e informazioni tecniche.",
            },
            {
                number: "04",
                title: "📐 Planimetrie e allegati",
                text: "Possono aiutare a comprendere meglio spazi, distribuzione e caratteristiche del bene.",
            },
        ],
        footer:
            "Il valore dell'AI non è sostituire i documenti, ma aiutare l'utente a leggerli e comprenderli più velocemente.",
    },


    {
        id: "access-info",
        eyebrow: "09 · INFORMAZIONI",
        title: "Usa la Gen AI per",
        highlight: "trovare e capire informazioni",
        description:
            "La Gen AI può aiutarti ad accedere più velocemente alle informazioni: puoi fare domande, caricare documenti, chiedere di cercare dati specifici o trasformare contenuti complessi in spiegazioni più semplici.",
        icon: Search,
        color: "bg-blue-500",
        lightColor: "bg-blue-50",
        steps: [
            {
                number: "01",
                title: "🔎 Fai una domanda",
                text: "Chiedi direttamente ciò che vuoi sapere, specificando l'argomento e il contesto.",
            },
            {
                number: "02",
                title: "📄 Dai il contesto",
                text: "Puoi fornire documenti, testi o immagini e chiedere all'AI di trovare le informazioni che ti interessano.",
            },
            {
                number: "03",
                title: "🧩 Chiedi di semplificare",
                text: "Trasforma informazioni tecniche o complesse in una spiegazione più chiara e facile da comprendere.",
            }
        ],
        footer:
            "La Gen AI può diventare un'interfaccia più semplice per esplorare grandi quantità di informazioni, ma non sostituisce la fonte originale.",
    },



    {
        id: "limits",
        eyebrow: "10 · RESPONSABILITÀ",
        title: "Tecnologia sì, ma con",
        highlight: "consapevolezza",
        description:
            "Le aste immobiliari coinvolgono aspetti economici, tecnici e giuridici. Una sintesi generata dall'AI può essere utile per orientarsi, ma non deve essere considerata automaticamente completa o priva di errori.",
        icon: ShieldCheck,
        color: "bg-red-500",
        lightColor: "bg-red-50",
        warnings: [
            "Verifica sempre le informazioni importanti.",
            "Consulta i documenti originali.",
            "Controlla date, prezzi e condizioni della vendita.",
            "Approfondisci gli aspetti tecnici e urbanistici.",
            "Quando necessario, affidati a professionisti qualificati.",
        ],
        footer:
            "REAL-EI vuole rendere l'informazione più accessibile, non eliminare la necessità di verificarla.",
    }

];
