"use client";

import MenuContentStructure from "@/components/MenuContentStructure";
import MenuNavbar from "@/components/MenuNavbar";
import PersistentDrawer from "@/components/PersistentDrawerLeft";
import SettingsContent from "@/components/content/SettingsContent";
import { useState } from "react";

export default function SettingsPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="page-content">
            <MenuNavbar open={open} setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <MenuContentStructure open={open}>
                <SettingsContent />
            </MenuContentStructure>
        </div>
    );
}
