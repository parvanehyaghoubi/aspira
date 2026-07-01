import type { AuthUser } from "@/types";

export const SESSION_COOKIE = "aspira_session";

export function setSessionCookie(user: AuthUser) {
    const value = encodeURIComponent(JSON.stringify(user));
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `${SESSION_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function clearSessionCookie() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function decodeSessionCookie(raw: string | undefined): AuthUser | null {
    if (!raw) return null;
    try {
        return JSON.parse(decodeURIComponent(raw)) as AuthUser;
    } catch {
        return null;
    }
}
