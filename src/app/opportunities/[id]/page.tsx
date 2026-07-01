"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Bookmark,
    BookmarkCheck,
    Building2,
    CalendarClock,
    CheckCircle2,
    ExternalLink,
    MapPin,
    Pencil,
    Trash2,
} from "lucide-react";
import Badge from "@/components/Badge";
import CountdownBadge from "@/components/CountdownBadge";
import Modal from "@/components/Modal";
import ErrorState from "@/components/ErrorState";
import { LoadingText } from "@/components/LoadingState";
import { useSaved } from "@/context/SavedContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/lib/utils";
import type { Opportunity } from "@/types";

export default function OpportunityDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { t } = useLanguage();
    const { isSaved, toggleSaved } = useSaved();
    const [item, setItem] = useState<Opportunity | null>(null);
    const [error, setError] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function load() {
        setError(false);
        setItem(null);
        try {
            const res = await fetch(`/api/opportunities/${params.id}`);
            if (!res.ok) throw new Error("not found");
            setItem(await res.json());
        } catch {
            setError(true);
        }
    }

    useEffect(() => {
        load();
    }, [params.id]);

    async function handleDelete() {
        setDeleting(true);
        try {
            await fetch(`/api/opportunities/${params.id}`, { method: "DELETE" });
            router.push("/opportunities");
        } finally {
            setDeleting(false);
            setConfirmOpen(false);
        }
    }

    if (error) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16">
                <ErrorState message="We couldn't find that opportunity." onRetry={load} />
            </div>
        );
    }

    if (!item) {
        return <LoadingText />;
    }

    const saved = isSaved(item.id);

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <Link href="/opportunities" className="inline-flex items-center gap-1.5 text-sm font-medium text-lapis-600 hover:text-saffron-600 dark:text-sand-200">
                <ArrowLeft size={15} /> {t("nav_opportunities")}
            </Link>

            <div className="card-surface mt-5 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-saffron-600">
                            {item.category}
                        </p>
                        <h1 className="mt-1 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                            {item.title}
                        </h1>
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-lapis-600 dark:text-sand-300">
                            <Building2 size={15} /> {item.organization}
                        </p>
                    </div>
                    <button
                        onClick={() => toggleSaved(item.id)}
                        className="btn-secondary"
                    >
                        {saved ? <BookmarkCheck size={16} className="text-saffron-600" /> : <Bookmark size={16} />}
                        {saved ? t("saved") : t("save")}
                    </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Badge variant="neutral"><MapPin size={12} /> {item.location}</Badge>
                    <Badge variant="neutral">{item.type}</Badge>
                    <CountdownBadge deadline={item.deadline} />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <h2 className="font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                            {t("description")}
                        </h2>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-lapis-700 dark:text-sand-200">
                            {item.description}
                        </p>

                        <h2 className="mt-6 font-display text-lg font-semibold text-lapis-900 dark:text-sand-50">
                            {t("requirements")}
                        </h2>
                        <ul className="mt-2 space-y-1.5">
                            {item.requirements.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-lapis-700 dark:text-sand-200">
                                    <CheckCircle2 size={15} className="mt-0.5 flex-none text-lapis-500" /> {r}
                                </li>
                            ))}
                        </ul>

                        {item.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                    <Badge key={tag} variant="saffron">{tag}</Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <aside className="space-y-4">
                        <div className="rounded-xl border border-lapis-100 p-4 text-sm dark:border-lapis-700">
                            <p className="flex items-center gap-1.5 text-lapis-500 dark:text-sand-300">
                                <CalendarClock size={14} /> {t("deadline")}
                            </p>
                            <p className="mt-1 font-semibold text-lapis-900 dark:text-sand-50">
                                {formatDate(item.deadline)}
                            </p>
                        </div>
                        <a
                            href={item.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full"
                        >
                            {t("apply_now")} <ExternalLink size={15} />
                        </a>
                    </aside>
                </div>

                <div className="mt-6 flex flex-col gap-2 border-t border-lapis-100 pt-6 dark:border-lapis-700">
                    <Link href={`/add-opportunity/edit/${item.id}`} className="btn-secondary w-full">
                        <Pencil size={14} className="flex-none" /> <span>{t("edit_title")}</span>
                    </Link>
                    <button onClick={() => setConfirmOpen(true)} className="btn-secondary w-full !border-rose-200 !text-rose-600 hover:!bg-rose-50 dark:!border-rose-800">
                        <Trash2 size={14} className="flex-none" /> <span>{t("delete")}</span>
                    </button>
                </div>
            </div>

            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title={t("confirm_delete_title")}>
                <p className="text-sm text-lapis-600 dark:text-sand-300">{t("confirm_delete_body")}</p>
                <div className="mt-5 flex justify-end gap-2">
                    <button onClick={() => setConfirmOpen(false)} className="btn-secondary">
                        {t("cancel")}
                    </button>
                    <button onClick={handleDelete} disabled={deleting} className="btn-primary !bg-rose-600 hover:!bg-rose-700">
                        {deleting ? "…" : t("delete")}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
