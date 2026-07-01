"use client";

import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ErrorState({
    message,
    onRetry,
}: {
    message?: string;
    onRetry?: () => void;
}) {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center dark:border-rose-800 dark:bg-rose-900/20">
            <AlertTriangle size={22} className="text-rose-500" />
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                {message ?? t("error_generic")}
            </p>
            {onRetry && (
                <button onClick={onRetry} className="btn-secondary !px-4 !py-2 text-xs">
                    Retry
                </button>
            )}
        </div>
    );
}
