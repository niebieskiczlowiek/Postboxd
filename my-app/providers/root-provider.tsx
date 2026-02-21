"use client";

import { AuthService } from "@/services/auth";
import { User } from "@/types/user";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface RootProviderProps {
    children: React.ReactNode,
    initialUser: any | null,
}

interface AuthContextValue {
    user: any | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>({ user: null, isLoading: true, signOut: async () => {} });

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
    const queryClient = useQueryClient();
    const router = useRouter();

    const signOut = async () => {
        try {
            await AuthService.signOut();
        } finally {
            queryClient.setQueryData(['auth-user'], null);
            router.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{ user: user ?? null, isLoading, signOut }}>
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