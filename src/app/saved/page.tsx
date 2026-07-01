"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OpportunityCard from "@/components/OpportunityCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { LoadingGrid } from "@/components/LoadingState";
import { useSaved } from "@/context/SavedContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Opportunity } from "@/types";

export default function SavedPage() {
    const { t } = useLanguage();
    const { savedIds } = useSaved();
    const [items, setItems] = useState<Opportunity[] | null>(null);
    const [error, setError] = useState(false);

    async function load() {
        setError(false);
        setItems(null);
        try {
            const res = await fetch("/api/opportunities");
            if (!res.ok) throw new Error("failed");
            setItems(await res.json());
        } catch {
            setError(true);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const saved = (items ?? []).filter((o) => savedIds.includes(o.id));

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("nav_saved")}
            </h1>

            <div className="mt-6">
                {error && <ErrorState onRetry={load} />}
                {!error && items === null && <LoadingGrid count={3} />}
                {!error && items !== null && saved.length === 0 && (
                    <EmptyState
                        title={t("empty_saved")}
                        subtitle={t("empty_saved_sub")}
                        action={
                            <Link href="/opportunities" className="btn-primary mt-2">
                                {t("nav_opportunities")}
                            </Link>
                        }
                    />
                )}
                {!error && saved.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {saved.map((item) => (
                            <OpportunityCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
