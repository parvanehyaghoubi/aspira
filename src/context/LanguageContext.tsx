"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Locale } from "@/types";
import { dict, locales } from "@/lib/i18n";

interface LanguageContextValue {
    locale: Locale;
    dir: "ltr" | "rtl";
    setLocale: (l: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("en");

    useEffect(() => {
        const stored = window.localStorage.getItem("aspira-locale") as
            | Locale
            | null;
        if (stored) setLocaleState(stored);
    }, []);

    const dir = locales.find((l) => l.code === locale)?.dir ?? "ltr";

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = dir;
    }, [locale, dir]);

    function setLocale(l: Locale) {
        setLocaleState(l);
        window.localStorage.setItem("aspira-locale", l);
    }

    function t(key: string) {
        return dict[locale]?.[key] ?? dict.en[key] ?? key;
    }

    return (
        <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}
