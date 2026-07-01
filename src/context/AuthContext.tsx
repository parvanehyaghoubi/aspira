"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { AuthUser } from "@/types";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth-cookie";

interface StoredUser extends AuthUser {
    password: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    signup: (name: string, email: string, password: string) => string | null;
    login: (email: string, password: string) => string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USERS_KEY = "aspira-users";
const SESSION_KEY = "aspira-session";
const ADMIN_EMAIL = "admin@aspira.app";

function readUsers(): StoredUser[] {
    try {
        return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]");
    } catch {
        return [];
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(SESSION_KEY);
            if (raw) {
                const session = JSON.parse(raw);
                setUser(session);
                setSessionCookie(session);
            }
        } catch {
            setUser(null);
        }
    }, []);

    function signup(name: string, email: string, password: string) {
        const users = readUsers();
        if (users.some((u) => u.email === email)) {
            return "An account with this email already exists.";
        }
        const role = email.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
        const newUser: StoredUser = { name, email, password, role };
        users.push(newUser);
        window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
        const session: AuthUser = { name, email, role };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setSessionCookie(session);
        setUser(session);
        return null;
    }

    function login(email: string, password: string) {
        const users = readUsers();
        const found = users.find(
            (u) => u.email === email && u.password === password
        );
        if (!found) return "Invalid email or password.";
        const session: AuthUser = {
            name: found.name,
            email: found.email,
            role: found.role,
        };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setSessionCookie(session);
        setUser(session);
        return null;
    }

    function logout() {
        window.localStorage.removeItem(SESSION_KEY);
        clearSessionCookie();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
