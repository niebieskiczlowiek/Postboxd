import { User } from "@/types/user";
import { localApi } from "./client";
import { UserSchema } from "@/lib/validations/auth";
import { getServerOrigin } from "@/lib/get-server-origin";

const baseUrl = getServerOrigin();

export const AuthService = {
    signIn: (credentials: Record<string, string>) => localApi<User>(`${baseUrl}/api/auth/login`, UserSchema, { 
        method: "POST" ,
        body: JSON.stringify(credentials)
    }),
    getSession: () =>
        localApi<User>(`${baseUrl}/api/users/me`, UserSchema, { method: "GET" }).catch(() => null),
}