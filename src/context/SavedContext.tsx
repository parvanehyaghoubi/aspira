"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface SavedContextValue {
    savedIds: string[];
    isSaved: (id: string) => boolean;
    toggleSaved: (id: string) => void;
}

const SavedContext = createContext<SavedContextValue | undefined>(undefined);
const STORAGE_KEY = "aspira-saved-opportunities";

export function SavedProvider({ children }: { children: ReactNode }) {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) setSavedIds(JSON.parse(raw));
        } catch {
            setSavedIds([]);
        }
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    }, [savedIds, hydrated]);

    function isSaved(id: string) {
        return savedIds.includes(id);
    }

    function toggleSaved(id: string) {
        setSavedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    return (
        <SavedContext.Provider value={{ savedIds, isSaved, toggleSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const ctx = useContext(SavedContext);
    if (!ctx) throw new Error("useSaved must be used within SavedProvider");
    return ctx;
}
