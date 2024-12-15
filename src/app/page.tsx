"use client";

import App from "@/App";
import CustomNavbar from "@/components/CustomNavbar";
import PersistentDrawerLeft from "@/components/PersistentDrawer";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme.js";

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            {/* <CustomNavbar setOpen={setOpen} /> */}
            <PersistentDrawerLeft open={open} setOpen={setOpen} />
            <App />
        </ThemeProvider>
    );
}
