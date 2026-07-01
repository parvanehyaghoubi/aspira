"use client";

import { Search, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Category, WorkType } from "@/types";

export interface Filters {
    query: string;
    category: Category | "All";
    location: string;
    type: WorkType | "All";
    deadlineWithin: "All" | "7" | "30" | "90";
}

export const defaultFilters: Filters = {
    query: "",
    category: "All",
    location: "All",
    type: "All",
    deadlineWithin: "All",
};

const CATEGORIES: (Category | "All")[] = [
    "All",
    "Job",
    "Internship",
    "Scholarship",
    "Online Course",
    "Remote Work",
    "Training Program",
    "Volunteer Work",
];

const TYPES: (WorkType | "All")[] = ["All", "Remote", "On-site", "Hybrid"];

export default function SearchFilter({
    filters,
    setFilters,
    locations,
}: {
    filters: Filters;
    setFilters: (f: Filters) => void;
    locations: string[];
}) {
    const { t } = useLanguage();
    const hasActiveFilters =
        filters.query ||
        filters.category !== "All" ||
        filters.location !== "All" ||
        filters.type !== "All" ||
        filters.deadlineWithin !== "All";

    return (
        <div className="card-surface flex flex-col gap-3 p-4">
            <div className="relative">
                <Search
                    size={16}
                    className="absolute start-3 top-1/2 -translate-y-1/2 text-lapis-400"
                />
                <input
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                    placeholder={t("search_placeholder")}
                    className="input-field ps-9"
                    aria-label={t("search_placeholder")}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <select
                    value={filters.category}
                    onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value as Filters["category"] })
                    }
                    className="input-field"
                    aria-label={t("filter_category")}
                >
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c === "All" ? t("filter_all") : c}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="input-field"
                    aria-label={t("filter_location")}
                >
                    <option value="All">{t("filter_all")}</option>
                    {locations.map((l) => (
                        <option key={l} value={l}>
                            {l}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.type}
                    onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value as Filters["type"] })
                    }
                    className="input-field"
                    aria-label={t("filter_type")}
                >
                    {TYPES.map((ty) => (
                        <option key={ty} value={ty}>
                            {ty === "All" ? t("filter_all") : ty}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.deadlineWithin}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            deadlineWithin: e.target.value as Filters["deadlineWithin"],
                        })
                    }
                    className="input-field"
                    aria-label={t("filter_deadline")}
                >
                    <option value="All">{t("filter_all")}</option>
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                </select>
            </div>

            {hasActiveFilters && (
                <button
                    onClick={() => setFilters(defaultFilters)}
                    className="inline-flex items-center gap-1 self-start text-xs font-medium text-lapis-500 hover:text-saffron-600 dark:text-sand-300"
                >
                    <X size={12} /> {t("clear_filters")}
                </button>
            )}
        </div>
    );
}
