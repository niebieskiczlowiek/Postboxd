import * as z from "zod";

type ClientConfig = {
    baseUrl?: string | undefined;
    defaultHeaders?: Record<string, string>;
}

export function createApiClient({ baseUrl, defaultHeaders }: ClientConfig) {
    const apiClient = async <T>(
        endpoint: string,
        schema?: z.Schema<T>,
        options: RequestInit = {}
    ): Promise<T> => {
        const url = baseUrl ? `${baseUrl}${endpoint}` : endpoint;

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
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
    }
    return apiClient;
}