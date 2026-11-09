import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().trim().toLowerCase().email("Invalid Email Address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid Email Address"),
    password: z.string().min(1, "Password is Required"),
})

export { registerSchema, loginSchema };
