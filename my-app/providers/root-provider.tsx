"use client";

import { AuthService } from "@/services/auth";
import { User } from "@/types/user";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

interface RootProviderProps {
    children: React.ReactNode,
    initialUser: User | null,
}

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>({ user: null, isLoading: true });

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider")
    }
    return context;
}

const AuthProvider = ({ children, initialUser }: RootProviderProps) => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['auth-user'],
        queryFn: AuthService.getSession,
        initialData: initialUser,
        staleTime: 1000 * 60 * 5,
    });

    return (
        <AuthContext.Provider value={{ user: user ?? null, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function RootProvider({ 
    children,
    initialUser, 
}: RootProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider initialUser={initialUser}>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
};