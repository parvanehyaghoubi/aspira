import fs from "fs";
import path from "path";
import type { Opportunity, OpportunityInput } from "@/types";

const DATA_PATH = path.join(process.cwd(), "data", "opportunities.json");

function readAll(): Opportunity[] {
    try {
        const raw = fs.readFileSync(DATA_PATH, "utf-8");
        return JSON.parse(raw) as Opportunity[];
    } catch {
        return [];
    }
}

function writeAll(items: Opportunity[]): void {
    fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export function getOpportunities(): Opportunity[] {
    return readAll();
}

export function getOpportunityById(id: string): Opportunity | undefined {
    return readAll().find((o) => o.id === id);
}

export function createOpportunity(input: OpportunityInput): Opportunity {
    const items = readAll();
    const newItem: Opportunity = {
        ...input,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    writeAll(items);
    return newItem;
}

export function updateOpportunity(
    id: string,
    patch: Partial<Opportunity>
): Opportunity | null {
    const items = readAll();
    const idx = items.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...patch, id: items[idx].id };
    writeAll(items);
    return items[idx];
}

export function deleteOpportunity(id: string): boolean {
    const items = readAll();
    const next = items.filter((o) => o.id !== id);
    if (next.length === items.length) return false;
    writeAll(next);
    return true;
}
