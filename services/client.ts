import { createApiClient } from "@/lib/api-client";
// import { cookies } from "next/headers";
// import { useCookies } from "next-client-cookies";

const TMDB_BASE_URL = process.env.TMDB_API_BASE_URL
const TMDB_API_KEY = process.env.TMDB_API_READ_ACCESS_TOKEN

// const token = "";

export const localApi = createApiClient({
    defaultHeaders: {
        'Content-Type': 'application/json',
        // 'Cookie': `auth-token=${token}`
    }
});

export const tmdbApi = createApiClient({
    baseUrl: TMDB_BASE_URL,
    defaultHeaders: {
        'Authorization': `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
    }
})
