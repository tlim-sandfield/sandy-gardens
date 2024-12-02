"use client";

import MenuContentStructure from "@/components/MenuContentStructure";
import MenuNavbar from "@/components/MenuNavbar";
import PersistentDrawer from "@/components/PersistentDrawer";
import NeighboursContent from "@/components/content/NeighboursContent";
import { useState } from "react";

export default function NeighboursPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="page-content">
            <MenuNavbar open={open} setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <MenuContentStructure open={open}>
                <NeighboursContent />
            </MenuContentStructure>
        </div>
    );
}
