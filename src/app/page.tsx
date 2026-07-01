"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import CategoryTabs from "@/components/CategoryTabs";
import OpportunityCard from "@/components/OpportunityCard";
import { LoadingGrid } from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useLanguage } from "@/context/LanguageContext";
import type { Opportunity } from "@/types";

export default function HomePage() {
    const { t } = useLanguage();
    const [items, setItems] = useState<Opportunity[] | null>(null);
    const [error, setError] = useState(false);

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

    const featured = items?.filter((o) => o.featured).slice(0, 3) ?? [];

    return (
        <div>
            <section className="relative overflow-hidden border-b border-lapis-100 bg-gradient-to-b from-sand-100 to-sand-50 dark:border-lapis-700 dark:from-lapis-800 dark:to-lapis-900">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-300">
                            <Sparkles size={12} /> {t("demo_data_notice")}
                        </span>
                        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-lapis-900 sm:text-5xl dark:text-sand-50">
                            {t("hero_title")}
                        </h1>
                        <p className="mt-4 max-w-lg text-base text-lapis-600 dark:text-sand-200">
                            {t("hero_subtitle")}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link href="/opportunities" className="btn-primary">
                                {t("hero_cta_browse")} <ArrowRight size={16} />
                            </Link>
                            <Link href="/add-opportunity" className="btn-secondary">
                                {t("hero_cta_add")}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative"
                    >
                        <svg viewBox="0 0 420 320" className="w-full text-lapis-300 dark:text-lapis-600" fill="none">
                            <path
                                d="M10 280 L90 160 L150 230 L230 80 L300 190 L410 60"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="trail-dash"
                                style={{
                                    strokeDasharray: "2 14",
                                }}
                            />
                            {[
                                [10, 280],
                                [150, 230],
                                [230, 80],
                                [410, 60],
                            ].map(([cx, cy], i) => (
                                <circle key={i} cx={cx} cy={cy} r={7} className="fill-saffron-500" />
                            ))}
                        </svg>
                        <p className="mt-2 text-center text-xs text-lapis-500 dark:text-sand-300">
                            Every opportunity is a step on the path forward.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-14">
                <h2 className="mb-5 font-display text-2xl font-semibold text-lapis-900 dark:text-sand-50">
                    {t("categories")}
                </h2>
                <CategoryTabs />
            </section>

            <section className="mx-auto max-w-6xl px-4 pb-16">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold text-lapis-900 dark:text-sand-50">
                        {t("featured")}
                    </h2>
                    <Link href="/opportunities" className="text-sm font-semibold text-lapis-700 hover:text-saffron-600 dark:text-sand-100">
                        {t("view_all")} →
                    </Link>
                </div>

                {error && <ErrorState onRetry={load} />}
                {!error && items === null && <LoadingGrid count={3} />}
                {!error && items !== null && featured.length === 0 && (
                    <p className="text-sm text-lapis-500 dark:text-sand-300">
                        <MapPin size={14} className="me-1 inline" /> No featured opportunities right now.
                    </p>
                )}
                {!error && featured.length > 0 && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {featured.map((item) => (
                            <OpportunityCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
