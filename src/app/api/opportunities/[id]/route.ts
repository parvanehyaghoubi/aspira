import { NextRequest, NextResponse } from "next/server";
import {
    getOpportunityById,
    updateOpportunity,
    deleteOpportunity,
} from "@/lib/store";
import { opportunitySchema } from "@/lib/validation";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const item = await getOpportunityById(id);
    if (!item) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = await params;
    const body = await req.json();

    if (body && typeof body === "object" && "status" in body && Object.keys(body).length === 1) {
        const updated = await updateOpportunity(id, { status: body.status });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    }

    const parsed = opportunitySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten() },
            { status: 400 }
        );
    }
    const { requirements, tags, ...rest } = parsed.data;
    const updated = await updateOpportunity(id, {
        ...rest,
        requirements: requirements.split(",").map((r) => r.trim()).filter(Boolean),
        tags: (tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    });
    if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    const { id } = await params;
    const ok = await deleteOpportunity(id);
    if (!ok) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
