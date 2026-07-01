"use client";

import Link from "next/link";
import {
    Briefcase,
    GraduationCap,
    Award,
    Laptop,
    Globe2,
    Wrench,
    HeartHandshake,
} from "lucide-react";
import type { Category } from "@/types";
import { categorySlug } from "@/lib/utils";

const CATEGORY_META: { name: Category; icon: typeof Briefcase }[] = [
    { name: "Job", icon: Briefcase },
    { name: "Internship", icon: GraduationCap },
    { name: "Scholarship", icon: Award },
    { name: "Online Course", icon: Laptop },
    { name: "Remote Work", icon: Globe2 },
    { name: "Training Program", icon: Wrench },
    { name: "Volunteer Work", icon: HeartHandshake },
];

export default function CategoryTabs() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORY_META.map(({ name, icon: Icon }) => (
                <Link
                    key={name}
                    href={`/opportunities?category=${encodeURIComponent(name)}`}
                    className="card-surface flex flex-col items-center gap-2 px-3 py-5 text-center transition hover:-translate-y-0.5 hover:border-saffron-300"
                    data-category={categorySlug(name)}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lapis-50 text-lapis-600 dark:bg-lapis-700 dark:text-sand-100">
                        <Icon size={18} />
                    </span>
                    <span className="text-xs font-medium text-lapis-700 dark:text-sand-100">
                        {name}
                    </span>
                </Link>
            ))}
        </div>
    );
}
