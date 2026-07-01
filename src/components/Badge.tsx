import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
    neutral: "bg-lapis-100 text-lapis-700 dark:bg-lapis-700 dark:text-sand-100",
    saffron: "bg-saffron-100 text-saffron-700 dark:bg-saffron-900/40 dark:text-saffron-300",
    turquoise: "bg-turquoise-100 text-turquoise-700 dark:bg-turquoise-900/40 dark:text-turquoise-300",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    danger: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function Badge({
    children,
    variant = "neutral",
    className,
}: {
    children: ReactNode;
    variant?: keyof typeof variants;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
