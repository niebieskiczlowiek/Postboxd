"use client";

import SignInForm from "@/components/forms/sign-in-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm 
          footer={({ isSubmitting }) => (
            <CardFooter className="justify-center">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          )}
        />
      </CardContent>
    </Card>
  )
}
