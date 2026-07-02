import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import opportunities from "../../../../data/opportunities.json";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
    await redis.set("opportunities", opportunities);
    return NextResponse.json({ success: true, count: opportunities.length });
}