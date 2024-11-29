import type { Metadata } from 'next';
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'SandyGardens',
    description: "Cultivate your very own garden by filling out your timesheet!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="favicon.png" type="image/x-icon"/>
            <body
                className={`${inter.className}`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    )
}