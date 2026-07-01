import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten() },
            { status: 400 }
        );
    }

    console.log("[contact] new message", parsed.data);

    return NextResponse.json({ success: true });
}
