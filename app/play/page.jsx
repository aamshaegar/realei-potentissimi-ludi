"use client";

import React, { useState } from "react";
import FadeComponent from "@/components/FadeComponent";
import SelectAuction from "@/components/SelectAuction";
import PlayGame from "@/components/PlayGame";


export default function Play() {
    const [selectedAuction, setSelectedAuction] = useState(null);

    const handleSelectAuction = (auction) => {
        setSelectedAuction(auction);
    };

    return (
        <FadeComponent>
            <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-28 lg:px-12">


                    {/* Step 2 */}
                    {selectedAuction ? (
                        <PlayGame auction={selectedAuction} setSelectedAuction={setSelectedAuction}/>
                    ) : (
                        <SelectAuction
                            selectedAuction={selectedAuction}
                            onSelect={handleSelectAuction}
                        />
                    )}

                </div>
            </main>
        </FadeComponent>
    );


}