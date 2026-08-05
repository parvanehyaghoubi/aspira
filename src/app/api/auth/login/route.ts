import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getUserByEmail } from "@/lib/user-store";
import { signToken } from "@/lib/jwt";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

async function hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input." }, { status: 400 });
        }
        const { email, password } = parsed.data;

        const user = await getUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const hash = await hashPassword(password, user.salt);
        if (hash !== user.passwordHash) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        const token = await signToken({ id: user.id, name: user.name, email, role: user.role });

        const res = NextResponse.json({ success: true, name: user.name, role: user.role });
        res.cookies.set("aspira_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return res;
    } catch (err) {
        console.error("[POST /api/auth/login]", err);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
