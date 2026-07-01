"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchFilter, { defaultFilters, type Filters } from "@/components/SearchFilter";
import OpportunityCard from "@/components/OpportunityCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { LoadingGrid } from "@/components/LoadingState";
import { useLanguage } from "@/context/LanguageContext";
import { daysUntil } from "@/lib/utils";
import type { Opportunity } from "@/types";

export default function OpportunitiesPage() {
    return (
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10"><LoadingGrid /></div>}>
            <OpportunitiesPageInner />
        </Suspense>
    );
}

function OpportunitiesPageInner() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const [items, setItems] = useState<Opportunity[] | null>(null);
    const [error, setError] = useState(false);
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) setFilters((f) => ({ ...f, category: cat as Filters["category"] }));
    }, [searchParams]);

    async function load() {
        setError(false);
        setItems(null);
        try {
            const res = await fetch("/api/opportunities");
            if (!res.ok) throw new Error("failed");
            const data: Opportunity[] = await res.json();
            setItems(data.filter((o) => o.status === "approved"));
        } catch {
            setError(true);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const locations = useMemo(
        () => Array.from(new Set((items ?? []).map((o) => o.location))).sort(),
        [items]
    );

    const filtered = useMemo(() => {
        if (!items) return [];
        return items.filter((o) => {
            if (
                filters.query &&
                !`${o.title} ${o.organization} ${o.tags.join(" ")}`
                    .toLowerCase()
                    .includes(filters.query.toLowerCase())
            ) {
                return false;
            }
            if (filters.category !== "All" && o.category !== filters.category) return false;
            if (filters.location !== "All" && o.location !== filters.location) return false;
            if (filters.type !== "All" && o.type !== filters.type) return false;
            if (filters.deadlineWithin !== "All") {
                const days = daysUntil(o.deadline);
                if (days < 0 || days > Number(filters.deadlineWithin)) return false;
            }
            return true;
        });
    }, [items, filters]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("nav_opportunities")}
            </h1>
            <p className="mt-1 text-sm text-lapis-500 dark:text-sand-300">{t("demo_data_notice")}</p>

            <div className="mt-6">
                <SearchFilter filters={filters} setFilters={setFilters} locations={locations} />
            </div>

            <div className="mt-6">
                {error && <ErrorState onRetry={load} />}
                {!error && items === null && <LoadingGrid />}
                {!error && items !== null && filtered.length === 0 && (
                    <EmptyState
                        title={t("empty_opportunities")}
                        subtitle={t("empty_opportunities_sub")}
                    />
                )}
                {!error && filtered.length > 0 && (
                    <>
                        <p className="mb-4 text-sm text-lapis-500 dark:text-sand-300">
                            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                        </p>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((item) => (
                                <OpportunityCard key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
