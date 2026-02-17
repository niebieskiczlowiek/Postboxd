import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { Button } from "./ui/button";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const signInFormSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters.")
        .max(32, "Username must be at most 32 characters."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof signInFormSchema>

const SignInDialog = () => {
    const form = useForm<LoginValues>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: "",
            password: ""
        }

    });

    const { register, handleSubmit, formState: { errors, isSubmitting }} = form;

    const onSubmit = (data: LoginValues) => {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("username")} id="username" name="username" />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password")} type="password" id="password" name="password" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button 
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SignInDialog;