import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("aspira_token")?.value;
        if (!token) return NextResponse.json({ user: null });
        const payload = await verifyToken(token);
        if (!payload) return NextResponse.json({ user: null });
        return NextResponse.json({
            user: { name: payload.name, email: payload.email, role: payload.role },
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}
