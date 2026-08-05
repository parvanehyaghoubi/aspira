import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/user-store";
import { signToken } from "@/lib/jwt";

const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const ADMIN_EMAIL = "admin@aspira.app";

function generateSalt(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = signupSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }
        const { name, email, password } = parsed.data;
        const salt = generateSalt();
        const passwordHash = await hashPassword(password, salt);
        const role: "user" | "admin" = email.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";

        const user = await createUser({ name, email, passwordHash, salt, role });
        const token = await signToken({ id: user.id, name, email, role });

        const res = NextResponse.json({ success: true, role }, { status: 201 });
        res.cookies.set("aspira_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return res;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to create account.";
        const status = message.includes("already exists") ? 409 : 500;
        console.error("[POST /api/auth/signup]", err);
        return NextResponse.json({ error: message }, { status });
    }
}
