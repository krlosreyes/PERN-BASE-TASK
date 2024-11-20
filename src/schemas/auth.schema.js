import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a String",
    })
    .min(1)
    .max(255),
  email: z
    .string({
      required_error: "description is required",
      invalid_type_error: "Description must be a String",
    })
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email must be at most 255 characters long")
    .optional(),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long") // Longitud mínima recomendada
    .max(128, "Password must be at most 128 characters long") // Longitud máxima opcional
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Al menos una letra mayúscula
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Al menos una letra minúscula
    .regex(/[0-9]/, "Password must contain at least one number") // Al menos un número
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"), // Si es opcional en el formulario
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a String",
    })
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email must be at most 255 characters long"),

  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});
