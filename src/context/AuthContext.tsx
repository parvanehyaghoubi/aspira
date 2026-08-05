"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { AuthUser } from "@/types";

interface AuthContextValue {
    user: AuthUser | null;
    loading: boolean;
    signup: (name: string, email: string, password: string) => Promise<string | null>;
    login: (email: string, password: string) => Promise<string | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => { if (data?.user) setUser(data.user); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    async function signup(name: string, email: string, password: string): Promise<string | null> {
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.error ?? "Signup failed.";
            setUser({ name, email, role: data.role ?? "user" });
            return null;
        } catch {
            return "Something went wrong. Please try again.";
        }
    }

    async function login(email: string, password: string): Promise<string | null> {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return data.error ?? "Login failed.";
            setUser({ name: data.name, email, role: data.role ?? "user" });
            return null;
        } catch {
            return "Something went wrong. Please try again.";
        }
    }

    async function logout(): Promise<void> {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
