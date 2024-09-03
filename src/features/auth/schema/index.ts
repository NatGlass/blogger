import { z } from "zod";

export const registerUserSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email",
    })
    .min(1, {
      message: "Email is required",
    }),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Name is too long",
    }),
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores and dashes",
    }),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
});

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(6, {
    message: "Must be at least 6 characters",
  }),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
