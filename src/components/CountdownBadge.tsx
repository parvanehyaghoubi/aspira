"use client";

import { Clock } from "lucide-react";
import Badge from "./Badge";
import { countdownLabel, isExpired, isExpiringSoon } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function CountdownBadge({ deadline }: { deadline: string }) {
    const { t } = useLanguage();
    const expired = isExpired(deadline);
    const soon = isExpiringSoon(deadline);

    const variant = expired ? "danger" : soon ? "warning" : "neutral";
    const label = expired
        ? t("closed")
        : soon
            ? countdownLabel(deadline)
            : countdownLabel(deadline);

    return (
        <Badge variant={variant}>
            <Clock size={12} />
            {label}
        </Badge>
    );
}
