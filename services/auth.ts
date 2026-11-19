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
    /*
    Add a token parameter and a Cookie header to access protected endpoints.

    To Do:
    Might be a better way to do this, because this way, we have to provide the token for each function separately.
    Maybe just update localApi client to always include the cookie header, even if there is no token. 
    */
    getSession: (token: string) => localApi<User>(`${serverOrigin.url}/api/users/me`, UserSchema, { 
            method: "GET",
            headers: {
                'Cookie': `auth-token=${token}`,
            }
        }).catch(() => null),
    getUser: (id: number, token: string) => localApi<User>(`${serverOrigin.url}/api/users/${id}`, UserSchema, { 
            method: "GET",
            headers: {
                'Cookie': `auth-token=${token}`,
            }
        }).catch(() => null)
}