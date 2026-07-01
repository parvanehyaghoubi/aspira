import { Compass } from "lucide-react";
import type { ReactNode } from "react";

export default function EmptyState({
    title,
    subtitle,
    action,
}: {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-lapis-200 bg-white/60 px-6 py-16 text-center dark:border-lapis-700 dark:bg-lapis-800/40">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-100 text-lapis-500 dark:bg-lapis-700 dark:text-sand-200">
                <Compass size={20} />
            </span>
            <p className="font-display text-lg font-semibold text-lapis-800 dark:text-sand-50">
                {title}
            </p>
            {subtitle && (
                <p className="max-w-sm text-sm text-lapis-500 dark:text-sand-300">
                    {subtitle}
                </p>
            )}
            {action}
        </div>
    );
}
