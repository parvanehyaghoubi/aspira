"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {
    Briefcase,
    GraduationCap,
    Award,
    Globe2,
    AlarmClock,
    LayoutGrid,
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import ErrorState from "@/components/ErrorState";
import { LoadingText } from "@/components/LoadingState";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate, isExpiringSoon } from "@/lib/utils";
import type { Opportunity } from "@/types";

const COLORS = ["#54299c", "#a31735", "#0d8c83", "#b27fd0", "#d65775", "#46cec2", "#18141b"];

export default function DashboardPage() {
    const { t } = useLanguage();
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

    const stats = useMemo(() => {
        const list = items ?? [];
        const approved = list.filter((o) => o.status === "approved");
        return {
            total: approved.length,
            jobs: approved.filter((o) => o.category === "Job").length,
            scholarships: approved.filter((o) => o.category === "Scholarship").length,
            internships: approved.filter((o) => o.category === "Internship").length,
            remote: approved.filter((o) => o.type === "Remote").length,
            expiring: approved.filter((o) => isExpiringSoon(o.deadline)).length,
            recent: [...list]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5),
            byCategory: Object.entries(
                approved.reduce<Record<string, number>>((acc, o) => {
                    acc[o.category] = (acc[o.category] ?? 0) + 1;
                    return acc;
                }, {})
            ).map(([name, value]) => ({ name, value })),
            byType: Object.entries(
                approved.reduce<Record<string, number>>((acc, o) => {
                    acc[o.type] = (acc[o.type] ?? 0) + 1;
                    return acc;
                }, {})
            ).map(([name, value]) => ({ name, value })),
        };
    }, [items]);

    if (error) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16">
                <ErrorState onRetry={load} />
            </div>
        );
    }

    if (!items) return <LoadingText />;

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("dashboard_title")}
            </h1>
            <p className="mt-1 text-sm text-lapis-500 dark:text-sand-300">{t("dashboard_subtitle")}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard label={t("total_opportunities")} value={stats.total} icon={<LayoutGrid size={18} />} />
                <DashboardCard label={t("total_jobs")} value={stats.jobs} icon={<Briefcase size={18} />} accent="saffron" />
                <DashboardCard label={t("total_scholarships")} value={stats.scholarships} icon={<Award size={18} />} />
                <DashboardCard label={t("total_internships")} value={stats.internships} icon={<GraduationCap size={18} />} accent="saffron" />
                <DashboardCard label={t("remote_opportunities")} value={stats.remote} icon={<Globe2 size={18} />} />
                <DashboardCard label={t("expiring_soon")} value={stats.expiring} icon={<AlarmClock size={18} />} accent="saffron" />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="card-surface p-5">
                    <h2 className="mb-4 font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                        {t("by_category")}
                    </h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={stats.byCategory} layout="vertical" margin={{ left: 10 }}>
                            <XAxis type="number" allowDecimals={false} stroke="currentColor" opacity={0.5} />
                            <YAxis dataKey="name" type="category" width={110} stroke="currentColor" opacity={0.7} fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                                {stats.byCategory.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card-surface p-5">
                    <h2 className="mb-4 font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                        Work type distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={stats.byType} dataKey="value" nameKey="name" outerRadius={100} label>
                                {stats.byType.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card-surface mt-6 overflow-x-auto p-5">
                <h2 className="mb-4 font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                    {t("recent_submissions")}
                </h2>
                <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-lapis-100 text-lapis-500 dark:border-lapis-700 dark:text-sand-300">
                            <th className="py-2 font-medium">Title</th>
                            <th className="py-2 font-medium">Category</th>
                            <th className="py-2 font-medium">Status</th>
                            <th className="py-2 font-medium">Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recent.map((o) => (
                            <tr key={o.id} className="border-b border-lapis-50 dark:border-lapis-800">
                                <td className="py-2.5 font-medium text-lapis-900 dark:text-sand-50">{o.title}</td>
                                <td className="py-2.5 text-lapis-600 dark:text-sand-300">{o.category}</td>
                                <td className="py-2.5">
                                    <span className={o.status === "approved" ? "text-emerald-600" : "text-amber-600"}>
                                        {o.status}
                                    </span>
                                </td>
                                <td className="py-2.5 text-lapis-500 dark:text-sand-300">{formatDate(o.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
