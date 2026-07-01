"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, MapPin, Sparkles } from "lucide-react";
import Badge from "./Badge";
import CountdownBadge from "./CountdownBadge";
import { useSaved } from "@/context/SavedContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Opportunity } from "@/types";
import { categorySlug } from "@/lib/utils";

export default function OpportunityCard({ item }: { item: Opportunity }) {
    const { isSaved, toggleSaved } = useSaved();
    const { t } = useLanguage();
    const saved = isSaved(item.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="card-surface group relative flex flex-col gap-3 p-5"
            data-category={categorySlug(item.category)}
        >
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-saffron-600">
                        {item.category}
                    </p>
                    <Link href={`/opportunities/${item.id}`}>
                        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-lapis-900 group-hover:text-lapis-600 dark:text-sand-50">
                            {item.title}
                        </h3>
                    </Link>
                    <p className="mt-0.5 text-sm text-lapis-600 dark:text-sand-300">
                        {item.organization}
                    </p>
                </div>
                <button
                    aria-label={saved ? t("saved") : t("save")}
                    onClick={() => toggleSaved(item.id)}
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-lapis-200 text-lapis-600 transition hover:bg-lapis-50 dark:border-lapis-600 dark:text-sand-200 dark:hover:bg-lapis-700"
                >
                    {saved ? (
                        <BookmarkCheck size={16} className="text-saffron-600" />
                    ) : (
                        <Bookmark size={16} />
                    )}
                </button>
            </div>

            <p className="line-clamp-2 text-sm text-lapis-600 dark:text-sand-300">
                {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-lapis-500 dark:text-sand-300">
                <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                </span>
                <Badge variant="neutral">{item.type}</Badge>
                {item.featured && (
                    <Badge variant="turquoise">
                        <Sparkles size={12} /> Featured
                    </Badge>
                )}
            </div>

            <div className="mt-1 flex items-center justify-between">
                <CountdownBadge deadline={item.deadline} />
                <Link
                    href={`/opportunities/${item.id}`}
                    className="text-sm font-semibold text-lapis-700 hover:text-saffron-600 dark:text-sand-100"
                >
                    {t("details")} →
                </Link>
            </div>
        </motion.div>
    );
}
