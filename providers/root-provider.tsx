"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { User } from "@/types/user";
import { AuthProvider } from "./auth-provider";

export interface RootProviderProps {
    children: React.ReactNode,
    initialUser: User | null,
}

/* 
Use RootProvider as base for all other providers.
It helps organize, and see clearly all providers the app uses.
*/
export function RootProvider({ 
    children,
    initialUser, 
}: RootProviderProps) {
    const [queryClient] = useState(() => new QueryClient()); // why useState?

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider initialUser={initialUser}>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
};