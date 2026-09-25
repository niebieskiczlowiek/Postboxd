"use client"

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form";
import { Button } from "../ui/button";

import { ReviewFormSchema, ReviewFormValues } from "@/lib/validations/review";
import { Textarea } from "../ui/textarea";
import { StarRatingInput } from "../star-rating-input";
import { Field, FieldSet } from "../ui/field";
import { ReviewService } from "@/services/review";
import { useEffect, useRef } from "react";

interface ReviewFormProps {
    filmId: number,
    userId: number,
    onSubmit: () => void,
    onChange?: () => void,
    onDirtyChange?: (isDirty: boolean) => void,
};

const ReviewForm = ({
    filmId,
    userId,
    onSubmit,
    onChange,
    onDirtyChange,
}: ReviewFormProps) => {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewFormSchema),
        defaultValues: {
            content: "",
            rating: 0
        },
        mode: "onSubmit"
    });

    const { 
        register,
        handleSubmit: processSubmit, 
        control, 
        formState: { errors, isDirty }
    } = form;

    const formValues = useWatch({ control });
    const formDefaultValues = form.formState.defaultValues;
    const prevUnsavedChangesRef = useRef<boolean | null>(null);
    
    const handleSubmit = async (formData: ReviewFormValues) => {
        try {
            await ReviewService.postReview({
                ...formData,
                film_id: filmId,
                user_id: userId
            });
            
            form.reset();
            onSubmit();
        } catch (error) {
            console.error("Failed to post review: ", error)
        }
    }
    
    useEffect(() => {
        /* 
            Empty form values can initialize as undefined or null, 
            therefore we use the `??` operator to check whether or not
            they are intialised, and if they're not, we convert them to the default value.
        */
        const isContentDefault = (formValues.content ?? "") === (formDefaultValues?.content ?? "");
        const isRatingDefault = (formValues.rating ?? 0) === (formDefaultValues?.rating ?? 0);
        const valuesMatchDefault = isContentDefault && isRatingDefault;
        const hasUnsavedChanges = isDirty && !valuesMatchDefault;

        /*
            We use prevUnsavedChangesRef to check whether or not there has been
            an actual change to the state of hasUnsavedChanges. If the state remains
            the same as before, we don't execute the callback.
        */
        if (onDirtyChange && prevUnsavedChangesRef.current !== hasUnsavedChanges) {
            prevUnsavedChangesRef.current = hasUnsavedChanges;
            onDirtyChange(hasUnsavedChanges);
        }
    }, [formValues, formDefaultValues, isDirty, onDirtyChange]);

    useEffect(() => {
        if (onChange) onChange();
    }, [formValues, onChange]);

    return (
        <Form {...form}>
            <form onSubmit={processSubmit(handleSubmit)}>
                <FieldSet>
                    {/* Content */}
                    <Field>
                        <Textarea 
                            {...register("content")}
                            id="content"
                            aria-invalid={errors.content ? "true" : "false"}
                            className={errors.content ? "border-red-500": ""}
                            placeholder="Write your review"
                        />
                    </Field>

                    {/* Rating */}
                    <Field>
                        <Controller 
                            name="rating"
                            control={control}
                            defaultValue={0}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <StarRatingInput
                                    id="rating"
                                    callback={(newRating) => {
                                        onChange(newRating)
                                    }}
                                />
                            )}
                        />
                    </Field>

                    {/* Submit */}
                    <Field>
                        <Button type="submit">Submit</Button>
                    </Field>
                </FieldSet>
            </form>
        </Form>
    )
};

export default ReviewForm;