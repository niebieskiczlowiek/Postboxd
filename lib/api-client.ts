import * as z from "zod";

type ClientConfig = {
    baseUrl?: string | undefined;
    defaultHeaders?: Record<string, string>;
}

/*
Use createApiClient() when you want to define a new API client.
createApiClient() helps standardize how API calls are handled across the entire app.

@param baseUrl — base url for the api client
@param defaultHeaders — a set of default headers for the api client

@returns 
An asynchronous apiClient function, 
which can make API requests, 
and handle responses based on the provided url, 
schema and other parameters.
*/
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