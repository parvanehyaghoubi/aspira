"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SavedProvider } from "@/context/SavedContext";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <SavedProvider>{children}</SavedProvider>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
