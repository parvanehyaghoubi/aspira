"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { opportunitySchema, type OpportunityFormValues } from "@/lib/validation";
import type { Opportunity } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const CATEGORIES = [
    "Job",
    "Internship",
    "Scholarship",
    "Online Course",
    "Remote Work",
    "Training Program",
    "Volunteer Work",
] as const;

const TYPES = ["Remote", "On-site", "Hybrid"] as const;

export default function OpportunityForm({
    defaultValues,
    onSubmit,
    submitting,
    submitLabel,
}: {
    defaultValues?: Partial<OpportunityFormValues>;
    onSubmit: (values: OpportunityFormValues) => Promise<void> | void;
    submitting?: boolean;
    submitLabel: string;
}) {
    const { t } = useLanguage();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OpportunityFormValues>({
        resolver: zodResolver(opportunitySchema),
        defaultValues: {
            title: "",
            organization: "",
            category: "Job",
            location: "",
            type: "Remote",
            deadline: "",
            description: "",
            requirements: "",
            applyLink: "",
            tags: "",
            ...defaultValues,
        },
    });

    return (
        <form
            onSubmit={handleSubmit((vals) => onSubmit(vals))}
            className="card-surface space-y-5 p-6"
            noValidate
        >
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="label-text" htmlFor="title">Title</label>
                    <input id="title" className="input-field" {...register("title")} />
                    {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="organization">{t("organization")}</label>
                    <input id="organization" className="input-field" {...register("organization")} />
                    {errors.organization && <p className="mt-1 text-xs text-rose-600">{errors.organization.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="category">{t("filter_category")}</label>
                    <select id="category" className="input-field" {...register("category")}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label-text" htmlFor="location">{t("filter_location")}</label>
                    <input id="location" className="input-field" placeholder="Kabul, Online…" {...register("location")} />
                    {errors.location && <p className="mt-1 text-xs text-rose-600">{errors.location.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="type">{t("filter_type")}</label>
                    <select id="type" className="input-field" {...register("type")}>
                        {TYPES.map((ty) => (
                            <option key={ty} value={ty}>{ty}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label-text" htmlFor="deadline">{t("deadline")}</label>
                    <input id="deadline" type="date" className="input-field" {...register("deadline")} />
                    {errors.deadline && <p className="mt-1 text-xs text-rose-600">{errors.deadline.message}</p>}
                </div>
            </div>

            <div>
                <label className="label-text" htmlFor="description">{t("description")}</label>
                <textarea id="description" rows={4} className="input-field" {...register("description")} />
                {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>}
            </div>

            <div>
                <label className="label-text" htmlFor="requirements">{t("requirements")} (comma separated)</label>
                <input id="requirements" className="input-field" placeholder="Basic React, GitHub, English B2" {...register("requirements")} />
                {errors.requirements && <p className="mt-1 text-xs text-rose-600">{errors.requirements.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="label-text" htmlFor="applyLink">Apply link</label>
                    <input id="applyLink" className="input-field" placeholder="https://example.com/apply" {...register("applyLink")} />
                    {errors.applyLink && <p className="mt-1 text-xs text-rose-600">{errors.applyLink.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="tags">{t("tags")} (comma separated)</label>
                    <input id="tags" className="input-field" placeholder="React, Remote, Beginner" {...register("tags")} />
                </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? "…" : submitLabel}
            </button>
        </form>
    );
}
