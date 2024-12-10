"use client";

import App from "@/App";
import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawerLeft from "@/components/PersistentDrawerLeft";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme.js";

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CustomNavbar open={open} setOpen={setOpen} />
                <PersistentDrawerLeft open={open} setOpen={setOpen} />
                <App />
            </ThemeProvider>
        </div>
    );
}
