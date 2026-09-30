import { User } from "@/types/user";
import * as z from "zod";

export const signInSchema = z.object({
    username: z
        .string()
        .trim(),
    password: z
        .string()
        .trim(),
});

export type signInValues = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, "Enter name"),
    last_name: z
        .string()
        .trim()
        .min(1, "Enter surname"),
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),
    username: z
        .string()
        .trim()
        .regex(
            /^[a-zA-Z0-9_]+$/, ""
        )
        .min(3, "Username must be at least 3 characters.")
        .max(32, "Username must be at most 32 characters."),
    password: z
        .string()
        .trim()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain a capital and digit"
        )
        .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
})

export type signUpValues = z.infer<typeof signUpSchema>

export const UserSchema = z.unknown().transform((data) => {
    const raw = data as User;

    return {
        ...raw,
        created_at: new Date(raw.created_at),
    }
})