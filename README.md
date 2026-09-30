# Postboxd
> Postboxd is a clone of the Letterboxd website. It allows users to browse an extensive online film database, rate and review films, read other users’ reviews, as well as add films to personal lists.


## Tech Stack & Enviroment
- **Framework:** Next.js 16.1.6 (App Router)
- **Database / ORM:** Supabase + Prisma (`prisma/schema.prisma`)
- **Auth:** . . .
- **Styling / UI:** Tailwind CSS + shadcn/ui components

### Local Setup Steps -- TO DO (example)
1. Install dependencies: `pnpm install`
2. Environment config: `cp .env.example .env.local`
3. Spin up local DB & Seed: `npx prisma db push && npx prisma db seed`
4. Run Stripe Webhook Listener (Terminal 2): `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
5. Start dev server: `pnpm dev`

## Architecture & Data Flow -- TODO (example)
### 1. Authentication & Route Guarding
- **Middleware:** `src/middleware.ts` intercepting all requests.
- **Protected Routes:** `/dashboard/*`, `/course/[id]/edit` require active session.
- **Public Routes:** `/`, `/courses`, `/api/webhooks/*`

### 2. Data Fetching Strategy
- **Server Components (RSC):** Default for reading database records directly via Prisma.
  - *Example:* `/dashboard/page.tsx` fetches user courses directly on the server without API routes.
- **Server Actions:** Used for mutation/writes (`src/app/actions/course-actions.ts`).
  - *Rule:* Always call `revalidatePath('/dashboard')` inside actions after database updates.
- **Client Components (`"use client"`):** Restricted strictly to interactive forms, drag-and-drop video uploaders, and video player UI.