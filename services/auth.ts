import { User } from "@/types/user";
import { localApi } from "./client";
import { signInValues, signUpValues, UserSchema } from "@/lib/validations/auth";
import { getServerOrigin } from "@/lib/get-server-origin";

import * as z from "zod";

const serverOrigin = getServerOrigin();

export const AuthService = {
    signIn: (credentials: signInValues) => localApi<User>(`${serverOrigin.url}/api/auth/login`, UserSchema, { 
        method: "POST" ,
        body: JSON.stringify(credentials)
    }),
    signUp: (credentials: signUpValues) => {
        return localApi<User>(`${serverOrigin.url}/api/users`, UserSchema, {
            method: "POST",
            body: JSON.stringify(credentials)
        });
    },
    signOut: async () => localApi<void>(`${serverOrigin.url}/api/auth/logout`, z.any(), { method: "POST" }).catch(() => null),
    getSession: () => localApi<User>(`${serverOrigin.url}/api/users/me`, UserSchema, { method: "GET" }).catch(() => null),
    getUser: (id: number) => localApi<User>(`${serverOrigin.url}/api/users/${id}`, UserSchema, { method: "GET" }).catch(() => null)
}