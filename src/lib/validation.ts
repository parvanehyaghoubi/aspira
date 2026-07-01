import { z } from "zod";

export const opportunitySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    organization: z.string().min(2, "Organization is required"),
    category: z.enum([
        "Job",
        "Internship",
        "Scholarship",
        "Online Course",
        "Remote Work",
        "Training Program",
        "Volunteer Work",
    ]),
    location: z.string().min(2, "Location is required"),
    type: z.enum(["Remote", "On-site", "Hybrid"]),
    deadline: z
        .string()
        .min(1, "Deadline is required")
        .refine((val) => !Number.isNaN(new Date(val).getTime()), "Invalid date"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    requirements: z
        .string()
        .min(1, "List at least one requirement"),
    applyLink: z.string().url("Enter a valid URL"),
    tags: z.string().optional().default(""),
});

export type OpportunityFormValues = z.infer<typeof opportunitySchema>;

export const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const authSchema = z.object({
    name: z.string().min(2, "Name is required").optional(),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;
