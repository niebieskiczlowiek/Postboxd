"use client";

import { signInValues, signUpValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth";
import { User } from "@/types/user";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from "@tanstack/react-query";
import { JWTPayload } from "jose";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface RootProviderProps {
    children: React.ReactNode,
    initialUser: User | null,
}

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    signIn: (data: signInValues) => Promise<void>;
    signUp: (data: signUpValues) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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

    const signIn = async (data: signInValues) => {
        try {
            const user = await AuthService.signIn(data);
            queryClient.setQueryData(['auth-user'], user);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign-in failed: ", error);
            throw error;
        }
    }

    const signUp = async (data: signUpValues) => {
        try {
            await AuthService.signUp(data);
            router.push("/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Sign-up failed: ", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user: user ?? null, 
            isLoading, 
            signIn, 
            signUp,
            signOut 
        }}>
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