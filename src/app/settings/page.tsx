"use client";

import MenuContentStructure from "@/components/MenuContentStructure";
import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawer from "@/components/PersistentDrawerLeft";
import SettingsContent from "@/components/content/SettingsContent";
import { useState } from "react";

export default function SettingsPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="page-content">
            <CustomNavbar open={open} setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <MenuContentStructure open={open}>
                <SettingsContent />
            </MenuContentStructure>
        </div>
    );
}
