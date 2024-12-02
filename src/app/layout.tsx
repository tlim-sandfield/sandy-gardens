import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme.js";

export const metadata: Metadata = {
    title: "SandyGardens",
    description:
        "Cultivate your very own garden by filling out your Sandfield timesheet!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="favicon.png" type="image/x-icon" />
            <body>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </body>
        </html>
    );
}
