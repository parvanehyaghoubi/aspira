"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { useLanguage } from "@/context/LanguageContext";
import ErrorState from "@/components/ErrorState";

export default function ContactPage() {
    const { t } = useLanguage();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

    async function onSubmit(values: ContactFormValues) {
        setSubmitting(true);
        setError(false);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) throw new Error("failed");
            setSuccess(true);
            reset();
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="mx-auto max-w-xl px-4 py-14">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                <Mail size={20} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("contact_title")}
            </h1>
            <p className="mt-2 text-sm text-lapis-500 dark:text-sand-300">{t("contact_subtitle")}</p>

            {success && (
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                    <CheckCircle2 size={18} /> {t("message_sent")}
                </div>
            )}
            {error && <div className="mt-6"><ErrorState /></div>}

            <form onSubmit={handleSubmit(onSubmit)} className="card-surface mt-6 space-y-4 p-6" noValidate>
                <div>
                    <label className="label-text" htmlFor="name">{t("your_name")}</label>
                    <input id="name" className="input-field" {...register("name")} />
                    {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="email">{t("your_email")}</label>
                    <input id="email" type="email" className="input-field" {...register("email")} />
                    {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="message">{t("your_message")}</label>
                    <textarea id="message" rows={4} className="input-field" {...register("message")} />
                    {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? "…" : t("send_message")}
                </button>
            </form>
        </div>
    );
}
