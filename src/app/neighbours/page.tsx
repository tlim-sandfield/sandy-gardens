"use client";

import { useState } from "react";
import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawer from "@/components/PersistentDrawer";
import NeighboursContent from "@/components/content/NeighboursContent";
import NeighboursProvider from "@/contexts/NeighboursContext";
import IncomingAddsProvider from "@/contexts/IncomingAddsContext";

export default function NeighboursPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="page">
            <CustomNavbar setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <NeighboursProvider>
                <IncomingAddsProvider>
                    <NeighboursContent />
                </IncomingAddsProvider>
            </NeighboursProvider>
        </div>
    );
}
