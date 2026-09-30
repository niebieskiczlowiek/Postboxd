"use client";

import { Film } from "@/types/film";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import ReviewForm from "../forms/review-form";
import { useAuth } from "@/providers/root-provider";
import ControlledDialog from "./controlled-dialog";

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
    const { user } = useAuth();

    const [open, setOpen] = useState<boolean>(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    const [openControlledDialog, setOpenControlledDialog] = useState<boolean>(false);

    const handleOnOpenChange = (open: boolean) => {
        if (!open && hasUnsavedChanges) {
            setOpenControlledDialog(true);
        } else {
            setOpen(open);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            {/* Controlled confirm prompt dialog */}
            <ControlledDialog
                titleText="Unsaved changes"
                descriptionText="Are you sure you want to discard your review?"
                cancelBtnText="Cancel"
                confirmBtnText="Discard"
                cancelBtnCallback={() => {
                    setOpenControlledDialog(false)
                }}
                confirmBtnCallback={() => {
                    setOpenControlledDialog(false)
                    setOpen(false)
                }}
                open={openControlledDialog}
            />

            {/* Trigger */}
            <DialogTrigger className={btnClassName ? btnClassName : ""} asChild>
                <Button variant="outline">
                    {btnText ? btnText : film.title}
                </Button>
            </DialogTrigger>

            {/* Content */}
            {user ? (
                <DialogContent className="sm:max-w-sm">
                    {/* Header */}
                    <DialogHeader>
                        <DialogTitle>{film.title}</DialogTitle>
                        <DialogDescription>{film.release_date.getFullYear()}</DialogDescription>
                    </DialogHeader>

                    {/* Form */}
                    <ReviewForm 
                        filmId={film.id}
                        userId={user.id}
                        onSubmit={() => {
                            setOpen(false)
                        }}
                        onDirtyChange={setHasUnsavedChanges}
                    />
                </DialogContent>
            ) : 
                <DialogContent className="sm:max-w-sm" showCloseButton={false}>
                    <DialogTitle>Account required</DialogTitle>
                    <DialogDescription>Please sign into or create an account to write reviews on Postboxd</DialogDescription>
                </DialogContent>
            }
        </Dialog>
    )
 }

export default LogDialog;