"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faXTwitter,
    faLinkedinIn,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "@/context/LanguageContext";

const SOCIALS = [
    { icon: faFacebookF, label: "Facebook", href: "https://facebook.com" },
    { icon: faXTwitter, label: "X (Twitter)", href: "https://x.com/P_Yaghoubi" },
    { icon: faLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/parvaneh-yaghoubi-54362620b" },
    { icon: faInstagram, label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="border-t border-lapis-100 bg-white dark:border-lapis-700 dark:bg-lapis-800">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-4">
                    <div className="sm:col-span-1">
                        <p className="font-display text-lg font-semibold text-lapis-800 dark:text-sand-50">
                            {t("appName")}
                        </p>
                        <p className="mt-2 max-w-xs text-sm text-lapis-600 dark:text-sand-200">
                            {t("tagline")}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-semibold text-lapis-800 dark:text-sand-50">
                            {t("nav_opportunities")}
                        </p>
                        <ul className="space-y-1.5 text-sm text-lapis-600 dark:text-sand-200">
                            <li><Link href="/opportunities" className="hover:text-saffron-600">{t("nav_opportunities")}</Link></li>
                            <li><Link href="/saved" className="hover:text-saffron-600">{t("nav_saved")}</Link></li>
                            <li><Link href="/dashboard" className="hover:text-saffron-600">{t("nav_dashboard")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-semibold text-lapis-800 dark:text-sand-50">
                            {t("nav_about")}
                        </p>
                        <ul className="space-y-1.5 text-sm text-lapis-600 dark:text-sand-200">
                            <li><Link href="/about" className="hover:text-saffron-600">{t("nav_about")}</Link></li>
                            <li><Link href="/contact" className="hover:text-saffron-600">{t("nav_contact")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-semibold text-lapis-800 dark:text-sand-50">
                            Connect
                        </p>
                        <div className="flex gap-2">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-lapis-200 text-lapis-600 transition hover:bg-saffron-500 hover:text-white hover:border-saffron-500 dark:border-lapis-600 dark:text-sand-200 dark:hover:bg-saffron-500 dark:hover:text-lapis-900"
                                >
                                    <FontAwesomeIcon icon={s.icon} size="sm" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-2 border-t border-lapis-100 pt-6 text-xs text-lapis-500 sm:flex-row sm:items-center sm:justify-between dark:border-lapis-700 dark:text-sand-300">
                    <p>© {new Date().getFullYear()} {t("appName")}. {t("demo_data_notice")}</p>
                    <p>Built with Parvaneh Yaghoubi.</p>
                </div>
            </div>
        </footer>
    );
}
