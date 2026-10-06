# 🏗️ Architecture
This document outlines the high-level architecture, rendering choices and data flow patterns used across the Postboxd project. Refer to this when adding new features or refactoring existing modules.

## 1. Overview & Tech Stack 🚀
- **Framework:** Next.js 16.1.6 (App Router)
- **Database / ORM:** Supabase + Prisma (`prisma/schema.prisma`)
- **Auth:** Custom Auth systems
- **Styling / UI:** Tailwind CSS + shadcn/ui components
- **Primary data source**: TMDB API [https://developer.themoviedb.org/docs/getting-started] (External REST API for film data)
- **Design Generation:** [v0.dev](https://v0.dev) — Used for initial UI layout prototyping and component scaffold generation (Tailwind CSS + shadcn/ui primitives).

## 2. Directory & Module Responsibilities 🛠️
- `/app` - Routing, layouts and page entry points
- `/app/api` - Local API and backend logic
- `/components` - custom ui components (may include bundle directories of similiar components like `/components/forms` or `/components/dialogs`)
- `/components/ui/` - shadcn ui components
- `/lib` - utilities, Third-party client integration, validations, etc.
- `/services/` - API fetching wrappers
- `/types` - Typescript type declarations

## 3. Data Flow & Request Lifecycle 🔄
### A. Local API flow 🏠
1. Client or Server Component - user interacts with a component (e.g., submitting a form), or a component or page begins the process automatically.
2. Service function - a specialised service function is fired (`/services`), and any necessary data is passed and parsed.
3. Local API - an HTTP request is made to a local API endpoint using an API client (`services/client.ts`). 
	- Data is validated
	- Cookies are managed
	- Tokens are authenticated
	- Responses are sent
4. Database - (via a Prisma ORM query) data is written to or read from the database, and the response is passed back through the API route and service layer to trigger UI responses.

### B. External API flow (TMDB API) 🏢
1. Client or Server Component - user interacts with a component (e.g., submitting a form), or a component or page begins the process automatically.
2. Service function - a specialised service function is fired (`/services`), and any necessary data is passed and parsed.
3. Local API - an HTTP request is made to an external API endpoint using an API client (`services/client.ts`). Returned JSON data is passed back through the API route and service layer to trigger UI responses.

## 4. Authentication & Authorization ✅
### Overview & Provider 🔍
Postboxd uses its a custom, stateless authentication system built on JSON Web Tokens (JWT) and HTTP-only cookies.

- **Auth Strategy:** Stateless JWT stored in a secure, HTTP-only cookie
- **Cookie Security Configuration:**
	- `httpOnly: true` (prevents client-side JavaScript access / XSS)
	- `secure: true` in production (enforces HTTPS)
	- `sameSite: "strict"` (mitigates CSRF attacks)
	- `maxAge: 7200` (2-hour session lifespan)
- **Supported Login Methods:** Email/Password
- **Secrets & keys:** JWT signing secrets and encryption keys stored in environmental variables (`process.env.JWT_SECRET`)

### Session Flow & Token Handling 🌊
1. **Sign In:** The user submits credentials to the Auth Provider via `/providers/root-provider.tsx`. The task is then delegated to the service function at `/services/auth.ts`, which dispatches an HTTP request to the API.
2. **API:** The API verifies the passed credentials, authenticates them and compares them to existing database records. 
3. **Session Storage:** Upon successful authentication, a JWT token containing the user's ID and email is created. The token is stored as a cookie in the session under the name of "auth-token".
4. **Request Attaching:** Subsequent requests automatically pass these cookies to Next.js API routes and Server Components.

### Protecting Routes & Resources 🛡️
1. Server Components and Server Actions
	- **Purpose:** Verifying identity before executing server-side logic.
	- **Behavior:** Retrieves user session using `await getSession()`. If invalid or unauthenticated, throws an authorization error or triggers a redirect.

2. Route Protection
-- To Be Implemented --
3. Edge Middleware (`middleware.ts`)
-- To Be Implemented --

## 5. Key Abstractions & Patterns / Helper Utilities ⭐️
List recurring patterns developers should follow when expanding the codebase:
- Error Handling (e.g., global `error.tsx` vs. domain-specific error boundaries).
- Form Handling (e.g., React Hook Form + Zod).
- Environment Variables handling (public vs. secret validation).

### API Clients 🧑‍💼
Since Postboxd uses both a local and an external API, in order to cleanly configure API clients use the createApiClient function at /lib/api-client.ts . It returns an apiClient function based on provided configuration parameters, which can then be used to make API calls. We use it to create a standardised pattern of handling API calls throughout the entire application, without repeating code. API client are to be initialised in /services/client.ts . Each API client can be configured with it’s own default url, headers, and other necessary 
parameters.

```tsx
import { createApiClient } from "@/lib/api-client";
import { dataSchema } from "@/lib/validations/data";

const myApi = createApiClient({
	baseUrl: 'https://myApi.com/'
	defaultHeaders: {
		'Authorization': 'Bearer myKey'
		'Content-Type': 'application/json'
	}
});

const user = await myApi<T>('/users/me', dataSchema);
```

### Services 🛠️
To neatly define and organise necessary API calls, we package them into services. All services must reside in the /services directory.

```tsx
import { myApi } from "./client";
import { dataValues, dataSchema } from "@/lib/validations/data";
import { DataType } from "@/types/data";

export const Service = {
	getData: () => myApi<DataType>('/data', dataSchema, {
		method: "GET"
	}),
    postData: (data: dataValues) => myApi<DataType>('/data', dataSchema, {
            method: "POST",
            body: JSON.stringify(data)
        })
};
```