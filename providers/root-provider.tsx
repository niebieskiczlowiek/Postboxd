"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { User } from "@/types/user";
import { AuthProvider } from "./auth-provider";
import { SecureCookiesProvider } from "next-client-cookies";

export interface RootProviderProps {
    children: React.ReactNode,
    initialUser: User | null,
    token: string | undefined,
}

/* 
Use RootProvider as base for all other providers.
It helps organize, and see clearly all providers the app uses.
*/
export function RootProvider({ 
    children,
    initialUser,
    token
}: RootProviderProps) {
    const [queryClient] = useState(() => new QueryClient()); // why useState?

    return (
        <SecureCookiesProvider value={0}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider initialUser={initialUser} token={token}>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </SecureCookiesProvider>
    )
};