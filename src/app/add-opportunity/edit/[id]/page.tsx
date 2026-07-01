"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OpportunityForm from "@/components/OpportunityForm";
import ErrorState from "@/components/ErrorState";
import { LoadingText } from "@/components/LoadingState";
import { useLanguage } from "@/context/LanguageContext";
import type { Opportunity } from "@/types";
import type { OpportunityFormValues } from "@/lib/validation";

export default function EditOpportunityPage() {
    const { t } = useLanguage();
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [item, setItem] = useState<Opportunity | null>(null);
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch(`/api/opportunities/${params.id}`)
            .then((res) => {
                if (!res.ok) throw new Error("not found");
                return res.json();
            })
            .then(setItem)
            .catch(() => setError(true));
    }, [params.id]);

    async function handleSubmit(values: OpportunityFormValues) {
        setSubmitting(true);
        try {
            const res = await fetch(`/api/opportunities/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("failed");
            router.push(`/opportunities/${params.id}`);
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }

    if (error) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16">
                <ErrorState />
            </div>
        );
    }

    if (!item) return <LoadingText />;

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("edit_title")}
            </h1>
            <div className="mt-6">
                <OpportunityForm
                    defaultValues={{
                        ...item,
                        requirements: item.requirements.join(", "),
                        tags: item.tags.join(", "),
                    }}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    submitLabel={t("update")}
                />
            </div>
        </div>
    );
}
