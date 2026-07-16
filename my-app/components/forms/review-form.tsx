"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form";
import { Button } from "../ui/button";

import { reviewFilmSchema, reviewFilmValues } from "@/lib/validations/review";
import { Textarea } from "../ui/textarea";
import { StarRatingInput } from "../star-rating-input";
import { Field, FieldSet } from "../ui/field";

interface ReviewFormProps {};

const ReviewForm = ({}: ReviewFormProps) => {
    const form = useForm<reviewFilmValues>({
        resolver: zodResolver(reviewFilmSchema),
        defaultValues: {
            created_at: new Date(),
            content: "",
            rating: 0
        },
        mode: "onSubmit"
    });

    const { register, handleSubmit, control, formState: { errors } } = form

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
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