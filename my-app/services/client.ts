import * as z from "zod";

const BASE_URL = process.env.TMDB_API_BASE_URL
const API_KEY = process.env.TMDB_API_READ_ACCESS_TOKEN

export async function apiFetch<T>(
    endpoint: string, 
    schema?: z.Schema<T>, 
    options: RequestInit = {}
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            ...options.headers,
        }
    });

    console.log("Response: ");
    console.log(response);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    if (schema) {
        return schema.parse(rawData);
    }

    return rawData as T;
};