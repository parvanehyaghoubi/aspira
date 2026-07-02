import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Aspira",
    description:
        "Aspira is an opportunity finder platform helping Afghan youth discover jobs, internships, scholarships, online courses, remote work and training programs in one place.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className="flex min-h-screen flex-col"
                suppressHydrationWarning
            >
                <Providers>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
