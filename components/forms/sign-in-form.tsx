import { signInSchema, signInValues } from "@/lib/validations/auth";
import { useAuth } from "@/providers/root-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SignInFormProps {
    footer: (props: { isSubmitting: boolean }) => React.ReactNode,
    callback?: () => void
}

const SignInForm = ({ 
    footer,
    callback 
}: SignInFormProps) => {
    const { signIn } = useAuth();
    const form = useForm<signInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onSubmit"
    });

    const { register, formState: { errors, isSubmitting }} = form;

    return (
        <form onSubmit={form.handleSubmit(async (data) => {
            await signIn(data);
            if (callback) callback();
        })}>
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                            {...register("username")} 
                            id="username"
                            required
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            {...register("password")} 
                            type="password" 
                            id="password"
                            required
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </Field>
                </FieldGroup>
                {footer({ isSubmitting })}
            </FieldSet>
        </form>

    )
}

export default SignInForm;