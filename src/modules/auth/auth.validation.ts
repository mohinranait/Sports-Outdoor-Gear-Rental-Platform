import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error:"Name is required"
      })
      .trim()
      .min(3, "Name must be at least 3 charecters")
      .max(100),

    email: z
      .string()
      .trim()
      .email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
    role: z.enum(['Customer',"Provider","Admin"]).default('Customer'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];