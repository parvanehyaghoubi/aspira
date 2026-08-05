import fs from "fs";
import path from "path";

const USERS_KEY = "aspira-users";
const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export interface StoredUser {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    salt: string;
    role: "user" | "admin";
    createdAt: string;
}

const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

async function getRedis() {
    if (!hasRedis) return null;
    const { Redis } = await import("@upstash/redis");
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
}

async function readUsers(): Promise<StoredUser[]> {
    const redis = await getRedis();
    if (redis) {
        try {
            const data = await redis.get(USERS_KEY) as string | null;
            if (!data) return [];
            return typeof data === "string" ? JSON.parse(data) : data;
        } catch {
            return [];
        }
    }
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    } catch {
        return [];
    }
}

async function writeUsers(users: StoredUser[]): Promise<void> {
    const redis = await getRedis();
    if (redis) {
        await redis.set(USERS_KEY, JSON.stringify(users));
    } else {
        fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    }
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
    const users = await readUsers();
    return users.find((u) => u.email === email) ?? null;
}

export async function createUser(data: Omit<StoredUser, "id" | "createdAt">): Promise<StoredUser> {
    const users = await readUsers();
    if (users.some((u) => u.email === data.email)) {
        throw new Error("An account with this email already exists.");
    }
    const newUser: StoredUser = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
}
