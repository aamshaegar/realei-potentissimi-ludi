"use client";

import React, { useState } from "react";
import PlayGame from "@/components/PlayGame";
import FadeComponent from "@/components/FadeComponent";
import SelectAuction from "@/components/SelectAuction";


export default function Play() {
    const [selectedAuction, setSelectedAuction] = useState(null);

    const handleSelectAuction = (auction) => {
        setSelectedAuction(auction);
    };

    return (
        <FadeComponent>
            <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-28 lg:px-12">
                    {selectedAuction ? (
                        <PlayGame auction={selectedAuction} setSelectedAuction={setSelectedAuction}/>
                    ) : (
                        <SelectAuction selectedAuction={selectedAuction} onSelect={handleSelectAuction}/>
                    )}
                </div>
            </main>
        </FadeComponent>
    );


}