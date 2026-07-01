"use client";

import { Compass, Globe2, HeartHandshake, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();
    return (
        <div className="mx-auto max-w-3xl px-4 py-14">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-600 text-white dark:bg-saffron-500">
                <Compass size={20} />
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("about_title")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-lapis-700 dark:text-sand-200">
                Opportunities for Afghan youth are out there — but they are scattered
                across dozens of social media pages, private groups, and websites.
                Aspira brings jobs, internships, scholarships, online
                courses, remote work and training programs into a single, easy place
                to search, save, and apply.
            </p>
            <p className="mt-3 text-base leading-relaxed text-lapis-700 dark:text-sand-200">
                We built this with students, fresh graduates, job seekers and women
                looking for remote work in mind — and with organizations that want a
                simple way to share opportunities with the people who need them.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="card-surface p-5 text-center">
                    <Target size={20} className="mx-auto text-saffron-600" />
                    <p className="mt-2 text-sm font-semibold text-lapis-900 dark:text-sand-50">Our goal</p>
                    <p className="mt-1 text-xs text-lapis-500 dark:text-sand-300">
                        One place for every opportunity worth knowing about.
                    </p>
                </div>
                <div className="card-surface p-5 text-center">
                    <Globe2 size={20} className="mx-auto text-saffron-600" />
                    <p className="mt-2 text-sm font-semibold text-lapis-900 dark:text-sand-50">Open to everyone</p>
                    <p className="mt-1 text-xs text-lapis-500 dark:text-sand-300">
                        Available in English, Dari and Pashto.
                    </p>
                </div>
                <div className="card-surface p-5 text-center">
                    <HeartHandshake size={20} className="mx-auto text-saffron-600" />
                    <p className="mt-2 text-sm font-semibold text-lapis-900 dark:text-sand-50">Community built</p>
                    <p className="mt-1 text-xs text-lapis-500 dark:text-sand-300">
                        Anyone can submit an opportunity for review.
                    </p>
                </div>
            </div>

            <p className="mt-8 rounded-xl border border-dashed border-lapis-200 p-4 text-xs text-lapis-500 dark:border-lapis-700 dark:text-sand-300">
                {t("demo_data_notice")} This project was built as a final capstone
                for the Code to Inspire web development course.
            </p>
        </div>
    );
}
