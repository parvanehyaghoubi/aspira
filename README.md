<p align="center">
  <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/aspira_logo.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/aspira_logo.png" height=200px>
</p>


# Aspira — Opportunity Finder Platform

**Project Description:** Aspira is a modern opportunity finder platform that helps Afghan youth discover jobs, internships, scholarships, online courses, remote work, and skill-building opportunities. All in one place, with search, filters, saving, and a community submission flow.

**Problem It Solves:** Opportunities for Afghan youth are scattered across social media pages, private groups, and individual websites. Aspira brings them into a single, searchable, multilingual platform so students, graduates, job seekers, and organizations don't have to dig through dozens of sources.


## Live Demo Link

https://aspira-sigma.vercel.app/


## Features

**Main Features**
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
- **Multi-language support** — English, Dari, German, French, Arabic, Korean, and Japanese. With automatic right-to-left layout for Dari and Arabic
- **Deadline countdown & "expiring soon" badge** on every opportunity card and detail page
- **Featured opportunities** highlighted on the home page
- **Charts with Recharts** on the dashboard (bar + pie)
- **Framer Motion animations** for page/card transitions and the modal
- **JWT-based authentication** — sign up / log in; passwords are hashed with SHA-256 + salt using the Web Crypto API before being stored in Upstash Redis; the session is stored in an **httpOnly cookie** (not localStorage)
- **Protected routes via Next.js Middleware** — `/dashboard`, `/saved`, `/add-opportunity`, `/cv-builder` and `/admin` require a logged-in session; logged-out visitors are redirected to `/login?redirect=...` and sent back after logging in.
- **Admin approval system** — new submissions start as `pending`; an admin account (sign up with `admin@aspira.app`) can approve or reject them from `/admin`
- **PDF CV builder** at `/cv-builder`, generating a downloadable PDF with `jsPDF`
- **Contact/email API route** — `/api/contact` accepts and logs messages (a stand-in for a real email provider)

## Technologies Used

- **Framework:** Next.js 16 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS + Framer Motion
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Auth:** Custom JWT (jose) + SHA-256 password hashing (Web Crypto API)
- **Database:** Upstash Redis (opportunities + user accounts)
- **Deployment:** Vercel
- **Testing:** Vitest (unit & integration) + Playwright (E2E)

## How to Run Locally

### Prerequisites
- Node.js 18+
- A free [Upstash](https://upstash.com) account

> **Why Upstash?**
> Upstash is a free serverless Redis database. Aspira uses it to store opportunity listings and hashed user accounts. It works seamlessly with Vercel and requires no server setup.
> Create a free account at [upstash.com](https://upstash.com), create a Redis database, and copy the URL and token from the dashboard.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/parvanehyaghoubi/aspira.git
   cd aspira
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```
   # Upstash Redis (for opportunities data and user accounts)
   UPSTASH_REDIS_REST_URL=your_upstash_url_here
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here

   # JWT Secret — generate with:
   # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   JWT_SECRET=your_random_secret_here
   ```

3. Generate a JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Copy the output and paste it as the value of `JWT_SECRET` in your `.env.local`.

4. Start the development server:
   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

### Running Tests

```bash
# Unit & integration tests
npm test

# E2E tests (requires dev server running)
npm run dev # terminal 1
npm run test:e2e # terminal 2
```

### Admin Access

To get admin access in the demo, sign up at `/signup` using the email `admin@aspira.app` (any password). This account is automatically given the admin role and can review pending submissions at `/admin`.

## Screenshots

<div align="center">
    <table align="center">
    <tr align="center">
    <td align="center">
    <h3>Home</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/home.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/home.png" height=200px>
    </a>
</td>
      <td align="center">
    <h3>Opportunities</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/opportunities.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/opportunities.png" height=200px>
    </a>
</td>
<td  align="center">
    <h3>Add Opportunity</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/add-opportunity.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/add-opportunity.png" height=200px>
    </a>
    </td>
      <td  align="center">
        <h3>Dashboard</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/dashboard.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/dashboard.png" height=200px>
    </a>
      </td>
    <tr>
    </table>
</div>





<div align="center">
    <table align="center">
    <tr align="center">
    <td align="center">
    <h3>CV Builder</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/cv-builder.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/cv-builder.png" height=200px>
    </a>
</td>
      <td align="center">
    <h3>About</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/about.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/about.png" height=200px>
    </a>
</td>
<td  align="center">
    <h3>Contact</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/contact.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/contact.png" height=200px>
    </a>
    </td>
      <td  align="center">
        <h3>Admin</h3>
    <a href="https://github.com/parvanehyaghoubi/aspira/blob/main/public/images/admin.png">
    <img src="https://raw.githubusercontent.com/parvanehyaghoubi/aspira/main/public/images/admin.png" height=200px>
    </a>
    </td>
    <tr>
    </table>
</div>


## How Route Protection Works

`proxy.ts` (project root) runs on every request to `/dashboard`, `/saved`, `/add-opportunity`, `/cv-builder` and `/admin`. (This file was called `middleware.ts` before Next.js 16 — v16 renamed the convention to `proxy.ts` and the exported function to `proxy`; the logic is identical, only the names changed.) It reads a `aspira_session` cookie; if it's missing, the visitor is redirected to `/login?redirect=<original path>`, and logging in sends them back to where they started. `/admin` additionally requires the cookie's `role` to be `"admin"`.


## Future Improvements

- Connect the contact form and admin-approval notifications to a real email provider (e.g. Resend, SendGrid)
- Add pagination or infinite scroll once the number of opportunities grows
- Allow organizations to manage their own posted opportunities from an account dashboard
- AI-powered opportunity matching based on user profile
- Mobile app (React Native)

## Important Note

- This project uses **demo data**. Organization names, links and details are illustrative and not real postings.
- The authentication system uses **SHA-256 + salt** password hashing via the Web Crypto API. Passwords are stored as hashes in Upstash Redis and are never stored in localStorage or in plain text.


## 📝 License

MIT — feel free to use this as a reference or starting point for your own projects.


## Contact
For any inquiries, please contact:
- parvaneh.yaghoubi77@gmail.com


## Links

### Parvaneh Yaghoubi
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-three-flax-hqnvbkqkq6.vercel.app/)

[![linkedin Badge](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/parvaneh-yaghoubi-54362620b)


