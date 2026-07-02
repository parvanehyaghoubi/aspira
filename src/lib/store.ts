import { kv } from "@vercel/kv";
import type { Opportunity, OpportunityInput } from "@/types";

const KEY = "opportunities";

async function readAll(): Promise<Opportunity[]> {
    try {
        const data = await kv.get<Opportunity[]>(KEY);
        return data ?? [];
    } catch {
        return [];
    }
}

async function writeAll(items: Opportunity[]): Promise<void> {
    await kv.set(KEY, items);
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

export async function updateOpportunity(
    id: string,
    patch: Partial<Opportunity>
): Promise<Opportunity | null> {
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
