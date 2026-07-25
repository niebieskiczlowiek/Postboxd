"use client";

import { Film } from "@/types/film";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import ReviewForm from "../forms/review-form";

interface LogDialogProps {
    film: Film,
    btnText?: string
    btnClassName?: string
}

const LogDialog = ({ 
    film,
    btnText,
    btnClassName
 }: LogDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Trigger */}
            <DialogTrigger className={btnClassName ? btnClassName : ""} asChild>
                <Button variant="outline">{btnText ? btnText : film.title}</Button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-sm">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle>{film.title}</DialogTitle>
                    <DialogDescription>{film.release_date.getFullYear()}</DialogDescription>
                </DialogHeader>

                {/* Form */}
                <ReviewForm 
                    filmId={film.id}
                />
            </DialogContent>
        </Dialog>
    )
 }

export default LogDialog;