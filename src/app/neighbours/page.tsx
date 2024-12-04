"use client";

import MenuContentStructure from "@/components/MenuContentStructure";
import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawer from "@/components/PersistentDrawerLeft";
import NeighboursContent from "@/components/content/NeighboursContent";
import { useState } from "react";

export default function NeighboursPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="page-content">
            <CustomNavbar open={open} setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <MenuContentStructure open={open}>
                <NeighboursContent />
            </MenuContentStructure>
        </div>
    );
}
