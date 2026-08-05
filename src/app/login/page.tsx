"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { authSchema, type AuthFormValues } from "@/lib/validation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageInner />
        </Suspense>
    );
}

function LoginPageInner() {
    const { t } = useLanguage();
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema.omit({ name: true })),
    });

    async function onSubmit(values: AuthFormValues) {
        const err = await login(values.email, values.password);
        if (err) {
            setError(err);
        } else {
            router.push(redirectTo);
            router.refresh();
        }
    }

    return (
        <div className="mx-auto max-w-sm px-4 py-16">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                <LogIn size={20} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("login_title")}
            </h1>
            
            {redirectTo !== "/" && (
                <p className="mt-2 rounded-lg bg-lapis-50 px-3 py-2 text-xs text-lapis-600 dark:bg-lapis-800 dark:text-sand-300">
                    Log in to continue to <span className="font-mono">{redirectTo}</span>
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="card-surface mt-6 space-y-4 p-6" noValidate>
                {error && <p className="text-xs text-rose-600">{error}</p>}
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
                <button type="submit" className="btn-primary w-full">{t("login_title")}</button>
                <p className="text-center text-xs text-lapis-500 dark:text-sand-300">
                    {t("no_account")}{" "}
                    <Link href={`/signup${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} className="font-semibold text-saffron-600">
                        {t("signup_title")}
                    </Link>
                </p>
            </form>
        </div>
    );
}
