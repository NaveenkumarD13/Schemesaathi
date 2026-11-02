import { z } from "zod";

export const eligibilitySchema = z.object({
  // Personal Details
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),

 age: z
  .number()
  .min(18, "Age must be at least 18 years")
  .max(100, "Age must be below 100 years"),

  gender: z
    .string()
    .min(1, "Please select your gender"),

  state: z
    .string()
    .min(1, "Please select your state"),

  district: z
    .string()
    .min(2, "District is required"),

  // Occupation
  occupation: z
    .string()
    .min(1, "Please select your occupation"),

  // Income & Category
  annualIncome: z
  .number()
  .min(0, "Income cannot be negative"),
  category: z
    .string()
    .min(1, "Please select your category"),

  disability: z.boolean(),

  minority: z.boolean(),

  bplCard: z.boolean(),

   // Education
  education: z
    .string()
    .min(1, "Please select your education level"),

  studyStatus: z.enum(
    ["studying", "completed", "planning"],
    {
      message: "Please select your current study status",
    }
  ),
});

export type EligibilitySchema = z.infer<typeof eligibilitySchema>;