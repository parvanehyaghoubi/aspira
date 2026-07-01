"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-lapis-200 text-lapis-700 transition hover:bg-lapis-50 dark:border-lapis-600 dark:text-sand-100 dark:hover:bg-lapis-700"
        >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
    );
}
