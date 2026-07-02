import { NextRequest, NextResponse } from "next/server";
import { getOpportunities, createOpportunity } from "@/lib/store";
import { opportunitySchema } from "@/lib/validation";

export async function GET() {
    const items = await getOpportunities();
    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = opportunitySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.flatten() },
            { status: 400 }
        );
    }
    const { requirements, tags, ...rest } = parsed.data;
    const created = await createOpportunity({
        ...rest,
        requirements: requirements.split(",").map((r) => r.trim()).filter(Boolean),
        tags: (tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    });
    return NextResponse.json(created, { status: 201 });
}
