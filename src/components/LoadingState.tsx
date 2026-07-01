"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LoadingGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="card-surface animate-pulse p-5">
                    <div className="h-3 w-20 rounded bg-lapis-100 dark:bg-lapis-700" />
                    <div className="mt-3 h-5 w-3/4 rounded bg-lapis-100 dark:bg-lapis-700" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-lapis-100 dark:bg-lapis-700" />
                    <div className="mt-4 h-3 w-full rounded bg-lapis-100 dark:bg-lapis-700" />
                    <div className="mt-2 h-3 w-5/6 rounded bg-lapis-100 dark:bg-lapis-700" />
                    <div className="mt-6 h-8 w-full rounded-full bg-lapis-100 dark:bg-lapis-700" />
                </div>
            ))}
        </div>
    );
}

export function LoadingText() {
    const { t } = useLanguage();
    return (
        <p className="py-10 text-center text-sm text-lapis-500 dark:text-sand-300">
            {t("loading")}
        </p>
    );
}
