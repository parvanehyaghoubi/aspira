import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { daysUntil, isExpired, isExpiringSoon, countdownLabel, cn } from "../lib/utils";

const FAKE_TODAY = new Date("2025-01-15T00:00:00.000Z");

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(FAKE_TODAY); });
afterEach(() => { vi.useRealTimers(); });

describe("cn", () => {
    it("merges class names", () => { expect(cn("a", "b")).toBe("a b"); });
    it("ignores falsy values", () => { expect(cn("a", false, undefined, "b")).toBe("a b"); });
});

describe("daysUntil", () => {
    it("returns 0 for today", () => { expect(daysUntil("2025-01-15")).toBe(0); });
    it("returns positive for future", () => { expect(daysUntil("2025-01-20")).toBe(5); });
    it("returns negative for past", () => { expect(daysUntil("2025-01-10")).toBe(-5); });
});

describe("isExpired", () => {
    it("returns true for past", () => { expect(isExpired("2025-01-10")).toBe(true); });
    it("returns false for today", () => { expect(isExpired("2025-01-15")).toBe(false); });
    it("returns false for future", () => { expect(isExpired("2025-01-20")).toBe(false); });
});

describe("isExpiringSoon", () => {
    it("returns true within 7 days", () => { expect(isExpiringSoon("2025-01-20")).toBe(true); });
    it("returns false beyond 7 days", () => { expect(isExpiringSoon("2025-01-30")).toBe(false); });
    it("returns false for expired", () => { expect(isExpiringSoon("2025-01-10")).toBe(false); });
});

describe("countdownLabel", () => {
    it("returns Closed for past", () => { expect(countdownLabel("2025-01-10")).toBe("Closed"); });
    it("returns Closes today for today", () => { expect(countdownLabel("2025-01-15")).toBe("Closes today"); });
    it("returns days left for future", () => { expect(countdownLabel("2025-01-20")).toBe("5 days left"); });
});
