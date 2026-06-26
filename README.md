# KaarYab Afghanistan — Opportunity Finder Platform

**Project Name:** KaarYab Afghanistan

**Project Description:** KaarYab Afghanistan is a modern opportunity finder platform that helps Afghan youth discover jobs, internships, scholarships, online courses, remote work, and skill-building opportunities — all in one place, with search, filters, saving, and a community submission flow.

**Problem It Solves:** Opportunities for Afghan youth are scattered across social media pages, private groups, and individual websites. KaarYab brings them into a single, searchable, multilingual platform so students, graduates, job seekers, and organizations don't have to dig through dozens of sources.

## Features

**Core requirements**
- Home, Opportunities, Opportunity Details (`/opportunities/[id]`), Add Opportunity, Edit Opportunity, Saved, Dashboard, About and Contact pages
- Opportunity listing with title, organization, category, location, type, deadline, description, requirements, apply link and tags
- Search by title/organization/tag, plus filters for category, location, work type and deadline window
- Save/unsave opportunities, persisted in `localStorage` via React Context
- Add Opportunity form with `react-hook-form` + `zod` validation
- Full CRUD (create, read, update, delete) backed by Next.js API routes over a JSON file data store
- Dashboard with stat cards, a category bar chart and a work-type pie chart (Recharts), and a recent submissions table
- Responsive layout (mobile, tablet, desktop)
- Light/dark mode, persisted and respecting system preference
- Professional UI: navbar, footer, cards, buttons, forms, a modal, badges, empty/loading/error states

**Bonus features implemented**
- **Multi-language support** — English, Dari (دری) and Pashto (پښتو), including automatic right-to-left layout
- **Deadline countdown & "expiring soon" badge** on every opportunity card and detail page
- **Featured opportunities** highlighted on the home page
- **Charts with Recharts** on the dashboard (bar + pie)
- **Framer Motion animations** for page/card transitions and the modal
- **Mock authentication** (sign up / log in), stored in `localStorage` for demo purposes
- **Admin approval system** — new submissions start as `pending`; an admin account (sign up with `admin@kaaryab.af`) can approve or reject them from `/admin`
- **PDF CV builder** at `/cv-builder`, generating a downloadable PDF with `jsPDF`
- **Contact/email API route** — `/api/contact` accepts and logs messages (a stand-in for a real email provider)

## Technologies Used

- Next.js 14 (App Router) + TypeScript
- React 18, Tailwind CSS
- React Hook Form + Zod
- Recharts, Framer Motion, lucide-react icons
- jsPDF (CV builder)
- Next.js API routes + a JSON file as a mock database
- React Context + localStorage (saved items, theme, language, demo auth)

## How to Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To create a production build:

```bash
npm run build
npm run start
```

To get admin access in the demo, sign up at `/signup` using the email `admin@kaaryab.af` (any password) — this account is automatically given the admin role and can review pending submissions at `/admin`.

## Screenshots

Add screenshots of the Home, Opportunities, Dashboard and Add Opportunity pages here before submitting.

## Live Demo Link

Deploy to Vercel (see below) and paste the resulting URL here.

## GitHub Link

Push this project to a GitHub repository and paste the link here.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), import the repository, and deploy with default settings (Next.js is auto-detected).
3. **Important data-storage note:** opportunities are stored in `data/opportunities.json` and written to by the API routes. This works for local development, but Vercel's serverless functions have a **read-only filesystem at runtime**, so any opportunity you add, edit, or delete after deploying will not persist between requests in production (it resets to the seed data). This is expected for a course project using a "JSON file" data store. For a persistent production deployment, swap `lib/store.ts` for a real database (e.g. Postgres via Supabase/Neon, or Vercel KV) — the function signatures in `lib/store.ts` are written so this swap only touches one file.

## Future Improvements

- Replace the JSON file store with a real database (Postgres, MongoDB, or similar) for persistence in production
- Replace the demo `localStorage` authentication with real authentication (e.g. NextAuth.js) and hashed passwords
- Connect the contact form and admin-approval notifications to a real email provider (e.g. Resend, SendGrid)
- Add pagination or infinite scroll once the number of opportunities grows
- Add automated tests (unit tests for utils/validation, integration tests for API routes)
- Allow organizations to manage their own posted opportunities from an account dashboard

## Important Note

This project uses **demo data** created for educational purposes (see `data/opportunities.json`). Organization names, links and details are illustrative and not real postings.
