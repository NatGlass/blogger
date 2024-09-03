"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { verifyEmailAction } from "../actions/verify-email-action";
import {
  type EmailVerificationSchemaType,
  type RegisterUserSchemaType,
  emailVerificationSchema,
  registerUserSchema,
} from "../schema";

function VerifyEmailForm() {
  const [error, setError] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: EmailVerificationSchemaType) => {
    setError(undefined);

    startTransition(async () => {
      const { error } = await verifyEmailAction(data);
      if (error) setError(error);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Verify</Button>
      </form>
    </Form>
  );
}

export default VerifyEmailForm;
