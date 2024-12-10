"use client";

import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawer from "@/components/PersistentDrawer";
import SettingsContent from "@/components/content/SettingsContent";
import { useState } from "react";

export default function SettingsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="page">
            <CustomNavbar setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <SettingsContent />
        </div>
    );
}
