"use client";

import MenuContentStructure from "@/components/MenuContentStructure";
import MenuNavbar from "@/components/MenuNavbar";
import PersistentDrawer from "@/components/PersistentDrawer";
import HelpContent from "@/components/content/HelpContent";
import { useState } from "react";

export default function HelpPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="page-content">
            <MenuNavbar open={open} setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <MenuContentStructure open={open}>
                <HelpContent />
            </MenuContentStructure>
        </div>
    );
}
