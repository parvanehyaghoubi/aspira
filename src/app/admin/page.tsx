"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { LoadingText } from "@/components/LoadingState";
import Badge from "@/components/Badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";
import type { Opportunity } from "@/types";

export default function AdminPage() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [items, setItems] = useState<Opportunity[] | null>(null);
    const [error, setError] = useState(false);
    const [busyId, setBusyId] = useState<string | null>(null);

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

    useEffect(() => {
        if (user && user.role !== "admin") router.push("/");
    }, [user, router]);

    async function setStatus(id: string, status: "approved" | "pending") {
        setBusyId(id);
        try {
            await fetch(`/api/opportunities/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            await load();
        } finally {
            setBusyId(null);
        }
    }

    async function reject(id: string) {
        setBusyId(id);
        try {
            await fetch(`/api/opportunities/${id}`, { method: "DELETE" });
            await load();
        } finally {
            setBusyId(null);
        }
    }

    if (!user) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16">
                <EmptyState
                    title="Admin access required"
                    subtitle="Log in with an admin account to review pending submissions. Sign up with admin@aspira.app to get the admin role in this demo."
                />
            </div>
        );
    }

    if (user.role !== "admin") return null;

    if (error) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16">
                <ErrorState onRetry={load} />
            </div>
        );
    }

    if (!items) return <LoadingText />;

    const pending = items.filter((o) => o.status === "pending");

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                <ShieldAlert size={20} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("admin_title")}
            </h1>

            <div className="mt-6 space-y-4">
                {pending.length === 0 && (
                    <EmptyState title="No pending submissions" subtitle="New opportunity submissions will show up here for review." />
                )}
                {pending.map((o) => (
                    <div key={o.id} className="card-surface flex flex-wrap items-start justify-between gap-4 p-5">
                        <div>
                            <Badge variant="warning">Pending</Badge>
                            <p className="mt-2 font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                                {o.title}
                            </p>
                            <p className="text-sm text-lapis-600 dark:text-sand-300">
                                {o.organization} · {o.category} · {o.location}
                            </p>
                            <p className="mt-1 text-xs text-lapis-500 dark:text-sand-400">
                                Submitted {formatDate(o.createdAt)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={busyId === o.id}
                                onClick={() => setStatus(o.id, "approved")}
                                className="btn-primary !px-4 !py-2 text-xs"
                            >
                                <CheckCircle2 size={14} /> {t("approve")}
                            </button>
                            <button
                                disabled={busyId === o.id}
                                onClick={() => reject(o.id)}
                                className="btn-secondary !px-4 !py-2 text-xs !border-rose-200 !text-rose-600 hover:!bg-rose-50 dark:!border-rose-800"
                            >
                                <XCircle size={14} /> {t("reject")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
