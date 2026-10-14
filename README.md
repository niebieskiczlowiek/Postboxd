# Postboxd
> Postboxd is a clone of the Letterboxd website. It allows users to browse an extensive online film database, rate and review films, read other users’ reviews, as well as add films to personal lists.

## Tech Stack & Environment
- **Framework:** Next.js 16.1.6 (App Router)
- **Database / ORM:** Supabase + Prisma (`prisma/schema.prisma`)
- **Auth:** Custom, stateless, JWT-based, HTTP-only authentication
- **Styling / UI:** Tailwind CSS + shadcn/ui components
- **Primary data source**: TMDB API [https://developer.themoviedb.org/docs/getting-started] (External REST API for film data)
- **Design Generation:** [v0.dev](https://v0.dev) — Used for initial UI layout prototyping and component scaffold generation (Tailwind CSS + shadcn/ui primitives).

## Key Features ✨
- **Film browsing and discovery:** Search and browse films provided by the TMDB API
- **Share and read reviews:** See what other people think about films and share your own thoughts
- **Personal lists:** Add films to personal film lists
- **Custom Auth:** Secure, stateless JWT authentication stored in HTTP-only cookies

## Getting Started 🛠️

### Prerequisites 📋
* Node.js (v18.x or higher recommended)
* npm, pnpm or yarn

### Installation 💿
1. Clone the repository
  ```bash
  git clone https://github.com/niebieskiczlowiek/Postboxd.git
  cd Postboxd
  ```

2. Install dependencies
  ```bash
  npm install
  # or
  pnpm install
  ```

3. Environment config
  ```bash 
  cp .env.example .env.local
  ```

4. Setup Prisma
  ```bash
  npx prisma db push && npx prisma generate
  ```

5. Run development server
  ```bash
  npm run dev
  # or
  pnpm dev
  ```

## Project Structure
```
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Reusable UI components
├── lib/                  # Utility functions and shared clients (e.g., prisma.ts)
├── providers/            # React providers
├── public/               # Static assets (images, icons)
├── services/             # Service layer function
├── types/                # Typescript types
├── .env.example          # Example environment variables
└── package.json          # Project dependencies and scripts
```

---

### 📚 Documentation Index

For detailed guides and architecture deep dives, refer to the following:

- [System Architecture & Data Flow](./docs/architecture.md)
- [Database Setup & Schema Guide](./docs/database-schema.md)
- [Authentication & Middleware Rules](./docs/authentication.md)
- [Troubleshooting & Known Gotchas](./docs/troubleshooting.md)