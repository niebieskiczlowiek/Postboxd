"use client";

import { 
    Dialog,  
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "./ui/dialog";
import { Button } from "./ui/button";

import { FieldValues } from "react-hook-form";
import { ReactNode, useState } from "react";

interface AuthFormDialogWrapperProps<T extends FieldValues> {
    title: string,
    btnText?: string,
    btnClassName?: string
    children: (props: { setOpen: (v: boolean) => void }) => ReactNode;
}

const AuthFormDialogWrapper = <T extends FieldValues>({
    title,
    btnText,
    btnClassName,
    children
}: AuthFormDialogWrapperProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={btnClassName ? btnClassName : ""} asChild>
                <Button variant="outline">{btnText ? btnText : title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
                {children({ setOpen })}
            </DialogContent>
        </Dialog>
    )
}

export default AuthFormDialogWrapper;