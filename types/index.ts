export type Category =
  | "Job"
  | "Internship"
  | "Scholarship"
  | "Online Course"
  | "Remote Work"
  | "Training Program"
  | "Volunteer Work";

export type WorkType = "Remote" | "On-site" | "Hybrid";

export type Status = "pending" | "approved";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: Category;
  location: string;
  type: WorkType;
  deadline: string; // ISO date string
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  featured?: boolean;
  status: Status;
  createdAt: string;
}

export type OpportunityInput = Omit<
  Opportunity,
  "id" | "createdAt" | "status"
>;

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface AuthUser {
  name: string;
  email: string;
  role: "user" | "admin";
}

export type Locale = "en" | "fa" | "de" | "fr" | "ar" | "ko" | "ja";
