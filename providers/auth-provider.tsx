"use client";

import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth";
import { signInValues, signUpValues } from "@/lib/validations/auth";
import { User } from "@/types/user";
import { RootProviderProps } from "./root-provider";

interface AuthContextValue {
    user: User | null;
    isLoading: boolean;
    signIn: (data: signInValues) => Promise<void>;
    signUp: (data: signUpValues) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* 
Instead of calling useContext() each time, we wrap it in an additional function
*/
export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider")
    }
    return context;
}

/* 
AuthProvider defines the value of AuthContext.
We use it to define the entire AuthContext value in a single place,
and put it all in a single, ready-to-use AuthProvider wrapper.

AuthContext and AuthProvider should probably be moved to a separate auth-provider module.
*/
export const AuthProvider = ({ children, initialUser }: RootProviderProps) => {
    /* 
    Use useQuery() to call getSession() and cache the results. 
    No need to call it again later, just grab the cached results.

    We cache getSession() results, but it also gets saved to our context.
    Are both of these necessary? The app only ever retrieves user from context. 
    */
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