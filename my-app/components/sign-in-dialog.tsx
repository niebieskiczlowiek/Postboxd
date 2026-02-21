import { DialogClose, DialogFooter } from "./ui/dialog";
import { Field, FieldGroup, FieldSet } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AuthFormDialogWrapper from "./auth-dialog-wrapper";
import { signInSchema, signInValues } from "@/lib/validations/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { AuthService } from "@/services/auth";

interface SignInDialogProps {
    btnText?: string,
    btnClassName?: string
}

const SignInDialog = ({
    btnText,
    btnClassName
}: SignInDialogProps) => {
    const form = useForm<signInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onSubmit"
    });

    const { register, formState: { errors, isSubmitting }} = form;

    const onSubmit = async (data: signInValues) => {
        const { username, password } = data;

        try {
            await AuthService.signIn(data);
            window.location.href = "/u/me";
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <AuthFormDialogWrapper
            title="Sign In"
            form={form}
            onSubmit={onSubmit}
            btnText={btnText}
            btnClassName={btnClassName}
        >
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input 
                            {...register("username")} 
                            id="username"
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
                            aria-invalid={errors.username ? "true" : "false"}
                            className={errors.username ? "border-red-500": ""} 
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </FieldSet>
        </AuthFormDialogWrapper>
    );
}

export default SignInDialog;