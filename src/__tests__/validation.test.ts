import { describe, it, expect } from "vitest";
import { opportunitySchema, contactSchema, authSchema } from "../lib/validation";

const validOpp = {
    title: "Frontend Developer Intern",
    organization: "Kabul Tech",
    category: "Internship" as const,
    location: "Kabul",
    type: "Remote" as const,
    deadline: "2026-12-31",
    description: "This is a detailed description that meets the minimum length requirement.",
    requirements: "React, TypeScript",
    applyLink: "https://example.com/apply",
    tags: "react, typescript",
};

describe("opportunitySchema", () => {
    it("passes with valid data", () => { expect(opportunitySchema.safeParse(validOpp).success).toBe(true); });
    it("fails with short title", () => { expect(opportunitySchema.safeParse({ ...validOpp, title: "AB" }).success).toBe(false); });
    it("fails with invalid category", () => { expect(opportunitySchema.safeParse({ ...validOpp, category: "Invalid" }).success).toBe(false); });
    it("fails with invalid URL", () => { expect(opportunitySchema.safeParse({ ...validOpp, applyLink: "not-a-url" }).success).toBe(false); });
});

describe("contactSchema", () => {
    const valid = { name: "Parvaneh", email: "p@example.com", message: "This is a test message that is long enough." };
    it("passes with valid data", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
    it("fails with invalid email", () => { expect(contactSchema.safeParse({ ...valid, email: "bad" }).success).toBe(false); });
});

describe("authSchema", () => {
    const valid = { email: "user@example.com", password: "pass1234" };
    it("passes with valid data", () => { expect(authSchema.safeParse(valid).success).toBe(true); });
    it("fails with short password", () => { expect(authSchema.safeParse({ ...valid, password: "123" }).success).toBe(false); });
});
