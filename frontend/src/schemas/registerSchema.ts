import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "Full name must be at least 3 characters."),

        email: z
            .string()
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormData =
    z.infer<typeof registerSchema>;