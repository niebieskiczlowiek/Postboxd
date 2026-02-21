import { User } from "@/types/user";
import { localApi } from "./client";
import { UserSchema } from "@/lib/validations/auth";

// need to update or create a new apiFetch client for my own api

export const AuthService = {
    signIn: (credentials: Record<string, string>) => localApi<User>('/api/auth/login', UserSchema, { 
        method: "POST" ,
        body: JSON.stringify(credentials)
    })
}