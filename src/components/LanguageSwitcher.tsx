"use client";

import { ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/types";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <div className="relative inline-flex h-9 items-center">
            <Languages
                size={14}
                className="pointer-events-none absolute start-2.5 text-lapis-500 dark:text-sand-300"
            />
            <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                aria-label="Language"
                className="h-9 w-[7.5rem] appearance-none rounded-full border border-lapis-200 bg-transparent ps-7 pe-6 text-sm font-medium text-lapis-700 outline-none transition hover:bg-lapis-50 dark:border-lapis-600 dark:text-sand-100 dark:hover:bg-lapis-700"
            >
                {locales.map((l) => (
                    <option key={l.code} value={l.code} className="text-lapis-900">
                        {l.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={13}
                className="pointer-events-none absolute end-2 text-lapis-500 dark:text-sand-300"
            />
        </div>
    );
}
