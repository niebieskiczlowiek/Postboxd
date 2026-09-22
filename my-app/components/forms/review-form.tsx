"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form";
import { Button } from "../ui/button";

import { ReviewFormSchema, ReviewFormValues, ReviewValues } from "@/lib/validations/review";
import { Textarea } from "../ui/textarea";
import { StarRatingInput } from "../star-rating-input";
import { Field, FieldSet } from "../ui/field";
import { ReviewService } from "@/services/review";
interface ReviewFormProps {
    filmId: number,
    userId: number,
    callback: () => void
};

const ReviewForm = ({
    filmId,
    userId,
    callback
}: ReviewFormProps) => {
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(ReviewFormSchema),
        defaultValues: {
            content: "",
            rating: 0
        },
        mode: "onSubmit"
    });

    const { register, handleSubmit, control, formState: { errors } } = form

    const onSubmit = async (formData: ReviewFormValues) => {
        try {
            await ReviewService.postReview({
                ...formData,
                film_id: filmId,
                user_id: userId
            });

            form.reset();
            callback();
        } catch (error) {
            console.error("Failed to post review: ", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
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