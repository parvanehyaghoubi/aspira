import { NextRequest, NextResponse } from "next/server";
import { getOpportunities, createOpportunity } from "@/lib/store";
import { opportunitySchema } from "@/lib/validation";

export async function GET() {
    try {
        const items = await getOpportunities();
        return NextResponse.json(items);
    } catch (err) {
        console.error("[GET /api/opportunities]", err);
        return NextResponse.json(
            { error: "Failed to load opportunities. Please try again later." },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = opportunitySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
        }
        const { requirements, tags, ...rest } = parsed.data;
        const created = await createOpportunity({
            ...rest,
            requirements: requirements.split(",").map((r) => r.trim()).filter(Boolean),
            tags: (tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
        });
        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        console.error("[POST /api/opportunities]", err);
        return NextResponse.json(
            { error: "Failed to create opportunity. Please try again later." },
            { status: 500 }
        );
    }
}
