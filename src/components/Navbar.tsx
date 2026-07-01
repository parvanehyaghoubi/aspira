"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { t } = useLanguage();
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: t("nav_home") },
        { href: "/opportunities", label: t("nav_opportunities") },
        { href: "/saved", label: t("nav_saved") },
        { href: "/add-opportunity", label: t("nav_add") },
        { href: "/dashboard", label: t("nav_dashboard") },
        { href: "/cv-builder", label: t("nav_cv") },
        { href: "/about", label: t("nav_about") },
        { href: "/contact", label: t("nav_contact") },
    ];

    return (
        <header className="sticky top-0 z-30 border-b border-lapis-100 bg-sand-50/90 backdrop-blur dark:border-lapis-700 dark:bg-lapis-900/90">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-lapis-800 dark:text-sand-50">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                        <FontAwesomeIcon icon={faCompass} className="h-4 w-4" />
                    </span>
                    Aspira
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "rounded-full px-3 py-2 text-sm font-medium transition hover:bg-lapis-100/70 dark:hover:bg-lapis-700",
                                pathname === link.href
                                    ? "text-saffron-600"
                                    : "text-lapis-700 dark:text-sand-100"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {user?.role === "admin" && (
                        <Link
                            href="/admin"
                            className={cn(
                                "rounded-full px-3 py-2 text-sm font-medium transition hover:bg-lapis-100/70 dark:hover:bg-lapis-700",
                                pathname === "/admin" ? "text-saffron-600" : "text-lapis-700 dark:text-sand-100"
                            )}
                        >
                            Admin
                        </Link>
                    )}
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    {user ? (
                        <button onClick={logout} className="btn-secondary !px-4 !py-2 text-xs">
                            {t("nav_logout")}
                        </button>
                    ) : (
                        <Link href="/login" className="btn-primary !px-4 !py-2 text-xs">
                            {t("nav_login")}
                        </Link>
                    )}
                </div>

                <button
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-lapis-200 text-lapis-700 lg:hidden dark:border-lapis-600 dark:text-sand-100"
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {open && (
                <div className="border-t border-lapis-100 px-4 pb-4 lg:hidden dark:border-lapis-700">
                    <nav className="flex flex-col gap-1 pt-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-lapis-700 hover:bg-lapis-100/70 dark:text-sand-100 dark:hover:bg-lapis-700"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.role === "admin" && (
                            <Link
                                href="/admin"
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-lapis-700 hover:bg-lapis-100/70 dark:text-sand-100 dark:hover:bg-lapis-700"
                            >
                                Admin
                            </Link>
                        )}
                    </nav>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                        {user ? (
                            <button onClick={logout} className="btn-secondary !px-4 !py-2 text-xs">
                                {t("nav_logout")}
                            </button>
                        ) : (
                            <Link href="/login" className="btn-primary !px-4 !py-2 text-xs">
                                {t("nav_login")}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
