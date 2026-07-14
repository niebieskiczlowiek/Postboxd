"use client";

import { signUpSchema, signUpValues } from "@/lib/validations/auth";
import { useAuth } from "@/providers/root-provider";
import { DialogClose,  DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import SignUpForm from "../forms/sign-up-form";
import AuthFormDialogWrapper from "../auth-dialog-wrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 

interface SignUpDialogProps {
    btnText?: string,
    btnClassName?: string
}

const SignUpDialog = ({
    btnText,
    btnClassName
}: SignUpDialogProps) => {
    const { signUp } = useAuth();
    const form = useForm<signUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit"
    });

    const { register, formState: { errors, isSubmitting }} = form;

    return (
        <AuthFormDialogWrapper
            title="Sign Up"
            btnText={btnText}
            btnClassName={btnClassName}
        >
            {({ setOpen }) => (
                <SignUpForm 
                    callback={() => setOpen(false)}
                    footer={({ isSubmitting, currentStep, isLastStep, nextStep, prevStep }) => (
                        <DialogFooter>
                            {currentStep > 0 ? (
                                <Button 
                                    type="button"
                                    variant="ghost"
                                    onClick={prevStep}
                                >
                                    Back
                                </Button>
                            ): (
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>
                            )}

                            {isLastStep ? (
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            ): (
                                <Button type="button" onClick={nextStep}>Continue</Button>
                            )}
                        </DialogFooter>
                    )}
                />

            )}
        </AuthFormDialogWrapper>
    );
}

export default SignUpDialog;