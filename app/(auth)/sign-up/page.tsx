"use client";

import SignUpForm from "@/components/forms/sign-up-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm 
            footer={({ isSubmitting, currentStep, isLastStep, nextStep, prevStep }) => (
              <CardFooter className="justify-center">
                <Button
                  type="button" 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                {isLastStep ? (
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>Continue</Button>
                )}
              </CardFooter>
            )}
          />
        </CardContent>
      </Card>
  );
}
