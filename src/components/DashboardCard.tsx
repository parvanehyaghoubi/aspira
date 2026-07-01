import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function DashboardCard({
    label,
    value,
    icon,
    accent = "lapis",
}: {
    label: string;
    value: number | string;
    icon: ReactNode;
    accent?: "lapis" | "saffron";
}) {
    return (
        <div className="card-surface flex items-center gap-4 p-5">
            <span
                className={cn(
                    "flex h-11 w-11 flex-none items-center justify-center rounded-xl",
                    accent === "lapis"
                        ? "bg-lapis-50 text-lapis-600 dark:bg-lapis-700 dark:text-sand-100"
                        : "bg-saffron-50 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300"
                )}
            >
                {icon}
            </span>
            <div>
                <p className="font-display text-2xl font-semibold text-lapis-900 dark:text-sand-50">
                    {value}
                </p>
                <p className="text-xs text-lapis-500 dark:text-sand-300">{label}</p>
            </div>
        </div>
    );
}
