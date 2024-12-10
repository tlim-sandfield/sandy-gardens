"use client";

import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawer from "@/components/PersistentDrawer";
import HelpContent from "@/components/content/HelpContent";
import { useState } from "react";

export default function HelpPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="page">
            <CustomNavbar setOpen={setOpen} />
            <PersistentDrawer open={open} setOpen={setOpen} />
            <HelpContent />
        </div>
    );
}
