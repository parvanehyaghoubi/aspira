"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { authSchema, type AuthFormValues } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SignupPage() {
    return (
        <Suspense fallback={null}>
            <SignupPageInner />
        </Suspense>
    );
}

function SignupPageInner() {
    const { t } = useLanguage();
    const { signup } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema.required({ name: true })),
    });

    async function onSubmit(values: AuthFormValues) {
        const err = await signup(values.name ?? "", values.email, values.password);
        if (err) setError(err);
        else router.push(redirectTo);
    }

    return (
        <div className="mx-auto max-w-sm px-4 py-16">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                <UserPlus size={20} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("signup_title")}
            </h1>
            <p className="mt-2 text-xs text-lapis-500 dark:text-sand-300">
                Sign up with <span className="font-mono">admin@aspira.app</span> to see the admin approval page.
            </p>
            {redirectTo !== "/" && (
                <p className="mt-2 rounded-lg bg-lapis-50 px-3 py-2 text-xs text-lapis-600 dark:bg-lapis-800 dark:text-sand-300">
                    Create an account to continue to <span className="font-mono">{redirectTo}</span>
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="card-surface mt-6 space-y-4 p-6" noValidate>
                {error && <p className="text-xs text-rose-600">{error}</p>}
                <div>
                    <label className="label-text" htmlFor="name">{t("full_name")}</label>
                    <input id="name" className="input-field" {...register("name")} />
                    {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="email">{t("your_email")}</label>
                    <input id="email" type="email" className="input-field" {...register("email")} />
                    {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="label-text" htmlFor="password">{t("password")}</label>
                    <input id="password" type="password" className="input-field" {...register("password")} />
                    {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full">{t("signup_title")}</button>
                <p className="text-center text-xs text-lapis-500 dark:text-sand-300">
                    {t("have_account")}{" "}
                    <Link href={`/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-semibold text-saffron-600">
                        {t("login_title")}
                    </Link>
                </p>
            </form>
        </div>
    );
}
