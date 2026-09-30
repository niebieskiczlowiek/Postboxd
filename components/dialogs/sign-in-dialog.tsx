import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import AuthFormDialogWrapper from "../auth-dialog-wrapper";
import SignInForm from "../forms/sign-in-form";

interface SignInDialogProps {
    btnText?: string,
    btnClassName?: string,
}

const SignInDialog = ({
    btnText,
    btnClassName,
}: SignInDialogProps) => {
    return (
        <AuthFormDialogWrapper
            title="Sign In"
            btnText={btnText}
            btnClassName={btnClassName}
        >
            {({ setOpen }) => (
            <SignInForm 
                callback={() => setOpen(false)}
                footer={({ isSubmitting }) => (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </DialogFooter> 
                )}
            />
            )}
        </AuthFormDialogWrapper>
    );
}

export default SignInDialog;