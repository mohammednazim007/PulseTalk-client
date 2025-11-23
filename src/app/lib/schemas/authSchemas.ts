import { z } from "zod";
import * as Yup from "yup";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .regex(emailRegex, "Please enter a valid email address"),
    avatar: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must be less than 100 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Zod Schema for validation
export const profileSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long." })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional(),
    image: z.instanceof(File).optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

//===================== Mock Schema
export const IProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  role: Yup.string().max(50, "Role too long"),
  location: Yup.string().max(50, "Location too long"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  phone: Yup.string(),
  website: Yup.string().url("Must be a valid URL"),
  twitter: Yup.string().matches(/^@?(\w){1,15}$/, "Invalid Twitter handle"),
  github: Yup.string(),
  linkedin: Yup.string(),
  currentPassword: Yup.string(),
  newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match"
  ),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type IProfileSchema = Yup.InferType<typeof IProfileSchema>;

export type FormData = z.infer<typeof profileSchema>;
export type FormErrors = z.ZodFormattedError<FormData> | null;
