"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ControlledDialogProps {
    titleText: string,
    descriptionText: string,
    confirmBtnText: string,
    cancelBtnText: string,
    confirmBtnCallback: () => void,
    cancelBtnCallback: () => void,
    open: boolean
}

const ControlledDialog = ({
    titleText,
    descriptionText,
    confirmBtnText,
    cancelBtnText,
    confirmBtnCallback,
    cancelBtnCallback,
    open
}: ControlledDialogProps) => {
    
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{titleText}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {descriptionText}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => cancelBtnCallback()}
                    >
                        {cancelBtnText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => confirmBtnCallback()}
                    >
                        {confirmBtnText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ControlledDialog;