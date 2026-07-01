"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import OpportunityForm from "@/components/OpportunityForm";
import ErrorState from "@/components/ErrorState";
import { useLanguage } from "@/context/LanguageContext";
import type { OpportunityFormValues } from "@/lib/validation";

export default function AddOpportunityPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(values: OpportunityFormValues) {
        setSubmitting(true);
        setError(false);
        try {
            const res = await fetch("/api/opportunities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("failed");
            setSuccess(true);
            setTimeout(() => router.push("/opportunities"), 1400);
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("add_title")}
            </h1>
            <p className="mt-1 text-sm text-lapis-500 dark:text-sand-300">{t("add_subtitle")}</p>

            <div className="mt-6">
                {success ? (
                    <div className="card-surface flex items-center gap-3 p-6 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 size={20} /> Submitted! Redirecting to opportunities…
                    </div>
                ) : (
                    <>
                        {error && <div className="mb-4"><ErrorState /></div>}
                        <OpportunityForm onSubmit={handleSubmit} submitting={submitting} submitLabel={t("submit")} />
                    </>
                )}
            </div>
        </div>
    );
}
