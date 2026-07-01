import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function daysUntil(deadline: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(deadline);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function isExpired(deadline: string): boolean {
    return daysUntil(deadline) < 0;
}

export function isExpiringSoon(deadline: string, withinDays = 7): boolean {
    const d = daysUntil(deadline);
    return d >= 0 && d <= withinDays;
}

export function formatDate(dateStr: string, locale = "en-US"): string {
    try {
        return new Date(dateStr).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return dateStr;
    }
}

export function countdownLabel(deadline: string): string {
    const d = daysUntil(deadline);
    if (d < 0) return "Closed";
    if (d === 0) return "Closes today";
    if (d === 1) return "1 day left";
    return `${d} days left`;
}

const CATEGORY_SLUGS: Record<string, string> = {
    Job: "job",
    Internship: "internship",
    Scholarship: "scholarship",
    "Online Course": "online-course",
    "Remote Work": "remote-work",
    "Training Program": "training-program",
    "Volunteer Work": "volunteer-work",
};

export function categorySlug(category: string): string {
    return CATEGORY_SLUGS[category] ?? category.toLowerCase().replace(/\s+/g, "-");
}
