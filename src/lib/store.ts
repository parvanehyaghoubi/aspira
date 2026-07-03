import fs from "fs";
import path from "path";
import type { Opportunity, OpportunityInput } from "@/types";

const KEY = "opportunities";
const DATA_PATH = path.join(process.cwd(), "data", "opportunities.json");

const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

async function getRedis() {
    if (!hasRedis) return null;
    const { Redis } = await import("@upstash/redis");
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
}

async function readAll(): Promise<Opportunity[]> {
    const redis = await getRedis();
    if (redis) {
        try {
            const data = await redis.get(KEY) as Opportunity[] | null;
            return data ?? [];
        } catch {
            return [];
        }
    }
    try {
        const raw = fs.readFileSync(DATA_PATH, "utf-8");
        return JSON.parse(raw) as Opportunity[];
    } catch {
        return [];
    }
}

async function writeAll(items: Opportunity[]): Promise<void> {
    const redis = await getRedis();
    if (redis) {
        await redis.set(KEY, JSON.stringify(items));
    } else {
        fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
    }
}

export async function getOpportunities(): Promise<Opportunity[]> {
    return readAll();
}

export async function getOpportunityById(id: string): Promise<Opportunity | undefined> {
    const items = await readAll();
    return items.find((o) => o.id === id);
}

export async function createOpportunity(input: OpportunityInput): Promise<Opportunity> {
    const items = await readAll();
    const newItem: Opportunity = {
        ...input,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    await writeAll(items);
    return newItem;
}

export async function updateOpportunity(id: string, patch: Partial<Opportunity>): Promise<Opportunity | null> {
    const items = await readAll();
    const idx = items.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...patch, id: items[idx].id };
    await writeAll(items);
    return items[idx];
}

export async function deleteOpportunity(id: string): Promise<boolean> {
    const items = await readAll();
    const next = items.filter((o) => o.id !== id);
    if (next.length === items.length) return false;
    await writeAll(next);
    return true;
}